'use server';

import type { Post } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { z } from 'zod';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

const createPostSchema = z.object({
  title: z.string().min(3),
  content: z.string().min(10),
});

interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  slug: string,
  formState: CreatePostFormState,
  formData: FormData
): Promise<CreatePostFormState> {
  const result = createPostSchema.safeParse({
    title: formData.get('title'),
    content: formData.get('content'),
  });

  // return field errors
  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // return form errors
  const session = await auth();
  if (!session?.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  // get topicId from slug
  const topic = await db.topic.findFirst({
    where: { slug },
  });

  // ensure topic exists
  if (!topic) {
    return {
      errors: {
        _form: ['Unable to find topic'],
      },
    };
  }

  let post: Post;
  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id,
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    }
    return {
      errors: {
        _form: ['Creating the post went baaaaaaddd'],
      },
    };
  }

  // TODO use time based revalidation on homepage
  // TODO update topics page
  revalidatePath(paths.topic(slug));

  // redirect to post page
  redirect(paths.post(slug, post.id));
}
