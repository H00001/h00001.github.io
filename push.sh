#!/bin/bash
git pull
git add *
git commit -m "commit auto `date +%s`"
git push
