#!/bin/sh
DIR=$(realpath $(dirname $0)/..)
mkdir -p $DIR/db/promtail
PROMTAIL=$DIR/bin/loki/promtail
cd $DIR/db/promtail
_conf=$DIR/db/promtail/config.yml
if [ ! -f "$_conf" ]; then
    cat >$_conf <<EOF
server:
  http_listen_port: 9080
  grpc_listen_port: 0

positions:
  filename: $DIR/db/promtail/positions.yaml

clients:
  - url: http://127.0.0.1:3100

scrape_configs:
- job_name: system
  static_configs:
  - targets:
      - localhost
    labels:
      job: varlogs
      __path__: $DIR/logs/*massbitroute.com.log
  pipeline_stages:
  - json:
      expressions:
        time: time_iso8601
        status:
        response_time: request_time 
        request_body:
        response_body:
  - json:
      expressions:
              method:
        json_rpc_id: id
      source: request_body
  - json:
      source: response_body
      expressions:
        error_code: error.code
  - template:
      source: error_code
      template: '{{add .error_code 100000}}'
  - pack:
      labels:
        - method
        - status
        - response_time
        - time
        - json_rpc_id
        - error_code
  - timestamp:
      format: RFC3339
      source: time
EOF

fi
_data=$DIR/db/promtail
mkdir -p $_data
$PROMTAIL --config.file=$_conf
