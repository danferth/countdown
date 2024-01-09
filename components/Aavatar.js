"use client";
import React, { useEffect, useState } from "react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import getAvatar from "./getAvatar";
export default function Avatar({ uid, url, size, onUpload }) {
  const supabase = createClientComponentClient();

  const [avatarUrl, setAvatarUrl] = useState(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    async function downloadImage(url) {
      try {
        const avatar = await getAvatar(url);
        setAvatarUrl(avatar);
      } catch (error) {
        console.log("Error downloading image: ", error);
      }
    }

    if (url) downloadImage(url);
  }, [url]);

  const uploadAvatar = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error("You must select an image to upload.");
      }

      const file = event.target.files[0];
      const fileExt = file.name.split(".").pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;
      const { error: uploadError } = await supabase.storage
        .from("avatars")
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }
      // onupload would update profile with url
      onUpload(filePath);
    } catch (error) {
      alert("Error uploading avatar!");
      console.log("avatar upload error", error);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt="Avatar"
          className="rounded-full"
          style={{ height: size, width: size }}
        />
      ) : (
        <div className="skeleton" style={{ height: size, width: size }} />
      )}
      <div style={{ width: size }}>
        <label className="label" htmlFor="single">
          {uploading ? "Uploading ..." : "Upload"}
        </label>
        <input
          className="input"
          type="file"
          id="single"
          accept="image/*"
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
}
