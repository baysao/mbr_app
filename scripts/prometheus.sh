#!/bin/sh
DIR=$(realpath $(dirname $0)/..)
mkdir -p $DIR/db/prometheus
cd $DIR/db/prometheus
_conf=$DIR/db/prometheus/config.yml
if [ ! -f "$_conf" ]; then
	cat >$_conf <<EOF
scrape_configs:
  - job_name: stat_vhost
    scheme: http
    # tls_config:
    #   insecure_skip_verify: true
    honor_labels: true
    metrics_path: /__prometheus
    scrape_interval: 10s
    scrape_timeout: 5s
    # relabel_configs:
    #   - source_labels: [__address__]
    #     target_label: instance
    #     regex: "([^:]+)(:[0-9]+)?"
    #     replacement: "${1}"
    static_configs:
      - targets:
          - 127.0.0.1
EOF

fi
_data=$DIR/db/prometheus
mkdir -p $_data
_listen=127.0.0.1:9090
$DIR/bin/prometheus/prometheus --web.enable-admin-api --config.file=$_conf --web.listen-address="$_listen" --web.external-url http://$_listen/__internal_prometheus --web.enable-lifecycle --storage.tsdb.path $_data
