# Copilot Instructions for DocNo

## Project Overview

DocNo is a full-stack Document Number Generator application that creates unique, standardized document numbers with user authentication, email notifications, and comprehensive audit logging.

**Tech Stack:**
- Backend: Node.js/Express, MySQL (Sequelize ORM), JWT authentication
- Frontend: React 18, React Router, React Hook Form, Tailwind CSS
- Database: MySQL 8.0+
- DevOps: Docker, Docker Compose

## Architecture

### Document Number Format
`{DEPT}-{CATEGORY}-{YYYYMMDD}-{SEQUENCE}-{INITIALS}`

Example: `HR-RPT-20241225-001-JD`

Key components:
- Department Code: 2-4 chars (HR, FIN, IT, MKTG, etc.)
- Category Code: 3 chars (RPT, TMP, PRE, INV, CTR, PRO, MEM, OTH)
- Date: YYYYMMDD format
- Sequence: 3-digit daily counter (001-999)
- User Initials: First letters of first and last name

See [src/services/documentNumberService.js](backend/src/services/documentNumberService.js) for implementation.

### Database Schema

Three main tables:

1. **users** - User accounts with profile, auth tokens, and verification
2. **documents** - Generated document records with metadata
3. **audit_logs** - Complete action history for compliance (user_id, action, timestamp, old/new values)

See [migrations/001-initial-schema.js](backend/migrations/001-initial-schema.js) for DDL.

### Request Flow

1. **Authentication**: JWT-based, 24h expiry. Token required in `Authorization: Bearer {token}` header
2. **Rate Limiting**: API (100 req/15min), Auth (5 req/15min), Document generation (20 req/60min)
3. **Validation**: Input validated via Joi schemas on backend, React Hook Form on frontend
4. **Errors**: Structured with error codes. See [src/utils/errors.js](backend/src/utils/errors.js)
5. **Audit**: Every action logged with user ID, IP, user-agent, old/new values

## Backend Structure

