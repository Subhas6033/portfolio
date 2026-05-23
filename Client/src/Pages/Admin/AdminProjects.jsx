import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProjectImageUploadButton } from "../../utils/uploadthing";
import api from "../../utils/api";

const AdminProjects = () => {
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [uploadedImage, setUploadedImage] = useState(null);

  const [formData, setFormData] = useState({
    category: "",
    imageURL: "",
    fileKey: "",
    title: "",
    description: "",
    githubLink: "",
    liveLink: "",
  });

  const queryClient = useQueryClient();

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["projects"],
    queryFn: async () => {
      const res = await api.get("/api/projects");
      return res.data.data || [];
    },
  });

  const createMutation = useMutation({
    mutationFn: (data) => api.post("/api/projects", data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      resetForm();
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }) => api.put(`/api/projects/${id}`, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
      resetForm();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id) => api.delete(`/api/projects/${id}`),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["projects"] });
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
    if (!window.confirm("Delete this project?")) return;
    deleteMutation.mutate(id);
  };

  const handleEdit = (proj) => {
    setFormData({
      category: proj.category,
      imageURL: proj.imageURL,
      fileKey: proj.fileKey || "",
      title: proj.title,
      description: proj.description,
      githubLink: proj.githubLink || "",
      liveLink: proj.liveLink || "",
    });

    setEditingId(proj._id);
    setShowForm(true);
    setUploadedImage(null);
  };

  const resetForm = () => {
    setFormData({
      category: "",
      imageURL: "",
      fileKey: "",
      title: "",
      description: "",
      githubLink: "",
      liveLink: "",
    });

    setEditingId(null);
    setShowForm(false);
    setUploadedImage(null);
  };

  const handleImageUploadComplete = (res) => {
    if (res && res[0]) {
      const imageData = {
        imageURL: res[0].ufsUrl,
        fileKey: res[0].key,
      };
      setUploadedImage(imageData);
      setFormData((prev) => ({ ...prev, ...imageData }));
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Projects</h1>

        <button
          onClick={() => setShowForm(!showForm)}
          className="bg-lime-400 text-zinc-950 px-4 py-2 rounded font-bold hover:bg-lime-300"
        >
          {showForm ? "Cancel" : "Add New"}
        </button>
      </div>

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
              <label className="block text-zinc-400 mb-1">Category</label>

              <input
                type="text"
                value={formData.category}
                onChange={(e) =>
                  setFormData({ ...formData, category: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                placeholder="e.g., Frontend, Fullstack"
                required
              />
            </div>

            <div className="col-span-2">
              <label className="block text-zinc-400 mb-1">Project Image</label>
              <ProjectImageUploadButton
                endpoint="projectImageUploader"
                onClientUploadComplete={handleImageUploadComplete}
                onUploadError={(error) => {
                  alert("Upload error: " + error.message);
                }}
              />
              {(formData.imageURL || uploadedImage) && (
                <p className="text-lime-400 text-sm mt-2">
                  Image uploaded: {uploadedImage ? "New image" : "Current image"}
                </p>
              )}
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">GitHub Link</label>

              <input
                type="text"
                value={formData.githubLink}
                onChange={(e) =>
                  setFormData({ ...formData, githubLink: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
              />
            </div>

            <div>
              <label className="block text-zinc-400 mb-1">Live Link</label>

              <input
                type="text"
                value={formData.liveLink}
                onChange={(e) =>
                  setFormData({ ...formData, liveLink: e.target.value })
                }
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-zinc-400 mb-1">Description</label>

            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded h-24"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-lime-400 text-zinc-950 px-6 py-2 rounded font-bold"
          >
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      {projects.length === 0 ? (
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-lg p-8 text-center">
          <p className="text-zinc-400 mb-2">No projects found in database.</p>

          <p className="text-zinc-500 text-sm">
            Click "Add New" to create your first project.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {projects.map((proj) => (
            <div
              key={proj._id}
              className="bg-zinc-900 p-4 rounded-lg flex justify-between items-start"
            >
              <div className="flex-1">
                <h3 className="text-white font-bold">{proj.title}</h3>

                <p className="text-lime-400 text-sm">{proj.category}</p>

                <p className="text-zinc-500 text-sm mt-1">{proj.description}</p>
              </div>

              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(proj)}
                  className="text-zinc-400 hover:text-lime-400"
                >
                  Edit
                </button>

                <button
                  onClick={() => handleDelete(proj._id)}
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

export default AdminProjects;