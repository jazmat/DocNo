# DocNo Local Development Setup for MAMP on macOS

This guide will help you run the DocNo application locally on your MacBook Pro using MAMP.

## 📋 Prerequisites

- **MAMP** installed on your Mac (https://www.mamp.info/)
- **Node.js** 18+ (https://nodejs.org/)
- **Git** (comes with macOS)

## 🚀 Quick Setup (5 Minutes)

### Step 1: Start MAMP
1. Open MAMP application
2. Click "Start Servers" 
3. Verify MySQL is running on port **8889** (MAMP default)
4. Note: MAMP uses port 8889, not the standard 3306

### Step 2: Create Environment File for MAMP

Create `backend/.env` file with MAMP-specific settings:

```bash
# Navigate to your project
cd ~/git/DocNo/backend

# Create .env file for MAMP
cat > .env << 'EOF'
# Development Environment
NODE_ENV=development

# Database Configuration (MAMP MySQL)
DB_HOST=localhost
DB_PORT=8889
DB_NAME=docgen_db
DB_USER=root
DB_PASSWORD=root

# JWT Configuration (Development - 32+ chars for security)
JWT_SECRET=dev_jwt_secret_key_for_local_development_only_change_for_production

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
EOF
```

### Step 3: Setup Database

```bash
# Create database using MAMP's MySQL
mysql -h localhost -P 8889 -u root -proot << 'EOF'
CREATE DATABASE IF NOT EXISTS docgen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
SHOW DATABASES;
EOF
```

### Step 4: Install Dependencies

```bash
# Backend dependencies
cd ~/git/DocNo/backend
npm install

# Frontend dependencies
cd ~/git/DocNo/frontend
npm install
```

### Step 5: Initialize Database

```bash
# Run database migrations
cd ~/git/DocNo/backend
npm run migrate

# Seed with demo data
npm run seed
```

### Step 6: Start Development Servers

**Option A - Two Terminal Windows:**

Terminal 1 (Backend):
```bash
cd ~/git/DocNo/backend
npm run dev
```

Terminal 2 (Frontend):
```bash
cd ~/git/DocNo/frontend
npm run dev
```

**Option B - Using the provided script:**
```bash
cd ~/git/DocNo
chmod +x start-dev.sh
./start-dev.sh
```

### Step 7: Access the Application

1. **Frontend:** http://localhost:3001
2. **Backend API:** http://localhost:3000
3. **MAMP phpMyAdmin:** http://localhost:8888/phpMyAdmin/

## 🔐 Demo Login Credentials

After seeding the database, use these credentials:

**Admin User:**
- Email: `admin@company.com`
- Password: `Admin@123`

**Regular User:**
- Email: `user@company.com`
- Password: `User@123`

## 🛠️ MAMP-Specific Configuration

### Database Connection Details
- **Host:** localhost
- **Port:** 8889 (MAMP default)
- **Username:** root
- **Password:** root (MAMP default)
- **Database:** docgen_db

### Accessing Database via MAMP
1. Open MAMP
2. Click "WebStart" 
3. Go to "Tools" → "phpMyAdmin"
4. Select `docgen_db` database
5. View tables: `users`, `documents`, `audit_logs`

### MAMP MySQL Command Line
```bash
# Connect to MAMP MySQL
/Applications/MAMP/Library/bin/mysql -h localhost -P 8889 -u root -proot

# Or add to your PATH (optional)
export PATH="/Applications/MAMP/Library/bin:$PATH"
mysql -h localhost -P 8889 -u root -proot docgen_db
```

## 🧪 Testing Your Setup

### 1. Backend Health Check
```bash
curl http://localhost:3000/health
# Expected: {"status":"OK","timestamp":"..."}
```

### 2. Frontend Access
- Visit: http://localhost:3001
- Should see DocNo login page

### 3. Database Connection
```bash
cd ~/git/DocNo/backend
node -e "
const db = require('./config/database');
db.authenticate()
  .then(() => console.log('✅ Database connected'))
  .catch(err => console.error('❌ Database error:', err.message));
"
```

### 4. Generate Document Number
1. Login at http://localhost:3001
2. Use admin credentials
3. Try generating a document number
4. Check if email notification works (optional)

## 🔧 Development Workflow

### Making Code Changes
- **Backend:** Changes auto-reload with nodemon
- **Frontend:** Changes auto-reload with Vite HMR
- **Database:** Use migrations for schema changes

### Viewing Logs
```bash
# Backend logs
cd ~/git/DocNo/backend
tail -f logs/combined.log

# Or check console output in terminal
```

### Database Operations
```bash
# Reset database
cd ~/git/DocNo/backend
npm run migrate:undo:all
npm run migrate
npm run seed

# Create new migration
npx sequelize-cli migration:generate --name add-new-field

# Run specific migration
npx sequelize-cli db:migrate --to 20231225000000-migration-name.js
```

## 📊 Project Structure

```
DocNo/
├── backend/              # Node.js/Express API
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   └── middleware/   # Auth, validation
│   ├── migrations/       # Database migrations
│   └── seeders/         # Demo data
├── frontend/            # React frontend
│   └── src/
│       ├── pages/       # React pages
│       ├── components/  # Reusable components
│       └── services/    # API client
└── docker-compose.yml   # Docker alternative
```

## 🐛 Troubleshooting

### Port 3000/3001 Already in Use
```bash
# Find what's using the port
lsof -i :3000
lsof -i :3001

# Kill the process
kill -9 <PID>
```

### MAMP MySQL Not Starting
1. Check MAMP preferences
2. Ensure port 8889 is available
3. Restart MAMP application
4. Check MAMP logs in preferences

### Database Connection Errors
```bash
# Test MAMP MySQL connection
mysql -h localhost -P 8889 -u root -proot -e "SELECT 1;"

# If fails, check MAMP is running and port is correct
```

### Migration Errors
```bash
# Check if database exists
mysql -h localhost -P 8889 -u root -proot -e "SHOW DATABASES;"

# Drop and recreate if needed
mysql -h localhost -P 8889 -u root -proot -e "
DROP DATABASE IF EXISTS docgen_db;
CREATE DATABASE docgen_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
"
```

### Frontend Build Issues
```bash
cd ~/git/DocNo/frontend
rm -rf node_modules
rm package-lock.json
npm install
```

### Email Not Working (Development)
- Email is optional for development
- Document generation will work without email
- To test emails, configure Gmail App Password in `.env`

## 🎯 Development Tips

### Hot Reloading
- Backend: Uses `nodemon` for auto-restart
- Frontend: Uses Vite for instant HMR
- Database: Manual restart needed after schema changes

### Debugging
- Use browser DevTools (F12) for frontend debugging
- Use `console.log()` or VS Code debugger for backend
- Check Network tab for API requests

### API Testing
```bash
# Test document generation
curl -X POST http://localhost:3000/api/documents/generate \
  -H "Authorization: Bearer <token>" \
  -H "Content-Type: application/json" \
  -d '{
    "document_title": "Test Document",
    "document_category": "Report",
    "department": "IT",
    "notes": "Test notes"
  }'
```

## 🚀 Next Steps

1. **Explore the Application**
   - Login and generate document numbers
   - View document history
   - Test admin features

2. **Customize for Your Needs**
   - Modify department codes in `backend/src/services/documentNumberService.js`
   - Update categories in `backend/src/utils/validators.js`
   - Change styling in frontend Tailwind CSS

3. **Add Features**
   - See `DEVELOPMENT.md` for development workflows
   - Check `.github/copilot-instructions.md` for architecture details

4. **Prepare for Production**
   - Set strong JWT_SECRET (32+ characters)
   - Configure production database
   - Set up email service
   - Review security settings

## 📞 Support

- **Documentation:** Check `README.md`, `DEVELOPMENT.md`
- **Logs:** Backend logs in `backend/logs/`
- **Database:** Use MAMP phpMyAdmin interface
- **API:** Test endpoints at http://localhost:3000/health

---

**You're ready to develop! 🎉**

Start MAMP, run the setup commands, and visit http://localhost:3001 to begin using DocNo locally.