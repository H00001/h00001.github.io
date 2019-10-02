#!/bin/bash
git pull
echo "[UPDATE] auto commit update $(date +%s)" >> commit
git add *
git commit -m "commit auto $(date +%s)"
git push
