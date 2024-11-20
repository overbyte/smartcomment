const paths = {
  home() {
    return `/`;
  },
  topic(topicSlug: string) {
    return `/topics/${topicSlug}`;
  },
  post(topicSlug: string) {
    return `/topics/${topicSlug}/posts/create`;
  },
  postCreate(topicSlug: string, postId: string) {
    return `/topics/${topicSlug}/posts/${postId}`;
  },
};

export default paths;
