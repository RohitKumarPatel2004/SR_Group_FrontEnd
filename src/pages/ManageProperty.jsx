import React, { useEffect, useState } from "react";
import axios from "axios";
import { BASE_URL ,IMAGE_URL } from '../baseurl';


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
  image: "Image",
};

const booleanFields = ["bijali", "pani", "sivar", "developed"];

const ManageProperty = () => {
  const [formData, setFormData] = useState({});
  const [properties, setProperties] = useState([]);
  const [editId, setEditId] = useState(null);
  const [visibleFields, setVisibleFields] = useState(Object.keys(fieldLabels));

  const toggleVisibility = (field) => {
    setVisibleFields((prev) =>
      prev.includes(field)
        ? prev.filter((f) => f !== field)
        : [...prev, field]
    );
  };

  const fetchProperties = async () => {
    const res = await axios.get(`${API}/all`);
    setProperties(res.data);
  };

  useEffect(() => {
    fetchProperties();
  }, []);

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: type === "file" ? files[0] : type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();

    Object.entries(formData).forEach(([key, val]) => {
      data.append(key, val);
    });

    try {
      if (editId) {
        await axios.put(`${API}/${editId}`, data);
        setEditId(null);
      } else {
        await axios.post(API, data);
      }
      setFormData({});
      fetchProperties();
    } catch (err) {
      console.error("Error saving property", err);
    }
  };

  const handleEdit = (property) => {
    setFormData(property);
    setEditId(property.id);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchProperties();
  };

  return (
    <div className="p-6 bg-white min-h-screen">
      <h1 className="text-3xl font-bold text-[#005550] mb-4">
        🏠 Manage Property
      </h1>

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
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
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
        <button
          type="submit"
          className="mt-4 bg-[#005550] text-white px-6 py-2 rounded hover:bg-yellow-500 transition duration-300"
        >
          {editId ? "Update Property" : "Add Property"}
        </button>
      </form>

      {/* Property Cards - 3 per row */}
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
                  <img
                    src={`${IMAGE_URL}/${property.image}`}
                    alt="Property"
                    className="h-20 mt-2 rounded shadow"
                  />
                ) : field === "bijali" || field === "pani" || field === "sivar" || field === "developed" ? (
                  property[field] ? "Yes" : "No"
                ) : (
                  property[field] === "N/A" || property[field] === "0" ? "N/A" : property[field]
                )}
              </p>
            ))}
            <div className="mt-3 flex gap-3">
              <button
                onClick={() => handleEdit(property)}
                className="bg-yellow-500 text-white px-4 py-1 rounded hover:bg-yellow-600 transition"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(property.id)}
                className="bg-red-600 text-white px-4 py-1 rounded hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ManageProperty;
