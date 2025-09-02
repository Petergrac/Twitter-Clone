// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  const users = [];

  // Create 5 users
  for (let i = 0; i < 5; i++) {
    const user = await prisma.user.create({
      data: {
        username: faker.internet.displayName(),
        display_name: faker.person.fullName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        bio: faker.lorem.sentence(),
        location: faker.location.city(),
        job: faker.person.jobTitle(),
        website: faker.internet.url(),
        cover: faker.image.urlPicsumPhotos(),
        img: faker.image.avatar(),
      },
    });
    users.push(user);
  }

  const posts = [];

  // Create posts per user
  for (const user of users) {
    for (let i = 0; i < 10; i++) {
      const post = await prisma.post.create({
        data: {
          desc: faker.lorem.paragraph(),
          img: faker.image.urlPicsumPhotos(),
          video: Math.random() > 0.5 ? faker.internet.url() : null,
          isSensitive: faker.datatype.boolean(),
          userId: user.id,
        },
      });
      posts.push(post);
    }
  }

  // Create comments
  for (let i = 0; i < 15; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const parentPost = posts[Math.floor(Math.random() * posts.length)];
    await prisma.post.create({
      data: {
        desc: faker.lorem.sentence(),
        userId: user.id,
        parentPostId: parentPost.id,
      },
    });
  }

  // Create reposts
  for (let i = 0; i < 15; i++) {
    const user = users[Math.floor(Math.random() * users.length)];
    const originalPost = posts[Math.floor(Math.random() * posts.length)];
    await prisma.post.create({
      data: {
        desc: faker.lorem.sentence(),
        userId: user.id,
        rePostId: originalPost.id,
      },
    });
  }

  // Likes for all posts
  const allPosts = await prisma.post.findMany();
  for (let i = 0; i < 20; i++) {
    const liker = users[Math.floor(Math.random() * users.length)];
    const post = allPosts[Math.floor(Math.random() * allPosts.length)];
    await prisma.like.create({
      data: {
        userId: liker.id,
        postId: post.id,
      },
    });
  }

  // Likes for specific posts
  for (const post of posts) {
    const liker = users[Math.floor(Math.random() * users.length)];
    await prisma.like.create({
      data: {
        userId: liker.id,
        postId: post.id,
      },
    });
  }

  // Saved posts
  for (const post of posts) {
    const saver = users[Math.floor(Math.random() * users.length)];
    await prisma.savedPosts.create({
      data: {
        userId: saver.id,
        postId: post.id,
      },
    });
  }

  // Follows
  for (const follower of users) {
    const followings = users.filter((u) => u.id !== follower.id);
    const following =
      followings[Math.floor(Math.random() * followings.length)];

    await prisma.follow.create({
      data: {
        followerId: follower.id,
        followingId: following.id,
      },
    });
  }
}

main()
  .then(() => {
    console.log("✅ Seeding complete");
  })
  .catch((e) => {
    console.error("❌ Seeding error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
