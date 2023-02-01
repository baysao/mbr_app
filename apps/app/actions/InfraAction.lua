local gbc = cc.import "#gbc"
local mytype = "infra"
local Action = cc.class(mytype, gbc.ActionBase)
-- local env = require "env"
local inspect = require "inspect"
local Crud = cc.import("#crud")
local json = cc.import("#json")
local Session = cc.import("#session")
--local snappy = require "resty.snappy"
local util = require "mbrutil"
local uuid = require "jit-uuid"
local geo = require "resty.maxminddb"

local _opensession, _lookup_geo, _send_job

function Action:init()
    ngx.log(ngx.ERR, "app init")
    local _instance = self:getInstance()
    self._crud = Crud:new(_instance, mytype)
    self._crud_node = Crud:new(_instance, "node")
    self._crud_gateway = Crud:new(_instance, "gateway")
end

function Action:pingAction(args)
    -- local cjson = require "cjson"
    -- local geo = require "resty.maxminddb"
    -- cc.printerror(ngx.var.site_root .. "/geoip/GeoIP2-City.mmdb")
    -- if not geo.initted() then
    --     geo.init(ngx.var.site_root .. "/geoip/GeoIP2-City.mmdb")
    -- end
    local _ip = "8.8.8.8" or ngx.var.arg_ip or ngx.var.remote_addr
    local _geo = _lookup_geo(_ip)
    return _geo
    -- local res, err = geo.lookup(_ip) --support ipv6 e.g. 2001:4860:0:1001::3004:ef68

    -- if not res then
    --     ngx.log(ngx.ERR, "failed to lookup by ip ,reason:", err)
    -- end
    -- return res
    -- ngx.say("full :", cjson.encode(res))
    -- if ngx.var.arg_node then
    --     ngx.say("node name:", ngx.var.arg_node, " ,value:", cjson.encode(res[ngx.var.arg_node] or {}))
    -- end
end

function Action:configAction(args)
    args.action = nil
    local _is_alive = _opensession(self:getInstance(), args)
    if not _is_alive then
        return {result = false}
    end

    return {
        result = true,
        data = {
            version = "0.0.1"
        }
    }
end

