import React from 'react';
import { Users, Sprout, TrendingUp, Heart } from 'lucide-react';

export const FloatingGlassCards: React.FC = () => {
  return (
    <div className="flex items-center gap-4 select-none">
      
      {/* 3 Stacked Floating Glassmorphism Cards */}
      <div className="flex flex-col gap-2.5 animate-float-delayed">
        
        {/* Card 1: Cộng đồng nhân ái */}
        <div className="digital-glass-card rounded-2xl px-3.5 py-2.5 flex items-center gap-3 border border-white/80 shadow-md shadow-sky-500/10 hover:shadow-lg hover:border-cyan-300 transition-all duration-300 group cursor-default">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform">
            <Users className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
              Cộng đồng
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              nhân ái
            </p>
          </div>
        </div>

        {/* Card 2: Lan tỏa giá trị tốt đẹp */}
        <div className="digital-glass-card rounded-2xl px-3.5 py-2.5 flex items-center gap-3 border border-white/80 shadow-md shadow-sky-500/10 hover:shadow-lg hover:border-cyan-300 transition-all duration-300 group cursor-default">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-400 to-teal-500 flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform">
            <Sprout className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
              Lan tỏa
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              giá trị tốt đẹp
            </p>
          </div>
        </div>

        {/* Card 3: Hành động vì tương lai */}
        <div className="digital-glass-card rounded-2xl px-3.5 py-2.5 flex items-center gap-3 border border-white/80 shadow-md shadow-sky-500/10 hover:shadow-lg hover:border-cyan-300 transition-all duration-300 group cursor-default">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-400 to-blue-500 flex items-center justify-center text-white shadow-xs group-hover:scale-110 transition-transform">
            <TrendingUp className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs font-bold text-slate-800 tracking-tight leading-tight">
              Hành động
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              vì tương lai
            </p>
          </div>
        </div>

      </div>

      {/* Hologram Glass Billboard Card (Far Right) */}
      <div className="hidden xl:flex flex-col items-center justify-center digital-glass-card-accent rounded-3xl p-4 w-28 text-center animate-float-gentle select-none cursor-default group hover:scale-105 transition-all duration-300">
        <div className="w-7 h-7 rounded-full bg-cyan-400/20 flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
          <Heart className="w-4 h-4 fill-cyan-500 text-cyan-500 animate-pulse" />
        </div>
        
        <p className="text-[10px] font-extrabold text-blue-950 uppercase tracking-wider leading-tight">
          KẾT NỐI<br />TỬ TẾ
        </p>
        
        <div className="w-6 h-[1.5px] bg-gradient-to-r from-cyan-400 to-blue-500 my-1.5 rounded-full" />
        
        <p className="text-[10px] font-extrabold text-cyan-700 uppercase tracking-wider leading-tight">
          KIẾN TẠO<br />TƯƠNG LAI
        </p>

        <div className="mt-2 text-xs">
          💙
        </div>
      </div>

    </div>
  );
};
