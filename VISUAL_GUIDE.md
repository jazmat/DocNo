# DocNo - Setup Guide Visual Reference

## 📊 System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      DocNo Application                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                 │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Frontend (React 18)                    :3001            │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ ┌─────────────┐  ┌──────────┐  ┌──────────┐             │  │
│  │ │   Login     │  │Dashboard │  │ History  │ Profile     │  │
│  │ └─────────────┘  └──────────┘  └──────────┘             │  │
│  │        ↓                ↓                ↓                │  │
│  │    AuthContext (Global State)                            │  │
│  │        ↓                ↓                ↓                │  │
│  │    Axios Interceptor → Bearer Token                      │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓ HTTPS/HTTP                            │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  Backend (Express.js)                   :3000            │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ Rate Limiter → Auth Middleware → Validation             │  │
│  │        ↓              ↓                ↓                  │  │
│  │    /auth          /documents       /users               │  │
│  │    Routes         Routes          Routes                │  │
│  │        ↓              ↓                ↓                  │  │
│  │    Services (Business Logic)                             │  │
│  │        ↓              ↓                ↓                  │  │
│  │ AuthService   DocNumberService  EmailService           │  │
│  │        ↓              ↓                ↓                  │  │
│  │    AuditLog Service   ErrorHandler                       │  │
│  └──────────────────────────────────────────────────────────┘  │
│                         ↓ MySQL Protocol                        │
│  ┌──────────────────────────────────────────────────────────┐  │
│  │  MySQL Database                                          │  │
│  ├──────────────────────────────────────────────────────────┤  │
│  │ ┌──────────┐  ┌──────────┐  ┌────────────┐              │  │
│  │ │  users   │  │documents │  │audit_logs  │              │  │
│  │ └──────────┘  └──────────┘  └────────────┘              │  │
│  └──────────────────────────────────────────────────────────┘  │
│                                                                 │
└─────────────────────────────────────────────────────────────────┘
```

## 🗂️ File Organization

```
DocNo/
│
├── 📄 Setup & Documentation
│   ├── GETTING_STARTED.md          ← START HERE
│   ├── IMPLEMENTATION_SUMMARY.md   ← What was done
│   ├── DEVELOPMENT.md              ← Dev workflows
│   ├── SETUP_CHECKLIST.md          ← Detailed steps
│   ├── README-NEW.md               ← Project overview
│   └── .github/
│       └── copilot-instructions.md ← AI guidelines
│
├── 🚀 Setup Scripts
│   ├── quick-start.sh              ← Interactive setup
│   ├── setup.sh                    ← Full automation
│   ├── start-dev.sh                ← Start servers
│   └── setup-db.sh                 ← Database setup
│
├── ⚙️ Configuration
│   ├── .env.example                ← Template
│   ├── docker-compose.yml          ← Docker config
│   └── Dockerfile                  ← Docker image
│
├── 🔙 Backend (Node.js/Express)
│   └── backend/
│       ├── .env                    ← Backend config
│       ├── .sequelizerc            ← Sequelize CLI
│       ├── server.js               ← Entry point
│       ├── package.json            ← Dependencies
│       ├── src/
│       │   ├── app.js              ← Express app
│       │   ├── middleware/         ← Auth, validation, rate limiting
│       │   ├── routes/             ← API endpoints
│       │   ├── models/             ← Database models
│       │   ├── services/           ← Business logic
│       │   ├── utils/              ← Helpers & validation
│       │   └── config/             ← Database config
│       ├── migrations/             ← Database schema
│       └── seeders/                ← Demo data
│
├── 🎨 Frontend (React)
│   └── frontend/
│       ├── .env                    ← Frontend config
│       ├── vite.config.js          ← Vite build config
│       ├── tailwind.config.js      ← Tailwind CSS
│       ├── postcss.config.js       ← PostCSS plugins
│       ├── index.html              ← HTML entry
│       ├── package.json            ← Dependencies
│       └── src/
│           ├── main.jsx            ← React entry
│           ├── App.jsx             ← Router & Error Boundary
│           ├── index.css           ← Global styles
│           ├── pages/              ← Login, Dashboard, etc.
│           ├── components/         ← UI components
│           ├── services/           ← API client
│           ├── context/            ← Auth state
│           └── utils/              ← Helpers
│
└── 🗄️ Documentation
    └── (Various markdown files)
```

## 🔄 Setup Flow Chart

```
START
  │
  ├─→ Choose Setup Method
  │   ├─ Way 1: Interactive (./quick-start.sh)
  │   ├─ Way 2: Automated (./setup.sh)
  │   └─ Way 3: Manual (step by step)
  │
  ├─→ Check Prerequisites
  │   ├─ Node.js 18+ ✓
  │   └─ MySQL or Docker ✓
  │
  ├─→ Install Dependencies
  │   ├─ Backend: npm install
  │   └─ Frontend: npm install
  │
  ├─→ Setup Database
  │   ├─ Docker: docker-compose up -d
  │   └─ Local: mysql setup script
  │
  ├─→ Run Migrations
  │   ├─ Create tables
  │   └─ Add indexes
  │
  ├─→ Seed Database
  │   └─ Add demo users
  │
  ├─→ Start Servers
  │   ├─ Backend: npm run dev (port 3000)
  │   └─ Frontend: npm run dev (port 3001)
  │
  └─→ Access Application
      └─ http://localhost:3001 ✓
