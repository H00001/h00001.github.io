#!/bin/bash
git pull origin master  --allow-unrelated-histories	
echo "[UPDATE] auto commit update $(date +%s)" >> commit
git add *
git commit -m "commit auto $(date +%s)"
git push origin master

