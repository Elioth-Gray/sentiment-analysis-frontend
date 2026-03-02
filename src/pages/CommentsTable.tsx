import { useMemo, useState } from "react";
import type { Comment } from "@/types/comment.type";
import { useQuery } from "@tanstack/react-query";
import { getCommentsAction } from "@/lib/comments/getComments";
import { Response_Status } from "@/types/response.type";

import CommentsTable from "@/components/Comments/CommentsTable";
import CommentsTableToolbar from "@/components/Comments/CommentsTableToolbar";
import CommentsTableSkeleton from "@/components/Posts/PostsTableToolbarSkeleton";
import CommentDetailDialog from "@/components/Posts/PostsDetailDialog";
import CommentsChart from "@/components/Comments/CommentsChart";

const CommentsTablePage = () => {
  const [search, setSearch] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [selectedComment, setSelectedComment] = useState<Comment | null>(null);

  const { data: commentsData, isPending } = useQuery({
    queryKey: ["comments"],
    queryFn: getCommentsAction,
  });

  const filteredComments = useMemo(() => {
    if (!commentsData || commentsData.status !== Response_Status.SUCCESS) {
      return [];
    }

    return (commentsData.data ?? []).filter((comment) => {
      const captionMatch = comment.text
        .toLowerCase()
        .includes(search.toLowerCase());

      const commentDate = new Date(comment.timestamp)
        .toISOString()
        .slice(0, 10);

      const fromMatch = dateFrom ? commentDate >= dateFrom : true;
      const toMatch = dateTo ? commentDate <= dateTo : true;

      return captionMatch && fromMatch && toMatch;
    });
  }, [commentsData, search, dateFrom, dateTo]);

  return (
    <div className="space-y-6">
      <CommentsTableToolbar
        search={search}
        dateFrom={dateFrom}
        dateTo={dateTo}
        onSearchChange={setSearch}
        onDateFromChange={setDateFrom}
        onDateToChange={setDateTo}
      />

      {isPending ? (
        <div className="space-y-6">
          <CommentsTableSkeleton />
        </div>
      ) : commentsData?.status === Response_Status.SUCCESS ? (
        <div className="space-y-8">
          <CommentsChart comments={filteredComments} />

          <CommentsTable comments={filteredComments} />
        </div>
      ) : (
        <div className="py-4 text-center text-slate-500">
          Tidak ada komentar yang tersedia.
        </div>
      )}

      <CommentDetailDialog
        comment={selectedComment}
        onClose={() => setSelectedComment(null)}
      />
    </div>
  );
};

export default CommentsTablePage;