```

## 📋 Configuration Files Overview

### Backend Configuration (.env)
```env
# Server
PORT=3000

# Database
DB_HOST=localhost
DB_PORT=3306
DB_NAME=docgen_db
DB_USER=docgen_user
DB_PASSWORD=docgen_password

# Security
JWT_SECRET=<32-char-random-string>
JWT_EXPIRY=24h

# Email
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your@email.com

# Rate Limiting
RATE_LIMIT_WINDOW=15
RATE_LIMIT_MAX=100

# CORS
ALLOWED_ORIGINS=http://localhost:3001
```

### Frontend Configuration (.env)
```env
VITE_API_URL=http://localhost:3000/api
```

## 🔐 Authentication Flow

```
User Login
    │
    ├─→ POST /api/auth/login
    │   └─→ Backend validates credentials
    │       └─→ Bcrypt compares password
    │           └─→ JWT generated
    │               └─→ Send token to frontend
    │
    ├─→ Frontend stores token in localStorage
    │   └─→ Set AuthContext
    │       └─→ Redirect to dashboard
    │
    ├─→ Subsequent API calls
    │   └─→ Axios adds: Authorization: Bearer {token}
    │       └─→ Backend validates token
    │           ├─→ Valid: Process request
    │           └─→ Invalid: Return 403

Frontend Logout
    └─→ Clear localStorage
        └─→ Reset AuthContext
            └─→ Redirect to login
```

## 📊 Data Flow: Generate Document Number

```
1. User fills form (Dashboard)
   │
   ├─→ React Hook Form validates
   │   └─→ Client-side validation
   │
   ├─→ Submit POST /api/documents/generate
   │   └─→ Include JWT token
   │
2. Backend processes request
   │
   ├─→ Rate limiter checks
   │   └─→ 20 requests per 60 min
   │
   ├─→ Auth middleware validates JWT
   │   └─→ Extract user ID
   │
   ├─→ Joi schema validates input
   │   └─→ Check required fields
   │
   ├─→ Service generates document number
   │   └─→ Query database for daily count
   │       └─→ Generate unique sequence
   │
   ├─→ Save document to database
   │   └─→ Insert into documents table
   │
   ├─→ Log audit action
   │   └─→ INSERT into audit_logs
   │
   ├─→ Send email notification
   │   └─→ Via Nodemailer
   │
   └─→ Return response with document number
       │
3. Frontend receives response
   │
   ├─→ Show success message
   │   └─→ Display document number
   │
   └─→ Reset form
       └─→ Clear inputs
```

## 🛡️ Security Layers

```
Request
   │
   ├─→ 1. CORS Check        (Allow only localhost:3001)
   ├─→ 2. Rate Limit        (100 req/15min per IP)
   ├─→ 3. Auth Middleware   (Validate JWT token)
   ├─→ 4. Request Validate  (Joi schema check)
   ├─→ 5. Business Logic    (Role check, ownership verify)
   ├─→ 6. Database Execute  (Prepared statements)
   └─→ 7. Response Sanitize (No sensitive data)
        │
        └─→ Response with error codes
```

## 📈 Database Schema

```
┌─ users table ──────────────────────┐
│ id (PK)                             │
│ username (UNIQUE)                   │
│ email (UNIQUE)                      │
│ password_hash                       │
│ full_name                           │
│ department                          │
│ is_admin (default: false)           │
│ email_verified (default: false)     │
│ verification_token                  │
│ reset_token                         │
│ reset_token_expiry                  │
│ created_at, updated_at              │
└─────────────────────────────────────┘
         │ 1:N
         ↓
┌─ documents table ──────────────────┐
│ id (PK)                             │
│ document_number (UNIQUE)            │
│ user_id (FK) → users.id            │
│ full_name                           │
│ email                               │
│ document_title                      │
│ document_category (ENUM)            │
│ department                          │
│ status (ENUM: generated, in_use...)│
│ generated_at (timestamp)            │
│ last_used_at (nullable)             │
│ metadata (JSON)                     │
│ updated_at                          │
└─────────────────────────────────────┘

┌─ audit_logs table ─────────────────┐
│ id (PK)                             │
│ user_id (FK) → users.id            │
│ action (string)                     │
│ table_name (string)                 │
│ record_id (int)                     │
│ old_values (JSON)                   │
│ new_values (JSON)                   │
│ ip_address (string)                 │
│ user_agent (text)                   │
│ created_at (timestamp)              │
└─────────────────────────────────────┘
```

## 🚀 Deployment Ready

```
Development:
  Frontend: http://localhost:3001
  Backend:  http://localhost:3000
  Database: localhost:3306

Docker:
  docker-compose up -d
  Auto-creates network & services

Production Checklist:
  ✓ .env file configured
  ✓ JWT_SECRET set to secure value
  ✓ Database backups configured
  ✓ Email service verified
  ✓ HTTPS enabled
  ✓ ALLOWED_ORIGINS updated
  ✓ Error logging setup
  ✓ Performance tested
```

---

**You're ready to go!** 🎉

See **GETTING_STARTED.md** to begin setup.
