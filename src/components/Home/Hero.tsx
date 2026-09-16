import React from 'react';
import { ActiveNavPage } from '../../types';
import { DigitalCityBackground } from './DigitalCityBackground';
import { HeroContent } from './HeroContent';
import { LumiPedestalMascot } from './LumiPedestalMascot';
import { FloatingGlassCards } from './FloatingGlassCards';
import { HeroTransition } from './HeroTransition';

interface HeroProps {
  onNavigate: (page: ActiveNavPage) => void;
  onOpenLetterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLetterModal }) => {
  return (
    <div className="relative">
      
      {/* =========================================================================
          HERO SECTION: 16:9 Desktop Concept "LUMI DIGITAL CITY - THÀNH PHỐ TỬ TẾ"
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

            {/* RIGHT COLUMN: Mascot on 3D Futuristic Pedestal + Floating Glass Cards */}
            <div className="lg:col-span-6 xl:col-span-6 relative flex flex-col items-center justify-center">
              
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 lg:gap-8 w-full">
                
                {/* Center: Lumi on Digital Platform */}
                <div className="flex-shrink-0">
                  <LumiPedestalMascot />
                </div>

                {/* Right: Floating Glass Kindness Cards */}
                <div className="flex-shrink-0">
                  <FloatingGlassCards />
                </div>

              </div>

              {/* Bottom Right Cursive Calligraphy Accent */}
              <div className="w-full text-right mt-3 pr-4 hidden sm:block">
                <span className="font-handwriting text-2xl sm:text-3xl text-sky-800/80 font-bold select-none drop-shadow-xs">
                  Cùng nhau ♡ kiến tạo điều tốt đẹp hơn ♡
                </span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* Hero Bottom Transition: 4 Pillars Bar */}
      <HeroTransition />

    </div>
  );
};