function Action:publicAction(args)
    args.action = nil
    local session, _err = _opensession(self:getInstance(), args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")
    -- uuid.seed(os.time())
    -- args.id = uuid()
    args.user_id = _user_id
    local _ssdb = self._instance:getSsdb()
    local _limit = 100
    local _data = _ssdb:hscan("mapping:" .. mytype .. ":" .. "public", "", "", _limit)

    local _ret = _ssdb:array_to_hash(_data)
    local _list = {}
    cc.printerror(inspect(_ret))
    for u_id, u_user_id in pairs(_ret) do
        local _item = self._crud:getall({id = u_id, user_id = u_user_id})
        if (_item) then
            _list[#_list + 1] = _item
        end
    end
    -- local _ret, _err = self._crud:list(args)
    cc.printerror(inspect(_list))
    if _ret then
        return {result = true, data = _list}
    end

    return {result = false}
end

function Action:listAction(args)
    args.action = nil
    local session, _err = _opensession(self:getInstance(), args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")
    -- uuid.seed(os.time())
    -- args.id = uuid()
    args.user_id = _user_id
    local _ret, _err = self._crud:list(args)
    -- cc.printerror(inspect(_ret))
    if _ret then
--        setmetatable(_ret, json.empty_array_mt)
        return {result = true, data = _ret}
    end

    return {result = false}
end

function Action:deleteAction(args)
    args.action = nil

    local session, _err = _opensession(self:getInstance(), args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")
    args.user_id = _user_id
    -- cc.printerror(inspect(args))
    local _mapping = nil
    _mapping = {
        mapping = {
            public = {
                [args.id] = args.user_id
            }
        }
    }

    local _ret, _err = self._crud:delete(args, _mapping)
    if _ret then
        return {result = true}
    end

    return {result = false}
end

function Action:getgatewaysAction(args)
    args.action = nil

    local _instance = self:getInstance()
    local session, _err = _opensession(_instance, args)
    if not session then
        return {result = false, error_code = _err}
    end

    local _ret, _err =
        self._crud_gateway:list(
        {
            user_id = args.id
        }
    )
    cc.printerror(inspect(_ret))

    if _ret then
        return {result = true, data = _ret}
    end

    return {result = false}
end
function Action:getnodesAction(args)
    args.action = nil

    local _instance = self:getInstance()
    local session, _err = _opensession(_instance, args)
    if not session then
        return {result = false, error_code = _err}
    end

    local _ret, _err =
        self._crud_node:list(
        {
            user_id = args.id
        }
    )
    cc.printerror(inspect(_ret))

    if _ret then
        return {result = true, data = _ret}
    end

    return {result = false}
end

function Action:getAction(args)
    args.action = nil

    local _instance = self:getInstance()
    local session, _err = _opensession(_instance, args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")
    args.user_id = _user_id
    local _ret, _err = self._crud:getall(args)
    cc.printerror(inspect(_ret))
    -- local _ret_nodes, _err =
    --     self._crud_node:list(
    --     {
    --         user_id = args.id
    --     }
    -- )
    -- cc.printerror(inspect(_ret_nodes))
    -- if _ret_nodes then
    -- end

    if _ret then
        return {result = true, data = _ret}
    end

    return {result = false}
end

function Action:createAction(args)
    args.action = nil
    local instance = self:getInstance()
    local session, _err = _opensession(instance, args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")
    local _now = os.time()
    uuid.seed(_now)
    args.created_at = _now
    args.id = uuid()
    -- math.randomseed(_now)
    -- args.api_key = uuid(math.random() + os.time())
    args.user_id = _user_id
    -- if args.ip then
    --     local _geo = _lookup_geo(args.ip)
    --     if _geo then
    --         args.geo = _geo
    --     end
    -- end
    cc.printerror(inspect(args))
    local _mapping = nil
    if args.type == "public" then
        _mapping = {
            mapping = {
                public = {
                    [args.id] = args.user_id
                }
            }
        }
    end

    local _ret, _err = self._crud:update(args, _mapping)
    if _ret then
        -- _job_gateway_update(instance, {id = args.id, user_id = _user_id})
        return {result = true}
    end

    -- if not ok then
    --     return {err = err}
    -- else
    --     return {ok = "ok"}
    -- end

    return {result = false}
end
function Action:updateAction(args)
    args.action = nil
    local instance = self:getInstance()
    local session, _err = _opensession(instance, args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")

    if args.user_id ~= _user_id then
        return {result = false}
    end
    --  cc.printerror(inspect(args))
    -- if args.ip then
    --     local _geo = _lookup_geo(args.ip)
    --     -- cc.printerror(inspect(_geo))
    --     if _geo then
    --         args.geo = _geo
    --     end
    -- end
    cc.printerror(inspect(args))
    -- cc.printerror(inspect(args))

    local _mapping = nil
    if args.type == "public" then
        _mapping = {
            mapping = {
                public = {
                    [args.id] = args.user_id
                }
            }
        }
    end

    local _ret, _err = self._crud:update(args, _mapping)
    if not _ret then
        return {result = false}
    end

    local _opt = {id = args.id, user_id = _user_id, site_root = ngx.var.site_root}

    local _job = {
        action = "/jobs/infra.dnszone",
        delay = 1,
        data = _opt
    }

    cc.printerror(inspect(_job))
    local _ret = _send_job(instance, _job)
    if not _ret then
        return {result = false}
    end

    return {result = false}
end
--private
_send_job = function(_instance, _job)
    -- send message to job
    local jobs = _instance:getJobs()
    local job = _job
    ngx.log(ngx.ERR, inspect(job))
    return jobs:add(job)
end

_opensession = function(instance, args)
    local sid = args.token or ngx.var.cookie_OauthMbrAccessToken
    if not sid then
        --cc.throw('not set argsument: "sid"')
        return nil, 400
    end

    local session = Session:new(instance:getRedis())
    if not session:start(sid) then
        --cc.throw("session is expired, or invalid session id")
        return nil, 401
    end

    -- if session then
    --    session:setKeepAlive()
    -- end
    return session
end

_lookup_geo = function(_ip)
    if not geo.initted() then
        geo.init(ngx.var.site_root .. "/geoip/GeoIP2-City.mmdb")
    end
    return geo.lookup(_ip)
end

return Action
