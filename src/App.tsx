import React, { useState, useEffect, useCallback } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { SendLetterModal } from './components/SendLetterModal';
import { LightboxModal } from './components/LightboxModal';
import { InteractiveCursor } from './components/InteractiveCursor';
import { ProfileDrawer } from './components/ProfileDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { AiChatModal } from './components/AiChatModal';
import { Sparkles, Bot } from 'lucide-react';

// Providers
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';

// Pages
import { HomeView } from './components/Home/HomeView';
import { StoriesPage } from './pages/StoriesPage';
import { MusicPage } from './pages/MusicPage';
import { LettersPage } from './pages/LettersPage';
import { GalleryPage } from './pages/GalleryPage';
import { MapPage } from './pages/MapPage';
import { ResearchPage } from './pages/ResearchPage';
import { SubmitStoryPage } from './pages/SubmitStoryPage';
import { PhotovoicePage } from './pages/PhotovoicePage';
import { InteractiveComicPage } from './pages/InteractiveComicPage';
import { SurveyPage } from './pages/SurveyPage';
import { ExhibitionPage } from './pages/ExhibitionPage';
import { AdminPage } from './pages/AdminPage';
import { LoginPage } from './pages/LoginPage';
import { Forbidden403Page } from './pages/Forbidden403Page';

// Types & Services
import { 
  ActiveNavPage, 
  Story, 
  Letter, 
  GalleryMediaItem, 
  PhotovoiceItem, 
  SurveySubmission, 
  StorySubmission
} from './types';
import { storage } from './services/storage';

