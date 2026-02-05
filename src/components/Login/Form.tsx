import { zodResolver } from '@hookform/resolvers/zod';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Shield, Mail, Lock, MessageSquareWarning } from 'lucide-react';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '../ui/form';
import { useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import type z from 'zod';
import { toast } from 'sonner';
import { LoginSchema } from '@/schema/Auth.Schema';
import { Spinner } from '../ui/spinner';
import { useMutation } from '@tanstack/react-query';
import { LoginAction } from '@/lib/auth/Login';
import { Response_Status } from '@/types/response.type';

const LoginForm = () => {
  const navigate = useNavigate();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
    mode: 'onSubmit',
  });
  const { control, handleSubmit, formState } = form;
  const { mutate: loginMutation } = useMutation({
    mutationFn: LoginAction,
    onSuccess: (result) => {
      if (result.status === Response_Status.SUCCESS) {
        toast.success(result.message);
        navigate('/dashboard', { replace: true });
      } else if (result.status === Response_Status.FAILED) {
        toast.error(result.message);
      }
    },
  });

  const onSubmit = (data: z.infer<typeof LoginSchema>) => {
    loginMutation(data);
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
            <Form {...form}>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                <FormField
                  control={control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700">
                        Email
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Mail className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500" />
                          <Input
                            {...field}
                            placeholder="Masukkan email"
                            className="pl-10 h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 focus:ring-2"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-slate-700">
                        Password
                      </FormLabel>
                      <FormControl>
                        <div className="relative group">
                          <Lock className="absolute left-3 top-3.5 h-5 w-5 text-slate-400 group-focus-within:text-cyan-500" />
                          <Input
                            {...field}
                            type="password"
                            placeholder="Masukkan password"
                            className="pl-10 h-12 border-slate-300 focus:border-cyan-500 focus:ring-cyan-500 focus:ring-2"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 gap-3 hidden sm:flex">
                  <MessageSquareWarning className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                  <div className="text-xs text-blue-800">
                    <span className="font-semibold">Akses Terbatas:</span>{' '}
                    Sistem ini hanya untuk petugas yang berwenang. Semua
                    aktivitas akan dicatat dan dimonitor.
                  </div>
                </div>

                <Button
                  id="login-button"
                  type="submit"
                  disabled={formState.isSubmitting || !formState.isValid}
                  className="px-4 w-full h-12 bg-linear-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40"
                >
                  <div className="flex items-center gap-2 text-sm md:text-base">
                    {formState.isSubmitting ? (
                      <Spinner />
                    ) : (
                      <>
                        <Shield className="w-5 h-5" />
                        Masuk ke Sistem
                      </>
                    )}
                  </div>
                </Button>
              </form>
            </Form>
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
