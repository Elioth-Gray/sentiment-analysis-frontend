import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { ImageIcon, Video, Eye, MessageCircle } from 'lucide-react';

import type { Post } from '@/types/posts.type';
import { getCommentLevel } from '@/utils/common/posts';
import { formatDate, formatNumber } from '@/utils/common/other';

interface Props {
  posts: Post[];
  onSelect: (post: Post) => void;
}

const PostsTable = ({ posts, onSelect }: Props) => {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Media</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead className="text-center">Likes</TableHead>
            <TableHead className="text-center">Komentar</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Comment Level</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {posts.map((post) => {
            const commentLevel = getCommentLevel(post.comments_count);

            return (
              <TableRow key={post.id}>
                <TableCell>
                  {post.media_type === 'VIDEO' ? (
                    <Video className="w-4 h-4 text-slate-700" />
                  ) : (
                    <ImageIcon className="w-4 h-4 text-slate-700" />
                  )}
                </TableCell>

                <TableCell className="max-w-xs truncate">
                  {post.caption}
                </TableCell>

                <TableCell className="text-center">
                  {formatNumber(post.like_count)}
                </TableCell>

                <TableCell className="text-center">
                  {formatNumber(post.comments_count)}
                </TableCell>

                <TableCell>{formatDate(post.timestamp)}</TableCell>

                <TableCell className="text-center">
                  <Badge className={commentLevel.className}>
                    <MessageCircle className="w-3 h-3 mr-1" />
                    {commentLevel.label}
                  </Badge>
                </TableCell>

                <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelect(post)}
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    Detail
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTable;
