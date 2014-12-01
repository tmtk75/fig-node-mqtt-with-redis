## pub/sub
sub:
	node sub.js mqtt://`boot2docker ip 2>/dev/null`:1883

pub:
	node pub.js mqtt://`boot2docker ip 2>/dev/null`:2883

run:
	fig up

##
redis-cli:
	redis-cli -h `boot2docker ip 2>/dev/null`

docker-exec:
	docker exec -it nodemqtt_redisslave_1 /bin/bash

## flow
# http://ics-web.jp/lab/archives/3611
compile:
	jsx --strip-types --harmony src build

check:
	flow check
