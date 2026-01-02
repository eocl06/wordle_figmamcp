import React, { useRef, useEffect } from 'react';

interface WordInputGridProps {
  word: string[];
  onWordChange: (index: number, letter: string) => void;
}

export const WordInputGrid: React.FC<WordInputGridProps> = ({ word, onWordChange }) => {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Auto-focus first empty box or last filled box
    const firstEmptyIndex = word.length;
    if (firstEmptyIndex < 5 && inputRefs.current[firstEmptyIndex]) {
      const input = inputRefs.current[firstEmptyIndex];
      if (input) {
        input.focus();
        // Sadece görünür değilse scroll yap
        requestAnimationFrame(() => {
          const rect = input.getBoundingClientRect();
          const viewportHeight = window.visualViewport?.height || window.innerHeight;
          const isVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
          
          if (!isVisible) {
            input.scrollIntoView({
              behavior: 'smooth',
              block: 'nearest',
              inline: 'nearest',
            });
          }
        });
      }
    }
  }, [word.length]);

  const handleFocus = (index: number) => {
    const input = inputRefs.current[index];
    if (input) {
      // Sadece input görünür değilse scroll yap
      const rect = input.getBoundingClientRect();
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const isVisible = rect.top >= 0 && rect.bottom <= viewportHeight;
      
      if (!isVisible) {
        requestAnimationFrame(() => {
          input.scrollIntoView({
            behavior: 'smooth',
            block: 'nearest',
            inline: 'nearest',
          });
        });
      }
    }
  };

  const handleInput = (index: number, value: string) => {
    const letter = value.slice(-1).toUpperCase(); // Get last character
    if (letter && /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(letter)) {
      onWordChange(index, letter);
      // Move to next box
      if (index < 4 && inputRefs.current[index + 1]) {
        inputRefs.current[index + 1]?.focus();
      }
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace') {
      if (word[index]) {
        // Clear current box
        onWordChange(index, '');
      } else if (index > 0) {
        // Move to previous box and clear it
        inputRefs.current[index - 1]?.focus();
        onWordChange(index - 1, '');
      }
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData('text').toUpperCase().slice(0, 5);
    pastedText.split('').forEach((letter, index) => {
      if (index < 5 && /[A-Za-zÇĞİÖŞÜçğıöşü]/.test(letter)) {
        onWordChange(index, letter);
      }
    });
  };

  return (
    <div className="word-input-grid" onPaste={handlePaste}>
      {[0, 1, 2, 3, 4].map((index) => {
        const letter = word[index] || '';
        const isFilled = !!letter;
        
        return (
          <div
            key={index}
            className={`letter-box ${isFilled ? 'filled' : 'empty'}`}
          >
            {isFilled ? (
              <span className="letter-text">{letter}</span>
            ) : (
              <input
                ref={(el) => (inputRefs.current[index] = el)}
                type="text"
                maxLength={1}
                value=""
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                onFocus={() => handleFocus(index)}
                className="letter-input"
                autoComplete="off"
                aria-label={`Letter ${index + 1} of 5`}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};

