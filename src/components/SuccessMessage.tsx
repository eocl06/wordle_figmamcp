import React from 'react';

interface SuccessMessageProps {
  onReturn: () => void;
}

export const SuccessMessage: React.FC<SuccessMessageProps> = ({ onReturn }) => {
  return (
    <div className="success-message">
      <h1 className="success-heading">Harikasın!</h1>
      <p className="success-subtitle">Kelimeni sisteme kaydettik.</p>
      <p className="success-info">
        Kelimen seçilirse oyunda yer aldığı gün seni e-posta ile bilgilendireceğiz.
      </p>
      <button className="return-button" onClick={onReturn}>
        Bundle'a Dön
      </button>
    </div>
  );
};

