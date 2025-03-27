'use server';

import { getDbUserId } from '@/actions/user'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'
import { toast } from 'sonner'

export interface FormState {
  success?: boolean;
  error?: string;
  message?: string;
  post?: unknown;
}

export async function createPost (prevState: FormState | null, formData: FormData): Promise<FormState> {
  const content = formData.get('content') as string;
  const imageFile = formData.get('image') as File | null;

  // Validate content
  if (!content || content.trim() === '') {
    return {
      success: false,
      error: 'Post content cannot be empty',
    };
  }

  try {
    const userId = await getDbUserId();
    if (!userId) return;

    //TODO Handle image upload (implement actual file upload logic)
    const imageUrl = null;
    // if (imageFile && imageFile.size > 0) {
    //   imageUrl = await uploadImage(imageFile);
    // }

    const post = await prisma.post.create({
      data: {
        content,
        image: imageUrl,
        authorId: userId
      }
    });

    revalidatePath('/');
    return {
      success: true,
      message: 'Post created successfully!',
      post: post,
    }
  } catch (error) {
    console.error('Failed to create post:', error);
    return {
      success: false,
      error: 'Failed to create post',
    }
  }
}

export async function getPosts () {
  try {
    return await prisma.post.findMany({
      orderBy: {
        createdAt: 'desc'
      },
      include: {
        author: {
          select: {
            id: true,
            name: true,
            username: true,
            image: true
          }
        },
        comments: {
          include: {
            author: {
              select: {
                id: true,
                name: true,
                username: true,
                image: true
              }
            }
          },
          orderBy: {
            createdAt: "asc"
          }
        },
        likes: {
          select: {
            userId: true
          }
        },
        _count: {
          select: {
            likes: true,
            comments: true
          }
        }
      }
    })
  } catch (error) {
    console.error('Error in getPosts:', error);
    throw new Error('Failed to fetch posts');
  }
}

export async function toggleLike(postId: string) {
  try {
    const userId = await getDbUserId();
    if (!userId) return;

    // check if like exists
    const existingLike = await prisma.like.findUnique({
      where: {
        userId_postId: {
          userId,
          postId,
        },
      },
    });

    const post = await prisma.post.findUnique({
      where: { id: postId },
      select: { authorId: true },
    });

    if (!post) throw new Error("Post not found");

    if (existingLike) {
      // unlike
      await prisma.like.delete({
        where: {
          userId_postId: {
            userId,
            postId,
          },
        },
      });
    } else {
      // like and create notification (only if liking someone else's post)
      await prisma.$transaction([
        prisma.like.create({
          data: {
            userId,
            postId,
          },
        }),
        ...(post.authorId !== userId
          ? [
            prisma.notification.create({
              data: {
                type: "LIKE",
                userId: post.authorId, // recipient (post author)
                creatorId: userId, // person who liked
                postId,
              },
            }),
          ]
          : []),
      ]);
    }

    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Failed to toggle like:", error);
    return { success: false, error: "Failed to toggle like" };
  }
}