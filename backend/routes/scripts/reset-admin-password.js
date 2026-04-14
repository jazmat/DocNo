require("dotenv").config();

const bcrypt = require("bcryptjs");
const db = require("./config/db");

async function resetAdminPassword() {

    const newPassword = "Admin123!";

    const hash = await bcrypt.hash(newPassword, 10);

    //console.log("Generated Hash:", hash);

    await db.execute(
        "UPDATE users SET password_hash=? WHERE is_super_admin=1",
        [hash]
    );

    //console.log("✅ Super Admin password reset successfully");
    //console.log("Email remains unchanged");
    //console.log("Login Password:", newPassword);

    process.exit();
}

resetAdminPassword();