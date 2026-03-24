#!/bin/bash

# Database setup script
# This creates the MySQL database and user

set -e

echo "DocNo Database Setup"
echo "===================="
echo ""
echo "This script will create the DocNo database and user."
echo ""

# Check if mysql is installed
if ! command -v mysql &> /dev/null; then
    echo "Error: MySQL client is not installed"
    echo "Please install MySQL or use docker-compose instead"
    exit 1
fi

# Prompt for root password
echo "Enter MySQL root password:"
read -s MYSQL_ROOT_PASSWORD

# Create database and user
mysql -u root -p"$MYSQL_ROOT_PASSWORD" << EOF
CREATE DATABASE IF NOT EXISTS docgen_db;
CREATE USER IF NOT EXISTS 'docgen_user'@'localhost' IDENTIFIED BY 'docgen_password';
GRANT ALL PRIVILEGES ON docgen_db.* TO 'docgen_user'@'localhost';
FLUSH PRIVILEGES;
EOF

echo ""
echo "✓ Database and user created successfully"
echo ""
echo "Next steps:"
echo "1. Run migrations: cd backend && npm run migrate"
echo "2. Seed database: cd backend && npm run seed"
echo "3. Start backend: npm run dev"
