#!/bin/bash
dir=$(dirname $(realpath $0))
_install() {
	apt update
	#apt-add-repository ppa:certbot/certbot
	apt install -y certbot
	# wget https://github.com/joohoi/acme-dns-certbot-joohoi/raw/master/acme-dns-auth.py
	##!/usr/bin/env python3
	chmod +x $dir/acme-dns-auth.py
	cp $dir/acme-dns-auth.py /etc/letsencrypt/
}
_get() {
	domain=$1
	email=product@massbit.io
	mkdir -p /tmp/ssl
	certbot certonly --non-interactive --agree-tos -m $email --manual --manual-auth-hook /etc/letsencrypt/acme-dns-auth.py --manual-public-ip-logging-ok --preferred-challenges dns --debug-challenges -d \*.$domain -d $domain >/tmp/ssl/$domain
}
$@
