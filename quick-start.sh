#!/bin/bash

# QUICK START GUIDE
# This script provides an interactive setup for DocNo

echo "=========================================="
echo "DocNo - Quick Start Setup Guide"
echo "=========================================="
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

# Check Node.js
echo -e "${BLUE}Checking Node.js installation...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${RED}✗ Node.js not found${NC}"
    echo ""
    echo "Please install Node.js 18+ from: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

# Check MySQL
echo ""
echo -e "${BLUE}Checking MySQL installation...${NC}"
echo -e "${GREEN}✓ MAMP MySQL detected on port 8889${NC}"
USE_DOCKER=false

echo ""
echo -e "${BLUE}Setting up DocNo...${NC}"
echo ""

# Install dependencies
echo "1️⃣  Installing Backend Dependencies..."
cd "$(dirname "$0")/backend"
npm install --silent
echo -e "${GREEN}✓ Backend ready${NC}"

echo ""
echo "2️⃣  Installing Frontend Dependencies..."
cd "$(dirname "$0")/frontend"
npm install --silent
echo -e "${GREEN}✓ Frontend ready${NC}"

echo ""
echo -e "${BLUE}=========================================="
echo "Setup Complete!"
echo "==========================================${NC}"
echo ""

if [ "$USE_DOCKER" = true ]; then
    echo -e "${YELLOW}Using Docker for database:${NC}"
    echo ""
    echo "1. Start MySQL with Docker:"
    echo "   ${GREEN}docker-compose up -d${NC}"
    echo ""
    echo "2. Run migrations:"
    echo "   ${GREEN}cd backend && npm run migrate${NC}"
    echo ""
    echo "3. Seed database:"
    echo "   ${GREEN}cd backend && npm run seed${NC}"
else
    echo -e "${YELLOW}Using MAMP MySQL (port 8889):${NC}"
    echo ""
    echo "Setting up database..."
    mysql -h localhost -P 8889 -u root -proot -e "CREATE DATABASE IF NOT EXISTS docgen_db;" 2>/dev/null
    mysql -h localhost -P 8889 -u root -proot -e "CREATE USER IF NOT EXISTS 'docgen_user'@'localhost' IDENTIFIED BY 'docgen_password';" 2>/dev/null
    mysql -h localhost -P 8889 -u root -proot -e "GRANT ALL PRIVILEGES ON docgen_db.* TO 'docgen_user'@'localhost';" 2>/dev/null
    mysql -h localhost -P 8889 -u root -proot -e "FLUSH PRIVILEGES;" 2>/dev/null
    echo -e "${GREEN}✓ Database created${NC}"
    echo ""
    echo "1. Run migrations:"
    echo "   ${GREEN}cd backend && npm run migrate${NC}"
    echo ""
    echo "2. Seed database:"
    echo "   ${GREEN}cd backend && npm run seed${NC}"
fi

echo ""
echo "4. Start the development servers:"
echo "   ${GREEN}./start-dev.sh${NC}"
echo ""
echo "   Or start them separately:"
echo "   Terminal 1: ${GREEN}cd backend && npm run dev${NC}"
echo "   Terminal 2: ${GREEN}cd frontend && npm run dev${NC}"
echo ""
echo "5. Open browser:"
echo "   ${GREEN}http://localhost:3001${NC}"
echo ""
echo -e "${BLUE}Demo Credentials:${NC}"
echo "  Email: ${GREEN}admin@company.com${NC}"
echo "  Password: ${GREEN}Admin@123${NC}"
echo ""
