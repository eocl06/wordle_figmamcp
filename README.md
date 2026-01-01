# Wordle Mix Word Submission Form

A React-based form component for submitting 5-letter word suggestions to Wordle Mix game.

## Features

- ✅ 4 UI states: Empty → Typing → Ready → Success
- ✅ 5-letter word input with individual boxes
- ✅ Turkish character support (İ, Ğ, Ü, Ş, Ç, Ö)
- ✅ Real-time validation
- ✅ Auto-focus and keyboard navigation
- ✅ Success screen with grid display
- ✅ Responsive mobile-first design

## Installation

```bash
npm install
```

## Development

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Project Structure

```
src/
├── components/
│   ├── Header.tsx              # Status bar and logo
│   ├── WordInputGrid.tsx       # 5-letter input boxes
│   ├── UserInfoForm.tsx        # Name and email inputs
│   ├── SuccessGrid.tsx         # Success screen grid
│   ├── SuccessMessage.tsx      # Success message and CTA
│   └── WordSubmissionForm.tsx # Main component
├── hooks/
│   └── useFormState.ts         # State management hook
├── types/
│   └── form.types.ts           # TypeScript types
├── styles/
│   └── WordSubmissionForm.css  # Styles
└── App.tsx                     # Root component
```

## State Management

The component uses a custom hook `useFormState` that manages:
- Word input (array of 5 letters)
- Name and email fields
- Form validation
- Submission status
- UI state transitions

## UI States

1. **Empty**: No input, button disabled
2. **Typing**: Partial word input, button disabled
3. **Ready**: Complete form, button enabled
4. **Success**: Submission successful, show confirmation

## API Integration

Update the `submitForm` function in `useFormState.ts` to connect to your actual API endpoint:

```typescript
const response = await fetch('/api/word-submission', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    word: state.word.join(''),
    name: state.name,
    email: state.email,
  }),
});
```

