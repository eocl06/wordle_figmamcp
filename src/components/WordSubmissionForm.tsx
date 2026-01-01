import React, { useEffect } from 'react';
import { useFormState } from '../hooks/useFormState';
import { Header } from './Header';
import { WordInputGrid } from './WordInputGrid';
import { UserInfoForm } from './UserInfoForm';
import { SuccessGrid } from './SuccessGrid';
import { SuccessMessage } from './SuccessMessage';
import { images } from '../assets/images';

export const WordSubmissionForm: React.FC = () => {
  const { state, derivedState, updateWord, updateName, updateEmail, submitForm } = useFormState();

  const handleReturn = () => {
    window.location.href = 'https://www.bundle.app/tr/gundem';
  };

  const currentUIState = derivedState.currentUIState;

  // Success screen'de body scroll'unu engelle
  useEffect(() => {
    if (currentUIState === 'success') {
      document.body.classList.add('success-mode');
    } else {
      document.body.classList.remove('success-mode');
    }
    
    return () => {
      document.body.classList.remove('success-mode');
    };
  }, [currentUIState]);

  return (
    <div className="word-submission-form">
      <Header />

      {currentUIState === 'success' ? (
        // State 4: Success Screen
        <div className="success-screen">
          <SuccessGrid word={state.word} />
          <SuccessMessage onReturn={handleReturn} />
        </div>
      ) : (
        // States 1-3: Form Screen
        <div className="form-screen">
          <h1 className="main-title">
            Bundle Games'e yeni oyun: Wordle Mix
          </h1>

          <div className="promotional-banner">
            <img 
              src={images.phoneMockupFull} 
              alt="Wordle Mix Promotional Banner" 
              className="promotional-banner-image"
            />
          </div>

          <div className="description-section">
            <p className="description-text">
              Bugüne kadar sayısız kez o 5 kutucuğa baktın ve doğru kelimeyi bulmaya çalıştın. Yeni Wordle Mix'te ise artık{' '}
              <strong>heyecanı sen yaratıyorsun</strong>:
            </p>
            <p className="description-text">
              <strong>Aklındaki 5 harfli kelimeyi gönder</strong>, günü geldiğinde herkes senin kelimeni oynasın!
            </p>
          </div>

          <div className="word-input-section">
            <h2 className="section-label">5 Harfli Kelime Önerini Gir:</h2>
            <WordInputGrid word={state.word} onWordChange={updateWord} />
            {state.errors.word && (
              <span className="error-message">{state.errors.word}</span>
            )}
          </div>

          <div className="user-info-section">
            <h2 className="section-label">Bilgilerin:</h2>
            <UserInfoForm
              name={state.name}
              email={state.email}
              onNameChange={updateName}
              onEmailChange={updateEmail}
              errors={state.errors}
            />
          </div>

          <p className="disclaimer">
            *kelimen yayınlandığı gün senin adın ve soyadınla yayınlanacak, ve ayrıca sana mail ile bunu ulaştıracağız
          </p>

          <button
            className={`submit-button ${derivedState.submitEnabled ? 'enabled' : 'disabled'}`}
            onClick={submitForm}
            disabled={!derivedState.submitEnabled || state.isSubmitting}
          >
            {state.isSubmitting ? 'Gönderiliyor...' : 'Gönder'}
          </button>
        </div>
      )}
    </div>
  );
};

