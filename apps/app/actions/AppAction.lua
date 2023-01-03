local gbc = cc.import "#gbc"
local Action = cc.class("app", gbc.ActionBase)
local env = require "env"
local inspect = require "inspect"
local Crud = cc.import("#crud")
local Session = cc.import("#session")
--local snappy = require "resty.snappy"

local _session_alive

function Action:init(args)
    ngx.log(ngx.ERR, "app init")
end

function Action:configAction(args)
    local _is_alive = _session_alive(self:getInstance())
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

function Action:createAction(args)
    local instance = self:getInstance()
    local _crud = Crud:new(instance)
    local _detail = _crud:create(args)
    --    instance:getRedis():setKeepAlive()
    return _detail
end

_session_alive = function(instance)
    local _token = ngx.var.cookie_OauthMbrAccessToken
    if not _token then
        return false
    end
    local session = Session:new(instance:getRedis())
    return session:start(_token)
end

return Action
