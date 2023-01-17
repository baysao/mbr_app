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
function Model:getIdByEmail(email)
    if not email then
        return nil
    end
    local _ssdb = self._instance:getSsdb()
    local _ret, _err = _ssdb:hget("mapping:" .. mytype .. ":email", email)
    -- cc.printerror(inspect({_ret, type(_ret), _err}))
    return _ret ~= _ssdb.null and type(_ret) and _ret[1] or nil
end

function Model:login(args)
   -- cc.printerror(inspect(args))
   if not args.email or not args.password then
        return nil
    end

    local _id = self:getIdByEmail(args.email)
    -- cc.printerror("id:" .. inspect(_id))
    if not _id or _id == "not_found" then
        -- cc.printerror("Id " .. _id .. " not exists")
        return nil
    end
    args.id = _id
    local _user, _err = self._crud:get(args, {"password_salt", "password_hash"})
    -- cc.printerror(inspect(_user))

    if not _user.password_hash or not _user.password_salt then
       return nil
    end
    
    if _user.password_hash ~= crypto.passwordKey(args.password, _user.password_salt) then
        return nil, "wrong password"
    end
    return {id = _id, email = args.email}
end

function Model:validate(args)
    -- cc.printerror(inspect(args))
    return my_validator(args)
end

function Model:register(args)
   -- cc.printerror("email:" .. inspect(args.email))
   if not args.email or not args.password then
      return nil
   end
   
    local _id = self:getIdByEmail(args.email)
    -- cc.printerror("id:" .. inspect(_id))
    if _id and _id ~= "not_found" then
        cc.printerror("Id " .. _id .. " exists")
        return nil
    end

    uuid.seed(os.time())
    local _id = uuid()

    local _hash, _salt = crypto.passwordKey(args.password)
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
    return _ret
end

return Model
