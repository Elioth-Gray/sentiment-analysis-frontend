import StatCard from '@/components/dashboard/StatCard';

const DashboardPage = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-4 gap-6">
        <StatCard title="Total Posts" value="1.234" />
        <StatCard title="Detected Protests" value="87" />
        <StatCard title="Active Users" value="456" />
        <StatCard title="Accuracy Rate" value="94.5%" />
      </div>
    </div>
  );
};

export default DashboardPage;