### Key Directories
- **routes/** - API endpoint definitions (auth, documents, users)
- **services/** - Business logic (document generation, email, audit logging)
- **middleware/** - Auth, validation, rate limiting, error handling
- **models/** - Sequelize model definitions
- **utils/** - Shared utilities (errors, validators, password hashing, logger)

### Critical Services

**documentNumberService.js**
- Generates unique document numbers
- Queries database to get daily sequence count
- ⚠️ **KNOWN ISSUE**: Race condition if multiple requests happen simultaneously (needs transaction/lock)

**emailService.js**
- Sends confirmation, password reset, welcome emails
- Uses Nodemailer configured via env vars
- Templates are HTML inline; could extract to separate files

**auditService.js**
- Logs all user actions (CREATE, UPDATE, DELETE, LOGIN, etc.)
- Records old/new values for change tracking
- Silent failures to avoid breaking main operations

### Common Patterns

**Error Handling:**
```javascript
// All routes use try/catch with error codes
try { /* operation */ }
catch(error) { return res.status(code).json({ error, errorCode: ErrorCodes.NAME }); }
```

**Validation:**
Use Joi schemas for input validation. Example in [src/utils/validators.js](backend/src/utils/validators.js)

**Database Access:**
All models use Sequelize ORM. Relationships are defined in model files (see [models/Document.js](backend/src/models/Document.js))

## Frontend Structure

### Key Directories
- **pages/** - Full-page components (Login, Register, Dashboard, History, Profile)
- **components/** - Reusable components (DocumentForm)
- **services/** - API client (axios with interceptors)
- **context/** - Global auth state management
- **utils/** - Helpers (error handling, validators)

### State Management

**AuthContext** ([context/AuthContext.jsx](frontend/src/context/AuthContext.jsx))
- Global auth state: user, token, isAuthenticated, isAdmin
- Methods: login(), logout(), setAuthError()
- Persists to localStorage automatically
- Protected routes check `isAuthenticated` in [App.jsx](frontend/src/App.jsx)

### Error Handling

- API errors map to error codes in [utils/errorHandler.js](frontend/src/utils/errorHandler.js)
- Error Boundary wraps entire app to catch React errors
- 401/403 responses trigger logout and redirect to login

## Development Workflows

### Adding a New API Endpoint

1. Define Joi schema in [src/utils/validators.js](backend/src/utils/validators.js)
2. Create route in appropriate file in [src/routes/](backend/src/routes/)
3. Create service method if business logic needed
4. Add middleware: auth, rate limiting, validation
5. Log action with `logAction(userId, 'ACTION_NAME', tableName, recordId, oldVals, newVals, ip, ua)`
6. Return structured response with errorCode if error

Example: See [routes/documents.js](backend/src/routes/documents.js) `/generate` endpoint

### Adding a New Frontend Page

1. Create page component in [pages/](frontend/src/pages/) with routing
2. Use `useAuth()` hook to access user, token, login/logout
3. Call API via `api` service (sets auth header automatically)
4. Handle errors with `handleApiError(error)`
5. Add route to [App.jsx](frontend/src/App.jsx) with ProtectedRoute if needed

Example: See [pages/Dashboard.jsx](frontend/src/pages/Dashboard.jsx)

### Running Migrations

```bash
cd backend
npm run migrate           # Run pending migrations
npm run seed            # Populate sample data
```

Seeders create demo admin and user accounts. Edit [seeders/001-seed-users.js](backend/seeders/001-seed-users.js) to customize.

## Key Implementation Details

### Session Management
- No server-side sessions; JWT tokens are stateless
- Token expiry: 24h by default (JWT_EXPIRY env var)
- Logout just clears localStorage client-side

### Document Status Transitions
Valid transitions defined in [src/utils/documentStatus.js](backend/src/utils/documentStatus.js):
- `generated` → `in_use`, `archived`
- `in_use` → `archived`, `generated`
- `archived` → (none - final state)

### Email Service
- Configured via SMTP env vars (EMAIL_HOST, EMAIL_PORT, EMAIL_USER, EMAIL_PASSWORD)
- Supports Gmail or company SMTP
- Silent failures (logged but don't break operation)

### Rate Limiting
- Three limiters defined in [middleware/rateLimiter.js](backend/src/middleware/rateLimiter.js)
- Applied to routes in [app.js](backend/src/app.js)
- Returns 429 with retry-after header

## Common Issues & Solutions

**Race Condition in Document Number Generation**
- Multiple simultaneous requests can get same sequence number
- Fix: Use database transaction with SELECT ... FOR UPDATE or unique constraint

**Sequence Resets Daily**
- Query pattern: `document_number LIKE 'DEPT-CAT-YYYYMMDD%'`
- Ensures per-department, per-category, per-day sequences

**JWT Secret Not Set**
- Server validates on startup (see [server.js](backend/server.js))
- Must be 32+ chars in production
- Set as env var, never hardcode

**Token Expired Errors**
- Frontend interceptor checks 403 response and redirects to login
- See [services/api.js](frontend/src/services/api.js) response interceptor

## Testing Approach

- Backend: Jest unit tests (not yet added, recommended)
- Frontend: React Testing Library (not yet added, recommended)
- Integration: Supertest for API endpoint testing

## Deployment Checklist

- [ ] Set strong JWT_SECRET (32+ random characters)
- [ ] Configure EMAIL_* variables for production SMTP
- [ ] Set DB credentials and ensure production database exists
- [ ] Set NODE_ENV=production
- [ ] Set ALLOWED_ORIGINS to production domain
- [ ] Run database migrations on production
- [ ] Configure Docker with production settings
- [ ] Enable HTTPS
- [ ] Set up monitoring/logging
- [ ] Backup database regularly

## References

- Database migrations: [backend/migrations/](backend/migrations/)
- Sequelize models: [backend/src/models/](backend/src/models/)
- API routes: [backend/src/routes/](backend/src/routes/)
- Frontend pages: [frontend/src/pages/](frontend/src/pages/)
- Error codes: [backend/src/utils/errors.js](backend/src/utils/errors.js)
- Development guide: [DEVELOPMENT.md](DEVELOPMENT.md)
