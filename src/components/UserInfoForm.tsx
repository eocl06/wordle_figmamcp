import React, { useRef } from 'react';

interface UserInfoFormProps {
  name: string;
  email: string;
  onNameChange: (name: string) => void;
  onEmailChange: (email: string) => void;
  errors?: {
    name?: string;
    email?: string;
  };
}

export const UserInfoForm: React.FC<UserInfoFormProps> = ({
  name,
  email,
  onNameChange,
  onEmailChange,
  errors,
}) => {
  const nameInputRef = useRef<HTMLInputElement>(null);
  const emailInputRef = useRef<HTMLInputElement>(null);

  const scrollIntoView = (element: HTMLInputElement | null) => {
    if (!element) return;
    
    // Delay to ensure keyboard is open
    setTimeout(() => {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
        inline: 'nearest',
      });
      
      // Additional scroll for mobile devices
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.visualViewport?.height || window.innerHeight;
      const scrollOffset = Math.max(0, rect.bottom - viewportHeight + 100);
      
      if (scrollOffset > 0) {
        window.scrollBy({
          top: scrollOffset,
          behavior: 'smooth',
        });
      }
    }, 300);
  };

  const handleNameFocus = () => {
    scrollIntoView(nameInputRef.current);
  };

  const handleEmailFocus = () => {
    scrollIntoView(emailInputRef.current);
  };

  return (
    <div className="user-info-form">
      <div className="input-group">
        <input
          ref={nameInputRef}
          type="text"
          className={`name-input ${name ? 'filled' : ''} ${errors?.name ? 'error' : ''}`}
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          onFocus={handleNameFocus}
          aria-label="Name"
        />
        {errors?.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="input-group">
        <input
          ref={emailInputRef}
          type="email"
          className={`email-input ${email ? 'filled' : ''} ${errors?.email ? 'error' : ''}`}
          placeholder="E-mail"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          onFocus={handleEmailFocus}
          aria-label="Email"
        />
        {errors?.email && <span className="error-message">{errors.email}</span>}
      </div>
    </div>
  );
};

