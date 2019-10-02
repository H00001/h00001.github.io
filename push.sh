#!/bin/bash
echo "update `date +%s`">> commit
git add *
git commit -m "commit auto `date +%s`"
git push
