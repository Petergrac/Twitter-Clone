import React from "react";
import CustomImage from "./Image";

const Search = () => {
  return (
    <div className="bg-inputGray flex py-2 px-4 items-center gap-4 rounded-full">
      <CustomImage
        src="icons/explore.svg"
        alt="search"
        w={16}
        h={16}
        tr={false}
      />
      <input
        type="text"
        placeholder="Search"
        className="bg-transparent  outline-none placeholder:text-textGray"
      />
    </div>
  );
};

export default Search;
