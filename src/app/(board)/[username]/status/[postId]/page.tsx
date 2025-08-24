import Link from "next/link";
import CustomImage from "@/components/Image";
import Post from "@/components/Post";
import Comments from "@/components/Comments";
import prisma from "@/prismaClient";
import { auth } from "@clerk/nextjs/server";
import { notFound } from "next/navigation";

const PostPage = async ({
  params,
}: {
  params: Promise<{ username: string; postId: string }>;
}) => {
  const { userId } = await auth();
  if (!userId) return notFound();

  // Extract the params id
  const postId = (await params).postId;
  const post = await prisma.post.findFirst({
    where: { id: postId },
    include: {
      user: { select: { username: true, display_name: true, img: true } },
      _count: { select: { likes: true, rePosts: true, comments: true } },
      likes: { where: { userId: userId }, select: { id: true } },
      rePosts: { where: { userId: userId }, select: { id: true } },
      saves: { where: { userId: userId }, select: { id: true } },
      comments: {
        include: {
          user: { select: { username: true, display_name: true, img: true } },
          _count: { select: { likes: true, rePosts: true, comments: true } },
          likes: { where: { userId: userId }, select: { id: true } },
          rePosts: { where: { userId: userId }, select: { id: true } },
          saves: { where: { userId: userId }, select: { id: true } },
        },
        orderBy: {
          createdAt: 'desc'
        }
      },
    },
  });
  if (!post) return notFound();
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-8 sticky top-0 backdrop-blur-md p-4 z-10 bg-black/50">
        <Link href="/">
          <CustomImage src="icons/back.svg" alt="back" h={24} w={24} />
        </Link>
        <h1 className="font-bold text-lg">Post</h1>
      </div>
      <Post type="status" post={post} />
      <Comments comments={post.comments} postId={post.id} username={post.user.username} />
    </div>
  );
};

export default PostPage;
