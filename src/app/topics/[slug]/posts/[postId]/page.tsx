import Link from 'next/link';
import PostShow from '@/components/posts/post-show';
import CommentList from '@/components/comments/comment-list';
import CommentCreateForm from '@/components/comments/comment-create-form';
import paths from '@/paths';
import { fetchCommentsByPostId } from '@/db/queries/comments';

interface PostPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostPage({ params }: PostPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="space-y-3">
      <Link className="underline decoration-solid" href={paths.topic(slug)}>
        {'< '}Back to {slug}
      </Link>

      <PostShow postId={postId} />
      <CommentCreateForm postId={postId} startOpen />
      <CommentList postId={postId} />
    </div>
  );
}
