'use server';

import { getDbUserId } from '@/actions/user'
import prisma from '@/lib/prisma'
import { revalidatePath } from 'next/cache'

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