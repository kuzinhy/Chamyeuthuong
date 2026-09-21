import React, { useState, useEffect, useCallback, useMemo, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { InteractiveCursor } from './components/InteractiveCursor';
import { MobileBottomNav } from './components/MobileBottomNav';
import { AuthModal } from './components/AuthModal';
import { Sparkles } from 'lucide-react';

// Providers
import { ToastProvider, useToast } from './context/ToastContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import { LoadingProvider, useLoading } from './context/LoadingContext';

// Primary View (eager loaded for instant first paint)
import { HomeView } from './components/Home/HomeView';

// Code-split pages (lazy loaded on navigation)
const StoriesPage = React.lazy(() => import('./pages/StoriesPage').then(m => ({ default: m.StoriesPage })));
const MusicPage = React.lazy(() => import('./pages/MusicPage').then(m => ({ default: m.MusicPage })));
const LettersPage = React.lazy(() => import('./pages/LettersPage').then(m => ({ default: m.LettersPage })));
const GalleryPage = React.lazy(() => import('./pages/GalleryPage').then(m => ({ default: m.GalleryPage })));
const MapPage = React.lazy(() => import('./pages/MapPage').then(m => ({ default: m.MapPage })));
const ResearchPage = React.lazy(() => import('./pages/ResearchPage').then(m => ({ default: m.ResearchPage })));
const SubmitStoryPage = React.lazy(() => import('./pages/SubmitStoryPage').then(m => ({ default: m.SubmitStoryPage })));
const PhotovoicePage = React.lazy(() => import('./pages/PhotovoicePage').then(m => ({ default: m.PhotovoicePage })));
const InteractiveComicPage = React.lazy(() => import('./pages/InteractiveComicPage').then(m => ({ default: m.InteractiveComicPage })));
const SurveyPage = React.lazy(() => import('./pages/SurveyPage').then(m => ({ default: m.SurveyPage })));
const ExhibitionPage = React.lazy(() => import('./pages/ExhibitionPage').then(m => ({ default: m.ExhibitionPage })));
const AdminPage = React.lazy(() => import('./pages/AdminPage').then(m => ({ default: m.AdminPage })));
const LoginPage = React.lazy(() => import('./pages/LoginPage').then(m => ({ default: m.LoginPage })));

// Code-split heavy modals (loaded on demand)
const SearchModal = React.lazy(() => import('./components/SearchModal').then(m => ({ default: m.SearchModal })));
const StoryDetailModal = React.lazy(() => import('./components/StoryDetailModal').then(m => ({ default: m.StoryDetailModal })));
const SendLetterModal = React.lazy(() => import('./components/SendLetterModal').then(m => ({ default: m.SendLetterModal })));
const LightboxModal = React.lazy(() => import('./components/LightboxModal').then(m => ({ default: m.LightboxModal })));
const ProfileDrawer = React.lazy(() => import('./components/ProfileDrawer').then(m => ({ default: m.ProfileDrawer })));
const AiChatModal = React.lazy(() => import('./components/AiChatModal').then(m => ({ default: m.AiChatModal })));

// Types & Services & Initial Fallback Data
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
import { 
  INITIAL_STORIES, 
  INITIAL_LETTERS, 
  INITIAL_GALLERY, 
  INITIAL_PHOTOVOICE 
} from './data/initialData';

// Fallback loader for smooth transitions
const PageFallback = () => (
  <div className="min-h-[50vh] flex items-center justify-center">
    <div className="flex flex-col items-center gap-3">
      <div className="w-8 h-8 rounded-full border-2 border-sky-200 border-t-sky-600 animate-spin" />
      <span className="text-xs text-slate-400 font-medium tracking-wide">Đang tải trải nghiệm...</span>
    </div>
  </div>
);

function AppContent() {
  const { user } = useAuth();
  const { withLoading } = useLoading();
  const [activePage, setActivePage] = useState<ActiveNavPage>('home');
  
  // Stale-while-revalidate initial states: load instantly from cache/seed
  const [stories, setStories] = useState<Story[]>(() => {
    try {
      const cached = localStorage.getItem('lumi_cms_stories_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_STORIES;
  });

  const [submissions, setSubmissions] = useState<StorySubmission[]>([]);

  const [letters, setLetters] = useState<Letter[]>(() => {
    try {
      const cached = localStorage.getItem('lumi_cms_letters_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_LETTERS;
  });

  const [galleryItems, setGalleryItems] = useState<GalleryMediaItem[]>(() => {
    try {
      const cached = localStorage.getItem('lumi_cms_gallery_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_GALLERY;
  });

  const [photovoiceItems, setPhotovoiceItems] = useState<PhotovoiceItem[]>(() => {
    try {
      const cached = localStorage.getItem('lumi_cms_photovoice_v3');
      if (cached) {
        const parsed = JSON.parse(cached);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {}
    return INITIAL_PHOTOVOICE;
  });

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

  const loadCachedData = useCallback(() => {
    try {
      const storiesCached = localStorage.getItem('lumi_cms_stories_v3');
      if (storiesCached) setStories(JSON.parse(storiesCached));

      const lettersCached = localStorage.getItem('lumi_cms_letters_v3');
      if (lettersCached) setLetters(JSON.parse(lettersCached));

      const galleryCached = localStorage.getItem('lumi_cms_gallery_v3');
      if (galleryCached) setGalleryItems(JSON.parse(galleryCached));

      const pvCached = localStorage.getItem('lumi_cms_photovoice_v3');
      if (pvCached) setPhotovoiceItems(JSON.parse(pvCached));

      const subCached = localStorage.getItem('lumi_cms_submissions_v3');
      if (subCached) setSubmissions(JSON.parse(subCached));
    } catch (e) {
      console.warn('Error loading cached data:', e);
    }
  }, []);

  const loadAllData = useCallback(async () => {
    try {
      await withLoading(
        Promise.allSettled([
          storage.getStories(),
          storage.getSubmissions(),
          storage.getLetters(),
          storage.getGallery(),
          storage.getPhotovoice(),
          storage.getSurveys()
        ]).then((results) => {
          if (results[0].status === 'fulfilled' && Array.isArray(results[0].value)) setStories(results[0].value);
          if (results[1].status === 'fulfilled' && Array.isArray(results[1].value)) setSubmissions(results[1].value);
          if (results[2].status === 'fulfilled' && Array.isArray(results[2].value)) setLetters(results[2].value);
          if (results[3].status === 'fulfilled' && Array.isArray(results[3].value)) setGalleryItems(results[3].value);
          if (results[4].status === 'fulfilled' && Array.isArray(results[4].value)) setPhotovoiceItems(results[4].value);
          if (results[5].status === 'fulfilled' && Array.isArray(results[5].value)) setSurveys(results[5].value);
        }),
        'Đang đồng bộ dữ liệu...'
      );
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }, [withLoading]);

  useEffect(() => {
    loadCachedData();
    loadAllData();
  }, [activePage, loadCachedData, loadAllData]);

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

  // Memoized callbacks
  const handleNavigate = useCallback((page: ActiveNavPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleSelectStory = useCallback((story: Story) => {
    setSelectedStory(story);
  }, []);

  const handleLikeStory = useCallback(async (_id: string) => {
    showToast('Đã gửi một cái chạm yêu thương ❤️', { type: 'heart' });
  }, [showToast]);

  const handleLikeLetter = useCallback(async (_id: string) => {
    showToast('Đã thả tim cho lá thư này ❤️', { type: 'heart' });
  }, [showToast]);

  const handleLikeGalleryItem = useCallback(async (_id: string) => {
    showToast('Đã yêu thích tác phẩm này ✨', { type: 'sparkle' });
  }, [showToast]);

  const handleLikePhotovoice = useCallback(async (_id: string) => {
    showToast('Đã ủng hộ góc nhìn này 📸', { type: 'success' });
  }, [showToast]);

  const handleSubmitSubmission = useCallback(async (sub: any) => {
    try {
      await withLoading(storage.addSubmission(sub), 'Đang gửi bài đóng góp...');
      showToast('Đã gửi bài đóng góp thành công!', { type: 'success' });
      loadAllData();
    } catch (error) {
      showToast('Lỗi khi gửi bài', 'error');
    }
  }, [loadAllData, showToast, withLoading]);

  const handleAddPhotovoice = useCallback(async (item: any) => {
    try {
      await withLoading(storage.addPhotovoice(item), 'Đang đăng tải hình ảnh...');
      showToast('Đã đăng ảnh thành công!', 'success');
      loadAllData();
    } catch (error) {
      showToast('Lỗi khi đăng ảnh', 'error');
    }
  }, [loadAllData, showToast, withLoading]);

  const handleSubmitSurvey = useCallback(async (survey: any) => {
    try {
      await withLoading(storage.addSurvey(survey), 'Đang lưu ý kiến khảo sát...');
      showToast('Cảm ơn bạn đã tham gia khảo sát!', 'success');
      loadAllData();
    } catch (error) {
      showToast('Lỗi khi gửi khảo sát', 'error');
    }
  }, [loadAllData, showToast, withLoading]);

  // Stable derived collections
  const approvedLetters = useMemo(() => {
    return (letters || []).filter(l => l && l.status === 'approved');
  }, [letters]);

  const publishedStories = useMemo(() => {
    return (stories || []).filter(s => s && s.status === 'published');
  }, [stories]);

  const handleOpenSearch = useCallback(() => setIsSearchOpen(true), []);
  const handleCloseSearch = useCallback(() => setIsSearchOpen(false), []);
  const handleOpenLetterModal = useCallback(() => setIsLetterModalOpen(true), []);
  const handleCloseLetterModal = useCallback(() => setIsLetterModalOpen(false), []);
  const handleToggleAudio = useCallback(() => setIsPlayingAudio(prev => !prev), []);
  const handleCloseLightbox = useCallback(() => setSelectedLightboxItem(null), []);
  const handleCloseStoryDetail = useCallback(() => setSelectedStory(null), []);
  const handleOpenAiChat = useCallback(() => setIsAiChatOpen(true), []);
  const handleCloseAiChat = useCallback(() => setIsAiChatOpen(false), []);

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white pb-14 lg:pb-0">
      <InteractiveCursor />
      
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSearch={handleOpenSearch}
        onOpenLetterModal={handleOpenLetterModal}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={handleToggleAudio}
      />

      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            stories={stories || []}
            letters={approvedLetters}
            galleryItems={galleryItems || []}
            onNavigate={handleNavigate}
            onSelectStory={handleSelectStory}
            onLikeStory={handleLikeStory}
            onOpenLetterModal={handleOpenLetterModal}
            onLikeLetter={handleLikeLetter}
            onOpenLightbox={setSelectedLightboxItem}
          />
        )}

        <Suspense fallback={<PageFallback />}>
          {activePage === 'stories' && (
            <StoriesPage
              stories={publishedStories}
              onSelectStory={handleSelectStory}
              onLikeStory={handleLikeStory}
            />
          )}

          {activePage === 'music' && <MusicPage />}

          {activePage === 'letters' && (
            <LettersPage
              letters={approvedLetters}
              onOpenLetterModal={handleOpenLetterModal}
              onLikeLetter={handleLikeLetter}
            />
          )}

          {activePage === 'gallery' && (
            <GalleryPage
              galleryItems={galleryItems || []}
              onOpenLightbox={setSelectedLightboxItem}
              onLikeItem={handleLikeGalleryItem}
            />
          )}

          {activePage === 'map' && (
            <MapPage
              stories={publishedStories}
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
              onOpenLightbox={setSelectedLightboxItem}
            />
          )}

          {activePage === 'dang-nhap' && <LoginPage onNavigate={handleNavigate} />}

          {activePage === 'admin' && <AdminPage onNavigate={handleNavigate} />}
        </Suspense>
      </main>

      <Suspense fallback={null}>
        {isSearchOpen && (
          <SearchModal
            isOpen={isSearchOpen}
            onClose={handleCloseSearch}
            stories={stories}
            onSelectStory={handleSelectStory}
            onNavigate={handleNavigate}
          />
        )}

        {selectedStory && (
          <StoryDetailModal
            story={selectedStory}
            onClose={handleCloseStoryDetail}
            onLike={handleLikeStory}
          />
        )}

        {isLetterModalOpen && (
          <SendLetterModal
            isOpen={isLetterModalOpen}
            onClose={handleCloseLetterModal}
            onSubmit={async (data) => {
              try {
                await withLoading(storage.addLetter(data as any), 'Đang gửi thư yêu thương...');
                showToast('Đã gửi thư yêu thương của bạn! Cảm ơn bạn đã sẻ chia ❤️', { type: 'heart' });
                loadAllData();
              } catch (error) {
                showToast('Đã lưu thư thành công!', { type: 'success' });
              }
              setIsLetterModalOpen(false);
            }}
          />
        )}

        {selectedLightboxItem && (
          <LightboxModal
            item={selectedLightboxItem}
            onClose={handleCloseLightbox}
          />
        )}

        <ProfileDrawer
          stories={stories || []}
          letters={letters || []}
          submissions={submissions || []}
          onSelectStory={handleSelectStory}
          onNavigate={handleNavigate}
        />

        {isAiChatOpen && (
          <AiChatModal 
            isOpen={isAiChatOpen}
            onClose={handleCloseAiChat}
          />
        )}
      </Suspense>

      <AuthModal />

      {/* Floating AI Chat Mascot Button */}
      <button
        onClick={handleOpenAiChat}
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
        <LoadingProvider>
          <AppContent />
        </LoadingProvider>
      </AuthProvider>
    </ToastProvider>
  );
}
