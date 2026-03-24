#!/bin/bash

echo "--------------------------------------"
echo " DocNo Project Cleanup (SAFE MODE)"
echo "--------------------------------------"

DOCNO_ROOT=$(pwd)

echo ""
echo "Project root:"
echo $DOCNO_ROOT

echo ""
echo "The following items are marked as redundant:"
echo ""

TARGETS=(
"./Chat Customization Diagnostics.md"
"./000-fix-mamp-and-race.patch"
"./apply-fixes.js"

"./backend/config"
"./backend/environment"
"./backend/logs"
"./backend/migrations"
"./backend/models"
"./backend/routes"
"./backend/seeders"
"./backend/utils"

"./backend/test-server.js"
"./backend/bootstrap-deps.js"
"./backend/Dockerfile"
)

for item in "${TARGETS[@]}"
do
  if [ -e "$item" ]; then
    echo "FOUND: $item"
  else
    echo "SKIP:  $item (not present)"
  fi
done

echo ""
echo "--------------------------------------"
echo "This was a DRY RUN."
echo "Nothing was deleted."
echo "--------------------------------------"
echo ""

read -p "Proceed with deletion? (type YES to continue): " CONFIRM

if [ "$CONFIRM" != "YES" ]; then
  echo "Cleanup aborted."
  exit 1
fi

echo ""
echo "Deleting redundant files..."

for item in "${TARGETS[@]}"
do
  if [ -e "$item" ]; then
    rm -rf "$item"
    echo "DELETED: $item"
  fi
done

echo ""
echo "Cleanup complete."
echo "--------------------------------------"