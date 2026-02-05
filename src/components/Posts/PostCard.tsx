import { Card, CardContent, CardHeader } from '../ui/card';
import { Calendar, Heart, ImageIcon, MessageCircle, Video } from 'lucide-react';
import { Avatar, AvatarFallback } from '../ui/avatar';
import { getInitials, profile } from '@/utils/common/profile';
import { formatDate, formatNumber } from '@/utils/common/other';
import type { Post } from '@/types/posts.type';
import { getThreat } from '@/utils/common/posts';
import { Badge } from '../ui/badge';

interface PostCardProps {
  post: Post;
  score: number;
  onSelect: (post: Post) => void;
}

const PostCard = ({ post, score, onSelect }: PostCardProps) => {
  const threat = getThreat(score);

  return (
    <Card
      key={post.id}
      className="flex flex-col justify-between cursor-pointer hover:shadow-lg transition overflow-hidden py-0 gap-3"
      onClick={() => onSelect(post)}
    >
      <CardHeader className="relative px-0">
        <img
          src={post.media_url}
          className="object-cover w-full max-h-[200px]"
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
          <Badge className={`absolute top-3 right-3 py-1 ${threat.className}`}>
            {threat.label}
          </Badge>
        )}
      </CardHeader>

      <CardContent className="px-4 mb-6">
        <div className="flex items-center gap-3 mb-4">
          <Avatar>
            <AvatarFallback>{getInitials(profile.username)}</AvatarFallback>
          </Avatar>
          <div className="min-w-0">
            <p className="font-semibold truncate">{profile.full_name}</p>
            <p className="text-xs text-slate-500 truncate">
              @{profile.username}
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
            {formatNumber(post.comments_count)}
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            {formatDate(post.created_at)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
