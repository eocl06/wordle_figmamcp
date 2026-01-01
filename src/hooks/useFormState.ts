import { useState, useMemo, useCallback } from 'react';
import { FormState, UIState, DerivedState } from '../types/form.types';

const TURKISH_LETTERS = /^[A-Za-zÇĞİÖŞÜçğıöşü]+$/;

const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

const validateWord = (word: string[]): boolean => {
  if (word.length !== 5) return false;
  const wordStr = word.join('');
  return TURKISH_LETTERS.test(wordStr) && wordStr.length === 5;
};

const validateName = (name: string): boolean => {
  return name.trim().length >= 2;
};

export const useFormState = () => {
  const [state, setState] = useState<FormState>({
    word: [],
    name: '',
    email: '',
    isSubmitting: false,
    submissionStatus: 'idle',
    errors: {},
  });

  // Derived state
  const derivedState: DerivedState = useMemo(() => {
    const wordLength = state.word.length;
    const isWordComplete = wordLength === 5;
    const isWordValid = validateWord(state.word);
    const isNameValid = validateName(state.name);
    const isEmailValid = validateEmail(state.email);
    const isFormValid = isWordValid && isNameValid && isEmailValid;
    
    const submitEnabled = 
      isWordComplete && 
      isFormValid && 
      !state.isSubmitting && 
      state.submissionStatus !== 'success';

    let currentUIState: UIState = 'empty';
    if (state.submissionStatus === 'success') {
      currentUIState = 'success';
    } else if (wordLength === 0) {
      currentUIState = 'empty';
    } else if (wordLength < 5) {
      currentUIState = 'typing';
    } else if (wordLength === 5 && isFormValid) {
      currentUIState = 'ready';
    }

    return {
      wordLength,
      isWordComplete,
      isFormValid,
      submitEnabled,
      currentUIState,
    };
  }, [state]);

  const updateWord = useCallback((index: number, letter: string) => {
    setState(prev => {
      const newWord = [...prev.word];
      if (letter) {
        // Convert to uppercase and validate Turkish character
        const upperLetter = letter.toUpperCase();
        if (TURKISH_LETTERS.test(upperLetter)) {
          newWord[index] = upperLetter;
        }
      } else {
        newWord[index] = '';
      }
      // Remove empty strings and keep only filled letters
      const filteredWord = newWord.filter(l => l !== '');
      return {
        ...prev,
        word: filteredWord.slice(0, 5),
        errors: { ...prev.errors, word: undefined },
      };
    });
  }, []);

  const updateName = useCallback((name: string) => {
    setState(prev => ({
      ...prev,
      name,
      errors: { ...prev.errors, name: undefined },
    }));
  }, []);

  const updateEmail = useCallback((email: string) => {
    setState(prev => ({
      ...prev,
      email,
      errors: { ...prev.errors, email: undefined },
    }));
  }, []);

  const submitForm = useCallback(async () => {
    // Validate before submission
    const wordError = validateWord(state.word) ? undefined : 'Word must be exactly 5 Turkish letters';
    const nameError = validateName(state.name) ? undefined : 'Name must be at least 2 characters';
    const emailError = validateEmail(state.email) ? undefined : 'Please enter a valid email';

    if (wordError || nameError || emailError) {
      setState(prev => ({
        ...prev,
        errors: { word: wordError, name: nameError, email: emailError },
      }));
      return;
    }

    setState(prev => ({ ...prev, isSubmitting: true, submissionStatus: 'submitting' }));

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In real implementation, call actual API:
      // const response = await fetch('/api/word-submission', {
      //   method: 'POST',
      //   body: JSON.stringify({
      //     word: state.word.join(''),
      //     name: state.name,
      //     email: state.email,
      //   }),
      // });

      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submissionStatus: 'success',
      }));
    } catch (error) {
      setState(prev => ({
        ...prev,
        isSubmitting: false,
        submissionStatus: 'error',
        errors: { ...prev.errors, word: 'Submission failed. Please try again.' },
      }));
    }
  }, [state.word, state.name, state.email]);

  return {
    state,
    derivedState,
    updateWord,
    updateName,
    updateEmail,
    submitForm,
  };
};

