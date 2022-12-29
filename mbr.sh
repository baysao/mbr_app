#!/bin/sh
DIR=$(realpath $(dirname $0))
case $1 in
    run)
	docker run --rm -d --privileged -v $DIR/mbr_gbc:/tmp/gbc -v $DIR/mbr_app:/tmp/app --name mbr_app -p 80:80 -p 443:443 baysao/openresty:alpine /tmp/gbc/prepare_alpine.sh /tmp/app
	docker ps
	;;

    reload)
	docker exec -it mbr_app /tmp/app/cmd_server _update
	docker exec -it mbr_app /tmp/app/cmd_server status
	;;
esac

       
    
