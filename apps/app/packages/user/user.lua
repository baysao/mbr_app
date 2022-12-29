local ngx, cc = ngx, cc

local mytype = "user"

local Model = cc.class(mytype)

local crypto = require "crypto"

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

function Model:login(args)
    local _user, _err = self._crud:get(args)
    ngx.log(ngx.ERR, inspect(_user))

    if _user.password_hash ~= crypto.passwordKey(args.password, _user.password_salt) then
       return nil, "wrong password"
    end
    return true
 end

function Model:validate(args)
    return my_validator(args)
end

function Model:register(args)
    local password = args.password
    local _hash, _salt = crypto.passwordKey(password)
    local _user = {
        user_id = "0",
        email = args.email,
        password_hash = _hash,
        password_salt = _salt
    }
    return self._crud:create(_user)
end

return Model
