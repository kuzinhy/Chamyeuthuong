import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { SearchModal } from './components/SearchModal';
import { StoryDetailModal } from './components/StoryDetailModal';
import { SendLetterModal } from './components/SendLetterModal';
import { LightboxModal } from './components/LightboxModal';
import { InteractiveCursor } from './components/InteractiveCursor';
import { AuthModal } from './components/AuthModal';
import { ProfileDrawer } from './components/ProfileDrawer';
import { MobileBottomNav } from './components/MobileBottomNav';

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
  StorySubmission,
  LetterCategory 
} from './types';
import { storageService } from './services/storage';
import { apiService } from './services/api';

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

  // Audio background state
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Toast
  const { showToast } = useToast();

  // Load all initial data from storageService and sync with real server database
  useEffect(() => {
    setStories(storageService.getStories());
    setSubmissions(storageService.getSubmissions());
    setLetters(storageService.getLetters());
    setGalleryItems(storageService.getGalleryItems());
    setPhotovoiceItems(storageService.getPhotovoiceItems());
    setSurveys(storageService.getSurveyResponses());

    // Background sync from real server database
    apiService.getStories().then((serverStories) => {
      if (serverStories && serverStories.length > 0) {
        setStories(serverStories);
      }
    }).catch(() => {});

    apiService.getLetters().then((serverLetters) => {
      if (serverLetters && serverLetters.length > 0) {
        setLetters(serverLetters);
      }
    }).catch(() => {});
  }, []);

  // Web Audio Gentle Ambient Sound Generator for meditation & reading
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
          oscillator.frequency.setValueAtTime(432, audioCtx.currentTime); // 432 Hz Healing frequency
          gainNode.gain.setValueAtTime(0.015, audioCtx.currentTime);

          oscillator.connect(gainNode);
          gainNode.connect(audioCtx.destination);
          oscillator.start();
          showToast('Đang phát giai điệu thư giãn 432Hz', { type: 'sparkle' });
        }
      } catch {
        // Silent catch for autoplay restriction
      }
    }

    return () => {
      if (oscillator) {
        try {
          oscillator.stop();
          oscillator.disconnect();
        } catch {
          // ignore
        }
      }
      if (audioCtx) {
        audioCtx.close().catch(() => {});
      }
    };
  }, [isPlayingAudio, showToast]);

  // Scroll to top on page change
  const handleNavigate = (page: ActiveNavPage) => {
    setActivePage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Story Interactions
  const handleLikeStory = (id: string) => {
    const updated = storageService.likeStory(id);
    if (updated) {
      setStories(storageService.getStories());
      if (selectedStory?.id === id) {
        setSelectedStory(updated);
      }
      showToast('Đã gửi một cái chạm yêu thương ❤️', { type: 'heart' });
    }
  };

  const handleSelectStory = (story: Story) => {
    storageService.viewStory(story.id);
    setSelectedStory(story);
  };

  const handleAddStory = async (newStory: Story) => {
    const updated = storageService.addStory(newStory);
    setStories(updated);
    if (user?.email) {
      try {
        await apiService.createStory(newStory, user.email);
        showToast('Đã thêm câu chuyện lên hệ thống thành công!', { type: 'success' });
      } catch (err: any) {
        showToast(`Lỗi đồng bộ máy chủ: ${err.message || 'Không thể tạo bài viết.'}`, { type: 'info' });
      }
    } else {
      showToast('Đã lưu câu chuyện cục bộ thành công!', { type: 'success' });
    }
  };

  const handleUpdateStory = async (id: string, updates: Partial<Story>) => {
    const updated = storageService.updateStory(id, updates);
    setStories(updated);
    if (user?.email) {
      try {
        await apiService.updateStory(id, updates, user.email);
        showToast('Đã cập nhật câu chuyện thành công!', { type: 'success' });
      } catch (err: any) {
        showToast(`Lỗi đồng bộ máy chủ: ${err.message || 'Không thể cập nhật.'}`, { type: 'info' });
      }
    } else {
      showToast('Đã cập nhật câu chuyện cục bộ!', { type: 'success' });
    }
  };

  const handleDeleteStory = async (id: string) => {
    const updated = storageService.deleteStory(id);
    setStories(updated);
    if (user?.email) {
      try {
        await apiService.deleteStory(id, user.email);
        showToast('Đã xóa câu chuyện thành công!', { type: 'success' });
      } catch (err: any) {
        showToast(`Lỗi đồng bộ máy chủ: ${err.message || 'Không thể xóa.'}`, { type: 'info' });
      }
    } else {
      showToast('Đã xóa câu chuyện cục bộ!', { type: 'success' });
    }
  };

  // Story Submissions (Kể LUMI Nghe)
  const handleSubmitSubmission = (sub: Omit<StorySubmission, 'id' | 'submittedAt' | 'status'>) => {
    storageService.addSubmission(sub);
    setSubmissions(storageService.getSubmissions());
  };

  const handleConvertSubmission = async (submissionId: string) => {
    const { submissions: updatedSubs } = storageService.approveSubmissionAndConvertToStory(submissionId);
    setSubmissions(updatedSubs);
    setStories(storageService.getStories());
    if (user?.email) {
      try {
        await apiService.convertSubmission(submissionId, user.email);
        showToast('Đã duyệt và chuyển bài viết thành câu chuyện thành công!', { type: 'success' });
      } catch (err: any) {
        showToast(`Lỗi đồng bộ máy chủ: ${err.message || 'Không thể chuyển duyệt.'}`, { type: 'info' });
      }
    } else {
      showToast('Đã duyệt và chuyển bài viết thành câu chuyện cục bộ!', { type: 'success' });
    }
  };

  const handleRejectSubmission = (submissionId: string, feedback?: string) => {
    const updatedSubs = storageService.rejectSubmission(submissionId, feedback);
    setSubmissions(updatedSubs);
  };

  // Letter Interactions
  const handleAddLetter = (letterData: {
    senderName: string;
    isAnonymous: boolean;
    category: LetterCategory;
    content: string;
    targetPerson?: string;
    colorTheme?: 'rose' | 'amber' | 'sky' | 'emerald' | 'purple';
  }) => {
    storageService.addLetter(letterData);
    setLetters(storageService.getLetters());
    showToast('Lá thư của bạn đã được gửi thành công!', { 
      description: 'LUMI sẽ chuyển lời yêu thương của bạn vào Hộp thư nhé',
      type: 'heart' 
    });
  };

  const handleLikeLetter = (id: string) => {
    const updated = storageService.likeLetter(id);
    if (updated) {
      setLetters(storageService.getLetters());
      showToast('Đã thả tim cho lá thư này ❤️', { type: 'heart' });
    }
  };

  const handleApproveLetter = async (id: string, reply?: string) => {
    const updated = storageService.approveLetter(id, reply);
    setLetters(updated);
    if (user?.email) {
      try {
        await apiService.moderateLetter(id, { status: 'approved', replyFromLumi: reply }, user.email);
        showToast('Đã duyệt xuất bản thư yêu thương lên hệ thống!', { type: 'success' });
      } catch (err: any) {
        showToast(`Lỗi đồng bộ máy chủ: ${err.message || 'Không thể duyệt.'}`, { type: 'info' });
      }
    } else {
      showToast('Đã duyệt xuất bản thư yêu thương cục bộ!', { type: 'success' });
    }
  };

  const handleRejectLetter = async (id: string) => {
    const updated = storageService.rejectLetter(id);
    setLetters(updated);
    if (user?.email) {
      try {
        await apiService.moderateLetter(id, { status: 'rejected' }, user.email);
        showToast('Đã từ chối lá thư thành công!', { type: 'success' });
      } catch (err: any) {
        showToast(`Lỗi đồng bộ máy chủ: ${err.message || 'Không thể từ chối.'}`, { type: 'info' });
      }
    } else {
      showToast('Đã từ chối lá thư cục bộ!', { type: 'info' });
    }
  };

  const handleDeleteLetter = async (id: string) => {
    const updated = storageService.deleteLetter(id);
    setLetters(updated);
    if (user?.email) {
      try {
        await apiService.deleteLetter(id, user.email);
        showToast('Đã xóa lá thư vĩnh viễn khỏi hệ thống!', { type: 'success' });
      } catch (err: any) {
        showToast(`Lỗi đồng bộ máy chủ: ${err.message || 'Không thể xóa.'}`, { type: 'info' });
      }
    } else {
      showToast('Đã xóa lá thư vĩnh viễn cục bộ!', { type: 'info' });
    }
  };

  // Photovoice Interactions
  const handleAddPhotovoice = (item: {
    title: string;
    studentName: string;
    grade: string;
    imageUrl: string;
    story: string;
    reflectionPrompt: string;
    theme: string;
  }) => {
    storageService.addPhotovoiceItem(item);
    setPhotovoiceItems(storageService.getPhotovoiceItems());
    showToast('Đã gửi tác phẩm Photovoice thành công!', { type: 'success' });
  };

  const handleLikePhotovoice = (id: string) => {
    const updated = storageService.likePhotovoiceItem(id);
    if (updated) {
      setPhotovoiceItems(storageService.getPhotovoiceItems());
    }
  };

  const handleApprovePhotovoice = (id: string) => {
    const updated = storageService.approvePhotovoiceItem(id);
    setPhotovoiceItems(updated);
    showToast('Đã duyệt tác phẩm Photovoice', { type: 'success' });
  };

  const handleRejectPhotovoice = (id: string) => {
    const updated = storageService.rejectPhotovoiceItem(id);
    setPhotovoiceItems(updated);
    showToast('Đã từ chối tác phẩm', { type: 'info' });
  };

  // Gallery Interactions
  const handleLikeGalleryItem = (id: string) => {
    const updated = storageService.likeGalleryItem(id);
    if (updated) {
      setGalleryItems(storageService.getGalleryItems());
      if (selectedLightboxItem?.id === id) {
        setSelectedLightboxItem(updated);
      }
    }
  };

  // Survey submission
  const handleSubmitSurvey = (submission: {
    surveyType: 'pre-test' | 'post-test';
    studentGender: string;
    studentGrade: string;
    schoolName: string;
    answers: Record<string, number>;
  }) => {
    storageService.addSurveyResponse(submission);
    setSurveys(storageService.getSurveyResponses());
    showToast('Đã lưu kết quả khảo sát thành công!', { 
      description: 'Dữ liệu đã được mã hóa phục vụ đề tài nghiên cứu khoa học',
      type: 'sparkle' 
    });
  };

  return (
    <div className="min-h-screen bg-[#faf8f5] text-slate-800 flex flex-col font-sans selection:bg-sky-500 selection:text-white pb-14 lg:pb-0">
      {/* Interactive Cursor Follower with Magnetic Pull */}
      <InteractiveCursor />
      
      {/* Primary Sticky Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        onOpenSearch={() => setIsSearchOpen(true)}
        isPlayingAudio={isPlayingAudio}
        onToggleAudio={() => setIsPlayingAudio(!isPlayingAudio)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activePage === 'home' && (
          <HomeView
            stories={stories}
            letters={letters}
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
            stories={stories}
            onSelectStory={handleSelectStory}
            onLikeStory={handleLikeStory}
          />
        )}

        {activePage === 'music' && (
          <MusicPage />
        )}

        {activePage === 'letters' && (
          <LettersPage
            letters={letters}
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
            stories={stories}
            onSelectStory={handleSelectStory}
          />
        )}

        {activePage === 'research' && (
          <ResearchPage
            onNavigate={handleNavigate}
          />
        )}

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

        {activePage === 'comic' && (
          <InteractiveComicPage />
        )}

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

        {activePage === 'dang-nhap' && (
          <LoginPage
            onNavigate={handleNavigate}
          />
        )}

        {activePage === 'admin' && (
          <AdminPage
            letters={letters}
            photovoiceItems={photovoiceItems}
            stories={stories}
            surveys={surveys}
            submissions={submissions}
            onApproveLetter={handleApproveLetter}
            onRejectLetter={handleRejectLetter}
            onDeleteLetter={handleDeleteLetter}
            onApprovePhotovoice={handleApprovePhotovoice}
            onRejectPhotovoice={handleRejectPhotovoice}
            onAddStory={handleAddStory}
            onUpdateStory={handleUpdateStory}
            onDeleteStory={handleDeleteStory}
            onConvertSubmission={handleConvertSubmission}
            onRejectSubmission={handleRejectSubmission}
            onNavigate={handleNavigate}
          />
        )}
      </main>

      {/* Global Modals & Drawers */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        stories={stories}
        onSelectStory={handleSelectStory}
        onNavigate={handleNavigate}
      />

      <StoryDetailModal
        story={selectedStory}
        onClose={() => setSelectedStory(null)}
        onLikeStory={handleLikeStory}
        onSelectStory={handleSelectStory}
        allStories={stories}
      />

      <SendLetterModal
        isOpen={isLetterModalOpen}
        onClose={() => setIsLetterModalOpen(false)}
        onSubmit={handleAddLetter}
      />

      <LightboxModal
        item={selectedLightboxItem}
        onClose={() => setSelectedLightboxItem(null)}
        onLikeItem={handleLikeGalleryItem}
      />

      <AuthModal />

      <ProfileDrawer
        stories={stories}
        letters={letters}
        submissions={submissions}
        onSelectStory={handleSelectStory}
        onNavigate={handleNavigate}
      />

      {/* Mobile Bottom Navigation */}
      <MobileBottomNav
        activePage={activePage}
        onNavigate={handleNavigate}
      />

      {/* Primary Brand Footer */}
      <Footer onNavigate={handleNavigate} />
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
