#!/bin/bash

DB_NAME="docno"
DB_USER="root"
DB_PASS=""

BACKUP_DIR="./backups"

DATE=$(date +"%Y-%m-%d_%H-%M")

FILE="$BACKUP_DIR/docno_$DATE.sql"

mkdir -p $BACKUP_DIR

echo "Starting backup..."

mysqldump \
--single-transaction \
--routines \
--triggers \
-u $DB_USER \
-p$DB_PASS \
$DB_NAME > $FILE

echo "Backup saved to $FILE"