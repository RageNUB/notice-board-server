// firebaseAdmin.js
const admin = require("firebase-admin");
const serviceAccount = require("./firebaseServiceAccountKey.json"); // Download from Firebase console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

module.exports = admin;
