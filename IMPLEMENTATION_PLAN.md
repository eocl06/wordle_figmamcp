# Wordle Mix Word Submission Feature - Implementation Plan

## Overview
This feature allows users to submit 5-letter word suggestions for the Wordle Mix game. **This is a single-screen component with 4 distinct UI states**, not separate routes. The states are driven by user input, form validity, and submission status.

## Important Conceptual Note

**These are NOT 4 separate routes or screens.**

They are **4 UI states of the same component**, driven by:
- `word.length` (input length)
- `formValid` (form validation status)
- `submissionStatus` (API submission result)

**State Flow:** `Idle → Typing → Ready → Success`

---

## UI State Analysis

### State 1: Introduction / Empty State (Node 139:1114)

**What this state represents:**
- The entry point of the flow
- User has not interacted yet
- Introduction to the new game concept

**Purpose:**
- Introduce Wordle Mix game concept
- Explain what the user is expected to do
- Invite the user to submit a 5-letter word

**Key Characteristics:**
- Informational content is visible (game description, explanation text)
- The 5-letter input boxes are empty
- Name / email fields are empty
- Submit button is disabled (opacity: 40%)

**State Definition:**
```typescript
word.length === 0
submitEnabled === false
```

**Key Components:**
- **Header:** Status bar, Wordle Mix logo, Share button
- **Title:** "Bundle Games'e yeni oyun: Wordle Mix"
- **Promotional Banner:** Green background with game preview mockup
- **Description Text:** Explains the concept of user-submitted words
- **Word Input:** 5 empty letter boxes (63x63px each, rounded corners)
- **User Info Fields:** 
  - Name field (placeholder: "Ad Soyad")
  - Email field (placeholder: "E-mail")
- **Disclaimer:** Small gray text about word publication
- **Submit Button:** Green button with "Gönder" text (disabled state)

---

### State 2: Active Typing State / Partial Input (Node 139:1911)

**What this state represents:**
- User has started typing their 5-letter word but has not completed it yet
- Active input in progress

**Purpose:**
- Provide immediate visual feedback while typing
- Show progress clearly (like Wordle)
- Guide user to complete the word

