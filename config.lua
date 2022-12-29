local _config = {
    server = {
        nginx = {
            port = "80",
            port_ssl = "443",
            server_name = "massbitroute.net"
        }
    },
    templates = {},
    apps = {
        app = "apps/app",
        sso = "apps/sso"
    },
    supervisors = {},
    supervisor = [[]]
}
return _config
