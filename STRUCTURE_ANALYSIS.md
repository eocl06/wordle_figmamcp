# Wordle Mix - Structure Analysis

## Screen Flow Diagram

```
┌─────────────────────────────────────┐
│   Screen 1: Initial Form (Empty)   │
│   - Empty word boxes                │
│   - Empty name/email fields         │
│   - Disabled submit button          │
└──────────────┬──────────────────────┘
               │ User starts typing
               ▼
┌─────────────────────────────────────┐
│   Screen 2: Partial Input           │
│   - Word: "SA" (2/5 letters)        │
│   - Empty name/email fields         │
│   - Disabled submit button          │
└──────────────┬──────────────────────┘
               │ User completes form
               ▼
┌─────────────────────────────────────┐
│   Screen 3: Complete Form           │
│   - Word: "SAYGI" (5/5 letters)     │
│   - Name: "Murat Yıldızaç"          │
│   - Email: "murat@bundletheworld.com"│
│   - Enabled submit button            │
└──────────────┬──────────────────────┘
               │ User submits
               ▼
┌─────────────────────────────────────┐
│   Screen 4: Success Screen          │
│   - Grid showing "SAYGI"            │
│   - Success message                 │
│   - "Bundle'a Dön" button           │
└─────────────────────────────────────┘
```

## Component Hierarchy

```
WordSubmissionForm (Main Container)
│
├── Header
│   ├── StatusBar (iPhone status bar)
│   ├── Logo (Wordle Mix logo)
│   └── ShareButton
│
├── Content
│   ├── Title ("Bundle Games'e yeni oyun: Wordle Mix")
│   │
│   ├── PromotionalBanner
│   │   ├── Logo
│   │   ├── Description Text
│   │   └── GamePreviewMockup (iPhone mockup)
│   │
│   ├── DescriptionSection
│   │   └── Paragraphs (with bold text)
│   │
│   ├── WordInputSection
│   │   ├── Label ("5 Harfli Kelime Önerini Gir:")
│   │   └── WordInputGrid
│   │       ├── LetterBox[0] (S)
│   │       ├── LetterBox[1] (A)
│   │       ├── LetterBox[2] (Y)
│   │       ├── LetterBox[3] (G)
│   │       └── LetterBox[4] (I)
│   │
│   ├── UserInfoSection
│   │   ├── Label ("Bilgilerin:")
│   │   ├── NameInput
│   │   └── EmailInput
│   │
│   ├── Disclaimer
│   │   └── Small gray text
│   │
│   └── SubmitButton
│       └── "Gönder" (disabled/enabled states)
│
└── SuccessScreen (Conditional)
    ├── Header (same as above)
    ├── WordGrid
    │   ├── Row 1: [S][A][Y][G][I] (green)
    │   ├── Row 2: [ ][ ][ ][ ][ ] (empty, 70% opacity)
    │   ├── Row 3: [ ][ ][ ][ ][ ] (empty, 50% opacity)
    │   └── Row 4: [ ][ ][ ][ ][ ] (empty, 30% opacity)
    ├── SuccessMessage
    │   ├── Heading ("Harikasın!")
    │   ├── Subtitle ("Kelimeni sisteme kaydettik.")
    │   └── Info ("Kelimen seçilirse...")
    └── ReturnButton ("Bundle'a Dön")
```

## State Machine

```
┌─────────┐
│ INITIAL │ (Empty form)
└────┬────┘
     │
     │ user types letters
     ▼
┌─────────┐
│ PARTIAL │ (Some letters entered)
└────┬────┘
     │
     │ user completes all fields
     ▼
┌──────────┐
│ COMPLETE │ (All fields valid)
└────┬─────┘
     │
     │ user clicks submit
     ▼
┌────────────┐
│ SUBMITTING │ (API call in progress)
└────┬───────┘
     │
     │ API success
     ▼
┌─────────┐
│ SUCCESS │ (Show confirmation)
└─────────┘
```

## Key Design Patterns

### 1. Letter Input Pattern
- **Individual boxes** instead of single input
- **Auto-advance** to next box on input
- **Backspace** moves to previous box
- **Visual state:** Empty (border) → Filled (green bg)

### 2. Form Validation Pattern
- **Real-time validation** as user types
- **Visual feedback:** Border color changes
- **Button state:** Disabled until all valid
- **Error messages:** Inline or below fields

### 3. State Management Pattern
- **Single source of truth** for form state
- **Derived states** for button enable/disable
- **Conditional rendering** for success screen
- **Optimistic updates** during submission

### 4. Visual Feedback Pattern
- **Color coding:** Green = success/filled
- **Opacity:** Disabled states use opacity-40
- **Borders:** Gray when empty, darker when filled
- **Typography:** Bold for emphasis, gray for secondary

## Data Flow

```
User Input
    │
    ▼
Component State (useState)
    │
    ▼
Validation Logic (useFormValidation)
    │
    ├── Valid ──► Enable Submit Button
    │
    └── Invalid ──► Show Errors, Disable Button
            │
            ▼
    User Clicks Submit
            │
            ▼
    API Call (useFormSubmission)
            │
            ├── Success ──► Show Success Screen
            │
            └── Error ──► Show Error Message
```

## Responsive Breakpoints

- **Mobile:** 375px - 414px (iPhone sizes)
- **Current Design:** ~402px width
- **Touch Targets:** Minimum 44x44px (iOS guidelines)
- **Letter Boxes:** 63x63px (comfortable touch size)

## Color Usage

| Color | Hex | Usage |
|-------|-----|-------|
| Background | #f3f1e2 | Main background |
| Primary Green | #a1de6e | Buttons, accents |
| Success Green | #68a963 | Filled letter boxes |
| Border Gray | #c0beb0 | Input borders (empty) |
| Border Dark | #353e45 | Input borders (filled) |
| Text Primary | #151515 | Main text |
| Text Secondary | #656456 | Secondary text |
| Text Tertiary | #9c9b8d | Disclaimers |

## Typography Scale

| Element | Font | Size | Weight |
|---------|------|------|--------|
| Main Title | Inter | 30px | Extra Bold |
| Section Labels | Inter | 12px | Extra Bold |
| Body Text | Inter | 14px | Regular |
| Button Text | Inter | 17px | Bold |
| Success Heading | Inter | 44px | Bold |
| Success Subtitle | Inter | 24px | Regular |
| Disclaimer | Inter | 12px | Regular |

## Spacing System

- **Container Padding:** 36px horizontal
- **Section Gaps:** ~100-150px vertical
- **Input Padding:** 20px internal
- **Button Padding:** 9px vertical, 79px horizontal
- **Letter Box Gap:** 4px between boxes
- **Grid Gap:** 3.6px (success screen)

## Animation Considerations

1. **Letter Input:**
   - Smooth focus transition
   - Optional: letter appear animation

2. **Form Submission:**
   - Button loading state
   - Success screen fade-in

3. **Success Screen:**
   - Grid reveal animation
   - Optional: letter-by-letter reveal

4. **State Transitions:**
   - Smooth opacity changes
   - Button enable/disable transitions

