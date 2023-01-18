local gbc = cc.import "#gbc"
local mytype = "gateway"
local Action = cc.class(mytype, gbc.ActionBase)
-- local env = require "env"
local inspect = require "inspect"
local Crud = cc.import("#crud")
local Session = cc.import("#session")
--local snappy = require "resty.snappy"
local uuid = require "jit-uuid"
local geo = require "resty.maxminddb"

local _opensession, _job_gateway_update, _lookup_geo

function Action:init()
    ngx.log(ngx.ERR, "app init")
    self._crud = Crud:new(self:getInstance(), mytype)
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
    local _ret, _err = self._crud:delete(args)
    if _ret then
        return {result = true}
    end

    return {result = false}
end

function Action:getAction(args)
    args.action = nil

    local session, _err = _opensession(self:getInstance(), args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")
    args.user_id = _user_id
    local _ret, _err = self._crud:getall(args)
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
    if args.ip then
        local _geo = _lookup_geo(args.ip)
        if _geo then
            args.geo = _geo
        end
    end
    cc.printerror(inspect(args))
    local _ret, _err = self._crud:update(args)
    if _ret then
        _job_gateway_update(instance, {id = args.id, user_id = _user_id})
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
    if args.ip then
        local _geo = _lookup_geo(args.ip)
        -- cc.printerror(inspect(_geo))
        if _geo then
            args.geo = _geo
        end
    end
    cc.printerror(inspect(args))
    -- cc.printerror(inspect(args))
    local _ret, _err = self._crud:update(args)
    if _ret then
       _job_gateway_update(instance, {id = args.id, user_id = _user_id})
        return {result = true}
    end

    return {result = false}
end
--private
_job_gateway_update = function(instance, args)
    -- send message to job
    local jobs = instance:getJobs()
    -- cc.printerror(inspect(jobs))
    local job = {
        action = "/jobs/gateway.generateconf",
        delay = 0,
        data = args
    }
    -- cc.printerror(inspect(job))
    return jobs:add(job)
    -- cc.printerror(inspect({ok, err}))
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
