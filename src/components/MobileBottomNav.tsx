import React from 'react';
import { Home, BookOpen, MapPin, Heart, User } from 'lucide-react';
import { ActiveNavPage } from '../types';
import { useAuth } from '../context/AuthContext';

interface MobileBottomNavProps {
  activePage: ActiveNavPage;
  onNavigate: (page: ActiveNavPage) => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activePage,
  onNavigate,
}) => {
  const { isLoggedIn, openAuthModal, openProfileDrawer } = useAuth();

  const handlePersonalClick = () => {
    if (isLoggedIn) {
      openProfileDrawer();
    } else {
      openAuthModal();
    }
  };

  return (
    <div className="lg:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/80 px-3 py-1.5 flex items-center justify-around shadow-lg">
      {/* 1. Trang chủ */}
      <button
        onClick={() => onNavigate('home')}
        className={`flex flex-col items-center gap-0.5 p-1.5 transition-all ${
          activePage === 'home' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Home className={`w-5 h-5 ${activePage === 'home' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px]">Trang chủ</span>
      </button>

      {/* 2. Câu chuyện */}
      <button
        onClick={() => onNavigate('stories')}
        className={`flex flex-col items-center gap-0.5 p-1.5 transition-all ${
          activePage === 'stories' || activePage === 'story-detail' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <BookOpen className={`w-5 h-5 ${activePage === 'stories' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px]">Câu chuyện</span>
      </button>

      {/* 3. Bản đồ */}
      <button
        onClick={() => onNavigate('map')}
        className={`flex flex-col items-center gap-0.5 p-1.5 transition-all ${
          activePage === 'map' ? 'text-sky-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <MapPin className={`w-5 h-5 ${activePage === 'map' ? 'stroke-[2.5]' : 'stroke-2'}`} />
        <span className="text-[10px]">Bản đồ</span>
      </button>

      {/* 4. Yêu thương */}
      <button
        onClick={() => onNavigate('letters')}
        className={`flex flex-col items-center gap-0.5 p-1.5 transition-all ${
          activePage === 'letters' ? 'text-rose-600 font-bold' : 'text-slate-500 hover:text-slate-800'
        }`}
      >
        <Heart className={`w-5 h-5 ${activePage === 'letters' ? 'fill-rose-500 text-rose-500' : 'stroke-2'}`} />
        <span className="text-[10px]">Yêu thương</span>
      </button>

      {/* 5. Cá nhân */}
      <button
        onClick={handlePersonalClick}
        className="flex flex-col items-center gap-0.5 p-1.5 text-slate-500 hover:text-slate-800 transition-all cursor-pointer"
      >
        <User className="w-5 h-5 stroke-2" />
        <span className="text-[10px]">Cá nhân</span>
      </button>
    </div>
  );
};
