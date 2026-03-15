/* =========================================================
   DATABASE
========================================================= */

CREATE DATABASE IF NOT EXISTS docno;
USE docno;


/* =========================================================
   DEPARTMENTS
========================================================= */

CREATE TABLE departments (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    prefix VARCHAR(10) NOT NULL UNIQUE,

    sequence_length INT DEFAULT 4,
    yearly_reset BOOLEAN DEFAULT TRUE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* =========================================================
   CATEGORIES
========================================================= */

CREATE TABLE categories (
    id INT AUTO_INCREMENT PRIMARY KEY,

    name VARCHAR(100) NOT NULL,
    prefix VARCHAR(10) NOT NULL UNIQUE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* =========================================================
   USERS
========================================================= */

CREATE TABLE users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255) NOT NULL UNIQUE,
    password_hash VARCHAR(255),

    department_id INT NULL,

    role ENUM('user','admin','superadmin') DEFAULT 'user',

    is_admin BOOLEAN DEFAULT FALSE,
    is_super_admin BOOLEAN DEFAULT FALSE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE SET NULL
);


/* =========================================================
   PENDING USERS (REGISTRATION APPROVAL)
========================================================= */

CREATE TABLE pending_users (

    id INT AUTO_INCREMENT PRIMARY KEY,

    email VARCHAR(255) NOT NULL,
    department_id INT NOT NULL,

    requested_role ENUM('user','admin') DEFAULT 'user',

    status ENUM('pending','approved','rejected') DEFAULT 'pending',

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE
);


/* =========================================================
   DOCUMENT SEQUENCES
========================================================= */

CREATE TABLE numbering_sequences (

    id INT AUTO_INCREMENT PRIMARY KEY,

    department_id INT NOT NULL,
    category_id INT NOT NULL,

    year INT NOT NULL,

    current_value INT DEFAULT 0,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    UNIQUE KEY unique_sequence (
        department_id,
        category_id,
        year
    ),

    FOREIGN KEY (department_id)
        REFERENCES departments(id)
        ON DELETE CASCADE,

    FOREIGN KEY (category_id)
        REFERENCES categories(id)
        ON DELETE CASCADE
);


/* =========================================================
   DOCUMENTS
========================================================= */

CREATE TABLE documents (

    id INT AUTO_INCREMENT PRIMARY KEY,

    document_number VARCHAR(100) NOT NULL UNIQUE,

    department_id INT NOT NULL,
    category_id INT NOT NULL,

    created_by INT NOT NULL,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (department_id)
        REFERENCES departments(id),

    FOREIGN KEY (category_id)
        REFERENCES categories(id),

    FOREIGN KEY (created_by)
        REFERENCES users(id)
);


/* =========================================================
   ALLOWED EMAIL DOMAINS
========================================================= */

CREATE TABLE allowed_email_domains (

    id INT AUTO_INCREMENT PRIMARY KEY,

    domain VARCHAR(255) NOT NULL UNIQUE,

    is_active BOOLEAN DEFAULT TRUE,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);


/* =========================================================
   AUDIT LOGS
========================================================= */

CREATE TABLE audit_logs (

    id INT AUTO_INCREMENT PRIMARY KEY,

    user_id INT,
    action VARCHAR(255),

    entity_type VARCHAR(50),
    entity_id INT,

    details TEXT,

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,

    FOREIGN KEY (user_id)
        REFERENCES users(id)
        ON DELETE SET NULL
);


/* =========================================================
   PERFORMANCE INDEXES
========================================================= */

CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_documents_number ON documents(document_number);

CREATE INDEX idx_sequences_lookup
ON numbering_sequences(department_id, category_id, year);

CREATE INDEX idx_pending_status
ON pending_users(status);