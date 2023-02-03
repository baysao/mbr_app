local inspect = require "inspect"
local util = require "mbrutil"
local gbc = cc.import("#gbc")
local mytype = "node"
local JobsAction = cc.class(mytype .. "JobsAction", gbc.ActionBase)

JobsAction.ACCEPTED_REQUEST_TYPE = "worker"

local _infra_templates = {
    infra = [[
upstream infra_${id} {
    include ${site_root}/db/gateway/conf.d/infra/${geo}/*.node_upstream.conf;
    include ${site_root}/http.d/gateway/etc/_upstream_server.conf;
}
]]
}

local _node_templates = {
    node_upstream = [[
server unix:/tmp/node-${id}.sock max_fails=1 fail_timeout=3s;
]],
    node = [[
server {
    listen unix:/tmp/node-${id}.sock;
    location / {
       vhost_traffic_status_filter_by_set_key $http_apimethod api::$http_apiid::node::${id}::v1::api_method;
        proxy_pass https://${source_address}${source_path};
        include ${site_root}/http.d/gateway/etc/_node_main_location.conf;
    }
    include ${site_root}/http.d/gateway/etc/_node_other_location.conf;
}
]]
}

local _generate_item
local Crud = cc.import("#crud")
function JobsAction:init()
    -- ngx.log(ngx.ERR, "app init")
    self._crud = Crud:new(self:getInstance(), mytype)
end

function JobsAction:pingAction(job)
    print(inspect(job))
end

function JobsAction:updateAction(job)
    print(inspect(job))
    -- local instance = self:getInstance()
    local job_data = job.data
    cc.printerror(inspect(_job_data))
    local _item, _err = self._crud:getall(job_data)
    local _sub = _item.blockchain .. "/" .. _item.network
    local _dir = job_data.site_root .. "/db/gateway/conf.d/node/" .. _sub
    local _geo = _item.continent .. "/" .. _item.country
    local _dir_u = job_data.site_root .. "/db/gateway/conf.d/infra/" .. _geo
    local _dir_infra = job_data.site_root .. "/db/gateway/conf.d/infra"
    if tonumber(_item.status) == 1 then
        _item.site_root = job_data.site_root
        cc.printerror(inspect(_item))
        local _template = util.get_template(_node_templates, _item)
        local _str = _template("node")
        cc.printerror(_str)

        util.mkdirp(_dir)
        util.write_file(_dir .. "/" .. _item.id .. ".node.conf", _str)

        _str = _template("node_upstream")
        cc.printerror(_str)

        util.mkdirp(_dir_u)
        util.write_file(_dir_u .. "/" .. _item.id .. ".node_upstream.conf", _str)

        local _template_infra =
            util.get_template(
            _infra_templates,
            {
                site_root = _item.site_root,
                id = _item.infra .. "_" .. _item.continent .. "_" .. _item.country,
                geo = _item.continent .. "/" .. _item.country
            }
        )
        local _str = _template_infra("infra")
        cc.printerror(_str)

        util.mkdirp(_dir_infra)
        util.write_file(
	   _dir_infra .. "/" .. _item.infra .. "_" .. _item.continent .. "_" .. _item.country .. ".infra.conf",
            _str
        )

        _template_infra =
            util.get_template(
            _infra_templates,
            {
                site_root = _item.site_root,
                id = _item.infra .. "_" .. _item.continent,
                geo = _item.continent .. "/*"
            }
        )
        local _str = _template_infra("infra")
        cc.printerror(_str)

        util.mkdirp(_dir_infra)
        util.write_file(_dir_infra .. "/" .. _item.infra .. "_" .. _item.continent .. ".infra.conf", _str)
    else
        cc.printerror("remove:" .. _dir .. "/" .. _item.id .. ".node.conf")
        os.remove(_dir .. "/" .. _item.id .. ".node.conf")
        cc.printerror("remove:" .. _dir_u .. "/" .. _item.id .. ".node_upstream.conf")
        os.remove(_dir_u .. "/" .. _item.id .. ".node_upstream.conf")
	cc.printerror("remove:" .. _dir_infra .. "/" .. _item.infra .. "_" .. _item.continent .. "_" .. _item.country .. ".infra.conf")
	os.remove(_dir_infra .. "/" .. _item.infra .. "_" .. _item.continent .. "_" .. _item.country .. ".infra.conf")
	cc.printerror("remove:" .. _dir_infra .. "/" .. _item.infra .. "_" .. _item.continent .. ".infra.conf")
	os.remove(_dir_infra .. "/" .. _item.infra .. "_" .. _item.continent .. ".infra.conf")
    end

    -- local _ret = _generateconf(instance, _item)
    return true
end

return JobsAction
