#!/bin/bash

if [ "x$MONGO_CONF_INIT" = "xtrue" ]; then
    echo 'run init script: docker-init.sh'
    nohup /docker-init.sh >monitor.out 2>&1 &
fi

if [ -f "${MONGO_DATA_HOME}/mongod.lock" ]; then
    rm -f ${MONGO_DATA_HOME}/mongod.lock
fi

if [ -f "${MONGO_DATA_HOME}/WiredTiger.lock" ]; then
    rm -f ${MONGO_DATA_HOME}/WiredTiger.lock
fi

#this shell main function
echo "run main: mongod"
mongod --dbpath $MONGO_DATA_HOME --replSet $MONGO_REPLSET --httpinterface --rest --directoryperdb --smallfiles --oplogSize 128