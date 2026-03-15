CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255),
  department_id INT,
  role ENUM('user','admin','superadmin') DEFAULT 'user',
  is_admin BOOLEAN DEFAULT FALSE,
  is_super_admin BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE pending_users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) NOT NULL,
  department_id INT,
  requested_role ENUM('user','admin'),
  status ENUM('pending','approved','rejected') DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE departments (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  prefix VARCHAR(10) NOT NULL,
  sequence_length INT DEFAULT 4,
  yearly_reset BOOLEAN DEFAULT TRUE,
  is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE categories (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  prefix VARCHAR(10) NOT NULL,
  is_active BOOLEAN DEFAULT TRUE
);
CREATE TABLE numbering_sequences (
  id INT AUTO_INCREMENT PRIMARY KEY,
  department_id INT,
  category_id INT,
  year INT,
  current_value INT DEFAULT 0,
  UNIQUE KEY seq_unique (department_id, category_id, year)
);
CREATE TABLE documents (
  id INT AUTO_INCREMENT PRIMARY KEY,
  document_number VARCHAR(100) UNIQUE,
  department_id INT,
  category_id INT,
  created_by INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
CREATE TABLE allowed_email_domains (
  id INT AUTO_INCREMENT PRIMARY KEY,
  domain VARCHAR(255) UNIQUE,
  is_active BOOLEAN DEFAULT TRUE
);
INSERT INTO users (
  email,
  password_hash,
  role,
  is_admin,
  is_super_admin
)
VALUES (
  'superadmin@company.com',
  '$2b$10$hashedpassword',
  'superadmin',
  1,
  1
);
