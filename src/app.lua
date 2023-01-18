local _M = {}

local controller = require "app.controller"

function _M.go()
    controller.run()
end

return _M
