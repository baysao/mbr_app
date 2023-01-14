#!/bin/sh
DIR=$(realpath $(dirname $0))
if [ $# -eq 0 ]; then
	git clone https://github.com/massbitprotocol/mbr_gbc.git -b release
	#	git clone git@github.com:massbitprotocol/mbr_gbc.git -b release
	git clone https://github.com/massbitprotocol/mbr_app.git -b release
	#	git clone git@github.com:massbitprotocol/mbr_app.git -b release
	cp mbr_app/mbr.sh .
	exit 0
fi

case $1 in
install_docker)
	curl -fsSL https://get.docker.com | bash
	;;
diff)
	dirty=0
	git -C mbr_app fetch
	git -C mbr_app diff --quiet release origin/release
	if [ $? -ne 0 ]; then
	    dirty=1
	    git -C mbr_app pull
	fi
	git -C mbr_gbc fetch
	git -C mbr_gbc diff --quiet release origin/release
	if [ $? -ne 0 ]; then
	    dirty=1
	    git -C mbr_gbc pull
	fi
	exit $dirty
	;;
check_update)
    $0 diff
    if [ $? -ne 0 ];then
       $0 reload
    fi
    ;;
update)
	git -C mbr_gbc pull
	git -C mbr_app pull
	;;
run)
	docker run --rm -d --privileged -v $DIR/mbr_gbc:/tmp/gbc -v $DIR/mbr_app:/tmp/app --name mbr_app -p 80:80 -p 443:443 baysao/openresty:alpine /tmp/gbc/prepare_alpine.sh /tmp/app
	docker ps
	;;

reload)
	docker exec -it mbr_app /tmp/app/cmd_server _update
#	docker exec -it mbr_app /tmp/app/cmd_server update
	docker exec -it mbr_app /tmp/app/cmd_server status
	;;

cmd)
    shift
	docker exec -it mbr_app /tmp/app/cmd_server $@
	docker exec -it mbr_app /tmp/app/cmd_server status
	;;
esac
