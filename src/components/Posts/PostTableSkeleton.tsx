import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableHead,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

const ROWS = 6;

const PostsTableSkeleton = () => {
  return (
    <div className="border rounded-lg bg-white">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Media</TableHead>
            <TableHead>Caption</TableHead>
            <TableHead className="text-center">Likes</TableHead>
            <TableHead className="text-center">Komentar</TableHead>
            <TableHead>Tanggal</TableHead>
            <TableHead>Comment Level</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {Array.from({ length: ROWS }).map((_, i) => (
            <TableRow key={i}>
              <TableCell>
                <Skeleton className="h-4 w-4 rounded" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-[240px]" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="h-4 w-10 mx-auto" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="h-4 w-10 mx-auto" />
              </TableCell>

              <TableCell>
                <Skeleton className="h-4 w-24" />
              </TableCell>

              <TableCell className="text-center">
                <Skeleton className="h-6 w-32 mx-auto rounded-full" />
              </TableCell>

              <TableCell className="text-right">
                <Skeleton className="h-8 w-20 ml-auto" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PostsTableSkeleton;
