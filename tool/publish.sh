#!/usr/bin/env bash

ver=`cat package.json | json version`

echo -n "input new version($ver): "
read ver

cat package.json | json -e "this.version = \"$ver\"" > package.json.tmp
echo "New package.json look likes:"
cat package.json.tmp
echo -n "Is ok for you? (no): "
read ret
if [[ "$ret" != "yes" ]]; then
    rm package.json.tmp
    exit 0
fi

mv package.json.tmp package.json
npm --registry http://192.168.0.102:5984/ publish
