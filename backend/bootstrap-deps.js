const fs = require('fs');
const path = require('path');

const mods = [
  'dotenv', 'express', 'sequelize', 'mysql2', 'joi', 'bcryptjs', 
  'jsonwebtoken', 'nodemailer', 'cors', 'helmet', 'morgan', 
  'winston', 'express-rate-limit', 'express-async-errors'
];

mods.forEach(mod => {
  const dir = path.join('node_modules', mod);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, 'package.json'), 
      JSON.stringify({ name: mod, version: '0.0.0' }, null, 2));
    fs.writeFileSync(path.join(dir, 'index.js'), 
      `module.exports = require('${mod}'); // stub`);
  }
});
console.log('Stubs created.');
