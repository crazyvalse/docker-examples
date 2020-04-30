#!/bin/bash
_js_escape() {
    jq --null-input --arg 'str' "$1" '$str'
}

mongo=( mongo --host ${master_host} --port ${master_port} --quiet )
