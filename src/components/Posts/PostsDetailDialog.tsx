import { Dialog, DialogContent, DialogHeader } from '@/components/ui/dialog';
import type { Post } from '@/types/posts.type';
import { formatDate, formatNumber } from '@/utils/common/other';
import {
  Calendar,
  Heart,
  MessageCircle,
  ExternalLink,
  Image as ImageIcon,
} from 'lucide-react';

interface Props {
  post: Post | null;
  onClose: () => void;
}

const PostDetailDialog = ({ post, onClose }: Props) => {
  return (
    <Dialog open={!!post} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md lg:max-w-xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <h2 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
            <ImageIcon className="w-5 h-5 text-slate-500" />
            Detail Postingan
          </h2>
        </DialogHeader>

        {post && (
          <div className="space-y-5 text-sm">
            {/* Media */}
            <div className="bg-slate-50 rounded-lg p-3">
              <img
                src={post.media_url}
                className="rounded-md max-h-[300px] w-full object-cover"
                alt="Post media"
              />
            </div>

            {/* Caption */}
            <div className="bg-white border rounded-lg p-4">
              <h3 className="text-xs font-medium text-slate-500 mb-2">
                Caption
              </h3>
              <p className="whitespace-pre-line text-slate-700 leading-relaxed">
                {post.caption}
              </p>
            </div>

            {/* Meta Info */}
            <div className="flex justify-between w-full gap-y-4 flex-wrap mb-2">
              <div className="flex items-center gap-2 bg-slate-50 px-2 rounded-md">
                <Heart className="w-4 h-4 text-rose-500/70" />
                <span className="text-slate-700">
                  {formatNumber(post.like_count)} Likes
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 px-2 rounded-md">
                <MessageCircle className="w-4 h-4 text-sky-600/70" />
                <span className="text-slate-700">
                  {formatNumber(post.comments_count)} Komentar
                </span>
              </div>

              <div className="flex items-center gap-2 bg-slate-50 px-2 rounded-md">
                <Calendar className="w-4 h-4 text-slate-500" />
                <span className="text-slate-700">
                  {formatDate(post.timestamp)}
                </span>
              </div>

              <a
                href={post.permalink}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-slate-50 px-2 rounded-md text-blue-600 hover:bg-slate-100 transition"
              >
                <ExternalLink className="w-4 h-4" />
                Lihat di Instagram
              </a>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PostDetailDialog;
