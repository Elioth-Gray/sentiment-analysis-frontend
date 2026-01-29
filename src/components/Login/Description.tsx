import { Shield } from 'lucide-react';
import Carousel from '../ui/carousel';

export const DescriptionLogin = () => {
  const slides = [
    <img
      src={'/src/assets/preview/last_day_regist.png'}
      alt="last_day_regist"
    />,
    <img
      src={'/src/assets/preview/last_day_sanggah.png'}
      alt="last_day_sanggah"
    />,
    <img
      src={'/src/assets/preview/registrasi_akun.png'}
      alt="registrasi_akun"
    />,
  ];

  return (
    <>
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-500 rounded-full blur-3xl animate-pulse"></div>
          <div
            className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500 rounded-full blur-3xl animate-pulse"
            style={{ animationDelay: '1s' }}
          ></div>
        </div>

        <div className="relative z-10 flex flex-col justify-center px-16 text-white">
          {/* Logo & Title */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-3 py-6">
              <div className="w-14 h-14 bg-linear-to-br from-cyan-400 to-blue-600 rounded-xl flex items-center justify-center shadow-2xl shadow-cyan-500/30">
                <Shield className="w-8 h-8 text-white" strokeWidth={2.5} />
              </div>
              <div>
                <h1 className="text-3xl font-bold tracking-tight">SNPMB</h1>
                <p className="text-sm text-cyan-300 font-medium">
                  Social Media Monitoring System
                </p>
              </div>
            </div>

            <h2 className="text-3xl xl:text-4xl font-bold mb-3 leading-tight">
              Sistem Deteksi & Analisis
              <br />
              <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-300 to-blue-400">
                Konten Protes Digital
              </span>
            </h2>

            <p className="text-base xl:text-lg text-slate-300 leading-relaxed max-w-md">
              Platform terintegrasi untuk memantau, menganalisis, dan melaporkan
              aktivitas protes di media sosial secara real-time.
            </p>
          </div>

          {/* Carousel Slider */}
          <Carousel slides={slides}></Carousel>

          {/* Features
          <div className="grid grid-cols-3 gap-4 mt-8 mb-6">
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-white/5">
              <TrendingUp className="w-6 h-6 text-cyan-400 mb-2" />
              <div className="text-sm font-semibold">Real-time Analysis</div>
              <div className="text-xs text-slate-400 mt-1">
                Monitor aktivitas sosmed
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-white/5">
              <BarChart3 className="w-6 h-6 text-blue-400 mb-2" />
              <div className="text-sm font-semibold">AI Detection</div>
              <div className="text-xs text-slate-400 mt-1">
                Deteksi otomatis protes
              </div>
            </div>
            <div className="bg-slate-800/40 backdrop-blur-sm rounded-xl p-4 border border-white/5">
              <Users className="w-6 h-6 text-purple-400 mb-2" />
              <div className="text-sm font-semibold">Multi-Platform</div>
              <div className="text-xs text-slate-400 mt-1">
                Instagram, Twitter, FB
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </>
  );
};
