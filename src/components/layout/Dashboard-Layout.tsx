import { useState } from 'react';
import { Outlet, useMatches } from 'react-router-dom';
import Topbar from './Topbar';
import Sidebar from './Sidebar';
import { useQuery } from '@tanstack/react-query';
import { ProfileAction } from '@/lib/auth/profile';
import { Response_Status } from '@/types/response.type';
import { Skeleton } from '../ui/skeleton';

type RouteHandle = {
  title?: string;
};

const DashboardLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const matches = useMatches();
  const { data: profileData } = useQuery({
    queryKey: ['profile', 'posts'],
    queryFn: ProfileAction,
  });

  const currentRoute = matches[matches.length - 1];
  const handle = currentRoute?.handle as RouteHandle | undefined;
  const title = handle?.title ?? '';

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {profileData?.status === Response_Status.SUCCESS ? (
        <Sidebar profile={profileData?.data || null} isOpen={isSidebarOpen} />
      ) : (
        <Skeleton className="w-full" />
      )}
      <div
        className={`flex-1 transition-all duration-300 ${
          isSidebarOpen ? 'ml-64' : 'ml-20'
        }`}
      >
        {profileData?.status === Response_Status.SUCCESS ? (
          <Topbar
            title={title}
            profile={profileData?.data || null}
            isSidebarOpen={isSidebarOpen}
            toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)}
          />
        ) : (
          <Skeleton className="w-full" />
        )}
        <main className="p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;
