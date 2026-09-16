import React from 'react';
import { MessageSquareShare, Heart, Users2, Sparkles } from 'lucide-react';

export const HeroTransition: React.FC = () => {
  const pillars = [
    {
      id: 'pillar-share',
      icon: MessageSquareShare,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-50',
      title: 'Chia sẻ câu chuyện',
      desc: 'Mỗi câu chuyện đều có giá trị'
    },
    {
      id: 'pillar-love',
      icon: Heart,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-50',
      title: 'Lan tỏa yêu thương',
      desc: 'Yêu thương là sức mạnh'
    },
    {
      id: 'pillar-connect',
      icon: Users2,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-50',
      title: 'Kết nối cộng đồng',
      desc: 'Cùng nhau tạo nên thay đổi'
    },
    {
      id: 'pillar-impact',
      icon: Sparkles,
      iconColor: 'text-emerald-600',
      iconBg: 'bg-emerald-50',
      title: 'Tạo tác động tích cực',
      desc: 'Vì một tương lai tốt đẹp hơn'
    }
  ];

  return (
    <div className="relative -mt-6 sm:-mt-8 z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white/95 backdrop-blur-xl rounded-2xl sm:rounded-full border border-sky-100/90 shadow-lg shadow-sky-500/5 p-3 sm:p-4 md:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {pillars.map((item, idx) => {
            const IconComp = item.icon;
            return (
              <div 
                key={item.id} 
                className={`flex items-center gap-3.5 ${idx > 0 ? 'pt-3 sm:pt-0 sm:pl-6' : ''} group`}
              >
                <div className={`w-10 h-10 rounded-full ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform`}>
                  <IconComp className="w-5 h-5" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 tracking-tight leading-snug group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h4>
                  <p className="text-xs text-slate-500 font-normal">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
