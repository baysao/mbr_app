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

function Crud:getall(args, opt)
    if Check.notEmpty(args.user_id) and Check.notEmpty(args.id) then
        return nil
    end
    local _ssdb = self._instance:getSsdb()
    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id
    local _limit = 100
    local _data = _ssdb:hscan(_key, "", "", _limit)
    local _ret = _ssdb:array_to_hash(_data)
    return _ret == _ssdb.null and nil or _ret
end

function Crud:get(args, opt)
    -- cc.printerror(inspect({args, opt}))
    if Check.notEmpty(args.user_id) and Check.notEmpty(args.id) then
        return nil
    end

    local _ssdb = self._instance:getSsdb()
    local _opt = _ssdb:hash_to_array(opt)
    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id
    local _data, _err = _ssdb:multi_hget(_key, table.unpack(_opt))
    local _ret
    if _data then
        _ret = _ssdb:array_to_hash(_data)
    end

    return _ret == _ssdb.null and nil or _ret
end

function Crud:delete(args, opt)
    local _now = os.time()
    args.updated_at = _now
    local _ssdb = self._instance:getSsdb()
    local _data = _ssdb:hash_to_array(args)
    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id
    local _key_list = args.user_id .. ":" .. self._model_type
    local _ret = _ssdb:del(_key)
    if _ret then
        _ret = _ssdb:zdel(_key_list, args.id)
    end
    return _ret == _ssdb.null and nil or args
end
function Crud:update(args, opt)
    local _now = os.time()
    args.updated_at = _now
    local _ssdb = self._instance:getSsdb()
    local _data = _ssdb:hash_to_array(args)
    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id
    local _key_list = args.user_id .. ":" .. self._model_type
    local _ret = _ssdb:multi_hset(_key, table.unpack(_data))
    if _ret and opt and opt.mapping then
        for _k, _v in pairs(opt.mapping) do
            local _v1 = _ssdb:hash_to_array(_v)
            local _ret1 = _ssdb:multi_hset("mapping:" .. self._model_type .. ":" .. _k, table.unpack(_v1))
            if not _ret1 then
                return nil
            end
        end
    end
    if _ret then
        _ret = _ssdb:zset(_key_list, args.id, _now)
    end
    return _ret == _ssdb.null and nil or args
end

function Crud:list(args)
    local _ssdb = self._instance:getSsdb()
    local _key_list = args.user_id .. ":" .. self._model_type

    local _limit = args.limit or 100
    local _list = _ssdb:zkeys(_key_list, "", "", "", _limit)
    local _limit = args.limit or 100
    local _result = {}
    for _, _id in ipairs(_list) do
        local _key = _key_list .. ":" .. _id
        local _ret = _ssdb:hscan(_key, "", "", _limit)
        if _ret and type(_ret) == "table" and _ret[1] ~= "ok" then
            cc.printerror(inspect(_ret))
            local _detail = _ssdb:array_to_hash(_ret)
            cc.printerror(inspect(_detail))
            _result[#_result + 1] = _detail
        end
    end
    return _result
end

return Crud