**Key Characteristics:**
- Keyboard is open (mobile)
- One or more letter boxes are filled (e.g., "S", "A")
- Filled boxes turn green (#68a963) with white text
- Remaining boxes are empty with gray border (#c0beb0)
- Submit button is still disabled

**State Definition:**
```typescript
word.length > 0 && word.length < 5
submitEnabled === false
```

**Visual Feedback:**
- Real-time letter appearance
- Green background on filled boxes
- Empty boxes maintain border style

---

### State 3: Completed Input / Ready-to-Submit (Node 139:2967)

**What this state represents:**
- User has fully entered a valid 5-letter word and filled all required fields
- Form is complete and validated

**Purpose:**
- Confirm that input is complete
- Allow the user to submit
- Provide clear visual confirmation of readiness

**Key Characteristics:**
- All 5 letter boxes are filled (e.g., "S", "A", "Y", "G", "I")
- All boxes have green background (#68a963)
- Keyboard may be dismissed (user can continue)
- Name and email fields are filled
- Input borders change to darker color (#353e45) when filled
- Submit button is enabled (opacity: 100%)

**State Definition:**
```typescript
word.length === 5
formValid === true
submitEnabled === true
```

**Validation Requirements:**
- Word: Exactly 5 Turkish alphabet letters
- Name: Non-empty, minimum 2 characters
- Email: Valid email format

---

### State 4: Success / Confirmation (Node 139:3831)

**What this state represents:**
- Terminal state of the flow, shown after successful submission
- No further input required

**Purpose:**
- Reassure the user that their word has been received
- Close the loop positively
- Provide next step (return to main app)

**Key Characteristics:**
- No input fields visible
- No keyboard
- Success headline: "Harikasın!" (44px, bold)
- Confirmation message: "Kelimeni sisteme kaydettik." (24px, gray)
- Additional info: "Kelimen seçilirse, günü geldiğinde sana haber vereceğiz." (12px, gray)
- Game Grid display:
  - First row shows submitted word "SAYGI" in green boxes
  - Additional rows of empty boxes (5x4 grid total)
  - Empty boxes have varying opacity (70%, 50%, 30%, 10%)
- Single CTA: "Bundle'a Dön" (green button)

**State Definition:**
```typescript
submissionStatus === 'success'
```

**Visual State:**
- Celebration/confirmation UI
- Grid visualization of submitted word
- Clear call-to-action to return

---

## State Summary Table

| State | User Action | Input State | Button State | Visual Cue |
|-------|------------|------------|--------------|------------|
| **1. Empty** | No action yet | `word.length === 0` | Disabled | All fields empty, gray borders |
| **2. Typing** | Active typing | `0 < word.length < 5` | Disabled | Filled boxes green, empty boxes gray |
| **3. Ready** | Completed typing | `word.length === 5 && formValid` | Enabled | All boxes green, darker input borders |
| **4. Success** | Submitted | `submissionStatus === 'success'` | Redirect CTA | Grid display, success message |

---

## Technical Implementation Plan

### 1. Component Structure

**Single Component with Conditional Rendering:**
```
WordSubmissionForm/
├── components/
│   ├── Header.tsx              # Status bar, logo, share button (always visible)
│   ├── PromotionalBanner.tsx   # Green banner with game preview (states 1-3)
│   ├── WordInputGrid.tsx       # 5-letter input boxes (states 1-3)
│   ├── UserInfoForm.tsx        # Name and email inputs (states 1-3)
│   ├── SubmitButton.tsx        # Submit button with states (states 1-3)
│   ├── SuccessGrid.tsx         # Game grid display (state 4)
│   └── SuccessMessage.tsx       # Success message and CTA (state 4)
├── hooks/
│   ├── useWordInput.ts         # Word input logic & validation
│   ├── useFormValidation.ts    # Form validation logic
│   ├── useFormSubmission.ts    # API submission logic
│   └── useFormState.ts         # Main state management hook
├── types/
│   └── form.types.ts           # TypeScript interfaces
└── WordSubmissionForm.tsx      # Main container with state-based rendering
```

**Component Rendering Logic:**
```typescript
// Main component structure
function WordSubmissionForm() {
  const { state, currentUIState } = useFormState();
  
  return (
    <div>
      <Header /> {/* Always visible */}
      
      {currentUIState === 'success' ? (
        // State 4: Success Screen
        <>
          <SuccessGrid word={state.word} />
          <SuccessMessage />
          <ReturnButton />
        </>
      ) : (
        // States 1-3: Form Screen
        <>
          <Title />
          <PromotionalBanner />
          <DescriptionText />
          <WordInputGrid 
            word={state.word}
            onWordChange={handleWordChange}
          />
          <UserInfoForm 
            name={state.name}
            email={state.email}
            onNameChange={handleNameChange}
            onEmailChange={handleEmailChange}
          />
          <Disclaimer />
          <SubmitButton 
            enabled={isSubmitEnabled(state)}
            onSubmit={handleSubmit}
            isSubmitting={state.isSubmitting}
          />
        </>
      )}
    </div>
  );
}
```

### 2. State Management

**Core State Interface:**
```typescript
interface FormState {
  // Input state
  word: string[];           // Array of 5 letters (max length 5)
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

// Derived state (computed)
interface DerivedState {
  wordLength: number;              // word.length
  isWordComplete: boolean;         // word.length === 5
  isFormValid: boolean;             // All fields valid
  submitEnabled: boolean;           // isWordComplete && isFormValid && !isSubmitting
  currentUIState: 'empty' | 'typing' | 'ready' | 'success';
}
```

**State Machine:**
```
┌─────────┐
│  EMPTY  │  (word.length === 0)
│  State  │
└────┬────┘
     │ user types first letter
     ▼
┌─────────┐
│ TYPING  │  (0 < word.length < 5)
│  State  │
└────┬────┘
     │ user completes word + fills form
     ▼
┌─────────┐
│  READY  │  (word.length === 5 && formValid)
│  State  │
└────┬────┘
     │ user clicks submit
     ▼
┌──────────┐
│SUBMITTING│  (isSubmitting === true)
│  State   │
└────┬─────┘
     │ API success
     ▼
┌─────────┐
│ SUCCESS │  (submissionStatus === 'success')
│  State  │
└─────────┘
```

**State Transitions:**
1. **Empty** → `word.length === 0` → Button disabled, all fields empty
2. **Typing** → `0 < word.length < 5` → Button disabled, partial input visible
3. **Ready** → `word.length === 5 && formValid` → Button enabled, ready to submit
4. **Submitting** → `isSubmitting === true` → Button loading, prevent interaction
5. **Success** → `submissionStatus === 'success'` → Show confirmation UI

**State Derivation Logic:**
```typescript
// Determine current UI state
const getCurrentUIState = (state: FormState): 'empty' | 'typing' | 'ready' | 'success' => {
  if (state.submissionStatus === 'success') return 'success';
  if (state.word.length === 0) return 'empty';
  if (state.word.length < 5) return 'typing';
  if (state.word.length === 5 && isFormValid(state)) return 'ready';
  return 'empty';
};

// Determine if submit button should be enabled
const isSubmitEnabled = (state: FormState): boolean => {
  return (
    state.word.length === 5 &&
    isFormValid(state) &&
    !state.isSubmitting &&
    state.submissionStatus !== 'success'
  );
};
```

### 3. Key Features to Implement

#### Word Input Component
- **5 individual input boxes** (one per letter)
- **Auto-focus** next box on input
- **Backspace** moves to previous box
- **Turkish character support** (İ, Ğ, Ü, Ş, Ç, Ö)
- **Visual feedback:**
  - Empty: Light gray border (#c0beb0)
  - Filled: Green background (#68a963), white text
- **Validation:**
  - Only letters allowed
  - Turkish alphabet support
  - Exactly 5 letters required

#### User Info Form
- **Name Input:**
  - Placeholder: "Ad Soyad"
  - Required validation
  - Border color changes on focus/fill (#353e45)
  
- **Email Input:**
  - Placeholder: "E-mail"
  - Email format validation
  - Border color changes on focus/fill (#353e45)

#### Submit Button
- **States:**
  - Disabled: opacity-40, grayed out
  - Enabled: full opacity, green background (#a1de6e)
  - Loading: spinner/disabled state
- **Validation:**
  - Only enabled when all fields valid
  - Word must be exactly 5 letters
  - Name and email required

#### Success State UI (State 4)
- **Conditional Rendering:**
  - Only renders when `submissionStatus === 'success'`
  - Replaces form UI completely
  - No form fields visible
- **Grid Display:**
  - Show submitted word in first row (green boxes)
  - Additional empty rows with opacity gradient (70%, 50%, 30%, 10%)
  - Grid layout: 5 columns, 4 rows total
- **Success Message:**
  - Large heading: "Harikasın!" (44px, bold)
  - Subtitle: "Kelimeni sisteme kaydettik." (24px, gray)
  - Additional info: "Kelimen seçilirse..." (12px, gray)
- **Animation:**
  - Fade-in for success message
  - Optional: letter reveal animation in grid
  - Smooth transition from form to success state

### 4. Styling System

**Color Palette:**
- Background: #f3f1e2 (beige)
- Primary Green: #a1de6e
- Success Green: #68a963
- Border Gray: #c0beb0
- Text Gray: #656456, #9c9b8d
- Black: #000000, #151515

**Typography:**
- Headings: Inter Extra Bold
- Body: Inter Regular
- Buttons: Inter Bold/SemiBold
- Logo: Barlow Condensed Bold

**Spacing:**
- Letter boxes: 63x63px (rounded 20px)
- Input fields: 332px width, 20px padding
- Button: 345px width, rounded 52px

### 5. Validation Rules

**Word Validation:**
- Must be exactly 5 characters
- Only Turkish alphabet letters
- No special characters or numbers
- Case-insensitive (convert to uppercase)

**Name Validation:**
- Required field
- Minimum 2 characters
- Allow Turkish characters

**Email Validation:**
- Required field
- Valid email format
- Standard email regex

### 6. API Integration

**Endpoint:** `POST /api/word-submission`

**Request Payload:**
```typescript
{
  word: string;        // "SAYGI"
  name: string;        // "Murat Yıldızaç"
  email: string;       // "murat@bundletheworld.com"
}
```

**Response:**
```typescript
{
  success: boolean;
  message?: string;
  submissionId?: string;
}
```

**Error Handling:**
- Network errors
- Validation errors
- Server errors
- Display user-friendly messages

### 7. User Experience Flow

**State-Based Flow:**
1. **Initial Load** → State 1 (Empty)
   - User sees introduction content
   - All inputs empty
   - Submit button disabled

2. **User Starts Typing** → State 2 (Typing)
   - First letter entered → `word.length = 1`
   - Letter appears in first box with green background
   - Auto-focus moves to next box
   - Submit button remains disabled

3. **User Continues Typing** → State 2 (Typing)
   - More letters entered → `word.length = 2, 3, 4`
   - Filled boxes show green, empty boxes show border
   - Real-time visual feedback
   - Submit button still disabled

4. **User Completes Word** → State 3 (Ready)
   - Fifth letter entered → `word.length = 5`
   - All boxes green
   - User fills name and email
   - Form validation runs
   - Submit button enables when all valid

5. **User Clicks Submit** → Submitting State
   - Button shows loading state
   - API call initiated
   - Form locked (prevent changes)

6. **API Success** → State 4 (Success)
   - Component re-renders with success UI
   - Form inputs hidden
   - Success message displayed
   - Grid shows submitted word
   - Return button visible

7. **User Clicks Return** → Navigation
   - Navigate back to main app/Bundle
   - Component unmounts or resets

### 8. Responsive Considerations

- **Mobile-first design** (current screens are mobile)
- **Viewport:** ~402px width (iPhone size)
- **Touch targets:** Minimum 44x44px
- **Keyboard handling:** Auto-focus management

### 9. Accessibility

- **ARIA labels** for all inputs
- **Keyboard navigation** support
- **Screen reader** friendly
- **Focus indicators** visible
- **Error messages** announced

### 10. Testing Checklist

- [ ] Word input: single letter per box
- [ ] Word input: Turkish character support
- [ ] Word input: backspace navigation
- [ ] Form validation: all fields required
- [ ] Form validation: email format
- [ ] Submit button: disabled states
- [ ] Submit button: enabled when valid
- [ ] API integration: success flow
- [ ] API integration: error handling
- [ ] Success screen: correct word display
- [ ] Navigation: return button functionality
- [ ] Responsive: mobile viewport
- [ ] Accessibility: keyboard navigation
- [ ] Accessibility: screen reader support

---

## Implementation Phases

### Phase 1: Core Components & State Structure
1. Create main component structure with conditional rendering
2. Implement state management hook (useFormState)
3. Set up TypeScript types and interfaces
4. Create Header component (always visible)
5. Basic layout and styling foundation

### Phase 2: Form UI (States 1-3)
1. Implement WordInputGrid component
   - Individual letter boxes
   - Auto-focus logic
   - Backspace handling
2. Implement UserInfoForm component
   - Name and email inputs
   - Border color changes on fill
3. Implement SubmitButton component
   - Disabled/enabled states
   - Loading state
4. Add PromotionalBanner and DescriptionText
5. Connect all components to state

### Phase 3: State Management & Validation
1. Implement word input validation
   - Turkish character support
   - 5-letter requirement
2. Implement form validation logic
   - Name validation
   - Email validation
3. Implement state derivation
   - Calculate currentUIState
   - Calculate submitEnabled
4. Real-time validation feedback

### Phase 4: API Integration & Submission
1. Create API service
2. Implement submission logic
3. Handle loading states (isSubmitting)
4. Error handling and display
5. Success state transition

### Phase 5: Success State UI (State 4)
1. Implement SuccessGrid component
   - Display submitted word
   - Empty boxes with opacity gradient
2. Implement SuccessMessage component
   - Success heading and messages
3. Implement ReturnButton
4. Add state transition animations
5. Conditional rendering logic

### Phase 6: Polish & Testing
1. Refine styling across all states
2. Add smooth transitions between states
3. Keyboard handling improvements
4. Accessibility improvements
5. Comprehensive testing:
   - State transitions
   - Validation logic
   - API integration
   - Error scenarios
   - Turkish character support

---

## Implementation Notes

### Architecture
- **Single Component:** This is one component with 4 UI states, not 4 separate screens
- **State-Driven Rendering:** UI changes based on `word.length`, `formValid`, and `submissionStatus`
- **Conditional Rendering:** Use ternary or switch to render form vs. success UI
- **No Routing:** All states exist within the same component tree

### Component Behavior
- **Header:** Always visible across all states
- **Promotional Banner:** Visible in states 1-3, hidden in state 4
- **Form Fields:** Visible in states 1-3, hidden in state 4
- **Success UI:** Only visible in state 4

### Key Implementation Details
- **Word Input:** Individual boxes (not single input field) for better UX
- **Auto-focus:** Automatically move focus to next box on input
- **Backspace:** Move to previous box and clear on backspace
- **Turkish Support:** Critical - support İ, Ğ, Ü, Ş, Ç, Ö characters
- **Real-time Validation:** Validate as user types, not just on submit
- **Visual Feedback:** Immediate color changes (gray → green) on input

### Design System
- **Colors:** Beige background (#f3f1e2), green accents (#a1de6e, #68a963)
- **Typography:** Inter for body, Barlow Condensed for logo
- **Spacing:** 63x63px letter boxes, 20px border-radius throughout
- **States:** Opacity-40 for disabled, full opacity for enabled

### State Management Best Practices
- **Single Source of Truth:** All state in one place (useFormState hook)
- **Derived State:** Compute UI state from core state values
- **Immutable Updates:** Use functional updates for state changes
- **Type Safety:** Strong TypeScript types for all state values

