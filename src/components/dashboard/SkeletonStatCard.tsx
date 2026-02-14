import { Skeleton } from '../ui/skeleton';

export const StatCardSkeleton = () => {
  return (
    <div className="p-5 border border-slate-200 rounded-lg bg-white flex gap-4">
      <Skeleton className="w-9 h-9 rounded-md" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-3 w-24" />
        <Skeleton className="h-6 w-20" />
        <Skeleton className="h-3 w-28" />
      </div>
    </div>
  );
};
