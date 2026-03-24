# Getting Started with DocNo

This guide helps you get DocNo up and running in minutes.

## 📋 What You Have

Your DocNo project now includes:

1. **Setup Scripts** (Automated Setup)
   - `quick-start.sh` - Interactive setup guide
   - `setup.sh` - Full setup automation
   - `start-dev.sh` - Start both servers

2. **Database Scripts**
   - `setup-db.sh` - Create MySQL database
   - Database migrations in `backend/migrations/`
   - Demo seeders in `backend/seeders/`

3. **Configuration**
   - `backend/.env` - Backend config (already set with dev defaults)
   - `frontend/.env` - Frontend config (already set)
   - `.env.example` - Reference template

4. **Documentation**
   - `README.md` - Main project documentation
   - `DEVELOPMENT.md` - Development guide
   - `SETUP_CHECKLIST.md` - Detailed setup steps
   - `.github/copilot-instructions.md` - AI assistant guidelines

## 🚀 Three Ways to Get Started

### Way 1: Fastest (Interactive Setup)
```bash
chmod +x quick-start.sh
./quick-start.sh
```
This will:
- Check your system
- Install dependencies
- Guide you through database setup
- Tell you next steps

### Way 2: Automated (Full Setup)
```bash
chmod +x setup.sh
./setup.sh
```
This will:
- Install all dependencies
- Create .env files
- Create MySQL database
- Run migrations
- Seed demo data
- Start both servers

**Requirements:** MySQL must be running locally

### Way 3: Manual (Step by Step)

#### Step 1: Install Node Modules
```bash
# Backend
cd backend
npm install

# Frontend
cd frontend
npm install
```

#### Step 2: Setup Database

**Using Docker** (Recommended - No local MySQL needed)
```bash
docker-compose up -d
sleep 10  # Wait for MySQL to start
```

**Using Local MySQL**
```bash
mysql -u root -p << EOF
CREATE DATABASE docgen_db;
CREATE USER 'docgen_user'@'localhost' IDENTIFIED BY 'docgen_password';
GRANT ALL PRIVILEGES ON docgen_db.* TO 'docgen_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```

#### Step 3: Initialize Database
```bash
cd backend
npm run migrate    # Creates tables
npm run seed       # Adds demo users
```

#### Step 4: Start Servers

**Option A - Single Command**
```bash
./start-dev.sh
```

**Option B - Two Terminals**
```bash
# Terminal 1 - Backend API
cd backend
npm run dev

# Terminal 2 - Frontend UI
cd frontend
npm run dev
```

#### Step 5: Access Application
1. Open browser: http://localhost:3001
2. Login with demo credentials:
   - Email: `admin@company.com`
   - Password: `Admin@123`

## ✅ Verification Checklist

After setup, verify everything works:

- [ ] Can you see the login page? (http://localhost:3001)
- [ ] Can you login with admin credentials?
- [ ] Can you see the dashboard?
- [ ] Can you generate a document number?
- [ ] Can you view document history?
- [ ] Can you update your profile?
- [ ] Can you logout?

## 🔧 Configuration

### Already Configured
Your project comes with working development configuration:
- Database: localhost:3306
- Backend: localhost:3000
- Frontend: localhost:3001
- Demo user accounts pre-seeded

### Customize (Optional)

**Email Configuration**
Edit `backend/.env`:
```env
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your-email@gmail.com
EMAIL_PASSWORD=your-app-password
```

**Database Credentials**
Edit `backend/.env`:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USER=docgen_user
DB_PASSWORD=docgen_password
```

**Security**
For production, change:
```env
JWT_SECRET=<generate-random-32-char-string>
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🐛 If Something Goes Wrong

### Node.js Not Found
```bash
# Install Node.js from https://nodejs.org/
# Then verify:
node --version
npm --version
```

### Port Already in Use
```bash
# Find what's using port 3000
lsof -i :3000
# Kill it
kill -9 <PID>
```

### Database Connection Error
```bash
# Check MySQL is running
mysql -u root -p
# If not, use Docker:
docker-compose up -d
```

### npm install Fails
```bash
# Clear npm cache
npm cache clean --force

# Try again
npm install
```

### Can't Login
- Check database was seeded: `npm run seed`
- Try demo credentials:
  - Email: admin@company.com
  - Password: Admin@123
- Check backend logs: `cat backend/logs/error.log`

## 📚 Next Steps

1. **Explore the Code**
   - Review backend structure in `backend/src/`
   - Review frontend in `frontend/src/`

2. **Customize**
   - Add your branding/logo
   - Modify form fields
   - Change colors in Tailwind config

3. **Add Features**
   - See [DEVELOPMENT.md](DEVELOPMENT.md) for workflows
   - Add new API endpoints
   - Create new React components

4. **Deploy**
   - See deployment section in [README.md](README.md)
   - Configure production database
   - Setup email service
   - Deploy with Docker or your hosting

5. **Test**
   - Run tests: `npm test`
   - Test all features manually
   - Generate sample documents

## 📖 Documentation

- **README.md** - Project overview and API reference
- **DEVELOPMENT.md** - Detailed development guide
- **SETUP_CHECKLIST.md** - Complete setup instructions
- **Copilot Instructions** - Guidelines for AI assistants

## 🆘 Need Help?

1. Check [SETUP_CHECKLIST.md](SETUP_CHECKLIST.md) for troubleshooting
2. Review error logs in `backend/logs/`
3. Check browser console (F12 in browser)
4. Review API responses in Network tab
5. Check backend terminal output

## 🎯 Common Tasks

### Change Demo Password
```bash
cd backend
mysql docgen_db -u docgen_user -p
# Then in MySQL:
UPDATE users SET password_hash = '...' WHERE email = 'admin@company.com';
```

### Reset Database
```bash
cd backend
# Drop and recreate
npm run migrate:undo:all
npm run migrate
npm run seed
```

### View Database
```bash
# Using MySQL CLI
mysql -u docgen_user -p docgen_db
SHOW TABLES;
SELECT * FROM users;

# Or using Docker
docker exec -it docno-mysql mysql -u docgen_user -pdocgen_password docgen_db
```

### Monitor Backend
```bash
# View logs
tail -f backend/logs/combined.log

# Watch server
npm run dev
```

---

**You're all set!** 🎉

Start with Way 1 (Quick Start) if you're unsure, or follow Way 2 for full automation.

Once running, visit http://localhost:3001 and start generating document numbers!
