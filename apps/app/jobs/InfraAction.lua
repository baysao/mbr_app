local inspect = require "inspect"
local util = require "mbrutil"
local gbc = cc.import("#gbc")
local mytype = "infra"
local JobsAction = cc.class(mytype .. "JobsAction", gbc.ActionBase)

JobsAction.ACCEPTED_REQUEST_TYPE = "worker"

local _infra_templates = {
    infra = [[
upstream infra_${id} {
    include ${site_root}/db/gateway/conf.d/infra/*/*/*.node_upstream.conf;
    include ${site_root}/http.d/gateway/etc/_upstream_server.conf;
}
]]
}
local _dns_templates = {
    zone = [[
$TTL 300
$ORIGIN ${DOMAIN}.


@               SOA ns1.${DOMAIN}. hostmaster.${DOMAIN}.(
                2021101405  ; serial
                300            ; refresh
                30M             ; retry
                1D              ; expire
                300             ; ncache
)

; Name servers

@               NS      ns1.${DOMAIN}.
@               NS      ns2.${DOMAIN}.
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

    _item.site_root = job_data.site_root
    cc.printerror(inspect(_item))
    local _template = util.get_template(_infra_templates, _item)
    local _str = _template("infra")
    cc.printerror(_str)
    local _dir = job_data.site_root .. "/db/gateway/conf.d/infra"
    util.mkdirp(_dir)
    util.write_file(_dir .. "/" .. _item.id .. ".infra.conf", _str)

    -- local _ret = _generateconf(instance, _item)
    return true
end

function JobsAction:dnszoneAction(job)
    print(inspect(job))
    -- local instance = self:getInstance()
    local job_data = job.data
    local _item, _err = self._crud:getall(job_data)
    cc.printerror(inspect(_item))
    if _item.domain then
        local _template = util.get_template(_dns_templates, {DOMAIN = _item.domain})
        local _str = _template("zone")
        cc.printerror(_str)
        local _zone_dir = job_data.site_root .. "/db/gdnsd/zones"
        util.mkdirp(_zone_dir)
        util.write_file(_zone_dir .. "/" .. _item.domain, _str)
    end

    -- local _ret = _generateconf(instance, _item)
    return true
end

--- Generate gateway conf
--
_generateconf = function(instance, args)
end

return JobsAction
