local ngx, cc = ngx, cc

local mytype = "user"

local Model = cc.class(mytype)

local crypto = require "crypto"
local uuid = require "jit-uuid"
local jsonschema = require "jsonschema"
local my_validator =
    jsonschema.generate_validator {
    type = "object",
    properties = {
        email = {type = "string"},
        password = {type = "string"}
    }
}

local inspect = require "inspect"

local Crud = cc.import("#crud")

function Model:ctor(instance)
    self._instance = instance
    self._crud = Crud:new(instance, "user")
end
function Model:getIdByEmail(_ssdb, email)
    -- local _ssdb = self._instance:getSsdb()
    local _ret, _err = _ssdb:hget("mapping:" .. mytype .. ":email", email)
    cc.printerror(inspect({_ret, type(_ret), _err}))
    return _ret ~= _ssdb.null and _ret or nil
end

function Model:login(args)
    local _user, _err = self._crud:get(args)
    ngx.log(ngx.ERR, inspect(_user))

    if _user.password_hash ~= crypto.passwordKey(args.password, _user.password_salt) then
        return nil, "wrong password"
    end
    return true
end

function Model:validate(args)
    cc.printerror(inspect(args))
    return my_validator(args)
end

function Model:register(args)
    local _ssdb = self._instance:getSsdb()
    cc.printerror("email:" .. inspect(args.email))
    local _id = self:getIdByEmail(_ssdb, args.email)
    cc.printerror("id:" .. inspect(_id))
    if _id and type(_id) == "table" and _id[1] and _id[1] ~= "not_found" then
        cc.printerror("Id " .. _id .. " exists")
        return nil
    end

    uuid.seed(os.time())
    local _id = uuid()
    local password = args.password
    local _hash, _salt = crypto.passwordKey(password)
    local _user = {
        id = _id,
        user_id = "0",
        email = args.email,
        password_hash = _hash,
        password_salt = _salt
    }
    local _mapping = {
        email = {
            [args.email] = _id
        }
    }
    local _ret = self._crud:update(_user, {mapping = _mapping})
    _ssdb:set_keepalive()
    return _ret
end

return Model
