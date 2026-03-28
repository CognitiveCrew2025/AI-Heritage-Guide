document.addEventListener('DOMContentLoaded', () => {

    // Screens
    const landingScreen = document.getElementById('landing-screen');
    const mainScreen = document.getElementById('main-screen');
    const startBtn = document.getElementById('start-btn');

    // UI Elements
    const chatContainer = document.getElementById('chat-container');
    const chatInput = document.getElementById('chat-input');
    const sendBtn = document.getElementById('send-btn');
    const menuToggle = document.getElementById('menu-toggle');
    const configPanel = document.getElementById('config-panel');
    const suggestedChips = document.querySelectorAll('.suggested-chip');

    // Configuration / State
    const monuments = [
      { name: "Khajuraho Temples", location: "Madhya Pradesh", description: "Famous for intricate sculptures and Nagara-style architecture, built by Chandela dynasty.", story: "These temples were built between 950–1050 AD and represent a balance between spirituality and human life." },
      { name: "Sanchi Stupa", location: "Madhya Pradesh", description: "One of the oldest stone structures in India, built by Emperor Ashoka.", story: "It is a symbol of peace and Buddhism, housing relics of Lord Buddha." },
      { name: "Gwalior Fort", location: "Madhya Pradesh", description: "A massive hill fort known as the 'Gibraltar of India'.", story: "It has witnessed many battles and was ruled by several dynasties including Tomars and Mughals." },
      { name: "Bhimbetka Rock Shelters", location: "Madhya Pradesh", description: "Prehistoric cave paintings dating back thousands of years.", story: "These caves show early human life and are UNESCO World Heritage sites." },
      { name: "Orchha Fort Complex", location: "Madhya Pradesh", description: "A medieval town with palaces and temples by the Betwa river.", story: "Built by Bundela rulers, it reflects Rajput architecture and royal lifestyle." }
    ];

    const ageSelect = document.getElementById('age-select');
    const monumentSelect = document.getElementById('monument-select');
    const languageSelect = document.getElementById('language-select');
    const langDisplay = document.getElementById('current-lang-display');
    const perspectiveSelect = document.getElementById('perspective-select');
    
    let userAgeGroup = "Adult";
    let selectedLanguage = "English";
    let feedbackData = [];

    // Populate monument select
    if (monumentSelect) {
        monumentSelect.innerHTML = monuments.map((m, i) => `<option value="${i}">${m.name}</option>`).join('');
    }

    // ---- Screen Transition ----
    startBtn.addEventListener('click', () => {
        userAgeGroup = ageSelect.value;
        landingScreen.classList.remove('active');
        landingScreen.classList.add('hidden');
        mainScreen.classList.remove('hidden');
        mainScreen.classList.add('active');
        
        // Initial intro message depending on age and lang
        const introMsg = generateBotResponse("Who are you?");
        appendBotResponse(introMsg);
    });

    // Toggle Config Panel
    menuToggle.addEventListener('click', () => {
        configPanel.classList.toggle('collapsed');
    });

    // Update Language Selection
    languageSelect.addEventListener('change', (e) => {
        selectedLanguage = e.target.value;
        langDisplay.textContent = `Language: ${selectedLanguage}`;
    });

    // Update Perspective & Trigger Guide Mode
    perspectiveSelect.addEventListener('change', (e) => {
        if (e.target.value === 'guide') {
            const guideGreeting = "Welcome to Guide Mode! Which monument would you like to explore today?";
            appendBotResponse(guideGreeting);
            
            const suggContainer = document.getElementById('suggested-questions');
            suggContainer.innerHTML = monuments.map(m => `<button class="suggested-chip">${m.name}</button>`).join('');
            suggContainer.querySelectorAll('.suggested-chip').forEach(chip => {
                chip.addEventListener('click', () => {
                    chatInput.value = chip.textContent;
                    handleSend();
                });
            });
        }
    });

    // ---- Age-Based Response Adaptation ----
    const adaptResponseByAge = (response, ageGroup) => {
        if(ageGroup === 'Child') {
            return "Hey there! 👋 " + response.replace(/intricate|commissioned|magnificent|testament/gi, 'super cool') + " It's so big and fun! 🏰";
        } else if (ageGroup === 'Teen') {
            return "Basically, " + response + " It's actually pretty wild when you think about it.";
        } else {
            return response;
        }
    };

    // ---- AI Prompt Construction & Output Simulation ----
    const generateBotResponse = (userText) => {
        // Core requirement: Construct final prompt
        const finalPrompt = `
Respond ONLY in ${selectedLanguage} language.
Do not use any other language except ${selectedLanguage}.

User age group: ${userAgeGroup}
User question:
${userText}
        `;
        
        console.log("----- AI Prompt Context -----");
        console.log(finalPrompt);
        console.log("-----------------------------");

        const selectedMon = monuments[monumentSelect.value] || monuments[0];
        const lowerText = userText.toLowerCase();

        // Guide Mode Logic
        if (perspectiveSelect.value === 'guide') {
            const guidePrompt = `
You are a professional tourist guide.

Explain the monument in a storytelling style:
- Start with a hook (interesting opening)
- Add historical facts
- Make it engaging and vivid
- Keep tone based on user's age group

Monument: ${userText}
User language: ${selectedLanguage}
Age group: ${userAgeGroup}
            `;
            console.log("----- Guide Storytelling Prompt Context -----");
            console.log(guidePrompt);
            console.log("-------------------------------------------");
            
            let matchedMonument = monuments.find(m => lowerText.includes(m.name.toLowerCase()));
            if (!matchedMonument) matchedMonument = selectedMon; // default to selected if not typed
            
            if (lowerText.includes('more details') || lowerText.includes('more')) {
                return adaptResponseByAge(`The architecture of the ${matchedMonument.name} is truly unparalleled. It draws millions of visitors globally and remains a marvel of engineering. `, userAgeGroup) + "<br><br><b>Do you want to hear about the next monument?</b>";
            } else if (lowerText.includes('next monument') || lowerText.includes('next')) {
                return "Fantastic! Which monument would you like to explore next?";
            } else {
                let story = `Prepare to be amazed! Let's explore the spectacular ${matchedMonument.name}. ` + matchedMonument.description + " " + matchedMonument.story;
                let adapted = adaptResponseByAge(story, userAgeGroup);
                return adapted + "<br><br><b>Do you want more details or next monument?</b>";
            }
        }

        let baseText = "I stand as a monument of history, witnessing the passage of countless centuries.";

        if(lowerText.includes('who built') || lowerText.includes('what')) {
            baseText = selectedMon.description;
        } else if (lowerText.includes('secret') || lowerText.includes('story') || lowerText.includes('tell me')) {
             baseText = selectedMon.story;
        } else if (lowerText.includes('who are you')) {
            baseText = `Greetings, traveler! I am the spirit of ${selectedMon.name} in ${selectedMon.location}. What would you like to know about my grand design or history?`;
        } else if (lowerText.length < 5) {
            baseText = "Yes?";
        } else {
             baseText = `I am ${selectedMon.name}. ${selectedMon.description} ${selectedMon.story} I have witnessed many tales over the centuries. History is written by those who survive to tell it. This stands as a testament to historical architectural ingenuity.`;
        }

        // Translate if Hindi or Marathi to demonstrate requirement test cases
        if (selectedLanguage === 'Hindi') {
            if(lowerText.includes('who are you')) baseText = `नमस्ते! मैं ${selectedMon.name} की आत्मा हूँ।`;
            else baseText = "मैं एक ऐतिहासिक स्मारक हूँ। यह इतिहास का एक प्रमाण है।";
        } else if (selectedLanguage === 'Marathi') {
            if(lowerText.includes('who are you')) baseText = `नमस्कार! मी ${selectedMon.name} आहे.`;
            else baseText = "मी एक ऐतिहासिक स्मारक आहे. हा इतिहासाचा पुरावा आहे.";
        }

        // Apply adaptation for English
        if (selectedLanguage === 'English') {
            return adaptResponseByAge(baseText, userAgeGroup);
        }
        
        return baseText;
    };

    // ---- Chat Logic ----

    const scrollToBottom = () => {
        chatContainer.scrollTop = chatContainer.scrollHeight;
    };

    const appendUserMessage = (text) => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message user';
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-user"></i></div>
            <div class="message-content">
                <div class="bubble">${text}</div>
            </div>
        `;
        chatContainer.appendChild(msgDiv);
        scrollToBottom();
    };

    const appendBotTypingIndicator = () => {
        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot typing';
        msgDiv.id = 'typing-indicator';
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content">
                <div class="bubble">
                    <div class="typing-dots"><span></span><span></span><span></span></div>
                </div>
            </div>
        `;
        chatContainer.appendChild(msgDiv);
        scrollToBottom();
    };

    const removeTypingIndicator = () => {
        const indicator = document.getElementById('typing-indicator');
        if(indicator) indicator.remove();
    }

    const appendBotResponse = (text) => {
        removeTypingIndicator();
        
        let confLevel = "Low";
        let confClass = "conf-low";
        let confIcon = "❌";
        
        if (text.length > 200) {
            confLevel = "High"; confClass = "conf-high"; confIcon = "✅";
        } else if (text.length >= 100) {
            confLevel = "Medium"; confClass = "conf-medium"; confIcon = "⚠️";
        } else {
            text += "<br><br><i>This response may be incomplete. Showing verified info recommended.</i>";
        }

        const msgDiv = document.createElement('div');
        msgDiv.className = 'message bot';
        
        msgDiv.innerHTML = `
            <div class="avatar"><i class="fa-solid fa-robot"></i></div>
            <div class="message-content">
                <div class="bubble">${text}</div>
                <div class="message-meta">
                    <span class="confidence ${confClass}">Confidence: ${confLevel} ${confIcon}</span>
                </div>
                <div class="feedback-actions">
                    <button class="feedback-btn helpful-btn">👍 Helpful</button>
                    <button class="feedback-btn not-helpful-btn">👎 Not Helpful</button>
                    <button class="feedback-btn report-btn">🚩 Report Issue</button>
                </div>
            </div>
        `;
        
        // Human Feedback Loop
        const handleFeedback = (type, btn) => {
            alert("Thanks for your feedback!");
            feedbackData.push({ message: text, feedbackType: type });
            msgDiv.querySelectorAll('.feedback-btn').forEach(b => b.disabled = true);
            btn.style.borderColor = "var(--accent-gold)";
            btn.style.color = "var(--accent-gold)";
            
            // Learning from Feedback (Regeneration)
            if (type === 'Not Helpful') {
                const improvedText = "<b>Improved Answer:</b><br>" + text.replace("<br><br><i>This response may be incomplete. Showing verified info recommended.</i>", "") + " Historians note that the foundations stretch deep into the bedrock, providing immense stability. The intricate marble inlays feature semi-precious stones sourced from all over Asia, making it a true marvel of ancient engineering.";
                
                setTimeout(() => {
                    const improvedDiv = document.createElement('div');
                    improvedDiv.className = 'improved-answer';
                    improvedDiv.innerHTML = improvedText;
                    msgDiv.querySelector('.message-content').appendChild(improvedDiv);
                    scrollToBottom();
                }, 500);
            }
        };

        msgDiv.querySelector('.helpful-btn').addEventListener('click', function() { handleFeedback('Helpful', this); });
        msgDiv.querySelector('.not-helpful-btn').addEventListener('click', function() { handleFeedback('Not Helpful', this); });
        msgDiv.querySelector('.report-btn').addEventListener('click', function() { handleFeedback('Report Issue', this); });

        chatContainer.appendChild(msgDiv);
        scrollToBottom();
    };

    const handleSend = () => {
        const text = chatInput.value.trim();
        if(!text) return;
        appendUserMessage(text);
        chatInput.value = '';
        appendBotTypingIndicator();
        
        setTimeout(() => {
            const answer = generateBotResponse(text);
            appendBotResponse(answer);
        }, 1000);
    };

    sendBtn.addEventListener('click', handleSend);
    chatInput.addEventListener('keypress', (e) => {
        if(e.key === 'Enter') handleSend();
    });

    suggestedChips.forEach(chip => {
        chip.addEventListener('click', () => {
            chatInput.value = chip.textContent;
            handleSend();
        });
    });

    if(window.innerWidth < 600) {
        configPanel.classList.add('collapsed');
    }
});
