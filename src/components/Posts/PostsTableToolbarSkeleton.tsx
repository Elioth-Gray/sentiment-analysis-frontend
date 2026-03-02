import { Skeleton } from "@/components/ui/skeleton";

const CommentsTableSkeleton = () => {
  return (
    <div className="border rounded-lg bg-white">
      <div className="p-4 space-y-3">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="grid grid-cols-7 gap-4 items-center">
            <Skeleton className="h-4 w-6" />
            <Skeleton className="h-4 col-span-2" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-12" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-20 justify-self-end" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommentsTableSkeleton;
