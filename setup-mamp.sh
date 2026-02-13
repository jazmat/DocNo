#!/bin/bash

# MAMP Setup Script for DocNo on macOS
# This script sets up DocNo to work with MAMP MySQL

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "========================================"
echo "DocNo - MAMP Local Development Setup"
echo "========================================"
echo -e "${NC}"

# Check if we're on macOS
if [[ "$OSTYPE" != "darwin"* ]]; then
    echo -e "${RED}❌ This script is designed for macOS with MAMP${NC}"
    exit 1
fi

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo -e "${RED}❌ Node.js is not installed${NC}"
    echo "Please install Node.js from https://nodejs.org/"
    exit 1
fi

echo -e "${GREEN}✅ Node.js $(node --version) detected${NC}"

# Check if MAMP is installed
MAMP_PATH="/Applications/MAMP/Library/bin/mysql"
if [[ ! -f "$MAMP_PATH" ]]; then
    echo -e "${RED}❌ MAMP not found at /Applications/MAMP/${NC}"
    echo "Please install MAMP from https://www.mamp.info/"
    exit 1
fi

echo -e "${GREEN}✅ MAMP installation detected${NC}"

# Test MAMP MySQL connection
echo -e "${YELLOW}🔍 Testing MAMP MySQL connection...${NC}"
if ! $MAMP_PATH -h localhost -P 8889 -u root -proot -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}❌ Cannot connect to MAMP MySQL${NC}"
    echo "Please ensure:"
    echo "1. MAMP is running"
    echo "2. MySQL server is started in MAMP"
    echo "3. MySQL is running on port 8889"
    echo "4. Default credentials are root/root"
    exit 1
fi

echo -e "${GREEN}✅ MAMP MySQL connection successful${NC}"

# Navigate to project directory
cd "$(dirname "$0")"

echo -e "${YELLOW}📦 Installing dependencies...${NC}"

# Install backend dependencies
echo "Installing backend dependencies..."
cd backend
npm install --silent

# Install frontend dependencies
echo "Installing frontend dependencies..."
cd ../frontend
npm install --silent
cd ..

echo -e "${GREEN}✅ Dependencies installed${NC}"

# Create backend .env file for MAMP
echo -e "${YELLOW}⚙️  Creating environment configuration...${NC}"

cat > backend/.env << 'EOF'
# Development Environment for MAMP
NODE_ENV=development

# Database Configuration (MAMP MySQL)
DB_HOST=localhost
DB_PORT=8889
DB_NAME=docgen_db
DB_USER=root
DB_PASSWORD=root

# JWT Configuration (Development - 32+ chars)
JWT_SECRET=dev_jwt_secret_key_for_local_development_only_change_for_production_use

# JWT Token Expiry
JWT_EXPIRY=24h

# Email Configuration (Optional for development)
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password

# Application URL
APP_URL=http://localhost:3001

# CORS Origins
ALLOWED_ORIGINS=http://localhost:3001,http://localhost:3000

# Rate Limiting (requests per window)
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100
EOF

echo -e "${GREEN}✅ Environment configuration created${NC}"

# Create database
echo -e "${YELLOW}🗄️  Setting up database...${NC}"

$MAMP_PATH -h localhost -P 8889 -u root -proot << 'EOF'
CREATE DATABASE IF NOT EXISTS docgen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
EOF

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Database 'docgen_db' created${NC}"
else
    echo -e "${RED}❌ Failed to create database${NC}"
    exit 1
fi

# Run database migrations
echo -e "${YELLOW}🔄 Running database migrations...${NC}"
cd backend
if npm run migrate > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database migrations completed${NC}"
else
    echo -e "${RED}❌ Database migrations failed${NC}"
    echo "Please check the error above and try running 'npm run migrate' manually"
    exit 1
fi

# Seed database with demo data
echo -e "${YELLOW}🌱 Seeding database with demo data...${NC}"
if npm run seed > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Database seeded with demo users${NC}"
else
    echo -e "${YELLOW}⚠️  Database seeding failed - you can run 'npm run seed' manually later${NC}"
fi

cd ..

# Create start script if it doesn't exist
if [[ ! -f "start-dev.sh" ]]; then
    cat > start-dev.sh << 'EOF'
#!/bin/bash

# Start DocNo development servers
echo "Starting DocNo development servers..."

# Function to cleanup background processes
cleanup() {
    echo "Stopping servers..."
    kill $BACKEND_PID $FRONTEND_PID 2>/dev/null
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Start backend in background
echo "Starting backend server on http://localhost:3000..."
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 3

# Start frontend in background
echo "Starting frontend server on http://localhost:3001..."
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo "✅ Servers started!"
echo "📱 Frontend: http://localhost:3001"
echo "🔧 Backend API: http://localhost:3000"
echo "📊 MAMP phpMyAdmin: http://localhost:8888/phpMyAdmin/"
echo ""
echo "Demo Login Credentials:"
echo "👤 Email: admin@company.com"
echo "🔑 Password: Admin@123"
echo ""
echo "Press Ctrl+C to stop all servers"

# Wait for background processes
wait
EOF

    chmod +x start-dev.sh
fi

# Test backend configuration
echo -e "${YELLOW}🧪 Testing backend configuration...${NC}"
cd backend

# Test database connection
node -e "
const db = require('./config/database');
db.authenticate()
  .then(() => {
    console.log('✅ Database connection successful');
    process.exit(0);
  })
  .catch(err => {
    console.error('❌ Database connection failed:', err.message);
    process.exit(1);
  });
" 2>/dev/null

if [ $? -eq 0 ]; then
    echo -e "${GREEN}✅ Backend configuration valid${NC}"
else
    echo -e "${RED}❌ Backend configuration test failed${NC}"
fi

cd ..

# Success message
echo -e "${GREEN}"
echo "========================================"
echo "🎉 MAMP Setup Complete!"
echo "========================================"
echo -e "${NC}"
echo ""
echo -e "${BLUE}📋 What's been set up:${NC}"
echo "✅ Node.js dependencies installed"
echo "✅ MAMP MySQL database created"
echo "✅ Environment variables configured"
echo "✅ Database migrations completed"
echo "✅ Demo users seeded"
echo ""
echo -e "${BLUE}🚀 To start development:${NC}"
echo ""
echo -e "${GREEN}./start-dev.sh${NC}"
echo ""
echo "Or manually:"
echo "Terminal 1: ${GREEN}cd backend && npm run dev${NC}"
echo "Terminal 2: ${GREEN}cd frontend && npm run dev${NC}"
echo ""
echo -e "${BLUE}🌐 Access points:${NC}"
echo "Frontend:      ${GREEN}http://localhost:3001${NC}"
echo "Backend API:   ${GREEN}http://localhost:3000${NC}"
echo "phpMyAdmin:    ${GREEN}http://localhost:8888/phpMyAdmin/${NC}"
echo ""
echo -e "${BLUE}🔐 Demo credentials:${NC}"
echo "Email:    ${GREEN}admin@company.com${NC}"
echo "Password: ${GREEN}Admin@123${NC}"
echo ""
echo -e "${BLUE}📚 Next steps:${NC}"
echo "1. Run the start command above"
echo "2. Open http://localhost:3001 in your browser"
echo "3. Login with demo credentials"
echo "4. Generate your first document number!"
echo ""
echo -e "${BLUE}📖 Documentation:${NC}"
echo "• MAMP_LOCAL_SETUP.md  - Detailed setup guide"
echo "• README.md            - Project overview"
echo "• DEVELOPMENT.md       - Development workflows"
echo ""
echo -e "${YELLOW}💡 Tip: Keep MAMP running while developing!${NC}"
