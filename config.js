var admin = require("firebase-admin");

var serviceAccount_usa = require("./firebase_original_config.json");
var serviceAccount_india = require("./firebase_india_config.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount_usa),
});

var admin_india = admin.initializeApp(
  {
    credential: admin.credential.cert(serviceAccount_india),
  },
  "india"
);

exports.admin_dest = admin_india;
exports.admin_origin = admin;
