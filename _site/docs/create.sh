#!/bin/bash
if [ -s $1 ]; then
	echo "please input file name"
	exit
fi
if [ -s $2 ]; then
	echo "please input title"
	exit
fi
sed "s/__name__/$1/g" template.html > $1.html
# need to update [20200510]
