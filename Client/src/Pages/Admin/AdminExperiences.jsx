import React, { useState, useEffect } from "react";

const AdminExperiences = () => {
  const [experiences, setExperiences] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "", company: "", period: "", location: "", description: "", align: "left"
  });

  const API_URL = "http://localhost:8000/api/experiences";
  const token = localStorage.getItem("adminToken");

  const fetchExperiences = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setExperiences(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchExperiences();
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
        fetchExperiences();
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this experience?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchExperiences();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (exp) => {
    setFormData({
      title: exp.title,
      company: exp.company,
      period: exp.period,
      location: exp.location || "",
      description: exp.description,
      align: exp.align || "left"
    });
    setEditingId(exp._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: "", company: "", period: "", location: "", description: "", align: "left" });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

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
              <label className="block text-zinc-400 mb-1">Company</label>
              <input
                type="text"
                value={formData.company}
                onChange={(e) => setFormData({...formData, company: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Period</label>
              <input
                type="text"
                value={formData.period}
                onChange={(e) => setFormData({...formData, period: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({...formData, location: e.target.value})}
                className="w-full bg-zinc-800 text-white px-3 py-2 rounded"
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Align</label>
              <select
                value={formData.align}
                onChange={(e) => setFormData({...formData, align: e.target.value})}
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

      <div className="space-y-4">
        {experiences.map((exp) => (
          <div key={exp._id} className="bg-zinc-900 p-4 rounded-lg flex justify-between items-start">
            <div>
              <h3 className="text-white font-bold">{exp.title}</h3>
              <p className="text-zinc-400">{exp.company} - {exp.period}</p>
              <p className="text-zinc-500 text-sm mt-1">{exp.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(exp)} className="text-zinc-400 hover:text-lime-400">Edit</button>
              <button onClick={() => handleDelete(exp._id)} className="text-zinc-400 hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminExperiences;