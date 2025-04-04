"use server";

import { auth, currentUser } from '@clerk/nextjs/server'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

export async function syncUser() {
  try {
    const { userId } = await auth();
    const user = await currentUser();

    if (!user || !userId) return;

    const existingUser = await prisma.user.findUnique({
      where: {
        clerkId: userId
      }
    })

    if (existingUser) return await prisma.user.update({
      where: {
        clerkId: userId
      },
      data: {
        name: user.fullName,
        username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl
      }
    });

    return await prisma.user.create({
      data: {
        clerkId: userId,
        name: user.fullName,
        username: user.username ?? user.emailAddresses[0].emailAddress.split("@")[0],
        email: user.emailAddresses[0].emailAddress,
        image: user.imageUrl,
        bio: 'Bio'
      }
    });

  } catch (error) {
    console.error("Error in syncUser:", error);
  }
}

export async function getUserByClerkId(clerkId: string) {
  return prisma.user.findUnique({
    where: {
      clerkId
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true
        }
      }
    }
  })
}

export async function getUserByDbId (id: string) {
  return prisma.user.findUnique({
    where: {
      id
    },
    include: {
      _count: {
        select: {
          followers: true,
          following: true,
          posts: true
        }
      }
    }
  })
}

export async function getDbUserId() {
  const { userId: clerkId } = await auth();
  if (!clerkId) return null;

  const user = await getUserByClerkId(clerkId);
  if (!user) throw new Error("User not found");

  return user.id;
}

export async function getRandomUsers() {
  try {
    const userId = await getDbUserId();
    if (!userId) return [];

    return await prisma.user.findMany({
      where: {
        AND: [
          {
            NOT: {
              id: userId
            }
          },
          {
            NOT: {
              followers: {
                some: {
                  followerId: userId
                }
              }
            }
          }
        ]
      },
      select: {
        id: true,
        name: true,
        username: true,
        image: true,
        bio: true,
        _count: {
          select: {
            followers: true,
            following: true,
          }
        }
      },
      take: 3,
    });
  } catch (error) {
    console.error("Error fetching random users:", error);
    return [];
  }
}

export async function toggleFollow(targetUserId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;
    if (userId === targetUserId) throw new Error("You can not follow yourself.");

    const existingFollow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: userId,
          followingId: targetUserId
        }
      }
    });

    if (existingFollow) {
      // Unfollow
      await prisma.follow.delete({
        where: {
          followerId_followingId: {
            followerId: userId,
            followingId: targetUserId
          }
        }
      })
    } else {
      // Follow
      await prisma.$transaction([
        prisma.follow.create({
          data: {
            followerId: userId,
            followingId: targetUserId
          }
        }),

        prisma.notification.create({
          data: {
            type: 'FOLLOW',
            userId: targetUserId,
            creatorId: userId
          }
        })
      ])
    }
    revalidatePath('/')
    return { success: true };
  } catch (error) {
    console.error("Error in toggleFollow:", error);
    return { success: false, error: "Error toggling follow" };
  }
}