// DEVELOPMENT.md
# Development Guide for DocNo

## Project Structure

```
DocNo/
├── backend/                    # Node.js/Express backend
│   ├── config/                 # Configuration files
│   ├── migrations/             # Database migrations
│   ├── seeders/                # Database seeders
│   ├── src/
│   │   ├── controllers/        # Route handlers
│   │   ├── middleware/         # Express middleware
│   │   ├── models/             # Sequelize models
│   │   ├── routes/             # API routes
│   │   ├── services/           # Business logic
│   │   ├── utils/              # Utilities
│   │   └── app.js              # Express app setup
│   ├── server.js               # Entry point
│   └── package.json
├── frontend/                   # React SPA
│   ├── src/
│   │   ├── components/         # React components
│   │   ├── pages/              # Page components
│   │   ├── services/           # API services
│   │   ├── context/            # Context providers
│   │   ├── utils/              # Utilities
│   │   ├── App.jsx             # Root component
│   │   └── main.jsx            # Entry point
│   ├── index.html
│   └── package.json
└── docker-compose.yml          # Docker setup
```

## Setup Instructions

### Prerequisites
- Node.js 18+
- MySQL 8.0+ (or use Docker)
- npm or yarn

### Backend Setup

1. **Install dependencies**
   ```bash
   cd backend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp ../.env.example .env
   # Edit .env with your settings
   ```

3. **Setup database**
   ```bash
   npm run migrate
   npm run seed
   ```

4. **Start development server**
   ```bash
   npm run dev
   ```

### Frontend Setup

1. **Install dependencies**
   ```bash
   cd frontend
   npm install
   ```

2. **Configure environment**
   ```bash
   cp .env.example .env
   # Edit .env if needed (usually works with defaults)
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

## Running with Docker

```bash
docker-compose up -d
```

Access:
- Frontend: http://localhost:3001
- Backend: http://localhost:3000
- Database: localhost:3306

## Available Scripts

### Backend
- `npm run dev` - Start development server with hot reload
- `npm start` - Start production server
- `npm test` - Run tests
- `npm run migrate` - Run database migrations
- `npm run seed` - Seed database with sample data
- `npm run lint` - Run ESLint

### Frontend
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run test` - Run tests
- `npm run preview` - Preview production build

## Testing

### Backend
```bash
npm test
npm test -- --coverage
```

### Frontend
```bash
npm test
npm test -- --coverage
```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register user
- `POST /api/auth/login` - Login user
- `POST /api/auth/logout` - Logout user
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/verify-email/:token` - Verify email

### Documents
- `POST /api/documents/generate` - Generate new document number
- `GET /api/documents/history` - Get user's document history
- `GET /api/documents/:id` - Get document details
- `PUT /api/documents/:id/status` - Update document status
- `GET /api/documents/search` - Search documents (admin)
- `GET /api/documents/stats` - Get statistics (admin)

### Users
- `GET /api/users/profile` - Get user profile
- `PUT /api/users/profile` - Update profile
- `PUT /api/users/change-password` - Change password

## Demo Credentials

```
Email: admin@company.com
Password: Admin@123

Email: john.doe@company.com
Password: User@1234
```

## Security Considerations

1. **Environment Variables**: Never commit `.env` files
2. **JWT Secret**: Use a strong, unique secret in production
3. **Database**: Use strong passwords, don't expose credentials
4. **HTTPS**: Use HTTPS in production
5. **CORS**: Configure allowed origins properly
6. **Rate Limiting**: Adjust limits based on your needs

## Troubleshooting

### Database Connection Issues
```bash
# Check MySQL is running
mysql -u root -p
# Use correct credentials in .env
```

### Port Already in Use
```bash
# Backend (change PORT in .env)
# Frontend (change port in vite.config.js)
```

### Module Not Found
```bash
# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
```

## Contributing

1. Create a feature branch
2. Make your changes
3. Run tests and linting
4. Submit a pull request

## Additional Resources

- [Express.js Documentation](https://expressjs.com/)
- [Sequelize Documentation](https://sequelize.org/)
- [React Documentation](https://react.dev/)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
