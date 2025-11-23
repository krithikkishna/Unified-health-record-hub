const bcrypt = require('bcryptjs');

bcrypt.hash('@Krithik_2304', 10).then(hash => {
  console.log("Use this passwordHash in MongoDB:");
  console.log(hash);
});
