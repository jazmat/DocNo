// src/utils/envValidator.js
const logger = require("./logger");

const REQUIRED_ENV_VARS = [
  "JWT_SECRET",
  "DB_HOST",
  "DB_PORT",
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
];

const REQUIRED_PRODUCTION_VARS = [
  "EMAIL_HOST",
  "EMAIL_PORT",
  "EMAIL_USER",
  "EMAIL_PASSWORD",
];

const UNSAFE_JWT_SECRETS = [
  "your_jwt_secret_key",
  "your_super_secret_jwt_key_change_in_production",
  "secret",
  "jwt_secret",
  "change_me",
  "default",
];

const validateEnvironment = () => {
  const missingVars = [];
  const warnings = [];

  REQUIRED_ENV_VARS.forEach((envVar) => {
    if (!process.env[envVar]) {
      missingVars.push(envVar);
    }
  });

  // Check email vars only in production or if explicitly set
  if (process.env.NODE_ENV === "production") {
    REQUIRED_PRODUCTION_VARS.forEach((envVar) => {
      if (!process.env[envVar]) {
        missingVars.push(envVar);
      }
    });
  } else {
    // In development, warn if email vars are missing but don't fail
    const missingEmailVars = REQUIRED_PRODUCTION_VARS.filter(
      (envVar) => !process.env[envVar],
    );
    if (missingEmailVars.length > 0) {
      warnings.push(
        `Email configuration missing: ${missingEmailVars.join(", ")} - Email features will not work`,
      );
    }
  }

  // Validate JWT_SECRET strength
  if (process.env.JWT_SECRET) {
    const jwtSecret = process.env.JWT_SECRET;

    // Check for unsafe default values
    if (UNSAFE_JWT_SECRETS.includes(jwtSecret.toLowerCase())) {
      missingVars.push("JWT_SECRET (using unsafe default value)");
    }

    // Check minimum length (32 characters recommended)
    if (jwtSecret.length < 32) {
      if (process.env.NODE_ENV === "production") {
        missingVars.push(
          "JWT_SECRET (too short - minimum 32 characters required for production)",
        );
      } else {
        warnings.push("JWT_SECRET is shorter than recommended 32 characters");
      }
    }

    // Check for complexity in production
    if (process.env.NODE_ENV === "production") {
      const hasUpperCase = /[A-Z]/.test(jwtSecret);
      const hasLowerCase = /[a-z]/.test(jwtSecret);
      const hasNumbers = /\d/.test(jwtSecret);
      const hasSpecialChars = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(
        jwtSecret,
      );

      const complexityScore = [
        hasUpperCase,
        hasLowerCase,
        hasNumbers,
        hasSpecialChars,
      ].filter(Boolean).length;

      if (complexityScore < 3) {
        warnings.push(
          "JWT_SECRET should contain uppercase, lowercase, numbers, and special characters for better security",
        );
      }
    }
  }

  // Log warnings
  if (warnings.length > 0) {
    logger.warn(`Environment warnings:\n${warnings.join("\n")}`);
  }

  if (missingVars.length > 0) {
    logger.error(
      `Missing or invalid environment variables:\n${missingVars.join("\n")}`,
    );
    return false;
  }

  logger.info("Environment validation passed");
  return true;
};

module.exports = {
  validateEnvironment,
};
