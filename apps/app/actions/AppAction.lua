local gbc = cc.import "#gbc"
local mytype = "node"
local Action = cc.class(mytype, gbc.ActionBase)
-- local env = require "env"
local inspect = require "inspect"
local Crud = cc.import("#crud")
local Session = cc.import("#session")
--local snappy = require "resty.snappy"
local uuid = require "jit-uuid"

local _opensession

function Action:init()
    ngx.log(ngx.ERR, "app init")
    self._crud = Crud:new(self:getInstance(), mytype)
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
    local session, _err = _opensession(self:getInstance(), args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")
    local _now = os.time()
    uuid.seed(_now)
    args.created_at = _now    
    args.id = uuid()
    math.randomseed(_now)
    args.api_key = uuid(math.random() + os.time())
    args.user_id = _user_id
    local _ret, _err = self._crud:update(args)
    if _ret then
        return {result = true}
    end

    return {result = false}
end

function Action:updateAction(args)
    args.action = nil
    local session, _err = _opensession(self:getInstance(), args)
    if not session then
        return {result = false, error_code = _err}
    end
    local _user_id = session:get("id")

    if args.user_id ~= _user_id then
       return {result = false}
    end
    
    -- cc.printerror(inspect(args))
    local _ret, _err = self._crud:update(args)
    if _ret then
        return {result = true}
    end

    return {result = false}
end

--private

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

    return session
end

return Action
