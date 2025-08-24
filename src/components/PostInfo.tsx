import CustomImage from "./Image";

const PostInfo = () => {
  return (
    <div className="relative cursor-pointer w-4 h-4">
      <CustomImage
        src="icons/infoMore.svg"
        w={16}
        h={16}
        alt="more"
        tr={true}
      />
    </div>
  );
};

export default PostInfo;
