#!/bin/bash
if [ ! -d "saves" ]; then
  mkdir -p saves
fi

tar cJf "saves/backup_$(date '+%Y-%m-%d-%H%M').tar.xz" -C ./user/profiles/ 1
