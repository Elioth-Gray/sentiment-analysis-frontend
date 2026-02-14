import { Card } from '@/components/ui/card';
import { BadgeCheck } from 'lucide-react';

interface ProfileHeaderProps {
  name: string;
  username: string;
  profilePicture: string;
}

const ProfileHeader = ({
  name,
  username,
  profilePicture,
}: ProfileHeaderProps) => {
  return (
    <Card className="p-6 border border-slate-200 bg-white flex items-center gap-4">
      <img
        src={profilePicture}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border"
      />

      <div className="flex-1">
        <div className="flex items-center gap-2">
          <p className="text-lg font-semibold text-slate-900">{name}</p>
          <BadgeCheck className="text-slate-500" size={18} />
        </div>
        <p className="text-sm text-slate-500">@{username}</p>
        <p className="text-xs text-slate-400 mt-1">
          Official social media account
        </p>
      </div>
    </Card>
  );
};

export default ProfileHeader;
