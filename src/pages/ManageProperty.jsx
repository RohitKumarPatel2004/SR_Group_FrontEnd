import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL } from '../baseurl';
import LoadingButton from "../components/LoadingButton";

const API = `${BASE_URL}/property`;

const fieldLabels = {
  title: "Title",
  location: "Location",
  area: "Area (sq.ft)",
  roadDistance: "Road Distance",
  metroDistance: "Metro Distance",
  bijali: "Electricity",
  pani: "Water",
  sivar: "Sewage",
  nearSchool: "Nearby School",
  developed: "Developed",
  description: "Description",
  price: "Price",
  image: "Image / Video",
};

const booleanFields = ["bijali", "pani", "sivar", "developed"];
const ALLOWED_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
const MAX_SIZE = 500 * 1024;
const MIN_SIZE = 10 * 1024;

const ManageProperty = () => {
  const [formData, setFormData] = useState({});
  const [properties, setProperties] = useState([]);
  const [editId, setEditId] = useState(null);
  const [visibleFields, setVisibleFields] = useState(Object.keys(fieldLabels));
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const [imageError, setImageError] = useState("");
  const [uploadType, setUploadType] = useState("image");

  const [submitLoading, setSubmitLoading] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [editLoading, setEditLoading] = useState(null);

  useEffect(() => {
    fetchProperties();
  }, []);

  useEffect(() => {
    if (error || message) {
      const timer = setTimeout(() => {
        setError("");
        setMessage("");
      }, 4000);
      return () => clearTimeout(timer);
    }
  }, [error, message]);

  const toggleVisibility = (field) => {
    setVisibleFields((prev) =>
      prev.includes(field) ? prev.filter((f) => f !== field) : [...prev, field]
    );
  };

  const fetchProperties = async () => {
    try {
      const res = await axios.get(`${API}/all`);
      setProperties(res.data);
    } catch (err) {
      setError("❌ Failed to fetch properties.");
    }
  };

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    if (type === "file") {
      const file = files[0];
      if (uploadType === "image") {
        if (!ALLOWED_FORMATS.includes(file.type)) {
          setImageError("❌ Only JPG, JPEG, and PNG formats are allowed.");
          return;
        }
        if (file.size > MAX_SIZE) {
          setImageError("❌ Image must be less than 500KB.");
          return;
        }
        if (file.size < MIN_SIZE) {
          setImageError("❌ Image must be at least 10KB.");
          return;
        }
        setImageError("");
        setFormData({ ...formData, image: file, video: null });
      } else {
        setFormData({ ...formData, video: file, image: null });
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (uploadType === "image" && imageError) {
      setError("❌ Fix image error before submitting.");
      return;
    }

    setSubmitLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val !== null && val !== undefined) {
        data.append(key, val);
      }
    });

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, data);
        setMessage("✏️ Property updated.");
        setEditId(null);
      } else {
        await axios.post(API, data);
        setMessage("✅ Property added.");
      }
      setFormData({});
      setImageError("");
      fetchProperties();
    } catch (err) {
      const msg = err.response?.data?.error || "❌ Failed to save property.";
      setError(msg);
    } finally {
      setSubmitLoading(false);
    }
  };

  const handleEdit = (property) => {
    setEditLoading(property.id);
    setTimeout(() => {
      setFormData(property);
      setEditId(property.id);
      setMessage("");
      setError("");
      setImageError("");
      setUploadType(property.video ? "video" : "image");
      setEditLoading(null);
    }, 600);
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this property?");
    if (!confirmDelete) return;

    setDeleteLoading(id);
    try {
      const res = await axios.delete(`${API}/${id}`);
      setMessage(res.data.message || "🗑️ Property deleted.");
      fetchProperties();
    } catch (err) {
      setError("❌ Failed to delete property.");
    } finally {
      setDeleteLoading(null);
    }
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-[#005550] mb-4">🏠 Manage Property</h1>

      {message && (
        <div className="bg-green-100 text-green-800 border border-green-400 px-4 py-2 rounded mb-4">
          {message}
        </div>
      )}
      {error && (
        <div className="bg-red-100 text-red-800 border border-red-400 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Field Toggle */}
      <div className="mb-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
        {Object.keys(fieldLabels).map((field) => (
          <label key={field} className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={visibleFields.includes(field)}
              onChange={() => toggleVisibility(field)}
            />
            <span className="text-[#005550] text-sm">{fieldLabels[field]}</span>
          </label>
        ))}
      </div>

      {/* Add/Edit Form */}
      <form
        onSubmit={handleSubmit}
        className="border border-[#005550] p-6 rounded-xl mb-10 shadow-md transition hover:shadow-lg"
        encType="multipart/form-data"
      >
        <h2 className="text-xl font-semibold text-yellow-600 mb-4">
          {editId ? "✏️ Edit Property" : "➕ Add New Property"}
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {visibleFields.map((field) => (
            <div key={field}>
              <label className="text-sm text-[#005550] font-medium">
                {fieldLabels[field]}
              </label>

              {booleanFields.includes(field) ? (
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    name={field}
                    checked={!!formData[field]}
                    onChange={handleChange}
                    className="h-4 w-4"
                  />
                  <span>{formData[field] ? "Yes" : "No"}</span>
                </div>
              ) : field === "description" ? (
                <textarea
                  name={field}
                  rows="3"
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              ) : field === "image" ? (
                <>
                  <div className="flex gap-4 mb-2">
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="uploadType"
                        value="image"
                        checked={uploadType === "image"}
                        onChange={() => setUploadType("image")}
                      />
                      Image
                    </label>
                    <label className="flex items-center gap-1">
                      <input
                        type="radio"
                        name="uploadType"
                        value="video"
                        checked={uploadType === "video"}
                        onChange={() => setUploadType("video")}
                      />
                      Video
                    </label>
                  </div>

                  {uploadType === "image" ? (
                    <>
                      <input
                        type="file"
                        name="image"
                        onChange={handleChange}
                        accept="image/*"
                        className="w-full border p-2 rounded"
                      />
                      {imageError && (
                        <p className="text-red-600 text-sm mt-1">{imageError}</p>
                      )}
                      {formData.image && typeof formData.image === "object" && (
                        <img
                          src={URL.createObjectURL(formData.image)}
                          alt="Preview"
                          className="w-full h-32 object-cover mt-2 rounded"
                        />
                      )}
                      {formData.image && typeof formData.image === "string" && (
                        <img
                          src={formData.image}
                          alt="Existing"
                          className="w-full h-32 object-cover mt-2 rounded"
                        />
                      )}
                    </>
                  ) : (
                    <>
                      <input
                        type="file"
                        name="video"
                        onChange={handleChange}
                        accept="video/*"
                        className="w-full border p-2 rounded"
                      />
                      {formData.video && typeof formData.video === "object" && (
                        <video
                          src={URL.createObjectURL(formData.video)}
                          controls
                          className="w-full h-32 object-cover mt-2 rounded"
                        />
                      )}
                      {formData.video && typeof formData.video === "string" && (
                        <video
                          src={formData.video}
                          controls
                          className="w-full h-32 object-cover mt-2 rounded"
                        />
                      )}
                    </>
                  )}
                </>
              ) : (
                <input
                  type="text"
                  name={field}
                  value={formData[field] || ""}
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
              )}
            </div>
          ))}
        </div>

        <LoadingButton
          isLoading={submitLoading}
          type="submit"
          className="mt-4 bg-[#005550] text-white px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
        >
          {editId ? "Update Property" : "Add Property"}
        </LoadingButton>
      </form>

      {/* Property Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div
            key={property.id}
            className="p-4 rounded-xl shadow-md hover:shadow-lg border border-gray-200 transition"
          >
            {visibleFields.map((field) => (
              <p key={field} className="text-sm text-gray-800 mb-1">
                <strong className="text-[#005550]">{fieldLabels[field]}:</strong>{" "}
                {field === "image" ? (
                  property.image ? (
                    <img
                      src={property.image}
                      alt="Property"
                      className="h-20 mt-2 rounded shadow"
                    />
                  ) : property.video ? (
                    <video
                      src={property.video}
                      controls
                      className="h-20 mt-2 rounded shadow"
                    />
                  ) : (
                    "N/A"
                  )
                ) : booleanFields.includes(field) ? (
                  property[field] ? "Yes" : "No"
                ) : (
                  property[field] === "N/A" || property[field] === "0" ? "N/A" : property[field]
                )}
              </p>
            ))}
            <div className="mt-3 flex gap-3">
              <LoadingButton
                isLoading={editLoading === property.id}
                onClick={() => handleEdit(property)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </LoadingButton>
              <LoadingButton
                isLoading={deleteLoading === property.id}
                onClick={() => handleDelete(property.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </LoadingButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProperty;