# AI-Heritage-Guide
"AI heritage guide that narrates the stories, culture, and history of Indian monuments in an engaging, human-like way to bring Indian historical sites to life."

# Guide Mode Implementation Plan

This document outlines the proposed updates to introduce an immersive "Guide Mode" to the AI Heritage Guide.

## Proposed Changes

### 1. UI Additions (index.html & style.css)
- **Guide Mode Toggle Button**: I will add a prominent **"Activate Guide Mode"** toggle button right above the chat input area (near the suggested questions).
- **Styling**: The button will have a distinct styling (perhaps a soft green gradient) to indicate it's a special feature.
- **Dynamic Suggested Chips**: In Guide Mode, the suggested questions will dynamically swap to be a list of the available monuments (e.g. "Khajuraho Temples", "Sanchi Stupa").

### 2. State Management (script.js)
- **New State Variables**: Introduce `let isGuideMode = false;` and `let guideStep = 0;` to track conversational flow.
- **Activation Flow**: 
  - When the user activates Guide Mode, the chat will automatically push a greeting message: *"Welcome to Guide Mode! I am your professional tour guide. Which monument would you like to explore today?"*
  - The suggested chips will update to the names of the monuments.

### 3. Guide Mode Chat Logic (script.js)
- **Storytelling Prompt**: I will simulate the construction of the requested `guidePrompt` behind the scenes, ensuring the backend prompt structure matches your exact specifications.
- **Narrating the Story**: When a user selects or types a monument in Guide Mode, the bot will bypass standard Q&As. Instead, it will use the `monuments` array to generate a **storytelling response**. This response will:
  - Have a simulated "Hook" (e.g., "Prepare to be amazed...").
  - Merge the monument's `description` and `story`.
  - Pass through the previously built `adaptResponseByAge` to ensure the tone fits the user (Child/Teen/Adult).
  - Show the chosen `Confidence` rating (which should be "High" for long stories).
- **The "Winning Edge" Prompt**: At the end of every story response, the bot will append: *"Do you want more details or next monument?"*
  - If they say "more details", it will append generic expanded lore.
  - If they say "next monument", the suggested chips reset to the monument list for a new selection.

## Open Questions
- > [!IMPORTANT]
  > Because there isn't a live AI processing the `guidePrompt`, I will be strictly hardcoding the simulated response generation to piece together the hooks, the `description`/`story` properties, and the final prompt *"Do you want more details or next monument?"*. Are you perfectly fine with this robust Javascript simulation to demonstrate the requested logic?

## Verification Plan
1. Test switching Guide Mode ON and OFF via the UI.
2. Verify the initial Guide Greeting prompts the user to select from the monuments list.
3. Validate that selecting a monument generates a long, formatted storytelling narrative.
4. Verify the narrative adapts to the Age and properly asks if you want more details or the next monument.
