import { Card } from '../ui/card';
import type { LucideIcon } from 'lucide-react';

type StatCardProps = {
  title: string;
  value: number | string;
  icon: LucideIcon;
  subtitle?: string;
};

const StatCard = ({ title, value, icon: Icon, subtitle }: StatCardProps) => {
  return (
    <Card className="p-5 border border-slate-200 bg-white flex items-start gap-4">
      {/* Icon */}
      <div className="p-2 rounded-md bg-slate-100 text-slate-600">
        <Icon size={20} />
      </div>

      {/* Content */}
      <div className="flex-1">
        <p className="text-sm text-slate-500">{title}</p>
        <p className="text-2xl font-semibold text-slate-900 mt-1">{value}</p>
        {subtitle && <p className="text-xs text-slate-400 mt-1">{subtitle}</p>}
      </div>
    </Card>
  );
};

export default StatCard;
