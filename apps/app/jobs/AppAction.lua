local inspect = require "inspect"
local util = require "mbrutil"
local gbc = cc.import("#gbc")
local mytype = "app"
local JobsAction = cc.class(mytype .. "JobsAction", gbc.ActionBase)

JobsAction.ACCEPTED_REQUEST_TYPE = "worker"

local _app_templates = {
    _api = [[
server {
    server_name ${id}.*;
    
    location /${api_key} {
        set $api_method '';
        proxy_set_header apiid ${id};
        proxy_pass http://infra_${infra}/;
        body_filter_by_lua_file ${site_root}/http.d/gateway/src/filter-jsonrpc-body.lua;
        access_by_lua_file ${site_root}/http.d/gateway/src/filter-jsonrpc-access.lua;
        include ${site_root}/http.d/gateway/etc/_app_main_location.conf;
    }
    include ${site_root}/http.d/gateway/etc/_app_other_location.conf;
}
]]
}

local _generate_item
local Crud = cc.import("#crud")
function JobsAction:init()
    cc.printerror("app init")
    self._crud = Crud:new(self:getInstance(), mytype)
end

function JobsAction:pingAction(job)
    print(inspect(job))
end

function JobsAction:confAction(job)
    print(inspect(job))
    -- local instance = self:getInstance()
    local job_data = job.data
    cc.printerror(inspect(job_data))
    local _item, _err = self._crud:getall(job_data)
    cc.printerror(inspect(_item))
    local _sub = _item.blockchain .. "/" .. _item.network
    local _dir = job_data.site_root .. "/db/gateway/conf.d/api/" .. _sub
    if tonumber(_item.status) == 1 then
        _item.site_root = job_data.site_root
        local _template = util.get_template(_app_templates, _item)
        local _str = _template("_api")
        cc.printerror(_str)
        util.mkdirp(_dir)
        util.write_file(_dir .. "/" .. _item.id .. ".api.conf", _str)
    else
        cc.printerror("remove:" .. _dir .. "/" .. _item.id .. ".api.conf")
        os.remove(_dir .. "/" .. _item.id .. ".api.conf")
    end

    -- local _ret = _generateconf(instance, _item)
    return true
end

--- Generate gateway conf
--
_generateconf = function(instance, args)
end

return JobsAction
