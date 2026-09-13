import React from 'react';
import { MapPin, ArrowRight, Heart, Sparkles, Navigation } from 'lucide-react';
import { ActiveNavPage } from '../../types';

interface MapSnippetSectionProps {
  onNavigate: (page: ActiveNavPage) => void;
}

export const MapSnippetSection: React.FC<MapSnippetSectionProps> = ({ onNavigate }) => {
  return (
    <section id="map-snippet-section" className="py-20 bg-gradient-to-br from-rose-50/60 via-warm-ivory to-amber-50/40 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Text & Stats */}
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-100 text-rose-700 text-xs font-semibold">
              <MapPin className="w-3.5 h-3.5 text-rose-600" />
              <span>Bản Đồ Lòng Trắc Ẩn Việt Nam</span>
            </div>

            <h2 className="font-display font-extrabold text-2xl sm:text-4xl text-slate-900 tracking-tight leading-tight">
              Lòng tốt đang hiện diện ở khắp mọi nơi.
            </h2>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
              Từ vùng cao Tây Bắc, đồng bằng sông Hồng, dải đất miền Trung nắng gió đến miền Tây sông nước – mỗi vùng đất đều lưu dấu những câu chuyện nhân ái của thế hệ trẻ.
            </p>

            {/* Micro Stats with interactive hover */}
            <div className="grid grid-cols-3 gap-3 py-2">
              <div className="p-3 bg-white hover:bg-rose-50/50 rounded-2xl border border-rose-100 hover:border-rose-300 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center cursor-default group">
                <div className="font-display font-bold text-lg text-rose-600 group-hover:scale-110 transition-transform">3</div>
                <div className="text-[11px] text-slate-500">Miền kết nối</div>
              </div>
              <div className="p-3 bg-white hover:bg-amber-50/50 rounded-2xl border border-rose-100 hover:border-amber-300 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center cursor-default group">
                <div className="font-display font-bold text-lg text-amber-500 group-hover:scale-110 transition-transform">63</div>
                <div className="text-[11px] text-slate-500">Tỉnh thành</div>
              </div>
              <div className="p-3 bg-white hover:bg-sky-50/50 rounded-2xl border border-rose-100 hover:border-sky-300 shadow-2xs hover:shadow-md hover:-translate-y-1 transition-all duration-300 text-center cursor-default group">
                <div className="font-display font-bold text-lg text-sky-500 group-hover:scale-110 transition-transform">100%</div>
                <div className="text-[11px] text-slate-500">Tử tế lan tỏa</div>
              </div>
            </div>

            <button
              id="explore-map-btn"
              onClick={() => onNavigate('map')}
              className="px-6 py-3 rounded-full bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm shadow-md hover:shadow-xl hover:shadow-slate-900/20 hover:-translate-y-0.5 lumi-btn-shine transition-all duration-300 flex items-center gap-2 group cursor-pointer active:scale-95"
            >
              <Navigation className="w-4 h-4 text-rose-400 group-hover:rotate-45 group-hover:scale-115 transition-transform duration-300" />
              <span>Khám phá bản đồ tương tác</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1.5 transition-transform duration-300" />
            </button>
          </div>

          {/* Right Visual Map Card */}
          <div className="lg:col-span-7">
            <div 
              onClick={() => onNavigate('map')}
              className="relative p-6 sm:p-8 rounded-3xl bg-white border border-rose-100 hover:border-rose-300 shadow-xl shadow-rose-500/5 hover:shadow-2xl hover:shadow-rose-500/15 hover:-translate-y-1.5 transition-all duration-500 cursor-pointer group overflow-hidden"
            >
              {/* Decorative background map shape */}
              <div className="absolute inset-0 bg-radial from-rose-50 to-white opacity-80 pointer-events-none"></div>

              <div className="relative z-10 flex flex-col sm:flex-row items-center gap-6">
                
                {/* Visual Graphic Representation of Vietnam Map */}
                <div className="w-full sm:w-1/2 flex justify-center py-4">
                  <div className="relative w-40 h-64 bg-rose-50/50 rounded-2xl border border-rose-200/60 p-3 flex flex-col justify-between items-center">
                    
                    {/* North Pin */}
                    <div className="w-full flex justify-center">
                      <div className="px-2.5 py-1 rounded-full bg-white shadow-xs border border-rose-200 flex items-center gap-1 text-[11px] font-bold text-rose-600 animate-bounce">
                        <Heart className="w-3 h-3 fill-rose-500 text-rose-500" />
                        <span>Hà Nội</span>
                      </div>
                    </div>

                    {/* Central Pin */}
                    <div className="w-full flex justify-end pr-2">
                      <div className="px-2.5 py-1 rounded-full bg-white shadow-xs border border-amber-200 flex items-center gap-1 text-[11px] font-bold text-amber-600 animate-pulse">
                        <Heart className="w-3 h-3 fill-amber-500 text-amber-500" />
                        <span>Đà Nẵng</span>
                      </div>
                    </div>

                    {/* South Pin */}
                    <div className="w-full flex justify-start pl-2">
                      <div className="px-2.5 py-1 rounded-full bg-white shadow-xs border border-sky-200 flex items-center gap-1 text-[11px] font-bold text-sky-600">
                        <Heart className="w-3 h-3 fill-sky-500 text-sky-500" />
                        <span>TP. Hồ Chí Minh</span>
                      </div>
                    </div>

                    {/* Floating Heart Icon in middle */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-rose-500/10 flex items-center justify-center">
                      <Heart className="w-6 h-6 text-rose-500 fill-rose-500" />
                    </div>

                  </div>
                </div>

                {/* Right Callout Box */}
                <div className="w-full sm:w-1/2 space-y-3 text-left">
                  <span className="text-xs font-bold text-rose-600 uppercase tracking-wider">
                    Điểm Chạm Yêu Thương
                  </span>
                  <h4 className="font-display font-bold text-lg text-slate-800 group-hover:text-rose-600 transition-colors">
                    Mỗi dấu chấm là một hành động tử tế được thắp lên
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    Nhấp để mở bản đồ địa lý chi tiết, lọc câu chuyện theo vùng miền Bắc – Trung – Nam và đọc các mẩu chuyện ấm lòng tại địa phương của bạn.
                  </p>
                  <div className="pt-2 flex items-center gap-1 text-xs font-bold text-rose-600">
                    <span>Mở bản đồ ngay</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>

              </div>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
