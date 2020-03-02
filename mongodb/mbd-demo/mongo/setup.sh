#!/bin/bash
_js_escape() {
    jq --null-input --arg 'str' "$1" '$str'
}

mongo=( mongo --host ${master_host} --port ${master_port} --quiet )
MONGO_INITDB_DATABASE="mbd_data"
"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_compare_docs.createIndex({"ID" : -1},{"name":"INDEX_ID", "background": true})
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_compare_docs.createIndex({"PUBDATE" : -1,"COMPARESERVER" : 1,"LASTMODIFIED" : -1},{"name":"INDEX_PUBDATE_COMPARESERVER_LASTMODIFIED", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_compare_docs.createIndex({"EXPIRETIME" : -1},{"name":"INDEX_EXPIRETIME","expireAfterSeconds":0,"background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_compete_docs.createIndex({"ID" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_compete_docs.createIndex({"PUBDATE" : -1,"LASTMODIFIED" : -1},{"name":"INDEX_PUBDATE_LASTMODIFIED", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_compete_docs.createIndex({"EXPIRETIME" : -1},{"name":"INDEX_EXPIRETIME", "expireAfterSeconds":0,"background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_importantcolumn_list.createIndex({"COLUMNID" : 1, "ID" : 1},{"name":"INDEX_COLUMNID_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_importantcolumn_list.createIndex({"OFFLINETIME" : 1},{"name":"INDEX_OFFLINETIME", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.mbd_importantcolumn_list.createIndex({"EXPIRETIME" : -1},{"name":"INDEX_EXPIRETIME","expireAfterSeconds":0,"background": true});
EOJS

MONGO_INITDB_DATABASE="mbd_main"
"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.compare_article.createIndex({"id" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.compare_article.createIndex({"ptime" : -1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":604800, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.compare_articleIC.createIndex({"id" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.compare_articleKPI.createIndex({"id" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.compare_compete.createIndex({"id" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.compare_similar.createIndex({"id" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.compare_similar.createIndex({"a_ptime" : -1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":604800, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.hot_news.createIndex({"ID" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.hot_news.createIndex({"PROVINCEID" : -1},{"name":"INDEX_PROVINCEID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.hot_news.createIndex({"MBD_TOPICTYPE" : -1},{"name":"INDEX_MBD_TOPICTYPE", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.hot_news.createIndex({"MBD_CREATE_DATE" : -1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":2592000, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.hot_news_current.createIndex({"ID" : -1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.hot_news_current.createIndex({"PROVINCEID" : -1},{"name":"INDEX_PROVINCEID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.hot_news_current.createIndex({"MBD_TOPICTYPE" : -1},{"name":"INDEX_MBD_TOPICTYPE", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_doc.createIndex({"PUBDATE" : -1},{"name":"INDEX_PUBDATE", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_doc.createIndex({"ID" : 1, "CHANNELID" : -1},{"name":"INDEX_ID_CHANNELID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_doc.createIndex({"SOURCE" : 1, "CHANNEL" : 1},{"name":"INDEX_SOURCE_CHANNEL", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_doc.createIndex({"CREATED" : 1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":2592000, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_list.createIndex({"ID" : 1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_list.createIndex({"SNAPSHOTTIME" : 1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":2592000, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_list_snapshot.createIndex({"ID" : 1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_list_snapshot.createIndex({"CHANNELID" : 1, "SNAPSHOTTIME" : -1},{"name":"INDEX_SNAPSHOTTIME_CHANNELID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.ic_list_snapshot.createIndex({"SNAPSHOTTIME" : 1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":2592000, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.rank_list.createIndex({"mbd_rank_hash" : 1},{"name":"mbd_rank_hash_1", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.rank_list.createIndex({"mbd_rank_id" : 1},{"name":"mbd_rank_id_1", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.rank_list.createIndex({"mbd_timestamp" : 1},{"name":"mbd_timestamp_-1", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.rank_list.createIndex({"mbd_date" : 1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":2592000, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.special_doc.createIndex({"PUBDATE" : 1},{"name":"INDEX_EXPIRE", "expireAfterSeconds":2592000, "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.main_doc.createIndex({"ID" : 1},{"name":"INDEX_ID", "background": true});
EOJS

"${mongo[@]}" "$MONGO_INITDB_DATABASE" <<-EOJS
    db.main_doc.createIndex({"EXPIRETIME" : 1},{"name":"INDEX_EXPIRETIME", "expireAfterSeconds":2592000, "background": true});
EOJS