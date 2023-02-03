local resp_body = ngx.arg[1]
--string.sub(ngx.arg[1], 1, 1000)
ngx.ctx.buffered = (ngx.ctx.buffered or "") .. resp_body
if ngx.arg[2] then
    ngx.var.resp_body = ngx.ctx.buffered
end
