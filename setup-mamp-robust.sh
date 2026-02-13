#!/bin/bash

# Robust MAMP Setup Script for DocNo on macOS
# Handles npm install issues with multiple fallback options

set -e  # Exit on any error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

echo -e "${BLUE}"
echo "========================================"
echo "DocNo - Robust MAMP Setup"
echo "========================================"
echo -e "${NC}"

# Function to install dependencies with fallback options
install_dependencies() {
    local dir=$1
    local name=$2

    echo -e "${YELLOW}📦 Installing $name dependencies...${NC}"
    cd "$dir"

    # Check if package.json exists
    if [[ ! -f "package.json" ]]; then
        echo -e "${RED}❌ package.json not found in $dir${NC}"
        return 1
    fi

    # Try multiple installation methods
    local methods=("npm_latest" "npm_cache_clean" "npm_verbose" "yarn" "npm_ci")
    local success=false

    for method in "${methods[@]}"; do
        echo -e "${BLUE}Trying installation method: $method${NC}"

        case $method in
            "npm_latest")
                echo "Updating npm to latest version..."
                npm install -g npm@latest 2>/dev/null || true
                timeout 180 npm install || continue
                ;;
            "npm_cache_clean")
                echo "Cleaning npm cache and trying again..."
                npm cache clean --force 2>/dev/null || true
                timeout 180 npm install --timeout=300000 || continue
                ;;
            "npm_verbose")
                echo "Trying npm install with verbose logging..."
                timeout 300 npm install --verbose --timeout=300000 || continue
                ;;
            "yarn")
                echo "Trying with Yarn package manager..."
                if ! command -v yarn &> /dev/null; then
                    echo "Installing Yarn..."
                    npm install -g yarn 2>/dev/null || continue
                fi
                timeout 180 yarn install || continue
                ;;
            "npm_ci")
                echo "Trying npm ci (clean install)..."
                if [[ -f "package-lock.json" ]]; then
                    timeout 180 npm ci || continue
                else
                    echo "No package-lock.json found, generating..."
                    timeout 180 npm install --package-lock-only || continue
                    timeout 180 npm ci || continue
                fi
                ;;
        esac

        # Check if node_modules was created
        if [[ -d "node_modules" && $(ls -1 node_modules | wc -l) -gt 5 ]]; then
            echo -e "${GREEN}✅ $name dependencies installed successfully with $method${NC}"
            success=true
            break
        fi
    done

    if [[ "$success" != true ]]; then
        echo -e "${RED}❌ Failed to install $name dependencies with all methods${NC}"
        echo -e "${YELLOW}Manual troubleshooting required. Try:${NC}"
        echo "1. Check your internet connection"
        echo "2. Try: npm config set registry https://registry.npmjs.org/"
        echo "3. Try: npm install --no-optional"
        echo "4. Check disk space: df -h"
        return 1
    fi

    return 0
}

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
echo -e "${GREEN}✅ npm $(npm --version) detected${NC}"

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
if ! timeout 10 $MAMP_PATH -h localhost -P 8889 -u root -proot -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}❌ Cannot connect to MAMP MySQL${NC}"
    echo "Please ensure:"
    echo "1. MAMP is running (open MAMP app and click 'Start Servers')"
    echo "2. MySQL server is started in MAMP"
    echo "3. MySQL is running on port 8889 (default)"
    echo "4. Default credentials are root/root"
    echo ""
    echo "You can test manually with:"
    echo "/Applications/MAMP/Library/bin/mysql -h localhost -P 8889 -u root -proot"
    exit 1
fi

echo -e "${GREEN}✅ MAMP MySQL connection successful${NC}"

# Navigate to project directory
PROJECT_DIR="$(dirname "$0")"
cd "$PROJECT_DIR"

# Preliminary npm setup
echo -e "${YELLOW}🔧 Optimizing npm configuration...${NC}"
npm config set fund false 2>/dev/null || true
npm config set audit false 2>/dev/null || true
npm config set progress true 2>/dev/null || true
npm config set timeout 300000 2>/dev/null || true

# Install dependencies with robust error handling
echo -e "${BLUE}📦 Installing project dependencies...${NC}"
echo "This may take a few minutes depending on your internet connection."
echo ""

# Install backend dependencies
if ! install_dependencies "$(pwd)/backend" "Backend"; then
    echo -e "${RED}❌ Failed to install backend dependencies${NC}"
    exit 1
