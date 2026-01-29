import { Card } from '../ui/card';

const StatCard = ({
  title,
  value,
}: {
  title: string;
  value: string | number;
}) => {
  return (
    <Card className="p-6 border border-slate-200">
      <p className="text-sm text-slate-500">{title}</p>
      <p className="text-3xl font-bold text-slate-900 mt-2">{value}</p>
    </Card>
  );
};

export default StatCard;
