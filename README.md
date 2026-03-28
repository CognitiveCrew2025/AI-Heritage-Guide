# AI-Heritage-Guide
"AI heritage guide that narrates the stories, culture, and history of Indian monuments in an engaging, human-like way to bring Indian historical sites to life."

# Advanced Features Implementation Plan

This document outlines the proposed updates to the AI Heritage Guide to fulfill the advanced UI, response adaptation, and feedback requirements.

## Proposed Changes

### 1. User Profile Setup (Age Group)
- **`index.html`**: I will add an age-group selector dropdown (Child, Teen, Adult) directly on the Landing Screen above the "Start Exploring" button. This forces the user to choose their age group before interacting with the guide.

### 2. Age-Based Response Adaptation
- **`script.js`**: I will implement the requested `adaptResponseByAge(response, ageGroup)` function. Because we are simulating the AI, this function will modify the base sentences to fit the persona:
  - **Child**: Add emojis (`🏰`, `👑`), simplify words ("built" -> "made"), short sentences.
  - **Teen**: Add casual slang/phrases ("basically", "it's like"), relatable tone.
  - **Adult**: Keep the professional, detailed, long-form history tone.
- The age parameter will be pulled from the user's initial selection on the Landing Screen.

### 3. Confidence Score Updates
- Modify the existing fallback text logic for "Low" confidence to state exactly: *"This response may be incomplete. Showing verified info recommended."* as requested. Length thresholds remain the same.

### 4. Human Feedback Loop
- **`index.html`** & **`script.js`**: Update the message meta container. Instead of just a "Report Issue" button, I will render a button group containing:
  - `[👍 Helpful]`
  - `[👎 Not Helpful]`
  - `[🚩 Report Issue]`
- When any are clicked, it will update a global `feedbackData` array and show an `alert("Thanks for your feedback!")`.

### 5. Learning from Feedback (Regeneration)
- **`script.js`**: I will add logic to the `[👎 Not Helpful]` button's event listener. When clicked, it will:
   1. Disable all feedback buttons.
   2. Simulate network delay (with a small localized typing indicator or loading text if desired).
   3. Append an *"Improved Answer: [Longer, simpler version of the text]"* block directly inside the existing `.message-content` div below the original bubble.

### 6. UI Refinements
- **`style.css`**: Create clean styles for the new feedback action bar, ensuring the buttons don't clutter the chat, mimicking modern chatbot interfaces (e.g. ChatGPT, Claude). Add styling for the `improved-answer` container to make it distinct.

## Open Questions
- > [!IMPORTANT]
  > Since I am simulating an AI backend, the "Improved Answer" regeneration will be a hardcoded extended version of the current response. Is this simulation acceptable?
- Do you want the intro message to also be dynamically regenerated based on their Age selection, or should it remain a static default?

## Verification Plan
1. Launch the app in the browser.
2. Select an Age Group on the Landing Page and click Start.
3. Verify that the bot intro message or first response matches the selected age demographic (e.g. emojis for Child).
4. Click `👎 Not Helpful` on a response to verify that the "Improved Answer" generates dynamically.
5. Verify the Confidence Score thresholds apply correctly to these modified length strings.
