import Feed from "@/components/Feed";
import FollowButton from "@/components/FollowButton";
import CustomImage from "@/components/Image";
import prisma from "@/prismaClient";
import { auth } from "@clerk/nextjs/server";
import Link from "next/link";
import { notFound } from "next/navigation";

const UserProfile = async ({
  params,
}: {
  params: Promise<{ username: string }>;
}) => {
  
  const { username } = await params;
  const { userId } = await auth();
  const user = await prisma.user.findUnique({
    where: {
      username: username,
    },
    include: {
      _count: { select: { followers: true, followings: true } },
      followings: userId ? { where: { followerId: userId } } : undefined,
    },
  });
  if (!user) return notFound();
  return (
    <div className="">
      {/* PROFILE TITLE */}
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/50">
        <Link href="/">
          <CustomImage src="icons/back.svg" alt="back" h={24} w={24} />
        </Link>
        <h1 className="font-bold text-lg">{user.display_name}</h1>
      </div>
      {/* INFO */}
      <div className="">
        {/* COVER & AVATAR */}
        <div className="relative w-full">
          {/* COVER */}
          <div className="w-full aspect-[3/1] relative overflow-hidden">
            <CustomImage
              src={user.cover || "general/cover.jpg"}
              tr={true}
              alt="back"
              h={200}
              w={600}
            />
          </div>
          {/* AVATAR */}
          <div className="ring-4 left-4 -translate-y-1/2 ring-black absolute overflow-hidden aspect-square w-1/6 rounded-full">
            <CustomImage
              src={user.img || "general/avatar-default.svg"}
              tr={true}
              alt=""
              h={200}
              w={200}
            />
          </div>
        </div>
        <div className="flex w-full gap-2 p-2 justify-end items-center">
          <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ring-[1px] ring-gray-500">
            <CustomImage src="icons/more.svg" alt="" w={20} h={20} />
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ring-[1px] ring-gray-500">
            <CustomImage src="icons/explore.svg" alt="" w={20} h={20} />
          </div>
          <div className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer ring-[1px] ring-gray-500">
            <CustomImage src="icons/message.svg" alt="" w={20} h={20} />
          </div>
          {userId && (
            <FollowButton
              userId={userId}
              isFollowed={!!user.followings.length}
            />
          )}
        </div>
        {/* USER INFO */}
        <div className="p-4 flex flex-col gap-2">
          {/* USERNAME & HANDLE */}
          <div className="">
            <h1 className="font-bold text-2xl">{user.display_name}</h1>
            <span className="text-textGray text-sm">@{user.username}</span>
          </div>
          {user.bio && (
            <p className="text-xs font-medium text-textGrayLight">{user.bio}</p>
          )}
          {/* JOB LOCATION & DATE */}
          <div className="flex gap-4 text-textGray text[13px]">
            {user.location && (
              <div className="flex gap-2 items-center">
                <CustomImage
                  src="icons/userLocation.svg"
                  w={20}
                  h={20}
                  alt="location"
                />
                <span className="">{user.location}</span>
              </div>
            )}
            <div className="flex gap-2 items-center">
              <CustomImage src="icons/date.svg" w={20} h={20} alt="location" />
              <span className="">
                Joined{" "}
                {user.createdAt.toLocaleDateString("en-Us", {
                  month: "long",
                  year: "numeric",
                })}
              </span>
            </div>
          </div>
        </div>
        {/* FOLLOWINGS & FOLLOWERS */}
        <div className="flex gap-4">
          <div className="flex items-center gap-2">
            <span className="font-bold">{user._count.followings}</span>
            <span className="text-textGray text-[15px]">Following</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-bold">{user._count.followers}</span>
            <span className="text-textGray text-[15px]">
              {user._count.followers === 1 ? "Follower" : "Followers"}
            </span>
          </div>
        </div>
      </div>
      {/* FEEDS */}
      <Feed userProfileId={user.id} />
    </div>
  );
};

export default UserProfile;
