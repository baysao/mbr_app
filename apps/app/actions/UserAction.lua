local cc, ngx = cc, ngx
local gbc = cc.import("#gbc")

local mytype = "user"

local Session = cc.import("#session")

local json = cc.import("#json")

local UserAction = cc.class(mytype .. "Action", gbc.ActionBase)

local _opensession

local set_var = ndk.set_var
local inspect = require "inspect"

local Model = cc.import("#" .. mytype)

function UserAction:init()
    self._model = Model:new(self:getInstance())
end

function UserAction:loginAction(args)
    args.action = nil
    -- cc.printerror(inspect(args))
    if not args.email or not args.password then
        return {result = false}
    end
    local email = args.email

    args.user_id = "0"
    local _ret, _err = self._model:login(args)

    -- cc.printerror(inspect({_ret, _err}))

    if not _ret then
        return {result = false}
    end

    local redis = self:getInstance():getRedis()
    -- start session
    local session = Session:new(redis)
    session:start()
    session:set("id", _ret.id)
    session:set("email", _ret.email)
    session:save()

    local _expires = session:getExpired()
    local _token = session:getSid()
    local cookie_tail = ";version=1;path=/;Max-Age=0" .. _expires
    cookie_tail = cookie_tail .. ";secure"
    cookie_tail = cookie_tail .. ";httponly"

    ngx.header["Set-Cookie"] = {
        "OauthMbrAccessToken=" .. ngx.escape_uri(_token) .. cookie_tail
    }

    _ret.sid = session:getSid()
    _ret.expires = _expires
    return {result = true, data = _ret}

    --    return {result = _ret ~= nil}
end

function UserAction:registerAction(args)
    -- cc.printerror(inspect(args))
    args.action = nil

    local _ret, _err = self._model:register(args)

    return _ret and {result = true} or {result = false}
end

-- function UserAction:signinAction(args)
--     local username = args.username
--     if not username then
--         cc.throw('not set argsument: "username"')
--     end

--     local redis = self:getInstance():getRedis()
--     -- ngx.log(ngx.ERR, inspect(redis))
--     -- start session
--     local session = Session:new(redis)
--     session:start()
--     session:set("username", username)
--     session:set("count", 0)
--     session:save()

--     self:getInstance():keepalive()
--     -- return result
--     return {sid = session:getSid(), count = 0}
-- end

function UserAction:signoutAction(args)
    -- remove user from online list
    local session = _opensession(self:getInstance(), args)
    -- local online = Online:new(self:getInstance())
    -- online:remove(session:get("username"))
    -- delete session
    if not session then
       return {result = false}
    else
       session:destroy()
    end
    
    return {result = true}
end
-- function UserAction:countAction(args)
--     -- update count value in session
--     local session = _opensession(self:getInstance(), args)
--     local count = session:get("count")
--     count = count + 1
--     session:set("count", count)
--     session:save()
--     self:getInstance():keepalive()

--     return {count = count}
-- end

-- function UserAction:addjobAction(args)
--     local sid = args.sid
--     if not sid then
--         cc.throw('not set argsument: "sid"')
--     end

--     local instance = self:getInstance()
--     local redis = instance:getRedis()
--     local session = Session:new(redis)
--     if not session:start(sid) then
--         cc.throw("session is expired, or invalid session id")
--     end

--     local delay = cc.checkint(args.delay)
--     if delay <= 0 then
--         delay = 1
--     end
--     local message = args.message
--     if not message then
--         cc.throw('not set argument: "message"')
--     end

--     -- send message to job
--     local jobs = instance:getJobs()
--     local job = {
--         action = "/jobs/jobs.echo",
--         delay = delay,
--         data = {
--             username = session:get("username"),
--             message = message
--         }
--     }
--     ngx.log(ngx.ERR, inspect(job))
--     local ok, err = jobs:add(job)
--     if not ok then
--         return {err = err}
--     else
--         return {ok = "ok"}
--     end
-- end
--private

_opensession = function(instance, args)
    local sid = args.token or ngx.var.cookie_OauthMbrAccessToken
    if not sid then
    -- cc.throw('not set argsument: "sid"')
    --cc.throw('not set argsument: "sid"')
    --return nil
    end

    local session = Session:new(instance:getRedis())
    if not session:start(sid) then
        --cc.throw("session is expired, or invalid session id")
        return nil
    end

    return session
end

return UserAction
