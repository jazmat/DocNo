#!/bin/bash

# DocNo Setup Script
# This script sets up the entire DocNo application

set -e

echo "=========================================="
echo "DocNo Setup Script"
echo "=========================================="
echo ""

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Step 1: Check prerequisites
echo -e "${BLUE}Checking prerequisites...${NC}"
if ! command -v node &> /dev/null; then
    echo -e "${YELLOW}Node.js is not installed. Please install Node.js 18+${NC}"
    echo "Visit: https://nodejs.org/"
    exit 1
fi
echo -e "${GREEN}✓ Node.js $(node --version)${NC}"

if ! command -v npm &> /dev/null; then
    echo -e "${YELLOW}npm is not installed${NC}"
    exit 1
fi
echo -e "${GREEN}✓ npm $(npm --version)${NC}"

# Step 2: Backend setup
echo ""
echo -e "${BLUE}Step 1/7: Installing backend dependencies...${NC}"
cd "$(dirname "$0")/backend"
npm install
echo -e "${GREEN}✓ Backend dependencies installed${NC}"

# Step 3: Frontend setup
echo ""
echo -e "${BLUE}Step 2/7: Installing frontend dependencies...${NC}"
cd "$(dirname "$0")/frontend"
npm install
echo -e "${GREEN}✓ Frontend dependencies installed${NC}"

# Step 4: Create .env files
echo ""
echo -e "${BLUE}Step 3/7: Configuring environment files...${NC}"
cd "$(dirname "$0")"

if [ ! -f backend/.env ]; then
    cp backend/.env.example backend/.env
    echo -e "${GREEN}✓ Created backend/.env${NC}"
else
    echo -e "${YELLOW}backend/.env already exists${NC}"
fi

if [ ! -f frontend/.env ]; then
    cp frontend/.env.example frontend/.env
    echo -e "${GREEN}✓ Created frontend/.env${NC}"
else
    echo -e "${YELLOW}frontend/.env already exists${NC}"
fi

# Step 5: Database setup
echo ""
echo -e "${BLUE}Step 4/7: Setting up database...${NC}"
echo -e "${YELLOW}Make sure MySQL is running with these credentials:${NC}"
echo "  Host: localhost"
echo "  Port: 3306"
echo "  User: docgen_user"
echo "  Password: docgen_password"
echo ""
echo -e "${YELLOW}Run this in MySQL if database doesn't exist:${NC}"
echo "  CREATE DATABASE docgen_db;"
echo "  CREATE USER 'docgen_user'@'localhost' IDENTIFIED BY 'docgen_password';"
echo "  GRANT ALL PRIVILEGES ON docgen_db.* TO 'docgen_user'@'localhost';"
echo "  FLUSH PRIVILEGES;"
echo ""

# Step 6: Run migrations
echo -e "${BLUE}Step 5/7: Running database migrations...${NC}"
cd "$(dirname "$0")/backend"
npm run migrate
echo -e "${GREEN}✓ Migrations completed${NC}"

# Step 7: Seed database
echo ""
echo -e "${BLUE}Step 6/7: Seeding database with demo data...${NC}"
npm run seed
echo -e "${GREEN}✓ Database seeded with demo users${NC}"

# Step 8: Setup complete
echo ""
echo -e "${GREEN}=========================================="
echo "✓ Setup Complete!"
echo "==========================================${NC}"
echo ""
echo -e "${BLUE}Demo Credentials:${NC}"
echo "  Email: admin@company.com"
echo "  Password: Admin@123"
echo ""
echo -e "${BLUE}Next steps - Start the servers:${NC}"
echo "  Terminal 1 (Backend):"
echo "    cd backend && npm run dev"
echo ""
echo "  Terminal 2 (Frontend):"
echo "    cd frontend && npm run dev"
echo ""
echo -e "${BLUE}Then open browser:${NC}"
echo "  http://localhost:3001"
echo ""
echo -e "${YELLOW}Note: Make sure MySQL is running before starting the backend${NC}"
echo ""
