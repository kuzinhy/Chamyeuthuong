import React from 'react';
import { ActiveNavPage, Story, Letter, GalleryMediaItem } from '../../types';

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

export const HomeView: React.FC<HomeViewProps> = () => {
  const BG_IMAGE_URL = "https://res.cloudinary.com/idt08wyp/image/upload/v1789560707/68dce261-b50d-4027-83e1-f8bfec957215.png";

  return (
    <div id="home-view" className="relative w-full min-h-[calc(100vh-64px)] flex items-center justify-center overflow-hidden bg-slate-100">
      <img
        id="home-bg-image"
        src={BG_IMAGE_URL}
        alt="LUMI Chạm Yêu Thương"
        className="w-full h-full min-h-[calc(100vh-64px)] object-cover object-center block"
        referrerPolicy="no-referrer"
        loading="eager"
      />
    </div>
  );
};
