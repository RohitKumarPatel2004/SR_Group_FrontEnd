import React, { useState } from "react";

export default function ManageProperty() {
  const [formData, setFormData] = useState({
    title: "",
    location: "",
    area: "",
    roadDistance: "",
    metroDistance: "",
    bijali: false,
    pani: false,
    sivar: false,
    nearSchool: "",
    developed: false,
    description: "",
    price: "",
    image: null,
    video: null,
  });

  const [imageError, setImageError] = useState("");

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
    video: "Video",
  };

  const booleanFields = ["bijali", "pani", "sivar", "developed"];

  const ALLOWED_IMAGE_FORMATS = ["image/jpeg", "image/png", "image/jpg"];
  const ALLOWED_VIDEO_FORMATS = ["video/mp4", "video/webm"];
  const MAX_VIDEO_SIZE = 5 * 1024 * 1024; // 5MB
  const MIN_SIZE = 10 * 1024; // 10KB

  const handleChange = (e) => {
    const { name, type, checked, value, files } = e.target;

    if (type === "file") {
      const file = files[0];
      if (!file) return;

      if (name === "image") {
        if (!ALLOWED_IMAGE_FORMATS.includes(file.type)) {
          setImageError("❌ Only JPG, JPEG, and PNG formats are allowed.");
          return;
        }
        if (file.size > 500 * 1024) {
          setImageError("❌ Image must be less than 500KB.");
          return;
        }
        if (file.size < MIN_SIZE) {
          setImageError("❌ Image must be at least 10KB.");
          return;
        }
        setImageError("");
        setFormData({ ...formData, image: file, video: null }); // clear video
      }

      if (name === "video") {
        if (!ALLOWED_VIDEO_FORMATS.includes(file.type)) {
          setImageError("❌ Only MP4 or WebM videos allowed.");
          return;
        }
        if (file.size > MAX_VIDEO_SIZE) {
          setImageError("❌ Video must be less than 5MB.");
          return;
        }
        setImageError("");
        setFormData({ ...formData, video: file, image: null }); // clear image
      }
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    alert("Property saved successfully!");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white shadow-lg p-6 rounded-lg">
      <h2 className="text-2xl font-bold mb-4">Manage Property</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        {Object.keys(fieldLabels).map((field) => (
          <div key={field}>
            <label className="block font-medium mb-1">{fieldLabels[field]}</label>

            {field === "image" && (
              <>
                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {imageError && <p className="text-red-500">{imageError}</p>}
                {formData.image &&
                  typeof formData.image === "object" && (
                    <img
                      src={URL.createObjectURL(formData.image)}
                      className="w-full h-32 object-cover mt-2"
                    />
                  )}
                {formData.image &&
                  typeof formData.image === "string" && (
                    <img
                      src={formData.image}
                      className="w-full h-32 object-cover mt-2"
                    />
                  )}
              </>
            )}

            {field === "video" && (
              <>
                <input
                  type="file"
                  name="video"
                  accept="video/*"
                  onChange={handleChange}
                  className="w-full border p-2 rounded"
                />
                {imageError && <p className="text-red-500">{imageError}</p>}
                {formData.video &&
                  typeof formData.video === "object" && (
                    <video
                      src={URL.createObjectURL(formData.video)}
                      controls
                      className="w-full h-32 mt-2"
                    />
                  )}
                {formData.video &&
                  typeof formData.video === "string" && (
                    <video
                      src={formData.video}
                      controls
                      className="w-full h-32 mt-2"
                    />
                  )}
              </>
            )}

            {field !== "image" && field !== "video" && (
              <input
                type={booleanFields.includes(field) ? "checkbox" : "text"}
                name={field}
                checked={booleanFields.includes(field) ? formData[field] : undefined}
                value={!booleanFields.includes(field) ? formData[field] : undefined}
                onChange={handleChange}
                className="w-full border p-2 rounded"
              />
            )}
          </div>
        ))}

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Save Property
        </button>
      </form>
    </div>
  );
}
