import Link from 'next/link';
import { Chip } from '@nextui-org/react';
import { db } from '@/db';
import paths from '@/paths';
import { div } from 'framer-motion/client';

export default async function TopicList() {
  const topics = await db.topic.findMany();

  return (
    <div className="flex flex-row flex-wrap gap-2">
      {topics.map((topic) => (
        <div key={topic.id}>
          <Link href={paths.topic(topic.slug)}>
            <Chip color="warning" variant="shadow">
              {topic.slug}
            </Chip>
          </Link>
        </div>
      ))}
    </div>
  );
}
