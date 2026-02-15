import { Menu, X, Instagram, User as Account, Loader2 } from 'lucide-react';
import { Button } from '../ui/button';
import type { User } from '@/types/auth.type';
import { Skeleton } from '../ui/skeleton';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { SyncAccountPostsAction } from '@/lib/posts/syncAccount';
import { Response_Status } from '@/types/response.type';
import { toast } from 'sonner';

const Topbar = ({
  title,
  profile,
  isSidebarOpen,
  toggleSidebar,
}: {
  title: string;
  profile: User | null;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
}) => {
  const queryClient = useQueryClient();
  const { mutate: syncAccountMutate, isPending } = useMutation({
    mutationFn: SyncAccountPostsAction,
    onSuccess: (result) => {
      if (result.status === Response_Status.SUCCESS) {
        queryClient.invalidateQueries({ queryKey: ['posts'] });
        toast.info('Sync completed', {
          description: `Total synced: ${result.data?.total_synced}
          Updated posts: ${result.data?.updated_posts}
          New posts: ${result.data?.new_posts}`,
        });
      } else {
        toast.error(result.errors);
      }
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return (
    <header className="bg-white border-b px-6 py-4 flex justify-between">
      <div className="flex items-center gap-3">
        <Button variant={'ghost'} onClick={toggleSidebar}>
          {isSidebarOpen ? <X /> : <Menu />}
        </Button>
        <h2 className="font-semibold text-slate-800">{title}</h2>
      </div>

      <div className="flex px-3 items-center gap-x-3">
        <Button
          variant={'ghost'}
          className="bg-cyan-600 hover:bg-cyan-500 text-white hover:text-white shadow-md shadow-cyan-600/30"
          onClick={() => syncAccountMutate()}
          disabled={isPending}
        >
          {isPending ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            </>
          ) : (
            <>
              <Account className="mr-2 h-4 w-4" />
              Sync
            </>
          )}
        </Button>
        {profile ? (
          <h3 className="font-semibold">{profile.email}</h3>
        ) : (
          <Skeleton className="h-6 w-40" />
        )}
        <a
          href="https://www.instagram.com/snpmb_id/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram />
        </a>
      </div>
    </header>
  );
};

export default Topbar;