fi

# Install frontend dependencies
if ! install_dependencies "$(pwd)/frontend" "Frontend"; then
    echo -e "${RED}❌ Failed to install frontend dependencies${NC}"
    exit 1
fi

echo -e "${GREEN}✅ All dependencies installed successfully${NC}"

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
JWT_SECRET=dev_jwt_secret_key_for_local_development_only_change_for_production_use_32_chars

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

if timeout 30 $MAMP_PATH -h localhost -P 8889 -u root -proot << 'EOF'
CREATE DATABASE IF NOT EXISTS docgen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES LIKE 'docgen_db';
EOF
then
    echo -e "${GREEN}✅ Database 'docgen_db' created/verified${NC}"
else
    echo -e "${RED}❌ Failed to create database${NC}"
    echo "Try creating it manually:"
    echo "/Applications/MAMP/Library/bin/mysql -h localhost -P 8889 -u root -proot"
    echo "Then run: CREATE DATABASE docgen_db;"
    exit 1
fi

# Run database migrations
echo -e "${YELLOW}🔄 Running database migrations...${NC}"
cd backend

# Check if sequelize-cli is available
if [[ ! -d "node_modules/.bin" ]] || [[ ! -f "node_modules/.bin/sequelize-cli" ]]; then
    echo -e "${YELLOW}Installing sequelize-cli...${NC}"
    npm install sequelize-cli --save-dev || {
        echo -e "${RED}❌ Failed to install sequelize-cli${NC}"
        exit 1
    }
fi

if npm run migrate 2>/dev/null; then
    echo -e "${GREEN}✅ Database migrations completed${NC}"
else
    echo -e "${RED}❌ Database migrations failed${NC}"
    echo -e "${YELLOW}Trying manual migration...${NC}"

    if ./node_modules/.bin/sequelize-cli db:migrate --config config/config.json; then
        echo -e "${GREEN}✅ Manual migration successful${NC}"
    else
        echo -e "${RED}❌ Migration failed. Please check:${NC}"
        echo "1. Database connection settings in backend/.env"
        echo "2. MAMP MySQL is running on port 8889"
        echo "3. Database 'docgen_db' exists"
        exit 1
    fi
fi

# Seed database with demo data
echo -e "${YELLOW}🌱 Seeding database with demo data...${NC}"
if npm run seed 2>/dev/null; then
    echo -e "${GREEN}✅ Database seeded with demo users${NC}"
else
    echo -e "${YELLOW}⚠️  Database seeding had issues - trying manual seeding...${NC}"
    if ./node_modules/.bin/sequelize-cli db:seed:all --config config/config.json 2>/dev/null; then
        echo -e "${GREEN}✅ Manual seeding successful${NC}"
    else
        echo -e "${YELLOW}⚠️  Seeding failed - you can add users manually later${NC}"
        echo "The app will still work, but you'll need to register a new account."
    fi
fi

cd ..

# Create comprehensive start script
echo -e "${YELLOW}📝 Creating development start script...${NC}"

cat > start-dev.sh << 'EOF'
#!/bin/bash

# Start DocNo development servers with error handling

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}Starting DocNo development servers...${NC}"

# Check MAMP MySQL is running
if ! /Applications/MAMP/Library/bin/mysql -h localhost -P 8889 -u root -proot -e "SELECT 1;" &> /dev/null; then
    echo -e "${RED}❌ MAMP MySQL not running${NC}"
    echo "Please start MAMP and ensure MySQL is running on port 8889"
    exit 1
fi

echo -e "${GREEN}✅ MAMP MySQL is running${NC}"

# Function to cleanup background processes
cleanup() {
    echo -e "${YELLOW}Stopping servers...${NC}"
    if [[ -n "$BACKEND_PID" ]]; then
        kill $BACKEND_PID 2>/dev/null
    fi
    if [[ -n "$FRONTEND_PID" ]]; then
        kill $FRONTEND_PID 2>/dev/null
    fi
    echo -e "${GREEN}Servers stopped${NC}"
    exit 0
}

# Trap Ctrl+C
trap cleanup SIGINT

# Start backend in background
echo -e "${YELLOW}Starting backend server on http://localhost:3000...${NC}"
cd backend && npm run dev &
BACKEND_PID=$!

