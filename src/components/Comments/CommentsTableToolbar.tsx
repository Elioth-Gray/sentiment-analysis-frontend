import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Calendar } from "lucide-react";
import { Input } from "../ui/input";
interface Props {
  search: string;
  dateFrom?: string;
  dateTo?: string;
  onSearchChange: (value: string) => void;
  onDateFromChange: (value: string) => void;
  onDateToChange: (value: string) => void;
}

const CommentsTableToolbar = ({
  search,
  dateFrom,
  dateTo,
  onSearchChange,
  onDateFromChange,
  onDateToChange,
}: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Social Media Protest Monitoring</CardTitle>
        <p className="text-sm text-slate-600">
          Analisis konten media sosial untuk deteksi dini potensi protes publik
        </p>
      </CardHeader>

      <CardContent className="flex justify-between items-center">
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Cari isi caption..."
              className="w-full pl-9 pr-3 py-2 border rounded-md"
            />
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <div className="flex gap-3">
            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="date"
                value={dateFrom}
                onChange={(e) => onDateFromChange(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>

            <div className="relative">
              <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <Input
                type="date"
                value={dateTo}
                onChange={(e) => onDateToChange(e.target.value)}
                className="pl-9 pr-3 py-2 border rounded-md text-sm"
              />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CommentsTableToolbar;
