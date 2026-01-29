import { Avatar, AvatarFallback } from '@/components/ui/avatar';

type Props = {
  name: string;
  size?: 'sm' | 'md' | 'lg';
};

const sizeMap = {
  sm: 'w-8 h-8 text-sm',
  md: 'w-10 h-10 text-base',
  lg: 'w-24 h-24 text-3xl',
};

const UserAvatar = ({ name, size = 'md' }: Props) => {
  const initial = name.charAt(0).toUpperCase();

  return (
    <Avatar
      className={`${sizeMap[size]} bg-slate-700 text-white font-semibold flex items-center justify-center`}
    >
      <AvatarFallback>{initial}</AvatarFallback>
    </Avatar>
  );
};

export default UserAvatar;
