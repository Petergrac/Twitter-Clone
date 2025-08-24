"use server";
import { auth } from "@clerk/nextjs/server";
import { imageKit } from "./utiis";
import prisma from "./prismaClient";
import { z } from "zod";
import { revalidatePath } from "next/cache";

// =====================IMAGE UPLOADER ===========
// =======                             ============
export const shareAction = async (
  userFile: File,
  settings: { type: "original" | "wide" | "square" },
  sensitive: boolean
) => {
  const file = userFile;
  console.log(file);
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const transformation = `w-600, ${
    settings.type === "square"
      ? "ar-1-1"
      : settings.type === "wide"
      ? "ar-16-9"
      : ""
  }`;

  return new Promise((resolve, reject) => {
    imageKit.upload(
      {
        file: buffer,
        fileName: file.name,
        folder: "/posts",
        ...(file.type.includes("image") && {
          transformation: {
            pre: transformation,
          },
        }),
        customMetadata: {
          sensitive: sensitive,
        },
      },
      function (error, result) {
        if (error) {
          console.log(error);
          reject(error);
        } else {
          console.log(result);
          if (result) resolve(result.url);
        }
      }
    );
  });
};

/**
 * ================= LIKE ACTION ================
 *
 */
export const likePost = async (postId: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingLike = await prisma.like.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  if (existingLike) {
    await prisma.like.delete({
      where: {
        id: existingLike.id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }
};
/**
 * ================= REPOST ACTION ================
 *
 */
export const rePost = async (postId: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingRepost = await prisma.post.findFirst({
    where: {
      userId: userId,
      rePostId: postId,
    },
  });
  if (existingRepost) {
    await prisma.post.delete({
      where: {
        id: existingRepost.id,
      },
    });
  } else {
    await prisma.post.create({
      data: {
        userId,
        rePostId: postId,
      },
    });
  }
};
/**
 * ================= SHARE ACTION ================
 *
 */
export const savePost = async (postId: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingSavedPost = await prisma.savedPosts.findFirst({
    where: {
      userId: userId,
      postId: postId,
    },
  });
  if (existingSavedPost) {
    await prisma.savedPosts.delete({
      where: {
        id: existingSavedPost.id,
      },
    });
  } else {
    await prisma.savedPosts.create({
      data: {
        userId,
        postId,
      },
    });
  }
};
/**
 * ===============
 *
 *       COMMENT UPDATED & CREATION
 *
 * ===============
 *
 */
export const addComment = async (
  prevState: { success: boolean; error: boolean },
  formData: FormData
) => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: true };
  const desc = formData.get("description");
  const postId = formData.get("postId");
  const username = formData.get("username");

  // Schema
  const Comment = z.object({
    parentPostId: z.string(),
    desc: z.string().max(140),
  });

  // Validate fields
  const validateFields = Comment.safeParse({
    parentPostId: postId,
    desc,
  });
  // Check for errors
  if (!validateFields.success) {
    return { success: false, error: true };
  }
  try {
    // Save it to the database
    await prisma.post.create({
      data: {
        ...validateFields.data,
        userId,
      },
    });

    // Revalidate the path
    revalidatePath(`/${username}/status/${postId}`);
    return { success: true, error: false };
  } catch (error) {
    console.log(error);
    return { success: false, error: true };
  }
};

/**
 * ===============
 *       Create a Post
 * ===============
 *
 */
export const addPost = async (
  prevState: { success: boolean; error: boolean },
  formData: FormData
) => {
  const { userId } = await auth();
  if (!userId) return { success: false, error: true };
  const desc = formData.get("description");
  const file = formData.get("file") as File;
  const isSensitive = formData.get("isSensitive");
  const settings = formData.get("settings") as {
    type: "original" | "wide" | "square";
  };

  // Schema
  const Comment = z.object({
    desc: z.string().max(140),
  });

  // Validate fields
  const validateFields = Comment.safeParse({
    desc,
  });
  // Check for errors
  if (!validateFields.success) {
    return { success: false, error: true };
  }
  if (file.size > 0) {
    const url = (await shareAction(
      file,
      settings,
      Boolean(isSensitive)
    )) as string;
    if (!url) return { success: false, error: true };
    try {
      // Save it to the database
      await prisma.post.create({
        data: {
          ...validateFields.data,
          userId,
          img: url,
          isSensitive: Boolean(isSensitive),
        },
      });
      revalidatePath("/");
      return { success: true, error: false };
    } catch (error) {
      console.log(error);
      return { success: false, error: true };
    }
  } else {
    try {
      // Save it to the database
      await prisma.post.create({
        data: {
          ...validateFields.data,
          userId,
        },
      });
      revalidatePath("/");
      return { success: true, error: false };
    } catch (error) {
      console.log(error);
      return { success: false, error: true };
    }
  }
};

/**
 * ================= FOLLOW ACTION ================
 *
 */
export const followUser = async (targetUserId: string) => {
  const { userId } = await auth();
  if (!userId) return;

  const existingFollow = await prisma.follow.findFirst({
    where: {
      followerId: userId,
      followingId: targetUserId,
    },
  });
  if (existingFollow) {
    await prisma.follow.delete({
      where: {
        id: existingFollow.id,
      },
    });
  } else {
    await prisma.follow.create({
      data: {
        followerId: userId,
        followingId: targetUserId,
      },
    });
  }
};
