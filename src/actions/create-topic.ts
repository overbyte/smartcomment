'use server';

import { z } from 'zod';

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/^[a-z-]+$/, {
      message: 'Must be lower case letters or dashes without spaces',
    }),
  description: z.string().min(10),
});

export async function createTopic(formState: number, formData: FormData) {
  const result = createTopicSchema.safeParse({
    name: formData.get('name'),
    description: formData.get('description'),
  });

  if (!result.success) {
    console.log(result.error.flatten().fieldErrors);
  }
  return 0;

  // TODO update homepage
  // TODO update topics page
}
