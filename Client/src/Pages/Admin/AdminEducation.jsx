import React, { useState, useEffect } from "react";

const AdminEducation = () => {
  const [education, setEducation] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: "", institution: "", period: "", description: "", resultUrl: "", align: "left"
  });

  const API_URL = "http://localhost:8000/api/education";
  const token = localStorage.getItem("adminToken");

  const fetchEducation = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setEducation(data.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEducation();
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
        fetchEducation();
        resetForm();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm("Delete this education?")) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchEducation();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (edu) => {
    setFormData({
      title: edu.title,
      institution: edu.institution,
      period: edu.period,
      description: edu.description || "",
      resultUrl: edu.resultUrl || "",
      align: edu.align || "left"
    });
    setEditingId(edu._id);
    setShowForm(true);
  };

  const resetForm = () => {
    setFormData({ title: "", institution: "", period: "", description: "", resultUrl: "", align: "left" });
    setEditingId(null);
    setShowForm(false);
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-white">Education</h1>
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
                placeholder="e.g., B.Tech in IT"
                required
              />
            </div>
            <div>
              <label className="block text-zinc-400 mb-1">Institution</label>
              <input
                type="text"
                value={formData.institution}
                onChange={(e) => setFormData({...formData, institution: e.target.value})}
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
                placeholder="e.g., 2023 - 2027"
                required
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
            <div>
              <label className="block text-zinc-400 mb-1">Result URL</label>
              <input
                type="text"
                value={formData.resultUrl}
                onChange={(e) => setFormData({...formData, resultUrl: e.target.value})}
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
            />
          </div>
          <button type="submit" className="bg-lime-400 text-zinc-950 px-6 py-2 rounded font-bold">
            {editingId ? "Update" : "Create"}
          </button>
        </form>
      )}

      <div className="space-y-4">
        {education.map((edu) => (
          <div key={edu._id} className="bg-zinc-900 p-4 rounded-lg flex justify-between items-start">
            <div>
              <h3 className="text-white font-bold">{edu.title}</h3>
              <p className="text-zinc-400">{edu.institution} - {edu.period}</p>
              <p className="text-zinc-500 text-sm mt-1">{edu.description}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(edu)} className="text-zinc-400 hover:text-lime-400">Edit</button>
              <button onClick={() => handleDelete(edu._id)} className="text-zinc-400 hover:text-red-400">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminEducation;