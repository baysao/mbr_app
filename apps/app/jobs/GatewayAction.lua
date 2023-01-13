local inspect = require "inspect"

local gbc = cc.import("#gbc")
local mytype = "gateway"
local JobsAction = cc.class(mytype .. "JobsAction", gbc.ActionBase)

JobsAction.ACCEPTED_REQUEST_TYPE = "worker"

local _generate_item
local Crud = cc.import("#crud")
function JobsAction:init()
    -- ngx.log(ngx.ERR, "app init")
    self._crud = Crud:new(self:getInstance(), mytype)
end

function JobsAction:pingAction(job)
    print(inspect(job))
end

function JobsAction:generateconfAction(job)
    print(inspect(job))
    -- local instance = self:getInstance()
    local job_data = job.data
    local _item, _err = self._crud:getall(job_data)
    cc.printerror(inspect(_item))
    local _ret = _generateconf(instance, _item)
    return true
end

--- Generate gateway conf
--
_generateconf = function(instance, args)
end

return JobsAction
