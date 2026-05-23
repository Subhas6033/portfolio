import React, { useState, useEffect } from "react";

const AdminResume = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState("");

  const API_URL = "http://localhost:8000/api/resume";
  const token = localStorage.getItem("adminToken");

  const fetchResume = async () => {
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setResumeUrl(data.data?.resumeUrl || "");
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResume();
  }, []);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMessage("");

    try {
      const res = await fetch(API_URL, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ resumeUrl })
      });

      if (res.ok) {
        setMessage("Resume URL updated successfully!");
      } else {
        setMessage("Failed to update resume URL");
      }
    } catch (err) {
      setMessage("Error updating resume URL");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Resume</h1>

      <div className="bg-zinc-900 p-6 rounded-lg max-w-xl">
        <p className="text-zinc-400 mb-4">
          Update the Google Drive or other resume URL. This URL will be used for the Resume button on the About page.
        </p>

        {message && (
          <div className={`px-4 py-3 rounded mb-4 ${message.includes("success") ? "bg-green-500/10 text-green-500" : "bg-red-500/10 text-red-500"}`}>
            {message}
          </div>
        )}

        <form onSubmit={handleUpdate}>
          <div className="mb-4">
            <label className="block text-zinc-400 mb-2">Resume URL</label>
            <input
              type="text"
              value={resumeUrl}
              onChange={(e) => setResumeUrl(e.target.value)}
              className="w-full bg-zinc-800 text-white px-4 py-3 rounded focus:border-lime-400 focus:outline-none"
              placeholder="https://drive.google.com/file/d/..."
              required
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="bg-lime-400 text-zinc-950 px-6 py-3 rounded font-bold hover:bg-lime-300 transition disabled:opacity-50"
          >
            {saving ? "Saving..." : "Update Resume"}
          </button>
        </form>

        {resumeUrl && (
          <div className="mt-6">
            <p className="text-zinc-400 mb-2">Current resume:</p>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:underline"
            >
              {resumeUrl}
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResume;