local Crud = cc.class "Crud"
local json = cc.import "#json"
local tests = cc.import "#tests"
local Check = tests.Check
local uuid = require "jit-uuid"
local inspect = require "inspect"

function Crud:ctor(instance, model_type)
    self._instance = instance
    self._model_type = model_type
end

function Crud:get(args, opt)
    cc.printerror(inspect(args))
    if Check.notEmpty(args.user_id) and Check.notEmpty(args.id) then
        return nil
    end
    local _ssdb = self._instance:getSsdb()
    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id
    local _data = _ssdb:hget(_key)
    cc.printerror(inspect(_data))
    local _ret = _ssdb:array_to_hash(_data)
    cc.printerror(inspect(_ret))
    return _ret
end

function Crud:update(args, opt)
    cc.printerror(inspect({args, opt}))
    local _now = os.time()
    -- uuid.seed(_now)
    -- args.id = uuid()

    args.created_at = _now
    args.updated_at = _now

    local _ssdb = self._instance:getSsdb()

    local _data = _ssdb:hash_to_array(args)

    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id

    local _ret = _ssdb:multi_hset(_key, table.unpack(_data))
    if _ret and opt and opt.mapping then
        for _k, _v in pairs(opt.mapping) do
            local _v1 = _ssdb:hash_to_array(_v)
            cc.printerror(inspect {_k, _v, _v1})
            local _ret1 = _ssdb:multi_hset("mapping:" .. self._model_type .. ":" .. _k, table.unpack(_v1))
            if not _ret1 then
                return nil
            end
        end
    end
    return _ret == _ssdb.null and nil or args
end

-- function Crud:delete(args)
--     args.action = nil
--     local user_id = args.user_id
--     local _ret = self._model:_del_key(user_id .. ":" .. model_type, args.id)
--     return _ret ~= nil
-- end

-- function Crud:list(args)
--     args.action = nil
--     local user_id = args.user_id
--     local _ret = self._model:_getall_key(user_id .. ":" .. model_type)
--     return _ret
-- end

return Crud
