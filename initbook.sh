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
            echo ${next} >> "$library"
        fi
    done
}
echo "SYSTEM INIT DATA TIME:$(date)" > "$library"
findByDirectory "${dir}"
cmp ${library} ${library}.bak
