# DocNo - Document Number Generator

A full-stack application for generating unique, standardized document numbers with user authentication, audit logging, and email notifications.

## ✨ Features

- **User Management** - Registration, login, profile management, password recovery
- **Document Generation** - Automated creation with format: `DEPT-CAT-YYYYMMDD-SEQ-INITIALS`
- **Email Notifications** - Welcome, confirmation, and password reset emails
- **Audit Logging** - Complete action history for compliance
- **Role-Based Access** - Admin and user roles with permissions
- **Rate Limiting** - API protection against abuse
- **Responsive UI** - Modern Tailwind CSS design

## 🛠️ Tech Stack

**Backend**
- Node.js 18+ with Express.js
- MySQL 8.0+ with Sequelize ORM
- JWT authentication
- Nodemailer for emails
- Winston logging
- Joi validation

**Frontend**
- React 18
- React Router v6
- React Hook Form
- Tailwind CSS
- Axios with interceptors
- Context API

## 🚀 Quick Start

### Automated Setup (Recommended)

```bash
chmod +x quick-start.sh
./quick-start.sh
```

### Manual Setup

**Step 1: Install Dependencies**
```bash
# Backend
cd backend && npm install

# Frontend
cd frontend && npm install
```

**Step 2: Configure Environment**

Files are already set up with development defaults:
- Backend: `backend/.env`
- Frontend: `frontend/.env`

**Step 3: Setup Database**

**Option A - Docker (Recommended)**
```bash
docker-compose up -d
```

**Option B - Local MySQL**
```bash
mysql -u root -p << EOF
CREATE DATABASE docgen_db;
CREATE USER 'docgen_user'@'localhost' IDENTIFIED BY 'docgen_password';
GRANT ALL PRIVILEGES ON docgen_db.* TO 'docgen_user'@'localhost';
FLUSH PRIVILEGES;
EOF
```

**Step 4: Run Migrations**
```bash
cd backend
npm run migrate    # Create tables
npm run seed       # Add demo users
```

**Step 5: Start Servers**

Option A - Single Command
```bash
./start-dev.sh
```

Option B - Separate Terminals
```bash
# Terminal 1
cd backend && npm run dev

# Terminal 2
cd frontend && npm run dev
```

**Step 6: Access Application**
- Frontend: http://localhost:3001
- Backend: http://localhost:3000

## 🔑 Demo Credentials

```
Admin:
  Email: admin@company.com
  Password: Admin@123

User:
  Email: john.doe@company.com
  Password: User@1234
```

## 📚 API Reference

### Authentication
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/auth/register` | Create new account |
| POST | `/api/auth/login` | Login user |
| POST | `/api/auth/logout` | Logout (client clears token) |
| POST | `/api/auth/forgot-password` | Request password reset |
| POST | `/api/auth/reset-password` | Reset with token |
| GET | `/api/auth/verify-email/:token` | Verify email address |

### Documents
| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/documents/generate` | Create new document number |
| GET | `/api/documents/history` | Get user's documents |
| GET | `/api/documents/:id` | Get document details |
| PUT | `/api/documents/:id/status` | Update status |
| GET | `/api/documents/search` | Search all (admin) |
| GET | `/api/documents/stats` | Statistics (admin) |

### Users
| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/users/profile` | Get current user |
| PUT | `/api/users/profile` | Update profile |
| PUT | `/api/users/change-password` | Change password |

## 📦 Docker

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

**Services:**
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- MySQL: localhost:3306

## 🔧 Scripts

### Backend
```bash
npm run dev       # Development server (hot reload)
npm start         # Production server
npm test          # Run tests
npm run migrate   # Run migrations
npm run seed      # Seed database
npm run lint      # Lint code
```

### Frontend
```bash
npm run dev       # Development server
npm run build     # Production build
npm run test      # Run tests
npm run preview   # Preview build
```

## 🗄️ Database Schema

**users** - User accounts and authentication
- Stores login credentials, profile, roles
- Email verification and password reset tokens

**documents** - Generated document records
- Links to user
- Status tracking (generated, in_use, archived)
- Metadata storage

**audit_logs** - Action history for compliance
- User ID, action type, timestamp
- Old and new values for changes
- IP address and user-agent

See [backend/migrations/001-initial-schema.js](backend/migrations/001-initial-schema.js)

## 🔒 Security

- ✅ JWT authentication (24h expiry)
- ✅ Bcrypt password hashing
- ✅ Rate limiting (100 req/15min)
- ✅ CORS whitelisting
- ✅ Helmet.js headers
- ✅ Input validation (Joi)
- ✅ SQL injection prevention
- ✅ XSS protection
- ✅ Audit trail

## 🐛 Troubleshooting

### Port Already in Use
```bash
# Find process
lsof -i :3000

# Kill it
kill -9 <PID>
```

### Database Connection Failed
```bash
# Check MySQL
mysql -u root -p

# Check credentials in backend/.env
cat backend/.env | grep DB_
```

### Dependencies Error
```bash
rm -rf node_modules package-lock.json
npm cache clean --force
npm install
```

### Frontend Can't Connect
1. Verify backend running: `curl http://localhost:3000/health`
2. Check CORS in `backend/.env`
3. Check browser console errors
4. Check network tab

## 📂 Project Structure

```
DocNo/
├── backend/
│   ├── src/
│   │   ├── routes/       # API endpoints
│   │   ├── models/       # Database models
│   │   ├── services/     # Business logic
│   │   ├── middleware/   # Express middleware
│   │   └── utils/        # Utilities
│   ├── migrations/       # Database migrations
│   ├── seeders/          # Demo data
│   └── server.js         # Entry point
├── frontend/
│   ├── src/
│   │   ├── pages/        # Page components
│   │   ├── components/   # UI components
│   │   ├── services/     # API client
│   │   ├── context/      # State management
│   │   └── utils/        # Helpers
│   └── index.html        # HTML entry
├── docker-compose.yml    # Docker config
└── README.md             # This file
```

## 📖 Documentation

- [Development Guide](DEVELOPMENT.md) - Architecture, workflows, patterns
- [Setup Checklist](SETUP_CHECKLIST.md) - Detailed setup steps
- [Copilot Instructions](.github/copilot-instructions.md) - AI assistant guide

## 🚢 Deployment

### Checklist
- [ ] Generate secure JWT_SECRET (32+ random chars)
- [ ] Setup production MySQL database
- [ ] Configure EMAIL_* for SMTP
- [ ] Set NODE_ENV=production
- [ ] Set ALLOWED_ORIGINS to your domain
- [ ] Enable HTTPS
- [ ] Run migrations on production
- [ ] Setup monitoring/logging
- [ ] Configure backups

### Environment Variables
```env
NODE_ENV=production
JWT_SECRET=<random-32-char-string>
DB_HOST=<production-db-host>
DB_USER=<production-db-user>
DB_PASSWORD=<production-db-password>
EMAIL_HOST=smtp.gmail.com
EMAIL_USER=<your-email>
EMAIL_PASSWORD=<app-password>
ALLOWED_ORIGINS=https://yourdomain.com
```

## 🤝 Contributing

1. Create a feature branch
2. Make changes
3. Run tests: `npm test`
4. Run linter: `npm run lint`
5. Submit PR

## 📝 License

ISC

---

**Questions?** See the documentation files or check the error logs in `backend/logs/`
