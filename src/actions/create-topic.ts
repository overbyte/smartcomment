'use server';

import { redirect } from 'next/navigation';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { Topic } from '@prisma/client';
import { auth } from '@/auth';
import { db } from '@/db';
import paths from '@/paths';

// create form schema for validation
const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lower case letters or dashes without spaces',
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    // field errors from schema
    name?: string[];
    description?: string[];
    // extra field to describe errors with the form itself
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ['You must be signed in to do this'],
      },
    };
  }

  let topic: Topic;
  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
      },
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return {
        errors: {
          _form: [error.message],
        },
      };
    }

    return {
      errors: {
        _form: ['Something went south'],
      },
    };
  }

  // TODO update topics page
  revalidatePath('/');

  redirect(paths.topic(topic.slug));
}
