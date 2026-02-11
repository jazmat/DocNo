# DocNo - Complete Command Reference

## 🚀 Quick Start Commands

### Setup (Choose One)

**Interactive Setup** (Recommended for first time)
```bash
chmod +x quick-start.sh
./quick-start.sh
```

**Automated Full Setup**
```bash
chmod +x setup.sh
./setup.sh
```

**Manual Setup**
```bash
# 1. Install dependencies
cd backend && npm install
cd ../frontend && npm install

# 2. Setup database
docker-compose up -d
# OR
mysql -u root -p < setup-db.sql

# 3. Run migrations
cd backend
npm run migrate
npm run seed

# 4. Start servers
./start-dev.sh
# OR
cd backend && npm run dev  # Terminal 1
cd frontend && npm run dev # Terminal 2
```

## 📦 Backend Commands

### Installation & Setup
```bash
cd backend

# Install dependencies
npm install

# Install specific package
npm install <package-name>

# Update dependencies
npm update
```

### Development
```bash
cd backend

# Start development server with hot reload
npm run dev

# Start production server
npm start

# Run linter
npm run lint

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage
```

### Database Management
```bash
cd backend

# Run all pending migrations
npm run migrate

# Undo all migrations
npm run migrate:undo:all

# Undo last migration
npm run migrate:undo

# Seed database with demo data
npm run seed

# Undo last seed
npm run seed:undo:all

# Create new migration
npx sequelize-cli migration:generate --name <migration-name>

# Create new seed
npx sequelize-cli seed:generate --name <seed-name>
```

### Database Access
```bash
# Using MySQL CLI
mysql -u docgen_user -p docgen_db
# Password: docgen_password

# View all tables
SHOW TABLES;

# View users
SELECT * FROM users;

# View documents
SELECT * FROM documents;

# View audit logs
SELECT * FROM audit_logs;

# Using Docker
docker exec -it docno-mysql mysql -u docgen_user -pdocgen_password docgen_db
```

### Debugging
```bash
cd backend

# View logs
tail -f logs/combined.log
tail -f logs/error.log

# Check port is available
lsof -i :3000

# Health check
curl http://localhost:3000/health
```

## 🎨 Frontend Commands

### Installation & Setup
```bash
cd frontend

# Install dependencies
npm install

# Install specific package
npm install <package-name>

# Update dependencies
npm update
```

### Development
```bash
cd frontend

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Run tests
npm test

# Run tests with coverage
npm test -- --coverage

# Lint code
npm run lint

# Format code
npm run format
```

### Debugging
```bash
# View application
open http://localhost:3001

# Check Vite server status
curl http://localhost:3001

# View browser console
# Press F12 in browser
```

## 🐳 Docker Commands

### Start & Stop
```bash
# Start all services
docker-compose up -d

# Stop all services
docker-compose down

# Restart services
docker-compose restart

# View running containers
docker-compose ps

# View logs
docker-compose logs -f

# View logs for specific service
docker-compose logs -f backend
docker-compose logs -f frontend
docker-compose logs -f mysql
```

### Database Access via Docker
```bash
# Access MySQL
docker exec -it docno-mysql mysql -u docgen_user -pdocgen_password

# Backup database
docker exec docno-mysql mysqldump -u docgen_user -pdocgen_password docgen_db > backup.sql

# Restore database
docker exec -i docno-mysql mysql -u docgen_user -pdocgen_password docgen_db < backup.sql

# Shell access to MySQL container
docker exec -it docno-mysql bash
```

## 🔒 Environment Setup

### Backend .env
```bash
# View current config
cat backend/.env

# Edit config (macOS/Linux)
nano backend/.env
vi backend/.env

# Edit config (Windows)
notepad backend\.env
```

### Frontend .env
```bash
# View current config
cat frontend/.env

# Edit config
nano frontend/.env
```

### Generate JWT Secret
```bash
# macOS/Linux
openssl rand -hex 32

# Node.js
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Using npm package
npm install -g nanoid
nanoid 32
```

## 🧪 Testing Commands

### Backend Tests
```bash
cd backend

# Run all tests
npm test

# Run specific test file
npm test -- <test-file>

# Run with coverage report
npm test -- --coverage

# Run in watch mode
npm test -- --watch

# Run specific test suite
npm test -- --testNamePattern="<pattern>"
```

### Frontend Tests
```bash
cd frontend

# Run all tests
npm test

# Run specific test file
npm test -- <test-file>

# Run with coverage
npm test -- --coverage

# Run in watch mode
npm test -- --watch
```

## 📊 Monitoring & Logging

### View Logs
```bash
cd backend

# All logs
tail -f logs/combined.log

# Error logs only
tail -f logs/error.log

# Last 50 lines
tail -50 logs/combined.log

# Search logs
grep "error" logs/combined.log
grep "User" logs/combined.log

# Real-time log monitoring
watch tail logs/combined.log
```

