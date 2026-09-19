import React from 'react';
import { 
  MapPin, 
  Music, 
  BookOpen, 
  Heart,
  Camera,
  Layers,
  Compass
} from 'lucide-react';
import { ActiveNavPage, Story, Letter, GalleryMediaItem } from '../../types';
import { Hero } from './Hero';
import { FeaturedStoriesSection } from './FeaturedStoriesSection';
import { MusicSection } from './MusicSection';
import { LiveImpactDashboard } from './LiveImpactDashboard';
import { LettersSection } from './LettersSection';
import { MapSnippetSection } from './MapSnippetSection';
import { CallToActionSection } from './CallToActionSection';

interface HomeViewProps {
  stories?: Story[];
  letters?: Letter[];
  galleryItems?: GalleryMediaItem[];
  onNavigate?: (page: ActiveNavPage) => void;
  onSelectStory?: (story: Story) => void;
  onLikeStory?: (id: string) => void;
  onOpenLetterModal?: () => void;
  onLikeLetter?: (id: string) => void;
  onOpenLightbox?: (item: GalleryMediaItem) => void;
}

const HomeViewComponent: React.FC<HomeViewProps> = ({
  stories = [],
  letters = [],
  galleryItems = [],
  onNavigate = (_page: ActiveNavPage) => {},
  onSelectStory = (_story: Story) => {},
  onLikeStory = (_id: string) => {},
  onOpenLetterModal = () => {},
  onLikeLetter = (_id: string) => {},
  onOpenLightbox = (_item: GalleryMediaItem) => {}
}) => {
  return (
    <div id="home-view" className="w-full min-h-screen bg-[#F8FAFC]">
      
      {/* 1. CINEMATIC DIGITAL CITY HERO */}
      <Hero 
        onNavigate={onNavigate} 
        onOpenLetterModal={onOpenLetterModal} 
      />

      {/* 2. KINDNESS ECOSYSTEM EXPLORATION PILLARS */}
      <section className="py-16 bg-white border-b border-[#E2E8F0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-2xl mx-auto mb-12 space-y-2">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#EFF6FF] border border-[#BFDBFE] text-[#1677FF] text-xs font-semibold">
              <Compass className="w-3.5 h-3.5" />
              <span>Hệ Sinh Thái Số LUMI</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">
              Khám Phá Các Không Gian Trải Nghiệm
            </h2>
            <p className="text-xs sm:text-sm text-[#475569]">
              Nơi mọi cảm xúc được lắng nghe, mọi câu chuyện được trân trọng và lòng tử tế được nhân rộng.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            
            {/* 1. Stories */}
            <button
              onClick={() => onNavigate('stories')}
              className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#1677FF]/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-[#EFF6FF] text-[#1677FF] flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-[#1677FF] transition-colors">
                  Câu chuyện
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Gương sáng tử tế khắp 3 miền
                </p>
              </div>
            </button>

            {/* 2. Map */}
            <button
              onClick={() => onNavigate('map')}
              className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#1677FF]/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <MapPin className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-amber-600 transition-colors">
                  Bản đồ tử tế
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Điểm sáng 34+ tỉnh thành
                </p>
              </div>
            </button>

            {/* 3. Music */}
            <button
              onClick={() => onNavigate('music')}
              className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#1677FF]/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-purple-50 text-purple-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-purple-600 transition-colors">
                  Âm nhạc 432Hz
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  MV & Nhạc thư giãn cảm xúc
                </p>
              </div>
            </button>

            {/* 4. Letters */}
            <button
              onClick={() => onNavigate('letters')}
              className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#1677FF]/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-rose-50 text-rose-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Heart className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-rose-600 transition-colors">
                  Hộp thư LUMI
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Gửi lời nhắn yêu thương
                </p>
              </div>
            </button>

            {/* 5. Photovoice */}
            <button
              onClick={() => onNavigate('photovoice')}
              className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#1677FF]/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Camera className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-emerald-600 transition-colors">
                  Dự án Photovoice
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Kể chuyện qua ống kính
                </p>
              </div>
            </button>

            {/* 6. Survey / Research */}
            <button
              onClick={() => onNavigate('survey')}
              className="p-4 rounded-2xl bg-[#F8FAFC] hover:bg-white border border-[#E2E8F0] hover:border-[#1677FF]/40 shadow-xs hover:shadow-md hover:-translate-y-1 transition-all duration-200 text-left flex flex-col justify-between group cursor-pointer"
            >
              <div className="w-10 h-10 rounded-xl bg-cyan-50 text-cyan-500 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-[#0F172A] group-hover:text-cyan-600 transition-colors">
                  Khảo sát tâm lý
                </h3>
                <p className="text-[11px] text-[#64748B] mt-0.5">
                  Nghiên cứu khoa học 300 HS
                </p>
              </div>
            </button>

          </div>

        </div>
      </section>

      {/* 3. FEATURED STORIES SECTION */}
      <FeaturedStoriesSection
        stories={stories}
        onSelectStory={onSelectStory}
        onNavigate={onNavigate}
        onLikeStory={onLikeStory}
      />

      {/* 4. 432HZ MUSIC & MV SECTION */}
      <MusicSection 
        onNavigate={onNavigate} 
      />

      {/* 5. LIVE IMPACT DASHBOARD (REAL-TIME STATS WITH COUNT-UP ANIMATIONS) */}
      <LiveImpactDashboard 
        initialStories={stories}
        initialLetters={letters}
      />

      {/* 6. KINDNESS MAP HIGHLIGHT */}
      <MapSnippetSection 
        onNavigate={onNavigate} 
      />

      {/* 6. KINDNESS LETTERS SECTION */}
      <LettersSection
        letters={letters}
        onOpenLetterModal={onOpenLetterModal}
        onNavigate={onNavigate}
        onLikeLetter={onLikeLetter}
      />

      {/* 7. CALL TO ACTION SECTION */}
      <CallToActionSection
        onOpenLetterModal={onOpenLetterModal}
        onNavigate={onNavigate}
      />

    </div>
  );
};

export const HomeView = React.memo(HomeViewComponent);
