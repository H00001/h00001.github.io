#!/bin/bash
git add *
git pull
echo "[UPDATE] auto commit update $(date +%s)" >> commit
git commit -m "commit auto $(date +%s)"
git push
