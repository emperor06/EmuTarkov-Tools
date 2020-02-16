#!/bin/bash
function move() {
  FILE="$1"
  DIR=$(dirname "$FILE")
  ID=$(sed -n 's/.*"Id": "\(.*\)".*/\1/ p' "$FILE")
  grep '"IsStatic": true' "$FILE" >/dev/null
  if [ $? -eq 0 ]; then
    mkdir -p "$DIR/Static/$ID"
    mv "$FILE" "$DIR/Static/$ID/"
  else
    mkdir -p "$DIR/Dynamic/$ID"
    mv "$FILE" "$DIR/Dynamic/$ID/"
  fi  
}

FOLDER="$1"
export -f move
find "$FOLDER" -maxdepth 1 -iname "*.json" -exec bash -c 'move "{}"' \;