### Monitor Processes
```bash
# View Node processes
ps aux | grep node

# View specific process
ps aux | grep "npm run dev"

# Kill process
kill -9 <PID>

# Kill process on port
lsof -i :3000 | grep LISTEN | awk '{print $2}' | xargs kill -9
```

## 🔧 Troubleshooting Commands

### Check System
```bash
# Node version
node --version

# npm version
npm --version

# MySQL version
mysql --version

# Check ports
lsof -i :3000
lsof -i :3001
lsof -i :3306

# Check disk space
df -h
```

### Clean & Rebuild
```bash
# Clear npm cache
npm cache clean --force

# Remove node_modules and reinstall
rm -rf node_modules package-lock.json
npm install

# Clear frontend build
rm -rf frontend/dist
npm run build

# Reset database
cd backend
npm run migrate:undo:all
npm run migrate
npm run seed
```

### Network Testing
```bash
# Test backend API
curl http://localhost:3000/health

# Test with auth
curl -H "Authorization: Bearer <token>" http://localhost:3000/api/users/profile

# Test frontend
curl http://localhost:3001

# DNS resolution
nslookup localhost

# Network connectivity
ping localhost
```

## 📝 Common Workflows

### Daily Development
```bash
# Start everything
./start-dev.sh

# In separate terminals, run:
cd backend && npm run dev
cd frontend && npm run dev

# Stop with Ctrl+C
```

### Add New Feature
```bash
# 1. Update backend model
# backend/src/models/

# 2. Create migration
cd backend
npx sequelize-cli migration:generate --name add_field_to_table

# 3. Create API route
# backend/src/routes/

# 4. Create frontend component
# frontend/src/pages/ or frontend/src/components/

# 5. Run and test
npm run dev (both terminals)
```

### Deploy to Production
```bash
# 1. Build frontend
cd frontend
npm run build

# 2. Run migrations on production DB
cd backend
npm run migrate

# 3. Start production server
NODE_ENV=production npm start

# 4. Check health
curl https://yourdomain.com/health
```

### Database Backup & Restore
```bash
# Backup
mysqldump -u docgen_user -p docgen_db > backup_$(date +%Y%m%d).sql

# Restore
mysql -u docgen_user -p docgen_db < backup_20240101.sql

# Backup via Docker
docker exec docno-mysql mysqldump -u docgen_user -pdocgen_password docgen_db > backup.sql

# Restore via Docker
docker exec -i docno-mysql mysql -u docgen_user -pdocgen_password docgen_db < backup.sql
```

## 🔄 Git Commands (If Using Version Control)

```bash
# Initialize git
git init

# Add files
git add .

# Create .gitignore
git status

# First commit
git commit -m "Initial commit: DocNo project setup"

# Add remote
git remote add origin <repo-url>

# Push
git push -u origin main

# Pull updates
git pull

# Create branch
git checkout -b feature/my-feature

# Merge
git merge feature/my-feature
```

## 📞 Help & Documentation

### Get Help
```bash
# npm help
npm help
npm install --help

# View package scripts
npm run

# View node docs
node --help

# Express documentation
# https://expressjs.com/

# React documentation
# https://react.dev/

# MySQL documentation
# https://dev.mysql.com/doc/
```

### Generate Documentation
```bash
# Backend API docs (if JSDoc setup)
npm run docs

# Frontend component docs (if Storybook setup)
npm run storybook
```

---

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│         Development Startup             │
├─────────────────────────────────────────┤
│ ./quick-start.sh                        │
│ or                                      │
│ ./setup.sh                              │
│ then                                    │
│ ./start-dev.sh                          │
│                                         │
│ Frontend: http://localhost:3001         │
│ Backend:  http://localhost:3000         │
│ Database: localhost:3306                │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Database Access                    │
├─────────────────────────────────────────┤
│ mysql -u docgen_user -p docgen_db       │
│ Password: docgen_password               │
│                                         │
│ Demo Users:                             │
│ admin@company.com / Admin@123           │
│ john.doe@company.com / User@1234        │
└─────────────────────────────────────────┘

┌─────────────────────────────────────────┐
│      Common Issues                      │
├─────────────────────────────────────────┤
│ Port in use:                            │
│ lsof -i :3000 | grep LISTEN | ...       │
│                                         │
│ Rebuild:                                │
│ rm -rf node_modules && npm install      │
│                                         │
│ Reset DB:                               │
│ npm run migrate:undo:all                │
│ npm run migrate && npm run seed         │
└─────────────────────────────────────────┘
```

---

For more help, see:
- GETTING_STARTED.md
- DEVELOPMENT.md
- README-NEW.md
