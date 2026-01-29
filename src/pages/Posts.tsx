import { useState } from 'react';
import { Card } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calendar, AlertTriangle } from 'lucide-react';
// import { useNavigate } from 'react-router-dom';

type Post = {
  id: string;
  image: string;
  date: string;
  protestCount: number;
  status: 'aman' | 'indikasi' | 'protes';
};

const mockPosts: Post[] = [
  {
    id: '1',
    image: 'https://source.unsplash.com/600x600/?student,protest',
    date: '2025-01-20',
    protestCount: 12,
    status: 'protes',
  },
  {
    id: '2',
    image: 'https://source.unsplash.com/600x600/?school,classroom',
    date: '2025-01-22',
    protestCount: 3,
    status: 'indikasi',
  },
  {
    id: '3',
    image: 'https://source.unsplash.com/600x600/?education,seminar',
    date: '2025-01-24',
    protestCount: 0,
    status: 'aman',
  },
];

const statusColor = {
  aman: 'bg-slate-200 text-slate-700',
  indikasi: 'bg-amber-100 text-amber-700',
  protes: 'bg-red-100 text-red-700',
};

const PostsPage = () => {
  const [sort, setSort] = useState<'date' | 'protest'>('date');
  const navigate = console.log; //useNavigate();

  const sortedPosts = [...mockPosts].sort((a, b) => {
    if (sort === 'date') {
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    }
    return b.protestCount - a.protestCount;
  });

  return (
    <div className="p-6 space-y-6 bg-slate-50 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">
            Monitoring Postingan
          </h1>
          <p className="text-sm text-slate-600">
            Deteksi indikasi protes pada konten media sosial
          </p>
        </div>

        <Select value={sort} onValueChange={(v) => setSort(v as any)}>
          <SelectTrigger className="w-56">
            <SelectValue placeholder="Urutkan berdasarkan" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="date">Tanggal Terbaru</SelectItem>
            <SelectItem value="protest">Jumlah Protes Terbanyak</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {sortedPosts.map((post) => (
          <Card
            key={post.id}
            onClick={() => navigate(`/posts/${post.id}`)}
            className="group cursor-pointer overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <div className="relative aspect-square bg-slate-200">
              <img
                src={post.image}
                alt="Post"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all flex items-end">
                <div className="w-full p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex items-center justify-between text-white text-xs">
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {post.date}
                    </div>
                    <div className="flex items-center gap-1">
                      <AlertTriangle className="w-4 h-4" />
                      {post.protestCount}
                    </div>
                  </div>
                </div>
              </div>

              {/* Status Badge */}
              <div className="absolute top-3 left-3">
                <Badge className={statusColor[post.status]}>
                  {post.status.toUpperCase()}
                </Badge>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PostsPage;
