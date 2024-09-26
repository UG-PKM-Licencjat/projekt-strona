#!/bin/bash
set -e
chmod +x /docker-entrypoint-initdb.d/dump.sql
# Wykonaj skrypt SQL
psql -U postgres -d postgres -f dump.sql
