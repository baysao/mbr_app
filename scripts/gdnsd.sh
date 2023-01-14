#!/bin/sh
DIR=$(realpath $(dirname $0)/..)
mkdir -p $DIR/db/gdnsd
cd $DIR/db/gdnsd
mkdir -p zones
for _d in monitors.d failover.d weighted.d multivalue.d datacenter.d geolocation.d/maps.d geolocation.d/resources.d; do
	__dir=conf.d/$_d
	mkdir -p $__dir
	if [ ! -f "$__dir/_default" ]; then
		touch $__dir/_default
	fi
done
DOMAIN=massbitroute.com
_f=zones/$DOMAIN
if [ ! -f "$_f" ];then
   cat >$_f<<EOF
\$TTL 300
\$ORIGIN ${DOMAIN}.


@               SOA ns1.${DOMAIN}. hostmaster.${DOMAIN}.(
                2021101405  ; serial
                300            ; refresh
                30M             ; retry
                1D              ; expire
                300             ; ncache
)

; Name servers

@               NS      ns1.${DOMAIN}.
@               NS      ns2.${DOMAIN}.
EOF
fi
   
_f=conf.d/datacenter.d/_generic
if [ ! -f "$_f" ]; then
	cat >$_f <<EOF
  generic-datacenter => {
        datacenters => [ Ha-Noi HCM ],
        dcmap => {
                    Ha-Noi => [
                        127.0.0.1
                    ]
                    HCM => [
		      127.0.0.1
                    ]
                }
      }
EOF
fi
_f=conf.d/geolocation.d/resources.d/_generic
if [ ! -f "$_f" ]; then
	cat >$_f <<EOF
 generic-resource => {
                map => generic-map
                dcmap => {
                    Ha-Noi => [
		    127.0.0.1
                    ]
                    HCM => [
		    127.0.0.1	
                    ]
                }
            }
EOF
fi

_f=conf.d/geolocation.d/maps.d/_generic
if [ ! -f "$_f" ]; then
	cat >$_f <<EOF
generic-map => {
                nets => $DIR/geoip/nets.VN
                geoip2_db => $DIR/geoip/GeoIP2-City.mmdb
                datacenters => [Ha-Noi HCM]
                map => {
                    # Use ISO 3166-2 official names
                    AS => {
                        VN => {
                            00 => [Ha-Noi HCM]    # Không xác định
                        }
                        default => [Ha-Noi HCM]   # Các nước Asian
                    }
                    default => [Ha-Noi HCM]       # Các châu lục khác
                }
            }
EOF
fi

_f=conf.d/monitors.d/_gateway
if [ ! -f "$_f" ]; then
	cat >$_f <<EOF
 gateway_check => {
    plugin => tcp_connect,
    port => 443,
    up_thresh => 20,
    ok_thresh => 10,
    down_thresh => 10,
    interval => 10,
    timeout => 3,
  }
EOF
fi
if [ ! -f "config" ]; then
	cat >config <<EOF
options => {
    run_dir = $DIR/tmp
    state_dir = $DIR/tmp
    tcp_threads => 1
    udp_threads => 1
    edns_client_subnet => true
    zones_default_ttl => 3600
    listen => [0.0.0.0]
    dns_port = 53
}

service_types => {
    \$include{$DIR/db/gdnsd/conf.d/monitors.d/*}
}


plugins => {
    simplefo => {
        \$include{$DIR/db/gdnsd/conf.d/failover.d/*}
    }
    weighted => {
            \$include{$DIR/db/gdnsd/conf.d/weighted.d/*}
    }
    multifo => {
            \$include{$DIR/db/gdnsd/conf.d/multivalue.d/*}
    }

    metafo => {
        resources => {
            \$include{$DIR/db/gdnsd/conf.d/datacenter.d/*}
        }
    }
    geoip =>  {
            maps => {
                \$include{$DIR/db/gdnsd/conf.d/geolocation.d/maps.d/*}
            }
            resources => {
                \$include{$DIR/db/gdnsd/conf.d/geolocation.d/resources.d/*}
            }
    }
}
EOF
fi
$DIR/bin/gdnsd/sbin/gdnsd -c $DIR/db/gdnsd -RD start
