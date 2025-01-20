const mongoose = require("mongoose");

const FormDataSchema = new mongoose.Schema({
  name: { type: String, required: true },
  socialMediaHandle: { type: String },
  imageRefs: { type: [String], required: true }, // Firebase references
});

module.exports = mongoose.model("FormData", FormDataSchema);
