import Link from "next/link";
import CustomImage from "./Image";
import prisma from "@/prismaClient";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";
const Recommendations = async () => {
  const { userId } = await auth();
  if (!userId) return notFound();

  const followingsId = await prisma.follow.findMany({
    where: { followerId: userId },
    select: { followingId: true },
  });

  const followedUserId = followingsId.map((f) => f.followingId);
  const friendRecommendations = await prisma.user.findMany({
    where: {
      id: {
        not: userId,
        notIn: followedUserId,
      },
      followings: {
        some: {
          followerId: { in: followedUserId },
        },
      },
    },
    take: 3,
    select: {
      id: true,
      display_name: true,
      username: true,
      img: true,
    },
  });
  return (
    <div className="p-4 rounded-2xl border-[1px] border-borderGray flex flex-col gap-4">
      {/* USER CARDS */}
      {friendRecommendations.map((person) => (
        <div className="flex items-center justify-between" key={person.id}>
          {/* IMAGE & USER INFO */}
          <div className="flex items-center gap-2">
            <div className="relative rounded-full overflow-hidden w-10 h-10">
              <CustomImage
                src={person.img || "general/avatar.png"}
                alt="john doe"
                w={100}
                h={100}
                tr={true}
              />
            </div>
            <div className="">
              <h1 className="text-md font-bold">
                {person.display_name || person.username}
              </h1>
              <span className="text-textGray text-sm">@{person.username}</span>
            </div>
          </div>
          {/* BUTTON */}
          <button className="py-1 px-4 font-semibold bg-white text-black rounded-full">
            Follow
          </button>
        </div>
      ))}
      <Link href="/" className="text-iconBlue">
        Show More
      </Link>
    </div>
  );
};

export default Recommendations;
