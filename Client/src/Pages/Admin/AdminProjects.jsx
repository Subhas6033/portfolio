import React, { useState, useEffect } from "react";

const AdminProjects = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    category: "", imageURL: "", title: "", description: "", githubLink: "", liveLink: ""
  });

  const API_URL = "http://localhost:8000/api/projects";
  const token = localStorage.getItem("adminToken");

  const fetchProjects = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setProjects(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = editingId ? `${API_URL}/${editingId}` : API_URL;
    const method = editingId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });

      if (res.ok) {
        fetchProjects();
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this project?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchProjects();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (proj) => {
    setFormData({
      category: proj.category,
      imageURL: proj.imageURL,
      title: proj.title,
      description: proj.description,
      githubLink: proj.githubLink || "",
      liveLink: proj.liveLink || ""
    });
    setEditingId(proj._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ category: "", imageURL: "", title: "", description: "", githubLink: "", liveLink: "" });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

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
        <form onSubmit={handleSubmit} className="bg-zinc-900 p-6 rounded-lg mb-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-zinc-400 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                placeholder="e.g., Frontend, Fullstack"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Image URL</label>
              <input
                type="text"
                value={formData.imageURL}
                onChange={(e) => setFormData({...formData, imageURL: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">GitHub Link</label>
              <input
                type="text"
                value={formData.githubLink}
                onChange={(e) => setFormData({...formData, githubLink: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Live Link</label>
              <input
                type="text"
                value={formData.liveLink}
                onChange={(e) => setFormData({...formData, liveLink: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-zinc-400 mb-1">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              className="w-full bg-zinc-800 text-white px-3 py-2 rounded h-24"
              required
            />
          </div>
          <button type="submit" className="bg-lime-400 text-zinc-950 px-6 py-2 rounded font-bold">
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {projects.map((proj) => (
          <div key={proj._id} className="bg-zinc-900 p-4 rounded-lg flex justify-between items-start">
            <div className="flex-1">
              <h3 className="text-white font-bold">{proj.title}</h3>
              <p className="text-lime-400 text-sm">{proj.category}</p>
              <p className="text-zinc-500 text-sm mt-1">{proj.description}</p>
            </div>
            <div className="flex gap-2 ml-4">
              <button onClick={() => handleEdit(proj)} className="text-zinc-400 hover:text-lime-400">Edit</button>
              <button onClick={() => handleDelete(proj._id)} className="text-zinc-400 hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminProjects;