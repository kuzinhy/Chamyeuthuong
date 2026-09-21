import React from 'react';
import { ActiveNavPage } from '../../types';
import { SimpleMissionHero } from './SimpleMissionHero';

interface HeroProps {
  onNavigate: (page: ActiveNavPage) => void;
  onOpenLetterModal: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onNavigate, onOpenLetterModal }) => {
  return (
    <SimpleMissionHero 
      onNavigate={onNavigate} 
      onOpenLetterModal={onOpenLetterModal} 
    />
  );
};

