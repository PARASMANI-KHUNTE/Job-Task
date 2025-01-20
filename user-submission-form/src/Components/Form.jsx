import { useState } from "react";
import Navbar from "./Navbar";
import axios from "axios";
import {  toast } from 'react-toastify';
const Form = () => {
  const [formData, setFormData] = useState({
    name: "",
    socialMediaHandle: "",
    images: [],
  });
  const [isLoading, setIsLoading] = useState(false); // Loader state

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({ ...prev, images: files }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // Show loader
    try {
      const formDataToSend = new FormData();
      formDataToSend.append("name", formData.name);
      formDataToSend.append("socialMediaHandle", formData.socialMediaHandle);
      formData.images.forEach((image) => {
        formDataToSend.append("images", image);
      });

      const response = await axios.post("http://localhost:5000/api/form/upload-formData", formDataToSend, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      console.log("Server Response:", response.data);
      toast.success("Form submitted successfully!");
      setFormData({
        name: "",
        socialMediaHandle: "",
        images: [],
      });
    } catch (error) {
      console.error("Error submitting the form:", error);
      toast.error("Failed to submit the form. Please try again.");
    } finally {
      setIsLoading(false); // Hide loader
    }
  };

  return (
    <>
      <Navbar />
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <form
          className="w-full max-w-md bg-white p-6 rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-2xl font-bold mb-4 text-purple-700">Form</h1>

          {/* Name Input */}
          <div className="mb-4">
            <label
              htmlFor="name"
              className="text-purple-500 block text-sm font-medium mb-1"
            >
              Name:
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your name"
              required
            />
          </div>

          {/* Social Media Handle Input */}
          <div className="mb-4">
            <label
              htmlFor="socialMediaHandle"
              className="text-purple-500 block text-sm font-medium mb-1"
            >
              Social Media Handle:
            </label>
            <input
              type="text"
              id="socialMediaHandle"
              name="socialMediaHandle"
              value={formData.socialMediaHandle}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md p-2"
              placeholder="Enter your social media handle"
            />
          </div>

          {/* File Upload Input */}
          <div className="mb-4">
            <label
              htmlFor="images"
              className="text-purple-500 block text-sm font-medium mb-1"
            >
              Upload Images:
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={handleFileChange}
              className="w-full border border-gray-300 rounded-md p-2"
              accept="image/*"
            />
            <p className="text-sm text-gray-500 mt-1">
              You can select multiple images.
            </p>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-purple-500 text-white py-2 px-4 rounded-md hover:bg-purple-600 transition"
            disabled={isLoading} // Disable button when loading
          >
            {isLoading ? "Submitting..." : "Submit"} {/* Loader text */}
          </button>
        </form>
      </div>
    </>
  );
};

export default Form;
