import StatCard from '@/components/dashboard/StatCard';
import ProfileHeader from '@/components/dashboard/ProfileHeader';
import { FileText, Users, UserPlus, ShieldCheck } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { AccountProfileAction } from '@/lib/account/accountProfile';
import { ProfileHeaderSkeleton } from '@/components/dashboard/SkeletonProfile';
import { StatCardSkeleton } from '@/components/dashboard/SkeletonStatCard';
import { Response_Status } from '@/types/response.type';

const DashboardPage = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['account-profile'],
    queryFn: AccountProfileAction,
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <ProfileHeaderSkeleton />
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {Array.from({ length: 4 }).map((_, i) => (
            <StatCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (isError || data?.status !== Response_Status.SUCCESS) {
    return (
      <div className="text-center text-red-500">
        Failed to load dashboard data.
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <ProfileHeader
        name={data.data?.name || 'Unknown User'}
        username={data.data?.username || 'unknown'}
        profilePicture={
          data.data?.profile_picture_url || 'https://via.placeholder.com/150'
        }
      />

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        <StatCard
          title="Total Posts"
          value={data.data?.posts_count || 0}
          icon={FileText}
        />
        <StatCard
          title="Followers"
          value={data.data?.followers_count || 0}
          icon={Users}
        />
        <StatCard
          title="Following"
          value={data.data?.follows_count || 0}
          icon={UserPlus}
        />
        <StatCard
          title="Account Status"
          value="Active"
          icon={ShieldCheck}
          subtitle="Public profile"
        />
      </div>
    </div>
  );
};

export default DashboardPage;
