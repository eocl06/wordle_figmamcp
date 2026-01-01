import React from 'react';

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
  return (
    <div className="user-info-form">
      <div className="input-group">
        <input
          type="text"
          className={`name-input ${name ? 'filled' : ''} ${errors?.name ? 'error' : ''}`}
          placeholder="Ad Soyad"
          value={name}
          onChange={(e) => onNameChange(e.target.value)}
          aria-label="Name"
        />
        {errors?.name && <span className="error-message">{errors.name}</span>}
      </div>
      
      <div className="input-group">
        <input
          type="email"
          className={`email-input ${email ? 'filled' : ''} ${errors?.email ? 'error' : ''}`}
          placeholder="E-mail"
          value={email}
          onChange={(e) => onEmailChange(e.target.value)}
          aria-label="Email"
        />
        {errors?.email && <span className="error-message">{errors.email}</span>}
      </div>
    </div>
  );
};

