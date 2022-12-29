local gbc = cc.import "#gbc"
local Action = cc.class("app", gbc.ActionBase)
local env = require "env"
local inspect = require "inspect"
local Crud = cc.import("#crud")
--local snappy = require "resty.snappy"


-- local ssdb = cc.import("ssdb")

function string.fromhex(str)
    return (str:gsub('..', function (cc)
        return string.char(tonumber(cc, 16))
    end))
end

function string.tohex(str)
    return (str:gsub('.', function (c)
        return string.format('%02X', string.byte(c))
    end))
end


function Action:init(args)
   ngx.log(ngx.ERR, "app init")
end

function Action:testaAction(args)
   ngx.log(ngx.ERR, "test7a")
    -- local ssdb = require "resty.ssdb"
           -- local db = ssdb:new()
   local instance = self:getInstance()
  -- ngx.log(ngx.ERR, inspect(instance))
    local db = instance:getSsdb()
  -- ngx.log(ngx.ERR, inspect(db))
    --   local redis = instance:getRedis()
    -- ngx.log(ngx.ERR, inspect(redis))
           -- db:set_timeout(1000) -- 1 sec

            -- local ok, err = db:connect("127.0.0.1", 8888)
            -- if not ok then
            --     ngx.say("failed to connect: ", err)
            --     return
            -- end

            local ok, err = db:set("dog", "an animal")
            if not ok then
	       cc.printerror("failed to set dog: ", inspect(err))
            end

	    local ok, err = db:set_keepalive()
            if not ok then
	       cc.printerror("failed to set keepalive: ", inspect(err))
            end
	    
            -- ngx.say("set result: ", ok)

            -- local res, err = db:get("dog")
            -- if not res then
            --     cc.printerror("failed to get dog: ", err)
            --     -- return
            -- end

            -- if res == ngx.null then
            --     cc.printerror("dog not found.")
            --     -- return
            -- end

            -- ngx.say("dog: ", res)

            -- db:init_pipeline()
            -- db:set("cat", "Marry")
            -- db:set("horse", "Bob")
            -- db:get("cat")
            -- db:get("horse")
            -- local results, err = db:commit_pipeline()
            -- if not results then
            --     ngx.say("failed to commit the pipelined requests: ", err)
            --     return
            -- end

            -- for i, res in ipairs(results) do
            --     if type(res) == "table" then
            --         if not res[1] then
            --             cc.printerror("failed to run command ", i, ": ", res[2])
            --         else
            --             -- process the table value
            --         end
            --     else
            --         -- process the scalar value
            --     end
            -- end

            -- -- put it into the connection pool of size 100,
            -- -- with 0 idle timeout
            -- local ok, err = db:set_keepalive(0, 100)
            -- if not ok then
            --     cc.printerror("failed to set keepalive: ", err)
            --     return
            -- end

            -- --or just close the connection right away:
            -- local ok, err = db:close()
            -- if not ok then
            --     cc.printerror("failed to close: ", err)
            --     return
            -- end
	    
   return {}
end

function Action:testAction(args)
   local comp, err = snappy.compress("test")
   local comhex = string.tohex(comp)
   local comunhex = string.fromhex(comhex)
   local comp1, err = snappy.uncompress(comunhex)
    -- local comp, err = snappy.compress("test")
    -- if comp1 then
       return {
	  data = comp1
       }
    -- else
    --     if err = 1 then
    --         print "Invalid input"
    --     elseif err == 2 then
    --         print "Buffer too small"
    --     end
--    end
end

function Action:pingAction(args)
    return "pong"
end

function Action:createAction(args)
    local instance = self:getInstance()
    local _crud = Crud:new(instance)
    local _detail = _crud:create(args)
--    instance:getRedis():setKeepAlive()
    return _detail
end

return Action
