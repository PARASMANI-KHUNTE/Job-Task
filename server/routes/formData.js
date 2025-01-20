const express = require("express");
const multer = require("multer");
const bucket = require("../config/config");
const FormData = require("../models/FormData");

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() }); // In-memory storage

// Upload Form Data
router.post("/upload-formData", upload.array("images", 10), async (req, res) => {
  const { name, socialMediaHandle } = req.body;
  const files = req.files;

  try {
    const imageRefs = [];

    // Upload files to Firebase
    for (const file of files) {
      const fileName = `images/${Date.now()}-${file.originalname}`;
      const fileUpload = bucket.file(fileName);

      await fileUpload.save(file.buffer, {
        metadata: { contentType: file.mimetype },
        public: true, // This makes the file publicly accessible
      });
      
      const publicUrl = `https://storage.googleapis.com/${bucket.name}/${fileName}`;
      imageRefs.push(publicUrl);
      
    }

    // Save form data to MongoDB
    const formData = new FormData({ name, socialMediaHandle, imageRefs });
    await formData.save();

    res.status(200).json({ message: "Form data uploaded successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error uploading form data" });
  }
});

// Get All Form Data
router.get("/get-formData", async (req, res) => {
  try {
    const data = await FormData.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: "Error fetching form data" });
  }
});


module.exports = router;
