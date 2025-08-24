// prisma/seed.ts
import { PrismaClient } from "../src/generated/prisma";
import { faker } from "@faker-js/faker";

const prisma = new PrismaClient();

async function main() {
  // Create 5 users
  const users = await Promise.all(
    Array.from({ length: 5 }).map(() =>
      prisma.user.create({
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
      })
    )
  );

  // Create posts for each user
  const posts = await Promise.all(
    users.flatMap((user) =>
      Array.from({ length: 10 }).map(() =>
        prisma.post.create({
          data: {
            desc: faker.lorem.paragraph(),
            img: faker.image.urlPicsumPhotos(),
            video: Math.random() > 0.5 ? faker.internet.url() : null,
            isSensitive: faker.datatype.boolean(),
            userId: user.id,
          },
        })
      )
    )
  );

  // Create comments (as posts with parentPostId)
  await Promise.all(
    Array.from({ length: 15 }).map(() => {
      const user = users[Math.floor(Math.random() * users.length)];
      const parentPost = posts[Math.floor(Math.random() * posts.length)];
      return prisma.post.create({
        data: {
          desc: faker.lorem.sentence(),
          userId: user.id,
          parentPostId: parentPost.id,
        },
      });
    })
  );

  // Create reposts (as posts with rePostId)
  await Promise.all(
    Array.from({ length: 15 }).map(() => {
      const user = users[Math.floor(Math.random() * users.length)];
      const originalPost = posts[Math.floor(Math.random() * posts.length)];
      return prisma.post.create({
        data: {
          desc: faker.lorem.sentence(),
          userId: user.id,
          rePostId: originalPost.id,
        },
      });
    })
  );

  // Create likes for comments and reposts too
  const allPosts = await prisma.post.findMany();
  await Promise.all(
    Array.from({ length: 20 }).map(() => {
      const liker = users[Math.floor(Math.random() * users.length)];
      const post = allPosts[Math.floor(Math.random() * allPosts.length)];
      return prisma.like.create({
        data: {
          userId: liker.id,
          postId: post.id,
        },
      });
    })
  );

  // Create likes
  await Promise.all(
    posts.map((post) => {
      const liker = users[Math.floor(Math.random() * users.length)];
      return prisma.like.create({
        data: {
          userId: liker.id,
          postId: post.id,
        },
      });
    })
  );

  // Create saved posts
  await Promise.all(
    posts.map((post) => {
      const saver = users[Math.floor(Math.random() * users.length)];
      return prisma.savedPosts.create({
        data: {
          userId: saver.id,
          postId: post.id,
        },
      });
    })
  );

  // Create follows
  await Promise.all(
    users.map((follower) => {
      const followings = users.filter((u) => u.id !== follower.id);
      const following =
        followings[Math.floor(Math.random() * followings.length)];

      return prisma.follow.create({
        data: {
          followerId: follower.id,
          followingId: following.id,
        },
      });
    })
  );
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
