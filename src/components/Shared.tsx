"use client";
import React, { useActionState, useEffect, useRef, useState } from "react";
import CustomImage from "./Image";
import { addPost } from "@/Actions";
import NextImage from "next/image";
import ImageEditor from "./ImageEditor";
import { useUser } from "@clerk/nextjs";

const Shared = () => {
  const [media, setMedia] = useState<File | null>(null);
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [settings, setSettings] = useState<{
    type: "original" | "wide" | "square";
    sensitive: boolean;
  }>({
    type: "original",
    sensitive: false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files) {
      setMedia(e.target.files[0]);
    }
  };
  // Preview the image ==> create object url for preview
  const previewURL = media ? URL.createObjectURL(media) : null;
  // Handle input action
  const { user } = useUser();
  const [state, formAction] = useActionState(addPost, {
    success: false,
    error: false,
  });

  const formRef = useRef<HTMLFormElement | null>(null);
  useEffect(() => {
    if (state.success) formRef.current?.reset();
  }, [state]);
  return (
    <div className="p-4 flex gap-4">
      {/* AVATAR */}
      <div className="relative w-10 h-10 rounded-full overflow-hidden">
        <CustomImage
          src={user?.imageUrl || "general/avatar-default.svg"}
          alt="avatar"
          w={100}
          h={100}
          tr={true}
        />
      </div>
      {/* OTHERS */}
      <form
        ref={formRef}
        action={formAction}
        className="flex flex-1 flex-col gap-4"
      >
        <input
          type="text"
          name="description"
          className="bg-transparent placeholder:text-textGray text-xl focus:outline-none"
          placeholder="What is happening!?"
        />
        <input
          type="text"
          name="imageType"
          value={settings.type}
          className="hidden"
          readOnly
        />
        <input
          type="text"
          name="isSensitive"
          value={settings.sensitive ? "true" : "false"}
          className="hidden"
          readOnly
        />
        <input
          type="text"
          name="settings"
          value={settings.type}
          className="hidden"
          readOnly
        />
        {/* PREVIEW IMAGE */}
        {media?.type.includes("image") && previewURL && (
          <div className="relative rounded-xl overflow-hidden">
            <NextImage
              src={previewURL}
              alt=""
              width={600}
              height={600}
              className={`w-full ${
                settings.type === "original"
                  ? "h-full object-contain"
                  : settings.type === "square"
                  ? "aspect-square object-cover"
                  : "aspect-video object-cover"
              }`}
            />
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsEditorOpen(true);
              }}
              className="absolute top-2 left-2 opacity-50 bg-black text-white py1 px-2 rounded-full cursor-pointer font-bold"
            >
              Edit
            </button>
            <div
              onClick={(e) => {
                e.preventDefault();
                setMedia(null);
              }}
              className="absolute top-2 right-2 cursor-pointer font-bold bg-black/50 text-white h-8 w-8 flex items-center justify-center rounded-full"
            >
              x
            </div>
          </div>
        )}
        {media?.type.includes("video") && previewURL && (
          <div className="relative">
            <video src={previewURL} controls />
            <div
              onClick={(e) => {
                e.preventDefault();
                setMedia(null);
              }}
              className="absolute top-2 right-2 cursor-pointer font-bold bg-black/50 text-white h-8 w-8 flex items-center justify-center rounded-full"
            >
              x
            </div>
          </div>
        )}
        {isEditorOpen && previewURL && (
          <ImageEditor
            onClose={() => setIsEditorOpen(false)}
            previewURL={previewURL}
            settings={settings}
            SetSettings={setSettings}
          />
        )}
        <div className="flex items-center justify-between gap-4 flex-wrap">
          <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              className="hidden"
              onChange={handleChange}
              name="file"
              id="file"
              accept="image/*,video/*"
            />
            <label htmlFor="file">
              <CustomImage
                src="icons/image.svg"
                alt=""
                w={20}
                h={20}
                className="cursor-pointer"
              />
            </label>
            <CustomImage
              src="icons/gif.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/poll.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/emoji.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/schedule.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
            <CustomImage
              src="icons/location.svg"
              alt=""
              w={20}
              h={20}
              className="cursor-pointer"
            />
          </div>
          <button
            className="bg-white text-black font-bold rounded-xl py-1 px-4"
            type="submit"
          >
            Post
          </button>
        </div>
      </form>
    </div>
  );
};

export default Shared;
