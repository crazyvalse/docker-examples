#!/bin/sh

file = "/Users/CodingNutsZac/Documents/github/docker-examples/mongodb/test/11/data/mongodbml/master/WiredTiger.lock"
if [ -e $file ]
then
   echo "文件为普通文件"
else
   echo "文件为特殊文件"
fi
