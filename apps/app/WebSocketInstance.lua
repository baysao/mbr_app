local Online = cc.import("#online")
local Session = cc.import("#session")
local gbc = cc.import("#gbc")
local WebSocketInstance = cc.class("WebSocketInstance", gbc.WebSocketInstanceBase)

function WebSocketInstance:ctor(config)
    WebSocketInstance.super.ctor(self, config)
    self._event:bind(WebSocketInstance.EVENT.CONNECTED, cc.handler(self, self.onConnected))
    self._event:bind(WebSocketInstance.EVENT.DISCONNECTED, cc.handler(self, self.onDisconnected))
end

function WebSocketInstance:onConnected()
    local redis = self:getRedis()

    -- load session
    local sid = self:getConnectToken() -- token is session id
    local session = Session:new(redis)
    session:start(sid)

    -- add user to online users list
    local online = Online:new(self)
    local username = session:get("username")
    online:add(username, self:getConnectId())

    -- send all usernames to current client
    local users = online:getAll()
    online:sendMessage(username, {name = "LIST_ALL_USERS", users = users})
    -- subscribe online users event
    self:subscribe(online:getChannel())

    self._username = username
    self._session = session
    self._online = online
end

function WebSocketInstance:onDisconnected(event)
    if event.reason ~= gbc.Constants.CLOSE_CONNECT then
        -- connection interrupted unexpectedly, remove user from online list
        cc.printwarn("[websocket:%s] connection interrupted unexpectedly", self:getConnectId())
        local username = self._session:get("username")
        self._online:remove(username)
    end
end

function WebSocketInstance:heartbeat()
    -- refresh session
    self._session:setKeepAlive()
end

function WebSocketInstance:getSession()
    return self._session
end
function WebSocketInstance:getUsername()
    return self._username
end
function WebSocketInstance:getOnline()
    return self._online
end

return WebSocketInstance
