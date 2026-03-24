#!/bin/bash

# Quick Start Script for development
# This script starts both backend and frontend servers

echo "Starting DocNo Development Environment..."
echo ""

# Get the directory where this script is located
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Function to print colored messages
print_info() {
    echo -e "\033[0;34m► $1\033[0m"
}

print_success() {
    echo -e "\033[0;32m✓ $1\033[0m"
}

print_error() {
    echo -e "\033[0;31m✗ $1\033[0m"
}

# Check prerequisites
print_info "Checking prerequisites..."
if ! command -v node &> /dev/null; then
    print_error "Node.js is not installed"
    exit 1
fi
print_success "Node.js found: $(node --version)"

if ! command -v npm &> /dev/null; then
    print_error "npm is not installed"
    exit 1
fi
print_success "npm found: $(npm --version)"

# Check if node_modules exist
if [ ! -d "$SCRIPT_DIR/backend/node_modules" ]; then
    print_error "Backend dependencies not installed. Run: npm install in backend/"
    exit 1
fi

if [ ! -d "$SCRIPT_DIR/frontend/node_modules" ]; then
    print_error "Frontend dependencies not installed. Run: npm install in frontend/"
    exit 1
fi

print_success "All prerequisites met"
echo ""

# Start backend
print_info "Starting backend server..."
cd "$SCRIPT_DIR/backend"
npm run dev &
BACKEND_PID=$!
print_success "Backend started (PID: $BACKEND_PID)"

# Wait a moment for backend to start
sleep 2

# Start frontend
print_info "Starting frontend server..."
cd "$SCRIPT_DIR/frontend"
npm run dev &
FRONTEND_PID=$!
print_success "Frontend started (PID: $FRONTEND_PID)"

echo ""
echo "============================================"
echo "DocNo Development Environment Started"
echo "============================================"
echo ""
echo "Backend:  http://localhost:3000"
echo "Frontend: http://localhost:3001"
echo ""
echo "Demo Credentials:"
echo "  Email: admin@company.com"
echo "  Password: Admin@123"
echo ""
echo "Press Ctrl+C to stop both servers"
echo ""

# Handle graceful shutdown
trap "kill $BACKEND_PID $FRONTEND_PID 2>/dev/null; echo 'Servers stopped'; exit 0" SIGINT SIGTERM

# Wait for both processes
wait $BACKEND_PID $FRONTEND_PID
