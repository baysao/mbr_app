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

function Crud:get(args)
   ngx.log(ngx.ERR, inspect(args))
    if Check.notEmpty(args.user_id) and Check.notEmpty(args.id) then
        cc.throw("user_id or id missing")
    end
    local _redis = self._instance:getRedis()
    local _ssdb = self._instance:getSsdb()
    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id
    ngx.log(ngx.ERR, "model_type:"..inspect(self._model_type))
    ngx.log(ngx.ERR, "key:"..inspect(_key))
    local _ret = _redis:arrayToHash(_redis:hgetall(_key))
    ngx.log(ngx.ERR, "ret:"..inspect(_ret))
    return _ret
end

function Crud:create(args)
    local _now = ngx and ngx.time() or os.time()
    uuid.seed(_now)
    args.id = uuid()

    args.created_at = _now
    args.updated_at = _now

    local _redis = self._instance:getRedis()
    local _ssdb = self._instance:getSsdb()
    
    local _data = _ssdb:hash_to_array(args)
--    local _data = _redis:hashToArray(args)

    local _key = args.user_id .. ":" .. self._model_type .. ":" .. args.id

    local _ret = _ssdb:multi_hset(_key, table.unpack(_data))
--    local _ret = _redis:hmset(_key, table.unpack(_data))

    return _ret == _ssdb.null and nil or args
--    return _ret == _redis.null and nil or args
end

-- function Crud:update(args)
--     args.action = nil
--     local user_id = args.user_id
--     local _detail = self._model:_get_key(user_id .. ":" .. model_type, args.id)

--     -- if not _detail then
--     --     return
--     -- end

--     if _detail then
--         _detail = json.decode(_detail)
--     else
--         _detail = {}
--     end
--     table.merge(_detail, args)

--     _detail.action = nil
--     local _now = ngx and ngx.time() or os.time()
--     _detail.updated_at = _now
--     local _ret = self._model:_save_key(user_id .. ":" .. model_type, {[_detail.id] = json.encode(_detail)})

--     return _ret and _detail or nil
-- end
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
