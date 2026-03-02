import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
// import { Badge } from "@/components/ui/badge";
import { ImageIcon, Video, Eye, MessageCircle, Badge } from "lucide-react";
import type { Comment } from "@/types/comment.type";
import { formatDate, formatNumber } from "@/utils/common/other";

interface Props {
  comments: Comment[];
  onSelect: (comment: Comment) => void;
}

const CommentsTable = ({ comments, onSelect }: Props) => {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Komentar</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Nilai Protes</TableHead>
            <TableHead>Level Komentar</TableHead>
            {/* <TableHead className="text-right">Aksi</TableHead> */}
          </TableRow>
        </TableHeader>

        <TableBody>
          {comments.map((comment) => {
            return (
              <TableRow key={comment.id}>
                <TableCell className="max-w-xs truncate">
                  {comment.text}
                </TableCell>

                <TableCell>{formatDate(comment.timestamp)}</TableCell>

                <TableCell>{formatNumber(comment.protest_score)}</TableCell>

                <TableCell className="max-w-xs truncate">
                  {comment.is_protest ? (
                    <div className=" text-red-700">Protes</div>
                  ) : (
                    <div className="text-slate-700">Tidak Protes</div>
                  )}
                </TableCell>

                {/* <TableCell className="text-right">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onSelect(comment)}>
                    <Eye className="w-4 h-4 mr-1" />
                    Detail
                  </Button>
                </TableCell> */}
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default CommentsTable;
