local _M = {}

local concat = table.concat
local re_find = ngx.re.find
local re_match = ngx.re.match
local sub = string.sub
local byte = string.byte
local http_time = ngx.http_time
local tonumber = tonumber
local resp_header = ngx.header
local ngx_time = ngx.time
local ngx_var = ngx.var
local format = string.format
local unescape_uri = ngx.unescape_uri
local match_table = {}

local inspect = require "inspect"
local view = require "app.view"
-- local model = require "app.model"
local i18n_class = require "app.i18n"
local i18n_objs = {
    ["cn"] = i18n_class.new("cn"),
    ["en"] = i18n_class.new("en")
}

function _M.run()
    local uri = ngx_var.uri
    -- m = re_match(uri, [[ ^ / ( [a-z]{2} ) / (?: ([-\w]+) \.html )? $ ]], "jox", nil, match_table)
    -- ngx.print(uri)
    -- inspect(uri)
    -- if not m then
    --     return ngx.exit(404)
    -- end
    local lang = "en"
    local i18n = i18n_objs[lang]
    local html = ""
    if uri == "/_app/config.json" then
       html = view.process("config.tt2", {}, i18n)
    else
       return ngx.exit(404)
    end

    -- local html = view.process("index.tt2", {}, i18n)
    ngx.print(html)
end

return _M
