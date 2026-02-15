import { useMemo, useState } from 'react';
import type { Post } from '@/types/posts.type';
import PostsTableToolbar from '@/components/Posts/PostsTableToolbar';
import PostsTableSkeleton from '@/components/Posts/PostsTableToolbarSkeleton';
import PostsTable from '@/components/Posts/PostsTable';
import PostDetailDialog from '@/components/Posts/PostsDetailDialog';
import { useQuery } from '@tanstack/react-query';
import { getPostsAction } from '@/lib/posts/getPosts';
import { Response_Status } from '@/types/response.type';

const PostsTablePage = () => {
  const [search, setSearch] = useState('');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const { data: postsData, isPending } = useQuery({
    queryKey: ['posts'],
    queryFn: getPostsAction,
  });

  const filteredPosts = useMemo(() => {
    if (!postsData || postsData.status !== Response_Status.SUCCESS) {
      return [];
    }

    return (postsData.data ?? []).filter((post) => {
      const captionMatch = post.caption
        .toLowerCase()
        .includes(search.toLowerCase());

      const postDate = new Date(post.timestamp).toISOString().slice(0, 10);

      const fromMatch = dateFrom ? postDate >= dateFrom : true;
      const toMatch = dateTo ? postDate <= dateTo : true;

      return captionMatch && fromMatch && toMatch;
    });
  }, [postsData, search, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <PostsTableToolbar
        search={search}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={setSearch}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />

      {isPending ? (
        <PostsTableSkeleton />
      ) : postsData?.status === Response_Status.SUCCESS ? (
        <PostsTable onSelect={setSelectedPost} posts={filteredPosts} />
      ) : (
        <div className="text-center py-4">
          Tidak ada postingan yang tersedia.
        </div>
      )}

      <PostDetailDialog
        post={selectedPost}
        onClose={() => setSelectedPost(null)}
      />
    </div>
  );
};

export default PostsTablePage;
