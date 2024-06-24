#!/bin/sh
DIR=$(realpath $(dirname $0)/..)
mkdir -p $DIR/db/minio
MINIO=$DIR/bin/minio/minio
cd $DIR/db/minio
_data=$DIR/db/minio
mkdir -p $_data
MINIO_ACCESS_KEY=admin \
MINIO_SECRET_KEY=minioadmin \
$MINIO server --address ':9000' --console-address ':9001' $_data
