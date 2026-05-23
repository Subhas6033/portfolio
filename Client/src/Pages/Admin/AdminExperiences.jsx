import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ExperienceFileUploadButton } from "../../utils/uploadthing";
import api from "../../utils/api";

const AdminExperiences = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadedFile, setUploadedFile] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    period: "",
    location: "",
    description: "",
    fileUrl: "",
    fileName: "",
    fileKey: "",
    align: "left",
  });

  const queryClient = useQueryClient();

  const { data: experiences = [], isLoading, error } = useQuery({
    queryKey: ["experiences"],
    queryFn: async () => {
      const res = await api.get("/api/experiences");
      return res.data.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post("/api/experiences", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/api/experiences/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/experiences/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["experiences"] });
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingId) {
      updateMutation.mutate({ id: editingId, data: formData });
    } else {
      createMutation.mutate(formData);
    }
  };

  const handleDelete = (id) => {
    if (!window.confirm("Delete this experience?")) return;
    deleteMutation.mutate(id);
  };

  const handleEdit = (exp) => {
    setFormData({
      title: exp.title,
      company: exp.company,
      period: exp.period,
      location: exp.location || "",
      description: exp.description,
      fileUrl: exp.fileUrl || "",
      fileName: exp.fileName || "",
      fileKey: exp.fileKey || "",
      align: exp.align || "left",
    });
    setEditingId(exp._id);
    setShowForm(true);
    setUploadedFile(null);
  };

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      period: "",
      location: "",
      description: "",
      fileUrl: "",
      fileName: "",
      fileKey: "",
      align: "left",
    });
    setEditingId(null);
    setShowForm(false);
    setUploadedFile(null);
  };

  const handleFileUploadComplete = (res) => {
    if (res && res[0]) {
      const fileData = {
        fileUrl: res[0].ufsUrl,
        fileName: res[0].name,
        fileKey: res[0].key,
      };
      setUploadedFile(fileData);
      setFormData((prev) => ({ ...prev, ...fileData }));
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Experiences</h1>
        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-lime-400 text-zinc-950 px-4 py-2 rounded font-bold hover:bg-lime-300"
        >
          {showForm ? "Cancel" : "Add New"}
        </button>
      </div>

      {error && (
        <div className="mb-4 px-4 py-3 bg-red-500/10 border border-red-500/30 rounded-lg">
          <p className="text-red-400 text-sm">Failed to load experiences</p>
        </div>
      )}

      {showForm && (
        <form
          onSubmit={handleSubmit}
          className="bg-zinc-900 p-6 rounded-lg mb-6 space-y-4"
        >
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Period</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) =>
                  setFormData({ ...formData, period: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) =>
                  setFormData({ ...formData, location: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Align</label>
              <select
                value={formData.align}
                onChange={(e) =>
                  setFormData({ ...formData, align: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
              >
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded h-24"
              required
            />
          </div>
          <div>
            <label className="block text-zinc-400 mb-1">Optional File Upload</label>
            <ExperienceFileUploadButton
              endpoint="experienceFileUploader"
              onClientUploadComplete={handleFileUploadComplete}
              onUploadError={(error) => {
                alert("Upload error: " + error.message);
              }}
            />
            {(formData.fileName || uploadedFile) && (
              <p className="text-lime-400 text-sm mt-2">
                Uploaded: {uploadedFile?.fileName || formData.fileName}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="bg-lime-400 text-zinc-950 px-6 py-2 rounded font-bold"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {experiences.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 text-center">
          <p className="text-zinc-400 mb-2">
            No experiences found in database.
          </p>
          <p className="text-zinc-500 text-sm">
            Click "Add New" to create your first experience.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {experiences.map((exp) => (
            <div
              key={exp._id}
              className="bg-zinc-900 p-4 rounded-lg flex justify-between items-start"
            >
              <div>
                <h3 className="text-white font-bold">{exp.title}</h3>
                <p className="text-zinc-400">
                  {exp.company} - {exp.period}
                </p>
                <p className="text-zinc-500 text-sm mt-1">{exp.description}</p>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(exp)}
                  className="text-zinc-400 hover:text-lime-400"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(exp._id)}
                  className="text-zinc-400 hover:text-red-400"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminExperiences;