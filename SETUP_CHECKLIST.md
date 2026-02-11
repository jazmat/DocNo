// SETUP_CHECKLIST.md
# DocNo Setup Checklist

## Before Starting

- [ ] Node.js 18+ installed (`node --version`)
- [ ] MySQL 8.0+ installed or Docker available
- [ ] Git configured with SSH keys
- [ ] Code editor ready (VS Code recommended)

## Backend Setup

- [ ] Navigate to backend folder: `cd backend`
- [ ] Install dependencies: `npm install`
- [ ] Copy env file: `cp ../.env.example .env`
- [ ] Update .env with your database credentials
  - [ ] DB_HOST (default: localhost)
  - [ ] DB_PORT (default: 3306)
  - [ ] DB_NAME (default: docgen_db)
  - [ ] DB_USER (default: docgen_user)
  - [ ] DB_PASSWORD (set a secure password)
  - [ ] JWT_SECRET (generate random 32+ char string)
  - [ ] EMAIL_* settings (for sending emails)
- [ ] Create MySQL database: `CREATE DATABASE docgen_db;`
- [ ] Run migrations: `npm run migrate`
- [ ] Seed database: `npm run seed`
- [ ] Start server: `npm run dev`
- [ ] Test health check: `curl http://localhost:3000/health`

## Frontend Setup

- [ ] Navigate to frontend folder: `cd frontend`
- [ ] Install dependencies: `npm install`
- [ ] Copy env file: `cp .env.example .env`
- [ ] Start dev server: `npm run dev`
- [ ] Open browser: `http://localhost:3001`

## Initial Testing

- [ ] Frontend loads without errors
- [ ] Can navigate to login page
- [ ] Login with demo credentials:
  - [ ] Email: `admin@company.com`
  - [ ] Password: `Admin@123`
- [ ] Dashboard loads successfully
- [ ] Can generate a document number
- [ ] Can view document history
- [ ] Can update profile
- [ ] Can logout successfully

## Docker Setup (Optional)

- [ ] Have Docker and Docker Compose installed
- [ ] Run: `docker-compose up -d`
- [ ] Wait for services to start (~30 seconds)
- [ ] Access frontend: `http://localhost:3001`
- [ ] Access backend: `http://localhost:3000`
- [ ] View logs: `docker-compose logs -f`
- [ ] Stop services: `docker-compose down`

## Database Setup

### MySQL Direct Setup
```bash
# Create database
mysql -u root -p
CREATE DATABASE docgen_db;
CREATE USER 'docgen_user'@'localhost' IDENTIFIED BY 'docgen_password';
GRANT ALL PRIVILEGES ON docgen_db.* TO 'docgen_user'@'localhost';
FLUSH PRIVILEGES;
EXIT;

# Run migrations
cd backend
npm run migrate
npm run seed
```

### Docker MySQL Setup
```bash
# MySQL is automatically set up by docker-compose
# Connection: localhost:3306
# User: docgen_user
# Password: docgen_password
# Database: docgen_db
```

## Email Configuration

### Using Gmail
1. Enable 2-Factor Authentication on Gmail
2. Create App Password for DocNo
3. Update .env:
   ```
   EMAIL_HOST=smtp.gmail.com
   EMAIL_PORT=587
   EMAIL_USER=your-email@gmail.com
   EMAIL_PASSWORD=your-app-password
   ```

### Using Company SMTP
1. Get SMTP credentials from IT
2. Update .env with provided credentials

### For Development (No Email)
- Leave EMAIL_* settings blank or use dummy values
- Emails won't be sent but won't break functionality

## Troubleshooting

### Port 3000 or 3001 Already in Use
```bash
# Find process on port
lsof -i :3000
# Kill process
kill -9 <PID>
# Or change port in .env or vite.config.js
```

### Database Connection Error
```bash
# Check MySQL is running
mysql -u root -p

# Check backend .env has correct credentials
cat backend/.env | grep DB_

# Check database exists
mysql -u docgen_user -p docgen_db -e "SELECT 1"
```

### Dependencies Installation Failed
```bash
# Clear cache
rm -rf node_modules package-lock.json
npm cache clean --force

# Reinstall
npm install
```

### Frontend Can't Connect to Backend
- Check backend is running: `curl http://localhost:3000/health`
- Check ALLOWED_ORIGINS in backend .env
- Check proxy settings in frontend vite.config.js
- Check browser console for CORS errors

## Production Deployment

- [ ] Generate strong JWT_SECRET (use: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`)
- [ ] Set NODE_ENV=production
- [ ] Configure production database
- [ ] Set up email service (Gmail App Password or company SMTP)
- [ ] Enable HTTPS on your domain
- [ ] Set ALLOWED_ORIGINS to production domain only
- [ ] Run database migrations on production
- [ ] Set up automated backups
- [ ] Configure monitoring and alerting
- [ ] Test full workflow on production

## Quick Commands Reference

### Backend
```bash
cd backend
npm run dev              # Dev server with hot reload
npm start               # Production server
npm test                # Run tests
npm run migrate         # Run migrations
npm run seed            # Seed database
npm run lint            # Lint code
```

### Frontend
```bash
cd frontend
npm run dev             # Dev server
npm run build           # Production build
npm run test            # Run tests
npm run preview         # Preview prod build
```

### Docker
```bash
docker-compose up -d           # Start all services
docker-compose down            # Stop all services
docker-compose logs -f         # View logs
docker-compose ps              # Check status
```

## Documentation Links

- [Development Guide](DEVELOPMENT.md)
- [Copilot Instructions](.github/copilot-instructions.md)
- [API Routes](backend/src/routes/)
- [Database Schema](backend/migrations/001-initial-schema.js)

## Support

For issues or questions:
1. Check DEVELOPMENT.md for common problems
2. Check database migrations for schema
3. Review error logs in backend/logs/
4. Check browser console for frontend errors
5. Review network tab in browser dev tools

## Next Steps After Setup

1. **Test the workflow**: Generate a document number, check it appears in history
2. **Configure email**: Set up SMTP to receive notifications
3. **Review code**: Understand the architecture by reading key files
4. **Add tests**: Implement unit and integration tests
5. **Deploy**: Follow production deployment checklist
6. **Monitor**: Set up logging and monitoring for production
