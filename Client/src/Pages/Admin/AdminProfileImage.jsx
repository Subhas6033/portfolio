import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { ProfileImageUploadButton } from "../../utils/uploadthing";
import api from "../../utils/api";

const AdminProfileImage = () => {
  const [imageUrl, setImageUrl] = useState("");
  const [imageName, setImageName] = useState("");
  const [message, setMessage] = useState("");
  const [uploadedFile, setUploadedFile] = useState(null);

  const queryClient = useQueryClient();

  const { isLoading } = useQuery({
    queryKey: ["profileImage"],
    queryFn: async () => {
      const res = await api.get("/api/profile");
      if (res.data.data) {
        setImageUrl(res.data.data.imageUrl || "");
        setImageName(res.data.data.imageName || "");
      }
      return res.data.data;
    },
  });

  const uploadMutation = useMutation({
    mutationFn: async (fileData) => {
      return api.put("/api/profile", fileData);
    },
    onSuccess: (response) => {
      setMessage("Profile image uploaded successfully!");
      setImageUrl(response.data.data.imageUrl);
      setImageName(response.data.data.imageName);
      setUploadedFile(null);
      queryClient.invalidateQueries(["profileImage"]);
    },
    onError: (error) => {
      setMessage(error.response?.data?.message || "Failed to upload image");
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
      <h1 className="text-2xl font-bold text-white mb-6">Profile Image</h1>

      <div className="bg-zinc-900 p-6 rounded-lg max-w-xl">
        <p className="text-zinc-400 mb-4">
          Upload your profile image. This will be displayed on the Home and About pages.
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
          <label className="block text-zinc-400 mb-2">Select Image</label>
          <ProfileImageUploadButton
            endpoint="profileImageUploader"
            onClientUploadComplete={handleUploadComplete}
            onUploadError={(error) => {
              setMessage("Upload error: " + error.message);
            }}
          />
        </div>

        {imageUrl && (
          <div className="mt-6">
            <p className="text-zinc-400 mb-2">Current image: {imageName}</p>
            <img
              src={imageUrl}
              alt="Profile"
              className="w-48 h-64 object-cover rounded-lg border border-zinc-700"
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProfileImage;