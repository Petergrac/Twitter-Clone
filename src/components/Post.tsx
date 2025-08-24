import PostInfo from "./PostInfo";
import PostInteraction from "./PostInteraction";

import Link from "next/link";
import Image from "./Image";
import { Post as PostType } from "@/generated/prisma";
import { format } from "timeago.js";

type PostWDetails = PostType & {
  user: {
    display_name: string | null;
    username: string;
    img: string | null;
  };
  rePost?: PostType & {
    user: {
      display_name: string | null;
      username: string;
      img: string | null;
    };
    _count: { likes: number; rePosts: number; comments: number };
    likes: { id: string }[];
    rePosts: { id: string }[];
    saves: { id: string }[];
  };
  _count: { likes: number; rePosts: number; comments: number };
  likes: { id: string }[];
  rePosts: { id: string }[];
  saves: { id: string }[];
};

const Post = ({
  type,
  post,
}: {
  type?: "status" | "comment";
  post: PostWDetails;
}) => {
  const originalPost = post.rePost || post;
  return (
    <div className="p-4 border-y-[1px] border-borderGray">
      {/* POST TYPE */}
      {post.rePostId && (
        <div className="flex items-center gap-2 text-sm font-bold mb-2">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="18"
            height="18"
            viewBox="0 0 24 24"
          >
            <path
              className="fill-textGray"
              d="M4.75 3.79l4.603 4.3-1.706 1.82L6 8.38v7.37c0 .97.784 1.75 1.75 1.75H13V20H7.75c-2.347 0-4.25-1.9-4.25-4.25V8.38L1.853 9.91.147 8.09l4.603-4.3zm11.5 2.71H11V4h5.25c2.347 0 4.25 1.9 4.25 4.25v7.37l1.647-1.53 1.706 1.82-4.603 4.3-4.603-4.3 1.706-1.82L18 15.62V8.25c0-.97-.784-1.75-1.75-1.75z"
            />
          </svg>
          <span>{post.user.display_name} Reposted</span>
        </div>
      )}
      {/* POST CONTENT */}
      <div className={`flex-1 gap-4 flex ${type === "status" && "flex-col"}`}>
        {/* AVATAR */}
        <hr className="my-5" />
        <div
          className={`${
            type !== "status" && "hidden "
          } relative rounded-full outline-2  overflow-hidden h-10 w-10`}
        >
          <Image
            src={
              (originalPost.user && originalPost.user.img) ||
              "general/avatar-default.svg"
            }
            alt="avatar"
            w={100}
            h={100}
            tr={false}
          />
        </div>
        {/* CONTENT */}
        <div className="w-full flex flex-col justify-between">
          {/* TOP */}
          <div className="flex justify-between">
            <Link
              href={`/${originalPost.user.username}`}
              className="flex gap-4 items-center"
            >
              <div
                className={`${
                  type === "status" && "hidden "
                } relative rounded-full overflow-hidden h-10 w-10`}
              >
                <Image
                  src={originalPost.user.img || "general/avatar-default.svg"}
                  alt="avatar"
                  w={100}
                  h={100}
                  tr={true}
                />
              </div>
              <div
                className={`${
                  type === "status"
                    ? "flex-col gap-0"
                    : " flex  items-center gap-2 flex-wrap"
                }`}
              >
                <h1
                  className={`${
                    type === "status" ? "text-sm" : "text-md"
                  }  font-bold`}
                >
                  {originalPost.user.display_name}
                </h1>
                <span
                  className={`text-textGray ${type === "status" && "text-xs"}`}
                >
                  @{originalPost.user.username}
                </span>
                <span className={`${type === "status" && "hidden"}`}>
                  {format(originalPost.createdAt)}
                </span>
              </div>
            </Link>
            <PostInfo />
          </div>
          {/* TEXT & MEDIA */}
          <div className="">
            <Link
              href={`/${originalPost.user.username}/status/${originalPost.id}`}
            >
              <p className={`${type === "status" && "text-lg"}`}>
                {originalPost.desc}
              </p>
            </Link>
            {/* IMAGES & VIDEOS */}
            {originalPost.img && (
              <div className="relative overflow-hidden py-8">
                <Image
                  src={originalPost.img}
                  alt=""
                  w={600}
                  h={400}
                  tr={true}
                  className={originalPost.isSensitive ? "blur-md" : ""}
                />
              </div>
            )}
            {type === "status" && (
              <span className="text-textGray">
                {format(originalPost.createdAt)}
              </span>
            )}

            <PostInteraction
              username={originalPost.user.username}
              postId={originalPost.id}
              count={originalPost._count}
              isLiked={originalPost.likes && !!originalPost.likes.length}
              isReposted={!!originalPost.rePosts.length}
              isSaved={!!originalPost.saves.length}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Post;
