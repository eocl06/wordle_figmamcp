export interface FormState {
  // Input state
  word: string[]; // Array of 5 letters (max length 5)
  name: string;
  email: string;
  
  // Submission state
  isSubmitting: boolean;
  submissionStatus: 'idle' | 'submitting' | 'success' | 'error';
  
  // Validation state
  errors: {
    word?: string;
    name?: string;
    email?: string;
  };
}

export type UIState = 'empty' | 'typing' | 'ready' | 'success';

export interface DerivedState {
  wordLength: number;
  isWordComplete: boolean;
  isFormValid: boolean;
  submitEnabled: boolean;
  currentUIState: UIState;
}

