import { Skeleton } from '@/components/ui/skeleton';

export const ProfileHeaderSkeleton = () => {
  return (
    <div className="flex items-center gap-4 p-6 border border-slate-200 rounded-lg bg-white">
      <Skeleton className="w-16 h-16 rounded-full" />
      <div className="space-y-2">
        <Skeleton className="h-4 w-48" />
        <Skeleton className="h-3 w-32" />
        <Skeleton className="h-3 w-40" />
      </div>
    </div>
  );
};
