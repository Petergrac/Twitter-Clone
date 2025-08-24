import React from "react";
import CustomImage from "./Image";
import Link from "next/link";

const PopularTags = () => {
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      <h1 className="text-xl font-bold text-textLightGray">
        What&apos;s happening
      </h1>
      {/* TREND EVENT */}
      <div className="flex gap-4 ">
        <div className="relative w-20 h-20 rounded-xl overflow-hidden">
          <CustomImage
            src="general/porsche.jpg"
            alt="event"
            w={120}
            h={120}
            tr={true}
          />
        </div>
        <div className="flex-1">
          <h2 className="text-textGrayLight font-bold">
            New Brand. Porsche Macau 3200
          </h2>
          <span className="text-sm text-textGray">Available Now</span>
        </div>
      </div>
      {/* TOPICS */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-semibold">
            Technology &middot; Trending
          </span>
          <CustomImage
            src="icons/infoMore.svg"
            tr={false}
            w={16}
            h={16}
            alt="more-info"
          />
        </div>
        <h2 className="text-textGray font-bold">OpenAI</h2>
        <span className="text-textGray text-sm">20k Posts</span>
      </div>
      {/* TOPICS */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-semibold">
            Technology &middot; Trending
          </span>
          <CustomImage
            src="icons/infoMore.svg"
            tr={false}
            w={16}
            h={16}
            alt="more-info"
          />
        </div>
        <h2 className="text-textGray font-bold">OpenAI</h2>
        <span className="text-textGray text-sm">20k Posts</span>
      </div>
      {/* TOPICS */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-semibold">
            Technology &middot; Trending
          </span>
          <CustomImage
            src="icons/infoMore.svg"
            tr={false}
            w={16}
            h={16}
            alt="more-info"
          />
        </div>
        <h2 className="text-textGray font-bold">OpenAI</h2>
        <span className="text-textGray text-sm">20k Posts</span>
      </div>
      {/* TOPICS */}
      <div className="">
        <div className="flex items-center justify-between">
          <span className="text-textGray font-semibold">
            Technology &middot; Trending
          </span>
          <CustomImage
            src="icons/infoMore.svg"
            tr={false}
            w={16}
            h={16}
            alt="more-info"
          />
        </div>
        <h2 className="text-textGray font-bold">OpenAI</h2>
        <span className="text-textGray text-sm">20k Posts</span>
      </div>
      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default PopularTags;
