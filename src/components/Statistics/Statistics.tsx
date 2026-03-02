import { useQuery } from "@tanstack/react-query";
import { getCommentsAction } from "@/lib/comments/getComments";
import { Response_Status } from "@/types/response.type";
import CommentsChart from "@/components/Comments/CommentsChart";

const StatisticsPage = () => {
  const { data: commentsData, isPending } = useQuery({
    queryKey: ["comments"],
    queryFn: getCommentsAction,
  });

  if (isPending) {
    return <div className="py-10 text-center">Memuat data statistik...</div>;
  }

  const comments =
    commentsData?.status === Response_Status.SUCCESS
      ? (commentsData.data ?? [])
      : [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold tracking-tight">Statistik Protes</h2>
        <p className="text-muted-foreground">
          Visualisasi jumlah komentar yang protes dan tidak protes
        </p>
      </div>

      <CommentsChart comments={comments} />
    </div>
  );
};

export default StatisticsPage;
