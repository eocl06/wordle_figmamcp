import React from 'react';
import { images } from '../assets/images';

export const PhoneMockup: React.FC = () => {
  return (
    <div className="phone-mockup">
      <img 
        src={images.phoneMockupFull} 
        alt="Wordle Mix Phone Mockup" 
        className="phone-mockup-image"
      />
    </div>
  );
};

