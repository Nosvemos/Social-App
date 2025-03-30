"use server";

import prisma from '@/lib/prisma'
import { getDbUserId } from './user'

export async function getProfileByUsername(username: string) {
  try {
    return await prisma.user.findUnique({
      where: { username: username },
      select: {
        id: true,
        name: true,
        username: true,
        bio: true,
        image: true,
        createdAt: true,
        _count: {
          select: {
            followers: true,
            following: true,
            posts: true,
          },
        },
      },
    });
  } catch (error) {
    console.error("Error fetching profile:", error);
    throw new Error("Failed to fetch profile");
  }
}

export async function getUserPosts(userId: string) {
  try {
    return await prisma.post.findMany({
      where: {
        authorId: userId,
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            image: true,
            _count: {
              select: {
                followers: true,
                following: true
              }
            }
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                image: true,
                _count: {
                  select: {
                    followers: true,
                    following: true
                  }
                }
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching user posts:", error);
    throw new Error("Failed to fetch user posts");
  }
}

export async function getUserLikedPosts(userId: string) {
  try {
    return await prisma.post.findMany({
      where: {
        likes: {
          some: {
            userId,
          },
        },
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            image: true,
            _count: {
              select: {
                followers: true,
                following: true
              }
            }
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                image: true,
                _count: {
                  select: {
                    followers: true,
                    following: true
                  }
                }
              },
            },
          },
          orderBy: {
            createdAt: "asc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
  } catch (error) {
    console.error("Error fetching liked posts:", error);
    throw new Error("Failed to fetch liked posts");
  }
}

export async function getUserRepliedPosts(userId: string) {
  try {
    const userComments = await prisma.comment.findMany({
      where: {
        authorId: userId
      },
      orderBy: {
        createdAt: "desc"
      },
      select: {
        postId: true,
        createdAt: true
      }
    });

    const latestCommentDateByPostId = new Map();

    userComments.forEach(comment => {
      if (!latestCommentDateByPostId.has(comment.postId) ||
        new Date(comment.createdAt) > new Date(latestCommentDateByPostId.get(comment.postId))) {
        latestCommentDateByPostId.set(comment.postId, comment.createdAt);
      }
    });

    const postIds = [...latestCommentDateByPostId.keys()];

    const posts = await prisma.post.findMany({
      where: {
        id: {
          in: postIds
        }
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            bio: true,
            image: true,
            _count: {
              select: {
                followers: true,
                following: true
              }
            }
          },
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                bio: true,
                image: true,
                _count: {
                  select: {
                    followers: true,
                    following: true
                  }
                }
              },
            },
          },
          orderBy: {
            createdAt: "desc",
          },
        },
        likes: {
          select: {
            userId: true,
          },
        },
        _count: {
          select: {
            likes: true,
            comments: true,
          },
        },
      }
    });

    return posts.sort((a, b) => {
      const dateA = new Date(latestCommentDateByPostId.get(a.id));
      const dateB = new Date(latestCommentDateByPostId.get(b.id));
      return dateB.getTime() - dateA.getTime();
    });

  } catch (error) {
    console.error("Error fetching replied posts:", error);
    throw new Error("Failed to fetch replied posts");
  }
}

export async function isFollowing(userId: string) {
  try {
    const currentUserId = await getDbUserId();
    if (!currentUserId) return false;

    const follow = await prisma.follow.findUnique({
      where: {
        followerId_followingId: {
          followerId: currentUserId,
          followingId: userId,
        },
      },
    });

    return !!follow;
  } catch (error) {
    console.error("Error checking follow status:", error);
    return false;
  }
}