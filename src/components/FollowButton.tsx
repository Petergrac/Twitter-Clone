"use client";

import { followUser } from "@/Actions";
import { useOptimistic, useState } from "react";

const FollowButton = ({
  userId,
  isFollowed,
}: {
  userId: string;
  isFollowed: boolean;
}) => {
  console.log(isFollowed)
  const [state, setState] = useState(isFollowed);
  const followAction = async () => {
    switchOptimisticFollow("");
    await followUser(userId);
    setState((prev) => !prev);
  };
  const [optimisticFollow, switchOptimisticFollow] = useOptimistic(
    state,
    (prev) => !prev
  );
  return (
    <form action={followAction}>
      <button className="px-2 py-1 bg-white text-black rounded-full ">
        {optimisticFollow ? "Unfollow" : "Follow"}
      </button>
    </form>
  );
};
export default FollowButton;
