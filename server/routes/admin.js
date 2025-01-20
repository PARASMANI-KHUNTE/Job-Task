const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const Admin = require("../models/Admin");
const router = express.Router();


router.post("/admin-login", async (req, res) => {
    const { username, password } = req.body; // Ensure req.body contains the correct structure
  
    try {
      const admin = await Admin.findOne({ username });
      if (!admin) {
        return res.status(404).json({ error: "Admin not found" });
      }
  
      const isPasswordValid = await bcrypt.compare(password, admin.password);
      if (!isPasswordValid) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
  
      const token = jwt.sign({ id: admin._id },process.env.secretkey, { expiresIn: "1h" });
  
      res.json({ token });
    } catch (error) {
      console.error("Server error:", error);
      res.status(500).json({ error: "Server error" });
    }
  });

  router.post('/Encrypt', async (req, res) => {
    try {
        const { password } = req.body;

        // Ensure the password is provided
        if (!password) {
            return res.status(400).json({ error: "Password is required" });
        }

        // Hash the password with salt rounds (recommended: 10)
        const hashedPassword = await bcrypt.hash(password, 10);

        // Return the entered password and hashed password
        res.status(200).json({
            enteredPassword: password,
            hashed: hashedPassword
        });
    } catch (error) {
        console.error("Error encrypting password:", error);
        res.status(500).json({ error: "Server error" });
    }
});



// Token verification route
router.post("/verifyToken", (req, res) => {
    const { token } = req.body;
  
    if (!token) {
      return res.status(400).json({ error: "Token is required" });
    }
  
    try {
      // Verify the token
      const decoded = jwt.verify(token,process.env.secretkey );
      return res.status(200).json({ message: "Token is valid", decoded });
    } catch (error) {
      // Handle token errors
      if (error.name === "TokenExpiredError") {
        return res.status(401).json({ error: "Token has expired" });
      } else if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ error: "Invalid token" });
      } else {
        return res.status(500).json({ error: "Server error" });
      }
    }
  });

module.exports = router;
