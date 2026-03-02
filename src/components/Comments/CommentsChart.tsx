import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { Comment } from "@/types/comment.type";

interface ChartProps {
  comments: Comment[];
}

const CommentsChart = ({ comments }: ChartProps) => {
  const chartData = useMemo(() => {
    const grouped = comments.reduce((acc: Record<string, any>, comment) => {
      const dateObj = new Date(comment.timestamp);
      const dateStr = dateObj.toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
      });

      if (!acc[dateStr]) {
        acc[dateStr] = { date: dateStr, Protes: 0, "Tidak Protes": 0 };
      }

      if (comment.is_protest) {
        acc[dateStr].Protes += 1;
      } else {
        acc[dateStr]["Tidak Protes"] += 1;
      }

      return acc;
    }, {});

    return Object.values(grouped);
  }, [comments]);

  if (comments.length === 0) {
    return (
      <div className="p-4 text-center text-slate-500">
        Belum ada data komentar untuk ditampilkan.
      </div>
    );
  }

  return (
    <div className="w-full h-[400px] p-4 bg-white border rounded-lg">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">
        Statistik Komentar
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={chartData}
          margin={{ top: 10, right: 30, left: 0, bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis
            dataKey="date"
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
            dy={10}
          />
          <YAxis
            axisLine={false}
            tickLine={false}
            tick={{ fill: "#64748b", fontSize: 12 }}
          />
          <Tooltip
            cursor={{ fill: "#f1f5f9" }}
            contentStyle={{
              borderRadius: "8px",
              border: "none",
              boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
            }}
          />
          <Legend wrapperStyle={{ paddingTop: "20px" }} />
          <Bar dataKey="Protes" fill="#b91c1c" radius={[4, 4, 0, 0]} />
          <Bar dataKey="Tidak Protes" fill="#334155" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CommentsChart;
