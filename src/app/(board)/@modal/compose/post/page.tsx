"use client";
import CustomImage from "@/components/Image";
import { useRouter } from "next/navigation";
import React from "react";

const PostModal = () => {
  const router = useRouter();
  const closeModal = () => {
    router.back();
  };
  return (
    <div className="absolute w-screen h-screen top-0 left-0 z-20 bg-[#39717568] flex justify-center">
      <div className="py-4 px-8 rounded-xl bg-black w-[600px] h-max mt-12">
        {/* TOP */}
        <div className="flex justify-between">
          <div className="text-iconBlue font-bold">Drafts</div>
          <div onClick={closeModal} className="cursor-pointer text-textGray">
            X
          </div>
        </div>
        {/* CENTER */}
        <div className="py-8 flex gap-4">
          <div className="relative w-10 h-10 rounded-full overflow-hidden">
            <CustomImage
              src="general/avatar.png"
              alt="John Doe"
              w={100}
              h={100}
              tr={true}
            />
          </div>
          <input className="flex-1 bg-transparent outline-none text-lg" type="text" placeholder="What is happening?!" />
        </div>
        {/* BOTTOM */}
        <div className="flex justify-between items-center gap-4 flex-wrap border-t border-borderGray py-4">
            <div className="flex gap-4 flex-wrap">
            <input
              type="file"
              className="hidden"
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
          <button className="py-2 px-4 bg-white text-black rounded-full cursor-pointer " type="submit">Post</button>
        </div>
      </div>
    </div>
  );
};

export default PostModal;
