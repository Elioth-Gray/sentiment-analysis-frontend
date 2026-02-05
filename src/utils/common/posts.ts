import type { Post } from '@/types/posts.type';

export const getThreat = (avg: number) => {
  if (avg >= 0.8)
    return {
      label: 'Protes Tinggi',
      className: 'bg-red-100 text-red-700 border border-red-200',
    };
  if (avg >= 0.5)
    return {
      label: 'Protes Sedang',
      className: 'bg-amber-100 text-amber-700 border border-amber-200',
    };
  return {
    label: 'Protes Rendah',
    className: 'bg-emerald-100 text-emerald-700 border border-emerald-200',
  };
};

export const getPostStats = (post: Post) => {
  return {
    total: post.comments_count,
    avgScore: post.protest_comments_percentage,
  };
};