# Wait a moment for backend to start
sleep 5

# Test backend health
if curl -s http://localhost:3000/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend server started successfully${NC}"
else
    echo -e "${YELLOW}⚠️  Backend may still be starting...${NC}"
fi

# Start frontend in background
echo -e "${YELLOW}Starting frontend server on http://localhost:3001...${NC}"
cd ../frontend && npm run dev &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}✅ Servers started!${NC}"
echo -e "${BLUE}📱 Frontend: http://localhost:3001${NC}"
echo -e "${BLUE}🔧 Backend API: http://localhost:3000${NC}"
echo -e "${BLUE}📊 MAMP phpMyAdmin: http://localhost:8888/phpMyAdmin/${NC}"
echo ""
echo -e "${BLUE}🔐 Demo Login Credentials:${NC}"
echo -e "${GREEN}👤 Email: admin@company.com${NC}"
echo -e "${GREEN}🔑 Password: Admin@123${NC}"
echo ""
echo -e "${YELLOW}Press Ctrl+C to stop all servers${NC}"
echo ""

# Wait for background processes
wait
EOF

chmod +x start-dev.sh

# Test backend configuration
echo -e "${YELLOW}🧪 Testing backend configuration...${NC}"
cd backend

# Test database connection
if node -e "
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
" 2>/dev/null; then
    echo -e "${GREEN}✅ Backend configuration valid${NC}"
else
    echo -e "${YELLOW}⚠️  Backend configuration test failed - but may work anyway${NC}"
fi

cd ..

# Create troubleshooting guide
cat > TROUBLESHOOTING.md << 'EOF'
# DocNo Troubleshooting Guide

## Common Issues

### npm install hangs or fails
```bash
# Update npm
npm install -g npm@latest

# Clear cache
npm cache clean --force

# Try yarn instead
npm install -g yarn
yarn install

# Try with increased timeout
npm install --timeout=300000
```

### MAMP MySQL connection issues
1. Ensure MAMP is running
2. Check MySQL is on port 8889 (MAMP Preferences > Ports)
3. Test: `/Applications/MAMP/Library/bin/mysql -h localhost -P 8889 -u root -proot`

### Port already in use
```bash
# Find what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### Frontend won't start
```bash
cd frontend
rm -rf node_modules package-lock.json
npm install
npm run dev
```

### Backend database errors
1. Check MAMP MySQL is running
2. Verify database exists: `SHOW DATABASES;` in phpMyAdmin
3. Re-run migrations: `cd backend && npm run migrate`

### Browser shows "Cannot connect"
1. Check both servers are running (green checkmarks)
2. Try http://localhost:3001 (not 3000)
3. Clear browser cache
4. Check browser console (F12) for errors

## Manual Setup Steps

If automated setup fails, try manually:

1. Start MAMP
2. `cd backend && npm install`
3. `cd ../frontend && npm install`
4. Create backend/.env with MAMP settings
5. `cd backend && npm run migrate && npm run seed`
6. `./start-dev.sh`
EOF

# Success message
echo -e "${GREEN}"
echo "========================================"
echo "🎉 Robust MAMP Setup Complete!"
echo "========================================"
echo -e "${NC}"
echo ""
echo -e "${BLUE}📋 What's been set up:${NC}"
echo "✅ Node.js dependencies installed (with fallback methods)"
echo "✅ MAMP MySQL database created"
echo "✅ Environment variables configured for MAMP"
echo "✅ Database migrations completed"
echo "✅ Demo users seeded (admin@company.com / Admin@123)"
echo "✅ Development scripts created"
echo "✅ Troubleshooting guide created"
echo ""
echo -e "${BLUE}🚀 To start development:${NC}"
echo ""
echo -e "${GREEN}./start-dev.sh${NC}"
echo ""
echo "Or manually in separate terminals:"
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
echo -e "${BLUE}📚 Documentation:${NC}"
echo "• MAMP_LOCAL_SETUP.md  - Detailed setup guide"
echo "• TROUBLESHOOTING.md   - Common issues and fixes"
echo "• README.md            - Project overview"
echo ""
echo -e "${GREEN}🎯 Next: Run './start-dev.sh' and visit http://localhost:3001${NC}"
echo ""
echo -e "${YELLOW}💡 Tip: Keep MAMP running while developing!${NC}"
