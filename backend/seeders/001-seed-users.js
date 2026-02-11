// seeders/001-seed-users.js
const bcrypt = require('bcryptjs');

module.exports = {
  async up(queryInterface) {
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('Admin@123', salt);
    const userPassword = await bcrypt.hash('User@1234', salt);

    await queryInterface.bulkInsert('Users', [
      {
        username: 'admin',
        email: 'admin@company.com',
        password_hash: adminPassword,
        full_name: 'Admin User',
        department: 'IT',
        is_active: true,
        is_admin: true,
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'johndoe',
        email: 'john.doe@company.com',
        password_hash: userPassword,
        full_name: 'John Doe',
        department: 'HR',
        is_active: true,
        is_admin: false,
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        username: 'jane_smith',
        email: 'jane.smith@company.com',
        password_hash: userPassword,
        full_name: 'Jane Smith',
        department: 'Finance',
        is_active: true,
        is_admin: false,
        email_verified: true,
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete('Users', null, {});
  },
};
