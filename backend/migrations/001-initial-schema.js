// migrations/001-initial-schema.js
module.exports = {
  async up(queryInterface, Sequelize) {
    // Create users table
    await queryInterface.createTable('Users', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      username: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        unique: true,
        allowNull: false,
      },
      password_hash: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(50),
      },
      is_active: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      is_admin: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      email_verified: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      verification_token: {
        type: Sequelize.STRING(100),
      },
      reset_token: {
        type: Sequelize.STRING(512),
      },
      reset_token_expiry: {
        type: Sequelize.DATE,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('Users', ['username']);
    await queryInterface.addIndex('Users', ['email']);

    // Create documents table
    await queryInterface.createTable('Documents', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      document_number: {
        type: Sequelize.STRING(50),
        unique: true,
        allowNull: false,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'Users',
          key: 'id',
        },
        onDelete: 'CASCADE',
      },
      full_name: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      document_title: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
      document_category: {
        type: Sequelize.ENUM('Report', 'Template', 'Presentation', 'Invoice', 'Contract', 'Proposal', 'Memo', 'Other'),
        allowNull: false,
      },
      department: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      status: {
        type: Sequelize.ENUM('generated', 'in_use', 'archived'),
        defaultValue: 'generated',
      },
      generated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      last_used_at: {
        type: Sequelize.DATE,
      },
      metadata: {
        type: Sequelize.JSON,
      },
      updated_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('Documents', ['document_number']);
    await queryInterface.addIndex('Documents', ['user_id']);
    await queryInterface.addIndex('Documents', ['document_category']);
    await queryInterface.addIndex('Documents', ['department']);
    await queryInterface.addIndex('Documents', ['generated_at']);

    // Create audit_logs table
    await queryInterface.createTable('AuditLogs', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      action: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      table_name: {
        type: Sequelize.STRING(50),
      },
      record_id: {
        type: Sequelize.INTEGER,
      },
      old_values: {
        type: Sequelize.JSON,
      },
      new_values: {
        type: Sequelize.JSON,
      },
      ip_address: {
        type: Sequelize.STRING(45),
      },
      user_agent: {
        type: Sequelize.TEXT,
      },
      created_at: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });

    await queryInterface.addIndex('AuditLogs', ['user_id']);
    await queryInterface.addIndex('AuditLogs', ['action']);
    await queryInterface.addIndex('AuditLogs', ['created_at']);
  },

  async down(queryInterface) {
    await queryInterface.dropTable('AuditLogs');
    await queryInterface.dropTable('Documents');
    await queryInterface.dropTable('Users');
  },
};
