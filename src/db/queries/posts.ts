import type { Post } from '@prisma/client';
import { db } from '@/db';

export type PostWithData = Post & {
  topic: { slug: string };
  user: { name: string | null };
  _count: { comments: number };
};

// alternative method of creating the type
// use the de-promised return type from the fetchPostsByTopicSlug
// function and take the first element
// so Awaited = unwrap the promise
// ReturnType = get the return type from typeof the function
// [number] = get the first element
// export type PostWithData = Awaited<
//   ReturnType<typeof fetchPostsByTopicSlug>
// >[number];

export function fetchPostsByTopicSlug(slug: string): Promise<PostWithData[]> {
  return db.post.findMany({
    where: { topic: { slug } },
    include: {
      topic: { select: { slug: true } },
      user: { select: { name: true } },
      _count: { select: { comments: true } },
    },
  });
}
