import React, { useState } from 'react';
import { 
  Sparkles, 
  Eye, 
  Heart, 
  ArrowRight, 
  Volume2, 
  VolumeX, 
  BookOpen, 
  Music, 
  Camera, 
  Mail,
  Image as ImageIcon
} from 'lucide-react';
import { exhibitionRooms } from '../data/exhibitionData';
import { ActiveNavPage, Story, GalleryMediaItem } from '../types';

interface ExhibitionPageProps {
  onNavigate: (page: ActiveNavPage) => void;
  onSelectStory: (story: Story) => void;
  onOpenLightbox: (item: GalleryMediaItem) => void;
}

export const ExhibitionPage: React.FC<ExhibitionPageProps> = ({
  onNavigate,
  onSelectStory,
  onOpenLightbox
}) => {
  const [activeRoomId, setActiveRoomId] = useState<string>(exhibitionRooms[0].id);
  const [ambientAudio, setAmbientAudio] = useState(false);

  const activeRoom = exhibitionRooms.find(r => r.id === activeRoomId) || exhibitionRooms[0];

  const getRoomIcon = (iconName: string) => {
    switch(iconName) {
      case 'BookOpen': return BookOpen;
      case 'Image': return ImageIcon;
      case 'Camera': return Camera;
      case 'Music': return Music;
      default: return Mail;
    }
  };

  return (
    <div className="pt-28 pb-20 sm:pb-32 bg-[#0f172a] text-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30 text-xs font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-rose-400" />
            <span>Giải Pháp Can Thiệp 6: Triển Lãm Nghệ Thuật Số 2.5D</span>
          </div>
          <h1 className="font-display font-extrabold text-3xl sm:text-5xl text-white tracking-tight">
            Không Gian Triển Lãm Ảo LUMI
          </h1>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            Bước vào không gian nghệ thuật thị giác và đa giác quan, nơi từng căn phòng mở ra một tầng sâu lắng về sự thấu cảm và tình yêu thương.
          </p>

          <div className="flex items-center justify-center gap-3 pt-2">
            <button
              onClick={() => setAmbientAudio(!ambientAudio)}
              className="px-4 py-2 rounded-full bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-rose-300 flex items-center gap-2 border border-slate-700 cursor-pointer"
            >
              {ambientAudio ? <Volume2 className="w-3.5 h-3.5" /> : <VolumeX className="w-3.5 h-3.5" />}
              <span>{ambientAudio ? 'Âm thanh không gian: Bật' : 'Bật âm thanh không gian'}</span>
            </button>
          </div>
        </div>

        {/* Room Navigation Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
          {exhibitionRooms.map((room) => {
            const Icon = getRoomIcon(room.icon);
            const isActive = activeRoom.id === room.id;
            return (
              <button
                key={room.id}
                onClick={() => setActiveRoomId(room.id)}
                className={`px-4 py-2.5 rounded-2xl text-xs sm:text-sm font-semibold transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/30 scale-105'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span>{room.name}</span>
              </button>
            );
          })}
        </div>

        {/* Virtual Room Showcase Stage */}
        <div className="relative rounded-3xl sm:rounded-[36px] overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black border border-slate-800 p-6 sm:p-10 space-y-8 shadow-2xl">
          
          {/* Virtual Wall Lighting Effects */}
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-rose-500/10 rounded-full blur-3xl pointer-events-none"></div>
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl pointer-events-none"></div>

          {/* Room Header Info */}
          <div className="relative z-10 flex flex-col md:flex-row md:items-end justify-between gap-4 pb-6 border-b border-slate-800">
            <div className="space-y-1">
              <span className="text-xs font-bold text-rose-400 uppercase tracking-wider">
                Đang tham quan: {activeRoom.subtitle}
              </span>
              <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                {activeRoom.name}
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-xl">
                {activeRoom.description}
              </p>
            </div>

            <div className="px-3.5 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-xs font-medium text-slate-300">
              Trưng bày <strong>{activeRoom.items.length}</strong> hiện vật số
            </div>
          </div>

          {/* 2.5D Artifact Frames Gallery */}
          <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {activeRoom.items.map((artifact) => (
              <div
                key={artifact.id}
                className="group relative rounded-3xl overflow-hidden bg-slate-900 border border-slate-800 hover:border-rose-500/50 transition-all duration-300 shadow-xl flex flex-col justify-between transform hover:-translate-y-1"
              >
                {/* Visual Image with spotlight */}
                <div className="relative h-60 overflow-hidden bg-black flex items-center justify-center">
                  <img
                    src={artifact.mediaUrl}
                    alt={artifact.title}
                    className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
                  
                  {/* Subtitle pill */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-black/70 backdrop-blur-md text-[10px] font-bold text-rose-300 border border-rose-500/30">
                      {artifact.subtitle}
                    </span>
                  </div>
                </div>

                {/* Artifact Description */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-display font-bold text-base text-white group-hover:text-rose-400 transition-colors">
                      {artifact.title}
                    </h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      {artifact.content}
                    </p>
                    {artifact.quote && (
                      <p className="text-xs text-rose-300 italic pt-1 font-handwriting text-base">
                        {artifact.quote}
                      </p>
                    )}
                  </div>

                  <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                    <span className="text-[11px] text-slate-500">
                      Hiện vật #{artifact.id}
                    </span>

                    <button
                      onClick={() => {
                        if (activeRoom.id === 'room-stories') onNavigate('stories');
                        else if (activeRoom.id === 'room-visuals') onNavigate('gallery');
                        else if (activeRoom.id === 'room-photovoice') onNavigate('photovoice');
                        else if (activeRoom.id === 'room-music') onNavigate('music');
                        else onNavigate('letters');
                      }}
                      className="font-bold text-rose-400 hover:text-rose-300 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Khám phá sâu</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

              </div>
            ))}
          </div>

        </div>

      </div>
    </div>
  );
};
