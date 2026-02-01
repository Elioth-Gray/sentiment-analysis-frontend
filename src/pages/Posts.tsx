import { useMemo, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Search,
  Filter,
  Shield,
  AlertTriangle,
  Heart,
  MessageCircle,
  Calendar,
  Eye,
  Image as ImageIcon,
  Video,
  X,
} from 'lucide-react';
import { getThreat } from '@/utils/common/posts';
import { getInitials } from '@/utils/common/profile';

type Comment = {
  id: number;
  text: string;
  is_protest: boolean;
  protest_score: number;
};

type Account = {
  username: string;
  full_name: string;
  profile_picture: string | null;
  followers: number;
  following: number;
};

type Post = {
  id: number;
  media_type: 'image' | 'video';
  media_url: string;
  like_count: number;
  comment_count: number;
  created_at: string;
  account: Account;
  comments: Comment[];
};

const formatNumber = (num: number) => {
  if (num >= 1_000_000) return `${(num / 1_000_000).toFixed(1)}M`;
  if (num >= 1_000) return `${(num / 1_000).toFixed(1)}K`;
  return num.toString();
};

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const diff = Date.now() - date.getTime();
  const hours = Math.floor(diff / 3_600_000);
  const days = Math.floor(diff / 86_400_000);

  if (hours < 1) return 'Baru saja';
  if (hours < 24) return `${hours} jam lalu`;
  if (days < 7) return `${days} hari lalu`;

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
};

const getPostStats = (post: Post) => {
  const avgScore =
    post.comments.reduce((a, b) => a + b.protest_score, 0) /
    (post.comments.length || 1);

  return {
    total: post.comments.length,
    protest: post.comments.filter((c) => c.is_protest).length,
    avgScore,
    isProtest: post.comments.filter((c) => c.is_protest).length > 0,
  };
};

const POSTS: Post[] = [
  {
    id: 1,
    media_type: 'image',
    media_url:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    like_count: 1543,
    comment_count: 87,
    created_at: '2025-02-01T10:30:00',
    account: {
      username: 'aktivis_jakarta',
      full_name: 'Ahmad Wahyudi',
      profile_picture: null,
      followers: 15420,
      following: 892,
    },
    comments: [
      { id: 1, text: 'Turun ke jalan!', is_protest: true, protest_score: 0.91 },
      { id: 2, text: 'Semoga damai', is_protest: false, protest_score: 0.12 },
    ],
  },
  {
    id: 2,
    media_type: 'image',
    media_url:
      'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800',
    like_count: 13482,
    comment_count: 812,
    created_at: '2026-02-01T18:30:00',
    account: {
      username: 'snmpb_id',
      full_name: 'SNPMB Indonesia',
      profile_picture: null,
      followers: 15420,
      following: 892,
    },
    comments: [
      {
        id: 1,
        text: 'Turun ke jalan!',
        is_protest: false,
        protest_score: 0.21,
      },
      { id: 2, text: 'Semoga damai', is_protest: false, protest_score: 0.12 },
    ],
  },
];

const PostsPage = () => {
  const [filter, setFilter] = useState<'all' | 'protest' | 'safe'>('all');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Post | null>(null);

  const filteredPosts = useMemo(() => {
    return POSTS.filter((post) => {
      const stats = getPostStats(post);
      if (filter === 'protest' && !stats.isProtest) return false;
      if (filter === 'safe' && stats.isProtest) return false;

      if (search) {
        return (
          post.account.username.toLowerCase().includes(search.toLowerCase()) ||
          post.account.full_name.toLowerCase().includes(search.toLowerCase())
        );
      }

      return true;
    });
  }, [filter, search]);

  return (
    <div className="space-y-6">
      {/* Header */}
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

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredPosts.map((post) => {
          const stats = getPostStats(post);
          const threat = getThreat(stats.avgScore);

          return (
            <Card
              key={post.id}
              className="cursor-pointer hover:shadow-lg transition overflow-hidden py-0 gap-3"
              onClick={() => setSelected(post)}
            >
              <CardHeader className="relative px-0">
                <img
                  src={post.media_url}
                  className="object-cover w-full h-full"
                />
                <Badge className="absolute top-3 left-3">
                  {post.media_type === 'video' ? (
                    <Video className="w-4 h-4 mr-1" />
                  ) : (
                    <ImageIcon className="w-4 h-4 mr-1" />
                  )}
                  {post.media_type}
                </Badge>
                {threat && (
                  <Badge
                    className={`absolute top-3 right-3 py-1 ${threat.className}`}
                  >
                    {threat.label}
                  </Badge>
                )}
              </CardHeader>

              <CardContent className="px-4 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Avatar>
                    <AvatarFallback>
                      {getInitials(post.account.full_name)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="min-w-0">
                    <p className="font-semibold truncate">
                      {post.account.full_name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      @{post.account.username}
                    </p>
                  </div>
                </div>

                <div className="flex justify-between text-sm text-slate-600">
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4" />
                    {formatNumber(post.like_count)}
                  </span>
                  <span className="flex items-center gap-1">
                    <MessageCircle className="w-4 h-4" />
                    {post.comment_count}
                  </span>
                  <span className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(post.created_at)}
                  </span>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/50 flex items-center justify-center p-4"
          onClick={() => setSelected(null)}
        >
          <div
            className="bg-white rounded-xl max-w-3xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center p-4 border-b">
              <h3 className="font-bold">Detail Post</h3>
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setSelected(null)}
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
            <div className="p-6">
              <Alert>
                <Eye className="w-4 h-4" />
                <AlertDescription>
                  Post ini dianalisis untuk mendeteksi potensi konten protes
                  berdasarkan komentar publik.
                </AlertDescription>
              </Alert>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PostsPage;
