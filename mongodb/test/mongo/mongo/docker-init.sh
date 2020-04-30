#!/bin/bash
# MONGO_SERVERS=172.19.57.79:27017,172.19.57.66:27017,172.19.57.73:27017
servers=${MONGO_SERVERS//,/ }
master_host=127.0.0.1
master_port=27017
server_count=0
export PATH=$PATH:./

echo "----------------$$$$$$$$$$$$$$$$$$ $servers"

function cluster_init {
    sleep 10
    mongo --eval "printjson(rs.initiate())"
    for server in $servers; do
        mongo --eval "printjson(rs.add('${server}'))"
        sleep 5
    done

    sleep 10
    find_master
}

function cluster_reconfig {
    server_update_count=$server_count
    server_add_count=0
    server_del_count=0
    server_cur_count=$(mongo --host ${master_host} --port ${master_port} --eval "printjson(rs.config());" | grep host | wc -l )
    if [ $server_count -eq $server_cur_count ]; then
        echo "eq: $server_count"
    fi
    if [ $server_count -lt $server_cur_count ]; then
        ((server_del_count=$server_cur_count - $server_count))
        echo "lt: new=$server_count, old=$server_cur_count"
    fi
    if [ $server_count -gt $server_cur_count ]; then
        server_update_count=$server_cur_count
        ((server_add_count=$server_count - $server_cur_count))
        echo "gt: new=$server_count, old=$server_cur_count"
    fi

    config_script="var config=rs.config();";
    config_add_script="";
    update_cursor=0
    for server in $servers; do
        if [ $update_cursor -ge $server_update_count ]; then
            config_add_script="$config_add_script rs.add(\"${server}\");"
        else
            config_script="$config_script config.members[$update_cursor].host = \"$server\";"
        fi

        ((update_cursor=$update_cursor + 1))
    done

    if [ $server_del_count -gt 0 ]; then
        ((cursor=$server_cur_count - $server_del_count))
        config_script="$config_script config.members.splice($cursor, $server_del_count);"
    fi

    config_script="$config_script rs.reconfig(config, {\"force\":true});"
    config_script="$config_script $config_add_script"
    #config=$(mongo --host ${master_host} --port ${master_port} --eval "printjson(rs.config());")
    #echo "$config_script"
    mongo --host ${master_host} --port ${master_port} --eval "$config_script"

    sleep 10
    find_master
}

function collection_init {
    mongo=( mongo --host ${master_host} --port ${master_port} --quiet )
    echo
    for f in /docker-entrypoint-initdb.d/*; do
        case "$f" in
            *.sh) echo "$0: running $f"; . "$f" ;;
            *.js) echo "$0: running $f"; "${mongo[@]}" "$f"; echo ;;
            *)    echo "$0: ignoring $f" ;;
        esac
        echo
    done
}

function find_master {
    for server in $servers; do
        server=${server//:/ }
        server=($server)

        IS_MASTER=$(mongo --host ${server[0]} --port ${server[1]} --eval "printjson(db.isMaster())" | grep 'ismaster')
        if echo $IS_MASTER | grep "true"; then
            master_host=${server[0]}
            master_port=${server[1]}
            export master_host
            export master_port
            return 0
        fi
    done

    return 1
}

tries=300
while true; do
    success="true"
    server_count=0
    for server in $servers; do
        server=${server//:/ }
        server=($server)
        mongo=( mongo --host ${server[0]} --port ${server[1]} --quiet )
        if "${mongo[@]}" 'admin' --eval 'quit(0)' &> /dev/null; then
            echo "${server[0]}:${server[1]} connected!"
        else
            echo "${server[0]}:${server[1]} connect fail!"
            success="false"
        fi
        ((server_count=$server_count+1))
    done

    if [ "x$success" = "xtrue" ]; then
        break
    fi

    (( tries-- ))
    if [ "$tries" -le 0 ]; then
        echo >&2
        echo >&2 "error: $originalArgOne does not appear to have accepted connections quickly enough -- perhaps it had an error?"
        echo >&2
        exit 1
    fi
    sleep 2
done

echo "find server count: ${server_count}"
echo 'wait 5s, then find master...'
sleep 3
find_master
if [ $? -eq 0 ]; then
    echo "Find Master: ${master_host}:${master_port}"
    cluster_reconfig
else
    echo 'Initiating the cluster!'
    cluster_init
    cluster_reconfig
fi
sleep 2
find_master
collection_init
