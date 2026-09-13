import React from 'react';
import { Hero } from './Hero';
import { OpeningMessage } from './OpeningMessage';
import { FeaturedStoriesSection } from './FeaturedStoriesSection';
import { MapSnippetSection } from './MapSnippetSection';
import { MusicSection } from './MusicSection';
import { LettersSection } from './LettersSection';
import { GallerySection } from './GallerySection';
import { ResearchSection } from './ResearchSection';
import { CallToActionSection } from './CallToActionSection';
import { Story, Letter, GalleryMediaItem, ActiveNavPage } from '../../types';

interface HomeViewProps {
  stories: Story[];
  letters: Letter[];
  galleryItems: GalleryMediaItem[];
  onNavigate: (page: ActiveNavPage) => void;
  onSelectStory: (story: Story) => void;
  onLikeStory: (id: string) => void;
  onOpenLetterModal: () => void;
  onLikeLetter: (id: string) => void;
  onOpenLightbox: (item: GalleryMediaItem) => void;
}

export const HomeView: React.FC<HomeViewProps> = ({
  stories,
  letters,
  galleryItems,
  onNavigate,
  onSelectStory,
  onLikeStory,
  onOpenLetterModal,
  onLikeLetter,
  onOpenLightbox
}) => {
  return (
    <div className="space-y-0">
      <Hero 
        onNavigate={onNavigate} 
        onOpenLetterModal={onOpenLetterModal} 
      />
      
      <OpeningMessage />

      <FeaturedStoriesSection
        stories={stories}
        onSelectStory={onSelectStory}
        onNavigate={onNavigate}
        onLikeStory={onLikeStory}
      />

      <MapSnippetSection 
        onNavigate={onNavigate} 
      />

      <MusicSection 
        onNavigate={onNavigate} 
      />

      <LettersSection
        letters={letters}
        onOpenLetterModal={onOpenLetterModal}
        onNavigate={onNavigate}
        onLikeLetter={onLikeLetter}
      />

      <GallerySection
        galleryItems={galleryItems}
        onNavigate={onNavigate}
        onOpenLightbox={onOpenLightbox}
      />

      <ResearchSection 
        onNavigate={onNavigate} 
      />

      <CallToActionSection
        onOpenLetterModal={onOpenLetterModal}
        onNavigate={onNavigate}
      />
    </div>
  );
};
