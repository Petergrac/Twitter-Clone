"use client";
import { Post as PostType } from "@/generated/prisma";
import CustomImage from "./Image";
import Post from "./Post";
import { useUser } from "@clerk/nextjs";
import { useActionState, useEffect } from "react";
import { addComment } from "@/Actions";
import { socket } from "@/socket";

interface CommentsType extends PostType {
  user: { display_name: string | null; username: string; img: string | null };
  _count: { likes: number; rePosts: number; comments: number };
  likes: { id: string }[];
  rePosts: { id: string }[];
  saves: { id: string }[];
}
const Comments = ({
  comments,
  postId,
  username,
}: {
  postId: string;
  username: string;
  comments: CommentsType[];
}) => {
  const { user } = useUser();

  const [state, formAction, isPending] = useActionState(addComment, {
    success: false,
    error: false,
  });
  useEffect(() => {
    if (state.success) {
      socket.emit("sendNotification", {
        receiveUsername: username,
        data: {
          senderUsername: user?.username,
          type: "comment",
          link: `/${username}/status/${postId}`,
        },
      });
    }
  }, [state.success, username, user?.username, postId]);
  return (
    <div className="flex-col">
      <form
        action={formAction}
        className="flex items-center justify-between gap-4 p-4"
      >
        <div className="relative overflow-hidden rounded-full w-10 h-10">
          <CustomImage
            src={user?.imageUrl || "general/avatar-default.svg"}
            alt=""
            w={100}
            h={100}
            tr={true}
          />
        </div>
        <input
          placeholder="Post Your Reply"
          type="text"
          name="description"
          className="flex-grow flex py-2 px-2 outline-none"
        />
        <input
          type="text"
          name="postId"
          readOnly
          value={postId}
          className="hidden"
        />
        <input
          type="text"
          name="username"
          value={username}
          readOnly
          className="hidden"
        />
        <button
          disabled={isPending}
          className="disabled:cursor-not-allowed disabled:bg-textGrayLight font-bold py-1 px-4 rounded-full bg-white text-base cursor-pointer text-black"
        >
          {isPending ? "Replying" : "Reply"}
        </button>
      </form>
      {state && state.error && (
        <span className="text-rose-500 p-4 text-sm">Something went wrong</span>
      )}
      {comments.map((comment) => (
        <div className="" key={comment.id}>
          <Post post={comment} type="comment" />
        </div>
      ))}
    </div>
  );
};

export default Comments;
