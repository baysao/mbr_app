#!/bin/sh
DIR=$(realpath $(dirname $0)/..)
GRAFANA=$DIR/bin/grafana
GRAFANA_DB=$DIR/db/grafana
mkdir -p $GRAFANA_DB
_conf=$GRAFANA_DB/defaults.ini
if [ ! -f "$_conf" ]; then
    _tmp=$(echo $GRAFANA_DB | sed 's/\//\\\//g')
    sed "s/^data = data/data = $_tmp/g" $GRAFANA/conf/defaults.ini > $_conf
    sed 's/^http_port = 3000/http_port = 44444/' -i $_conf
    sed 's/^serve_from_sub_path = false/serve_from_sub_path = true/' -i $_conf
    sed 's/^root_url/#root_url/' -i $_conf
    sed '/^#root_url/ a root_url = %(protocol)s://%(domain)s:%(http_port)s/__internal_grafana/' -i $_conf
fi

$GRAFANA/bin/grafana-server -config $_conf -homepath $GRAFANA
