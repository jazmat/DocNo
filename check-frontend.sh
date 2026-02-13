#!/bin/bash

# Frontend Setup Verification Script for DocNo
# This script checks if the frontend is properly configured

set -e

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

echo -e "${BLUE}"
echo "========================================"
echo "DocNo Frontend Setup Verification"
echo "========================================"
echo -e "${NC}"

# Navigate to frontend directory
cd "$(dirname "$0")/frontend"

echo -e "${YELLOW}🔍 Checking frontend files...${NC}"

# Check package.json
if [[ -f "package.json" && -s "package.json" ]]; then
    echo -e "${GREEN}✅ package.json exists and is not empty${NC}"

    # Check if it has the right dependencies
    if grep -q "react" package.json && grep -q "vite" package.json; then
        echo -e "${GREEN}✅ package.json has React and Vite dependencies${NC}"
    else
        echo -e "${RED}❌ package.json missing required dependencies${NC}"
        exit 1
    fi
else
    echo -e "${RED}❌ package.json is missing or empty${NC}"
    exit 1
fi

# Check essential files
REQUIRED_FILES=("index.html" "vite.config.js" "tailwind.config.js" "postcss.config.js" "src/main.jsx" "src/App.jsx" "src/index.css")

for file in "${REQUIRED_FILES[@]}"; do
    if [[ -f "$file" ]]; then
        echo -e "${GREEN}✅ $file exists${NC}"
    else
        echo -e "${RED}❌ $file is missing${NC}"
        exit 1
    fi
done

# Check node_modules
if [[ -d "node_modules" ]]; then
    echo -e "${GREEN}✅ node_modules directory exists${NC}"

    # Check if React is installed
    if [[ -d "node_modules/react" ]]; then
        echo -e "${GREEN}✅ React is installed${NC}"
    else
        echo -e "${YELLOW}⚠️  React not found in node_modules - run 'npm install'${NC}"
    fi

    # Check if Vite is installed
    if [[ -d "node_modules/vite" ]]; then
        echo -e "${GREEN}✅ Vite is installed${NC}"
    else
        echo -e "${YELLOW}⚠️  Vite not found in node_modules - run 'npm install'${NC}"
    fi
else
    echo -e "${YELLOW}⚠️  node_modules directory not found - run 'npm install'${NC}"
fi

# Check src directory structure
echo -e "${YELLOW}🔍 Checking src directory structure...${NC}"

SRC_DIRS=("components" "context" "pages" "services" "utils")
for dir in "${SRC_DIRS[@]}"; do
    if [[ -d "src/$dir" ]]; then
        echo -e "${GREEN}✅ src/$dir exists${NC}"

        # Count files in directory
        file_count=$(find "src/$dir" -type f -name "*.jsx" -o -name "*.js" | wc -l | tr -d ' ')
        echo -e "    📁 Contains $file_count component/utility files"
    else
        echo -e "${RED}❌ src/$dir is missing${NC}"
    fi
done

# Check if we can parse package.json
echo -e "${YELLOW}🔍 Validating package.json structure...${NC}"

if command -v node &> /dev/null; then
    if node -e "JSON.parse(require('fs').readFileSync('package.json', 'utf8'))" &> /dev/null; then
        echo -e "${GREEN}✅ package.json is valid JSON${NC}"

        # Show key information
        echo -e "${BLUE}📋 Package Information:${NC}"
        node -e "
        const pkg = JSON.parse(require('fs').readFileSync('package.json', 'utf8'));
        console.log('  Name: ' + pkg.name);
        console.log('  Version: ' + pkg.version);
        console.log('  React Version: ' + (pkg.dependencies?.react || 'Not found'));
        console.log('  Vite Version: ' + (pkg.devDependencies?.vite || 'Not found'));
        "
    else
        echo -e "${RED}❌ package.json is not valid JSON${NC}"
        exit 1
    fi
else
    echo -e "${YELLOW}⚠️  Node.js not found - cannot validate package.json${NC}"
fi

# Check Vite config
if node -c vite.config.js &> /dev/null; then
    echo -e "${GREEN}✅ vite.config.js syntax is valid${NC}"
else
    echo -e "${RED}❌ vite.config.js has syntax errors${NC}"
fi

# Check Tailwind config
if node -c tailwind.config.js &> /dev/null; then
    echo -e "${GREEN}✅ tailwind.config.js syntax is valid${NC}"
else
    echo -e "${RED}❌ tailwind.config.js has syntax errors${NC}"
fi

echo -e "${GREEN}"
echo "========================================"
echo "✅ Frontend Verification Complete!"
echo "========================================"
echo -e "${NC}"

echo -e "${BLUE}📋 Next Steps:${NC}"
echo ""

if [[ ! -d "node_modules" ]]; then
    echo -e "${YELLOW}1. Install dependencies:${NC}"
    echo -e "   ${GREEN}cd frontend && npm install${NC}"
    echo ""
fi

echo -e "${YELLOW}2. Start development server:${NC}"
echo -e "   ${GREEN}cd frontend && npm run dev${NC}"
echo ""

echo -e "${YELLOW}3. Access frontend:${NC}"
echo -e "   ${GREEN}http://localhost:3001${NC}"
echo ""

echo -e "${BLUE}🔧 Available Scripts:${NC}"
echo -e "   ${GREEN}npm run dev${NC}     - Start development server"
echo -e "   ${GREEN}npm run build${NC}   - Build for production"
echo -e "   ${GREEN}npm run preview${NC} - Preview production build"
echo -e "   ${GREEN}npm run lint${NC}    - Run ESLint"
echo ""

if [[ -d "node_modules" ]]; then
    echo -e "${GREEN}🎉 Frontend is ready for development!${NC}"
else
    echo -e "${YELLOW}⚠️  Run 'npm install' first to install dependencies${NC}"
fi
