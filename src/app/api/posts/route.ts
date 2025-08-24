import prisma from "@/prismaClient";
import { auth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  // GETTING SEARCH PARAMS
  const searchParams = request.nextUrl.searchParams;
  // OBTAINING THE VALUE
  const userProfileId = searchParams.get("user");
  const page = searchParams.get("cursor");
  const LIMIT = 3;

  const { userId } = await auth();
  if (!userId) return;
  const whereCondition =
    userProfileId && userProfileId !== "undefined"
      ? { userId: userProfileId, parentPostId: null }
      : {
          parentPostId: null,
          userId: {
            in: [
              userId,
              ...(
                await prisma.follow.findMany({
                  where: { followerId: userId },
                  select: { followingId: true },
                })
              ).map((follow) => follow.followingId),
            ],
          },
        };

  const posts = await prisma.post.findMany({
    where: whereCondition,
    include: {
      user: {
        select: {
          username: true,
          display_name: true,
          img: true,
        },
      },
      rePost: {
        include: {
          user: { select: { display_name: true, username: true, img: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
        },
      },
      _count: { select: { likes: true, rePosts: true, comments: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
    },
    take: LIMIT,
    skip: (Number(page) - 1) * LIMIT,
  });
  // Finding total number of posts based on the condition
  const totalPosts = await prisma.post.count({ where: whereCondition });
  // Checking if there is more posts
  const hasMore = Number(page) * LIMIT < totalPosts;

  await new Promise((resolve) =>
    setTimeout(() => {
      resolve("resolved");
    }, 300)
  );
  return NextResponse.json({ posts, hasMore });
}
