import React from 'react';
import { Users, Heart, Send, Star } from 'lucide-react';

interface ImpactStatsProps {
  memberCount?: string;
  storyCount?: string;
  actionCount?: string;
  projectCount?: string;
}

export const ImpactStats: React.FC<ImpactStatsProps> = ({
  memberCount = '50K+',
  storyCount = '12K+',
  actionCount = '5K+',
  projectCount = '100+'
}) => {
  const stats = [
    {
      id: 'stat-members',
      icon: Users,
      iconColor: 'text-blue-600',
      iconBg: 'bg-blue-100/80',
      value: memberCount,
      label: 'Thành viên'
    },
    {
      id: 'stat-stories',
      icon: Heart,
      iconColor: 'text-rose-500',
      iconBg: 'bg-rose-100/80',
      value: storyCount,
      label: 'Câu chuyện tử tế'
    },
    {
      id: 'stat-actions',
      icon: Send,
      iconColor: 'text-sky-600',
      iconBg: 'bg-sky-100/80',
      value: actionCount,
      label: 'Hành động ý nghĩa'
    },
    {
      id: 'stat-projects',
      icon: Star,
      iconColor: 'text-amber-500',
      iconBg: 'bg-amber-100/80',
      value: projectCount,
      label: 'Dự án cộng đồng'
    }
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
      {stats.map((item) => {
        const IconComponent = item.icon;
        return (
          <div 
            key={item.id}
            className="digital-glass-card rounded-2xl p-3 flex items-center gap-2.5 border border-white/90 shadow-xs hover:shadow-md hover:border-sky-300 transition-all duration-200 group"
          >
            <div className={`w-9 h-9 rounded-xl ${item.iconBg} ${item.iconColor} flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform`}>
              <IconComponent className="w-4.5 h-4.5" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-extrabold text-[#0B1F3A] tracking-tight leading-none">
                {item.value}
              </div>
              <div className="text-[11px] text-slate-500 font-medium truncate mt-0.5">
                {item.label}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
