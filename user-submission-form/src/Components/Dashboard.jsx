import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {  toast } from 'react-toastify';
const Dashboard = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [previewImage, setPreviewImage] = useState(null);

  

  const HandleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  // Validate token function
  const validateToken = async (token) => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/admin/verifyToken",
        { token }
      );
      return response.status === 200;
    } catch (error) {
      return false;
    }
  };

  // Fetch data function
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/form/get-formData");
      setData(response.data);
    } catch (error) {
        toast.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  // Check authentication and fetch data
  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (!token) {
      navigate("/");
    } else {
      validateToken(token).then((isValid) => {
        if (!isValid) {
          navigate("/");
        } else {
          fetchData();
        }
      });
    }
  }, [navigate]);

  // If loading
  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-xl font-semibold text-gray-600">Loading...</div>
      </div>
    );
  }

  // Filter data based on search query
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-lg shadow-md">
  {/* Logo and Title Section */}
  <div className="flex gap-4 items-center">
    <img src="catLogo.png" width={50} alt="Logo" className="rounded-full shadow-sm" />
    <div>
      <h1 className="text-2xl font-semibold text-purple-700">Collector</h1>
      <h2 className="text-lg font-medium text-gray-500">Dashboard</h2>
    </div>
  </div>

  {/* Search and Logout Section */}
  <div className="flex items-center gap-4">
    {/* Search Bar */}
    <div className="relative">
      <input
        type="text"
        placeholder="Search by name..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-gray-300 rounded-full pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400 shadow-sm"
      />
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 h-5 text-gray-400 absolute top-1/2 left-3 transform -translate-y-1/2"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M8 16l4-4m0 0l4 4m-4-4v12m0-12l4-4m-4 4L8 8"
        />
      </svg>
    </div>

    {/* Logout Button */}
    <button
      onClick={HandleLogout}
      className="bg-red-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-red-600 transition focus:outline-none"
    >
      Logout
    </button>
  </div>
</div>


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredData.map((item) => (
          <div
            key={item._id}
            className="bg-white shadow-md rounded-lg p-4 flex flex-col"
          >
            <h2 className="text-lg font-semibold mb-2">{item.name}</h2>
            <a
              href={item.socialMediaHandle}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline mb-4"
            >
              Social Media Handle
            </a>
            <div className="grid grid-cols-3 gap-2">
              {item.imageRefs.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  className="w-20 h-20 object-cover rounded-lg cursor-pointer"
                  onClick={() => setPreviewImage(image)} // Set the image for preview
                  onError={(e) => (e.target.src = "/fallback-image.png")} // Fallback for broken images
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {previewImage && (
       <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
       <div className="p-1  rounded-lg shadow-lg relative max-w-lg w-full">
         {/* Close Button */}
         <button
           onClick={() => setPreviewImage(null)}
           className="absolute top-4 right-4 text-gray-600 hover:text-purple-500 focus:outline-none"
         >
           <svg
             xmlns="http://www.w3.org/2000/svg"
             className=" h-6 w-6"
             fill="none"
             viewBox="0 0 24 24"
             stroke="currentColor"
           >
             <path
               strokeLinecap="round"
               strokeLinejoin="round"
               strokeWidth={2}
               d="M6 18L18 6M6 6l12 12"
             />
           </svg>
         </button>
     
         {/* Image Preview */}
         <img
           src={previewImage}
           alt="Preview"
           className="w-full h-auto rounded-lg mb-4"
         />
     
         {/* Footer/Additional Actions (Optional) */}
         
       </div>
     </div>
     
      )}
    </div>
  );
};

export default Dashboard;
