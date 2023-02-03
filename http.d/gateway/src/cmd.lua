local shell = require "resty.shell"
local json = require "cjson"

local stdin = ""
local timeout = 10 -- ms
local max_size = 4096 -- byte

local _service = ngx.var.arg_service
local _type = ngx.var.arg_type
local _cmd = ngx.var.arg_cmd
local _mycmd = {
    "timeout " .. timeout .. " /massbit/massbitroute/app/src/sites/services/" .. _type .. "/cmd_server",
    _cmd,
    _service
}

local ok, stdout, stderr, reason, status = shell.run(table.concat(_mycmd, " "), stdin, timeout * 1000, max_size)
ngx.say(json.encode({status = status, out = stdout, err = stderr, reason = reason}))
