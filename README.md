# DocNo – Document Number Generator

DocNo is a lightweight internal system for generating unique document reference numbers for organizations.

The system ensures that every document receives a structured, sequential number based on department, category, and year.

Example document number:

HR-MEM-2026-0001

---

## Features

* Secure user authentication (JWT)
* Admin approval workflow for new users
* Department and category management
* Transaction-safe document numbering
* Email notifications
* Allowed email domain restriction
* Audit logs
* Automated database backup
* Role system

  * User
  * Admin
  * SuperAdmin

---

## Technology Stack

Frontend

* React
* Vite
* TailwindCSS

Backend

* Node.js
* Express.js
* MySQL

Other Components

* JWT authentication
* Nodemailer (SMTP email)
* MySQL transaction-safe numbering

---

## Project Structure

DocNo
├── backend
│   ├── config
│   ├── middleware
│   ├── routes
│   ├── services
│   ├── utils
│   ├── migrations
│   └── server.js

├── frontend
│   ├── src
│   └── public

├── scripts
│   └── backup_db.sh

├── backups

---

## Installation (Development)

Backend

cd backend
npm install
npm run dev

Frontend

cd frontend
npm install
npm run dev

---

## Database

Run the schema:

backend/migrations/001_docno_schema.sql

---

## Environment Variables

Create `.env` in backend:

PORT=7050

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=docno

JWT_SECRET=your_secret

SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=[your_email@gmail.com](mailto:your_email@gmail.com)
SMTP_PASS=app_password

---

## Deployment

Frontend is built using:

npm run build

Backend runs using:

node server.js

---

## License

Internal company software – Esigma Technologies
