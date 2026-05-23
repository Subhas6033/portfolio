import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { UploadButton } from "../../utils/uploadthing";
import api from "../../utils/api";

const AdminResume = () => {
  const [resumeUrl, setResumeUrl] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["resume"],
    queryFn: async () => {
      const res = await api.get("/api/resume");
      if (res.data.data) {
        setResumeUrl(res.data.data.resumeUrl || "");
        setResumeFileName(res.data.data.resumeFileName || "");
      }
      return res.data.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (fileData) => {
      return api.put("/api/resume", fileData);
    },
    onSuccess: (response) => {
      setMessage("Resume uploaded successfully!");
      setResumeUrl(response.data.data.resumeUrl);
      setResumeFileName(response.data.data.resumeFileName);
      setUploadedFile(null);
      queryClient.invalidateQueries(["resume"]);
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Failed to upload resume");
    },
  });

  const handleUploadComplete = (res) => {
    if (res && res[0]) {
      const fileData = {
        url: res[0].ufsUrl,
        name: res[0].name,
        key: res[0].key,
      };
      setUploadedFile(fileData);
      uploadMutation.mutate(fileData);
    }
  };

  if (isLoading) return <div className="text-white">Loading...</div>;

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">Resume</h1>

      <div className="bg-zinc-900 p-6 rounded-lg max-w-xl">
        <p className="text-zinc-400 mb-4">
          Upload your resume (PDF, DOC, DOCX). It will be uploaded to
          Uploadthing and the link will be stored in the database.
        </p>

        {message && (
          <div
            className={`px-4 py-3 rounded mb-4 ${
              message.includes("success") || message.includes("successfully")
                ? "bg-green-500/10 text-green-500"
                : "bg-red-500/10 text-red-500"
            }`}
          >
            {message}
          </div>
        )}

        <div className="mb-4">
          <label className="block text-zinc-400 mb-2">Select Resume File</label>
          <UploadButton
            endpoint="resumeUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error) => {
              setMessage("Upload error: " + error.message);
            }}
          />
        </div>

        {resumeUrl && (
          <div className="mt-6">
            <p className="text-zinc-400 mb-2">
              Current resume: {resumeFileName}
            </p>
            <a
              href={resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-lime-400 hover:underline"
            >
              View Resume
            </a>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminResume;
