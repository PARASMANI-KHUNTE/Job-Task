const admin = require("firebase-admin");
const firebaseConfig = require("/etc/secrets/firebaseConfig.json");
const dotenv = require('dotenv')
dotenv.config()
admin.initializeApp({
  credential: admin.credential.cert(firebaseConfig),
  storageBucket: process.env.bucket, // Replace with your Firebase bucket name
});

const bucket = admin.storage().bucket();

module.exports = bucket;
