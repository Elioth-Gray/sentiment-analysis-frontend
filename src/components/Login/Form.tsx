import { useState } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Shield, Mail, Lock, MessageSquareWarning } from 'lucide-react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = () => {
    console.log('Login submitted:', { email, password });
  };

  return (
    <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-slate-50">
      <div className="w-full max-w-md">
        <div className="lg:hidden text-center mb-8">
          <div className="inline-flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-lg">
              <Shield className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-slate-900">SNPMB</h1>
              <p className="text-xs text-slate-600">Social Media Monitoring</p>
            </div>
          </div>
        </div>

        <Card className="shadow-2xl border-0 bg-white">
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-slate-900">
              Masuk ke Dashboard
            </CardTitle>
            <CardDescription className="text-slate-600">
              Akses sistem monitoring dan analisis konten protes
            </CardDescription>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="space-y-2">
                <Label
                  htmlFor="email"
                  className="text-sm font-semibold text-slate-700"
                >
                  Username atau Email
                </Label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                  <Input
                    id="email"
                    type="text"
                    placeholder="Masukkan username atau email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="text-sm md:text-base pl-10 h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 focus:ring-2"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-sm font-semibold text-slate-700"
                  >
                    Password
                  </Label>
                </div>
                <div className="relative group">
                  <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500 transition-colors" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Masukkan password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="text-sm md:text-base pl-10 h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 focus:ring-2"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 gap-3 hidden sm:flex">
                <MessageSquareWarning className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div className="text-xs text-blue-800">
                  <span className="font-semibold">Akses Terbatas:</span> Sistem
                  ini hanya untuk petugas yang berwenang. Semua aktivitas akan
                  dicatat dan dimonitor.
                </div>
              </div>

              <Button
                type="submit"
                className="px-4 w-full h-12 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40"
              >
                <div className="flex items-center gap-2 text-sm md:text-base">
                  <Shield className="w-5 h-5" />
                  Masuk ke Sistem
                </div>
              </Button>
            </form>
          </CardContent>
        </Card>

        <div className="mt-8 text-center text-xs text-slate-500 space-y-1">
          <p className="font-medium">
            Kementerian Pendidikan, Kebudayaan, Riset, dan Teknologi
          </p>
          <p>© 2025 SNPMB. Dilindungi oleh Undang-Undang ITE.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;
