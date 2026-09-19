import React from 'react';
import { ActiveNavPage } from '../../types';
import { DigitalCityBackground } from './DigitalCityBackground';
import { HeroContent } from './HeroContent';
import { LumiFriendsCircle } from './LumiFriendsCircle';
import { HeroTransition } from './HeroTransition';

interface HeroProps {
  onNavigate: (page: ActiveNavPage) => void;
  onOpenLetterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLetterModal }) => {
  return (
    <div className="relative">
      
      {/* =========================================================================
          HERO SECTION: 16:9 Concept "LUMI DIGITAL CITY - THÀNH PHỐ TỬ TẾ"
      ========================================================================== */}
      <section 
        id="hero-section" 
        className="relative pt-24 sm:pt-28 lg:pt-32 pb-20 sm:pb-24 lg:pb-28 overflow-hidden min-h-[640px] lg:min-h-[720px] flex items-center"
      >
        {/* Layered Multi-depth Digital Smart City Background */}
        <DigitalCityBackground />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
            
            {/* LEFT COLUMN: Hero Content (Badge, Title, Slogan, CTAs, Impact Stats) */}
            <div className="lg:col-span-6 xl:col-span-6">
              <HeroContent 
                onNavigate={onNavigate}
                onOpenLetterModal={onOpenLetterModal}
              />
            </div>

            {/* RIGHT COLUMN: LUMI & Friends Circle in Smart City Plaza */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center">
              <LumiFriendsCircle onOpenLetterModal={onOpenLetterModal} />
            </div>

          </div>
        </div>
      </section>

      {/* Hero Bottom Transition: 4 Pillars Bar */}
      <HeroTransition />

    </div>
  );
};
