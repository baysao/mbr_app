local inspect = require "inspect"
local util = require "mbrutil"
local gbc = cc.import("#gbc")
local mytype = "gateway"
local JobsAction = cc.class(mytype .. "JobsAction", gbc.ActionBase)

JobsAction.ACCEPTED_REQUEST_TYPE = "worker"


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

function JobsAction:dnszoneAction(job)
    print(inspect(job))
    -- local instance = self:getInstance()
    local job_data = job.data
    local _item, _err = self._crud:getall(job_data)
    cc.printerror(inspect(_item))
    if _item.domain then
       local _template = util.get_template(_dns_templates, {DOMAIN=_item.domain})
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
