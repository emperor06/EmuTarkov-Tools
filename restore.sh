#!/bin/bash
if [ ! -d "saves" ]; then
  mkdir -p saves
fi

# backup first before restoring, to avoid frustrations
tar cJf "saves/special.tar.xz" -C ./user/profiles/ 1

# now restore the most recent backup
# let's not sort by -t (date), but by name since backups are timestamped
BAK="$(ls -1 saves/backup*.tar.xz | sort -r | head -n1)"
FILE="${BAK##*/}"
tar xJf "saves/$FILE" -C ./user/profiles/
