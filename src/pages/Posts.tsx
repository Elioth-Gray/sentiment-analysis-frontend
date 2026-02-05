import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Search, Filter, Shield, AlertTriangle } from 'lucide-react';
import PostCard from '@/components/Posts/PostCard';
import { getPostStats } from '@/utils/common/posts';
import { profile } from '@/utils/common/profile';
import { postsDummy } from '@/dummy-data/post.data';
import type { Post } from '@/types/posts.type';
import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';

const Posts = () => {
  const [filter, setFilter] = useState<'all' | 'protest' | 'safe'>('all');
  const [search, setSearch] = useState('');
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);

  const filteredPosts = useMemo(() => {
    return postsDummy.filter((post) => {
      const stats = getPostStats(post);
      const isProtest = stats.avgScore >= 0.5;
      if (filter === 'protest' && !isProtest) return false;
      if (filter === 'safe' && isProtest) return false;

      if (search) {
        return (
          profile.username.toLowerCase().includes(search.toLowerCase()) ||
          profile.full_name.toLowerCase().includes(search.toLowerCase())
        );
      }

      return true;
    });
  }, [filter, search]);

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Social Media Protest Monitoring</CardTitle>
          <p className="text-sm text-slate-600">
            Sistem analisis komentar publik untuk deteksi dini potensi protes
          </p>
        </CardHeader>
        <CardContent className="flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari akun atau nama..."
              className="w-full pl-9 pr-3 py-2 border rounded-md"
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
            >
              <Filter className="w-4 h-4 mr-1" /> Semua
            </Button>
            <Button
              variant={filter === 'protest' ? 'destructive' : 'outline'}
              onClick={() => setFilter('protest')}
            >
              <AlertTriangle className="w-4 h-4 mr-1" /> Protes
            </Button>
            <Button
              variant={filter === 'safe' ? 'default' : 'outline'}
              onClick={() => setFilter('safe')}
            >
              <Shield className="w-4 h-4 mr-1" /> Aman
            </Button>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post) => {
          const stats = getPostStats(post);

          return (
            <PostCard
              post={post}
              score={stats.avgScore}
              onSelect={(selectedPost) => {
                setSelectedPost(selectedPost);
              }}
            />
          );
        })}
      </div>

      <Dialog
        open={!!selectedPost}
        onOpenChange={(open) => !open && setSelectedPost(null)}
      >
        <DialogContent className="w-full max-w-lg sm:max-w-xl md:max-w-2xl mx-4">
          <DialogHeader>
            <h2 className="text-lg font-bold">
              Post Detail {selectedPost?.id}
            </h2>
          </DialogHeader>

          {selectedPost && (
            <div className="space-y-4 px-12">
              <img
                src={selectedPost.media_url}
                className="rounded-lg max-h-[280px] w-full object-cover"
              />
              <p>{selectedPost.caption}</p>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Posts;
