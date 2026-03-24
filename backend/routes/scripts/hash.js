const bcrypt = require("bcrypt");

bcrypt.hash("sardheri", 10).then(hash => {
    console.log(hash);
});