#!/usr/bin/env bash
dir="./library-book"
library="./data/library"

cp ${library} ${library}.bak
function findByDirectory() {
    now="$(ls $1)"
    for name in ${now}
    do
        next="${1}/$name"
        if [[ -d ${next} ]]; then
            findByDirectory ${next}
        else
            echo "{\"name\":\"${name}\",\"url\":\"${next}\",\"type\":0}," >> "$library"
        fi
    done
}
echo "[" > "$library"
findByDirectory "${dir}"
echo "]" >> "$library"
cmp ${library} ${library}.bak