function AppContent() {
  const { user } = useAuth();
  const [activePage, setActivePage] = useState<ActiveNavPage>('home');
  const [stories, setStories] = useState<Story[]>([]);
  const [submissions, setSubmissions] = useState<StorySubmission[]>([]);
  const [letters, setLetters] = useState<Letter[]>([]);
  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>([]);
  const [photovoiceItems, setPhotovoiceItems] = useState<PhotovoiceItem[]>([]);
  const [surveys, setSurveys] = useState<SurveySubmission[]>([]);

  // Modals state
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isLetterModalOpen, setIsLetterModalOpen] = useState(false);
  const [selectedLightboxItem, setSelectedLightboxItem] = useState<GalleryMediaItem | null>(null);
  const [isAiChatOpen, setIsAiChatOpen] = useState(false);

  // Audio background state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Toast
  const { showToast } = useToast();

  const loadAllData = useCallback(async () => {
    try {
      const results = await Promise.allSettled([
        storage.getStories(),
        storage.getSubmissions(),
        storage.getLetters(),
        storage.getGallery(),
        storage.getPhotovoice(),
        storage.getSurveys()
      ]);
      if (results[0].status === 'fulfilled') setStories(results[0].value);
      if (results[1].status === 'fulfilled') setSubmissions(results[1].value);
      if (results[2].status === 'fulfilled') setLetters(results[2].value);
      if (results[3].status === 'fulfilled') setGalleryItems(results[3].value);
      if (results[4].status === 'fulfilled') setPhotovoiceItems(results[4].value);
      if (results[5].status === 'fulfilled') setSurveys(results[5].value);
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, []);

  useEffect(() => {
    loadAllData();
  }, [loadAllData]);

  // Web Audio Gentle Ambient Sound Generator
  useEffect(() => {
    let audioCtx: AudioContext | null = null;
    let oscillator: OscillatorNode | null = null;
    let gainNode: GainNode | null = null;

    if (isPlayingAudio) {
      try {
        const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
        if (AudioContextClass) {
          audioCtx = new AudioContextClass();
          oscillator = audioCtx.createOscillator();
          gainNode = audioCtx.createGain();

          oscillator.type = 'sine';
          oscillator.frequency.setValueAtTime(432, audioCtx.currentTime); 
          gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);

          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
          showToast('Đang phát giai điệu thư giãn 432Hz', { type: 'sparkle' });
        }
      } catch { }
    }

    return () => {
      if (oscillator) {
        try { oscillator.stop(); oscillator.disconnect(); } catch { }
      }
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isPlayingAudio, showToast]);

  const handleNavigate = (page: ActiveNavPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectStory = (story: Story) => {
    setSelectedStory(story);
  };

  const handleLikeStory = async (id: string) => {
    showToast('Đã gửi một cái chạm yêu thương ❤️', { type: 'heart' });
  };

  const handleLikeLetter = async (id: string) => {
    showToast('Đã thả tim cho lá thư này ❤️', { type: 'heart' });
  };

  const handleLikeGalleryItem = async (id: string) => {
    showToast('Đã yêu thích tác phẩm này ✨', { type: 'sparkle' });
  };

  const handleLikePhotovoice = async (id: string) => {
    showToast('Đã ủng hộ góc nhìn này 📸', { type: 'success' });
  };

  const handleSubmitSubmission = async (sub: any) => {
    try {
      await storage.addSubmission(sub);
      showToast('Đã gửi bài đóng góp thành công!', { type: 'success' });
      loadAllData();
    } catch (error) {
      showToast('Lỗi khi gửi bài', 'error');
    }
  };

  const handleAddPhotovoice = async (item: any) => {
    try {
      await storage.addPhotovoice(item);
      showToast('Đã đăng ảnh thành công!', 'success');
      loadAllData();
    } catch (error) {
      showToast('Lỗi khi đăng ảnh', 'error');
    }
  };

  const handleSubmitSurvey = async (survey: any) => {
    try {
      await storage.addSurvey(survey);
      showToast('Cảm ơn bạn đã tham gia khảo sát!', 'success');
      loadAllData();
    } catch (error) {
      showToast('Lỗi khi gửi khảo sát', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white pb-14 lg:pb-0">
      <InteractiveCursor />
      
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            stories={stories}
            letters={letters.filter(l => l.status === 'approved')}
            galleryItems={galleryItems}
            onNavigate={handleNavigate}
            onSelectStory={handleSelectStory}
            onLikeStory={handleLikeStory}
            onOpenLetterModal={() => setIsLetterModalOpen(true)}
            onLikeLetter={handleLikeLetter}
            onOpenLightbox={(item) => setSelectedLightboxItem(item)}
          />
        )}

        {activePage === 'stories' && (
          <StoriesPage
            stories={stories.filter(s => s.status === 'published')}
            onSelectStory={handleSelectStory}
            onLikeStory={handleLikeStory}
          />
        )}

        {activePage === 'music' && <MusicPage />}

        {activePage === 'letters' && (
          <LettersPage
            letters={letters.filter(l => l.status === 'approved')}
            onOpenLetterModal={() => setIsLetterModalOpen(true)}
            onLikeLetter={handleLikeLetter}
          />
        )}

        {activePage === 'gallery' && (
          <GalleryPage
            galleryItems={galleryItems}
            onOpenLightbox={(item) => setSelectedLightboxItem(item)}
            onLikeItem={handleLikeGalleryItem}
          />
        )}

        {activePage === 'map' && (
          <MapPage
            stories={stories.filter(s => s.status === 'published')}
            onSelectStory={handleSelectStory}
          />
        )}

        {activePage === 'research' && <ResearchPage onNavigate={handleNavigate} />}

        {activePage === 'submit-story' && (
          <SubmitStoryPage
            onSubmitSubmission={handleSubmitSubmission}
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'photovoice' && (
          <PhotovoicePage
            photovoiceItems={photovoiceItems}
            onSubmitPhotovoice={handleAddPhotovoice}
            onLikeItem={handleLikePhotovoice}
          />
        )}

        {activePage === 'comic' && <InteractiveComicPage />}

        {activePage === 'survey' && (
          <SurveyPage
            onSubmitSurvey={handleSubmitSurvey}
          />
        )}

        {activePage === 'exhibition' && (
          <ExhibitionPage
            onNavigate={handleNavigate}
            onSelectStory={handleSelectStory}
            onOpenLightbox={(item) => setSelectedLightboxItem(item)}
          />
        )}

        {activePage === 'dang-nhap' && <LoginPage onNavigate={handleNavigate} />}

        {activePage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
      </main>

      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stories={stories}
        onSelectStory={handleSelectStory}
        onNavigate={handleNavigate}
      />

      {selectedStory && (
        <StoryDetailModal
          story={selectedStory}
          onClose={() => setSelectedStory(null)}
          onLike={handleLikeStory}
        />
      )}

      {isLetterModalOpen && (
        <SendLetterModal
          onClose={() => setIsLetterModalOpen(false)}
          onSubmit={(data) => {
            storage.addLetter(data as any).then(() => {
              showToast('Đã gửi thư của bạn!', 'success');
              loadAllData();
            });
            setIsLetterModalOpen(false);
          }}
        />
      )}

      {selectedLightboxItem && (
        <LightboxModal
          item={selectedLightboxItem}
          onClose={() => setSelectedLightboxItem(null)}
        />
      )}

      <ProfileDrawer
        stories={stories}
        letters={letters}
        submissions={submissions}
        onSelectStory={handleSelectStory}
        onNavigate={handleNavigate}
      />
      <AuthModal />
      <AiChatModal 
        isOpen={isAiChatOpen}
        onClose={() => setIsAiChatOpen(false)}
      />

      {/* Floating AI Chat Mascot Button */}
      <button
        onClick={() => setIsAiChatOpen(true)}
        className="fixed bottom-20 sm:bottom-6 right-4 sm:right-6 z-40 group flex items-center gap-2 px-3.5 py-2.5 rounded-full bg-gradient-to-r from-sky-600 via-cyan-600 to-teal-600 text-white shadow-xl hover:shadow-2xl border border-cyan-200/50 backdrop-blur-md transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
        title="Trò chuyện cùng Trợ lý AI Trắc Ẩn LUMI"
      >
        <div className="relative">
          <Sparkles className="w-5 h-5 text-cyan-200 animate-pulse" />
          <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900 animate-ping" />
        </div>
        <span className="font-bold text-xs tracking-wide hidden xs:inline">AI LUMI Trắc Ẩn</span>
      </button>

      <MobileBottomNav activePage={activePage} onNavigate={handleNavigate} />
      <Footer onNavigate={handleNavigate} isHomePage={activePage === 'home'} />
    </div>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ToastProvider>
  );
}
