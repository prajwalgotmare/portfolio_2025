document.addEventListener('DOMContentLoaded', () => {
    const chatbotIcon = document.getElementById('chatbot-icon');
    const chatbotWindow = document.getElementById('chatbot-window');
    const closeChatbotButton = document.getElementById('close-chatbot');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendButton = document.getElementById('chatbot-send');

    let chatbotOpen = false;

    // --- Audio Elements ---
    // IMPORTANT: Create an 'audio' folder in your project root (e.g., portfolio_2025/audio/)
    // Place your MP3 files there and update these paths if necessary.
    const openSound = new Audio('audio/walle.mp3'); // Path to your open sound
    const closeSound = new Audio('audio/walle.mp3'); // Path to your close sound

    // Optional: Adjust volume (0.0 to 1.0)
    // openSound.volume = 0.3;
    // closeSound.volume = 0.3;


    // --- Chatbot Data & Logic ---
    // ***** CUSTOMIZE THIS SECTION THOROUGHLY *****
    const botResponses = {
        // Keywords should be lowercase
        keywords: {
            "hello": "Hello! I'm Prajwal's assistant. How can I help you learn about him today? You can ask about his experience, skills, projects, education, or how to contact him.",
            "hi": "Hi there! Ask me anything about Prajwal's profile.",
            "hey": "Hey! I can tell you about Prajwal's skills, projects, and more.",
            "experience": "Prajwal has over 5 years of experience as a Software/AI Engineer, focusing on NLP, chatbots, and predictive platforms. You can find more details in the <a href='#experience' class='chat-link' onclick='closeChatbotAndScroll(\"#experience\")'>Work Experience</a> section.",
            "work": "Prajwal's work experience includes roles at Klizer (DCKAP), Techno Exponent, and SHEYNA TECH. See the <a href='#experience' class='chat-link' onclick='closeChatbotAndScroll(\"#experience\")'>Work Experience</a> section for specifics.",
            "skill": "He's proficient in Python, LLMs (OpenAI, Langchain), AWS, and various data science tools. Check out the <a href='#skills' class='chat-link' onclick='closeChatbotAndScroll(\"#skills\")'>Skills & Technologies</a> section for a full list.",
            "technolog": "Prajwal's tech stack includes AI/ML tools like OpenAI API and Langchain, programming languages like Python, and cloud platforms like AWS. More at <a href='#skills' class='chat-link' onclick='closeChatbotAndScroll(\"#skills\")'>Skills & Technologies</a>.",
            "project": "Prajwal has worked on projects like a Demand Forecasting Platform, a Sanskrit Teaching Bot, and a Caller Support Bot. See his <a href='#projects' class='chat-link' onclick='closeChatbotAndScroll(\"#projects\")'>Projects</a> for more.",
            "education": "He holds a Bachelor of Engineering from Savitribai Phule Pune University. More info in the <a href='#education' class='chat-link' onclick='closeChatbotAndScroll(\"#education\")'>Education</a> section.",
            "degree": "Prajwal earned his Bachelor of Engineering from Savitribai Phule Pune University. Check the <a href='#education' class='chat-link' onclick='closeChatbotAndScroll(\"#education\")'>Education</a> part.",
            "contact": "You can reach Prajwal via email (prajwalvgotmare@gmail.com) or phone (+91 8446745883). All details are in the <a href='#contact' class='chat-link' onclick='closeChatbotAndScroll(\"#contact\")'>Get In Touch</a> section.",
            "email": "Prajwal's email is prajwalvgotmare@gmail.com. Also found in the <a href='#contact' class='chat-link' onclick='closeChatbotAndScroll(\"#contact\")'>Contact</a> section.",
            "phone": "Prajwal's phone number is +91 8446745883. See the <a href='#contact' class='chat-link' onclick='closeChatbotAndScroll(\"#contact\")'>Contact</a> section.",
            "resume": "You can view or download Prajwal's resume <a href='https://drive.google.com/file/d/1KjlcGNL-EDMPTWXIxDGkJhfdT5SMzwf1/view?usp=sharing' target='_blank' class='chat-link' onclick='closeChatbotWindow()'>here</a>. **UPDATE THIS LINK!**",
            "cv": "Prajwal's CV (resume) is available <a href='https://drive.google.com/file/d/1KjlcGNL-EDMPTWXIxDGkJhfdT5SMzwf1/view?usp=sharing' target='_blank' class='chat-link' onclick='closeChatbotWindow()'>here</a>. **UPDATE THIS LINK!**",
            "name": "This is the portfolio of Prajwal Gotmare, an AI Engineer.",
            "about": "Prajwal is an AI Engineer passionate about leveraging AI to solve complex problems. Read more <a href='#about-heading' class='chat-link' onclick='closeChatbotAndScroll(\"#about-heading\")'>About Him</a>.",
            "who are you": "I'm a friendly bot assistant here to help you learn about Prajwal Gotmare.",
            "what can you do": "I can provide information about Prajwal's experience, skills, projects, education, and contact details. Just ask!",
            "bye": "Goodbye! Feel free to explore the rest of the portfolio.",
            "thank you": "You're welcome! Let me know if you have other questions."
        },
        default: "I'm sorry, I'm not sure how to answer that. Try asking about 'experience', 'skills', 'projects', 'education', or 'contact details'.",
        greeting: "Hello! I'm Prajwal's assistant. How can I help you learn about him today?"
    };
    // ***** END OF CUSTOMIZATION SECTION *****


    function addMessageToChat(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chat-message', sender);
        if (sender === 'user') {
            messageElement.textContent = message;
        } else {
            messageElement.innerHTML = message; // Allow HTML for bot links
        }
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight; // Auto-scroll
    }

    function getBotResponse(userInput) {
        const lowerInput = userInput.toLowerCase().trim();
        let bestMatchKey = null;
        let highestMatchLength = 0;

        if (lowerInput === "") return null; // No input

        for (const keyword in botResponses.keywords) {
            if (lowerInput.includes(keyword)) {
                if (keyword.length > highestMatchLength) {
                    highestMatchLength = keyword.length;
                    bestMatchKey = keyword;
                }
            }
        }

        if (bestMatchKey) {
            return botResponses.keywords[bestMatchKey];
        }
        return botResponses.default;
    }

    function handleUserInput() {
        const userInput = chatbotInput.value.trim();
        if (userInput === "") return;

        addMessageToChat(userInput, 'user');
        chatbotInput.value = ""; // Clear input

        setTimeout(() => {
            const response = getBotResponse(userInput);
            if (response) {
                addMessageToChat(response, 'bot');
            }
        }, 500);
    }

    // --- Event Listeners ---
    if (chatbotIcon) {
        chatbotIcon.addEventListener('click', toggleChatbot);
        chatbotIcon.addEventListener('keypress', (e) => { if (e.key === 'Enter' || e.key === ' ') toggleChatbot(); });
    }

    if (closeChatbotButton) {
        closeChatbotButton.addEventListener('click', closeChatbotWindow);
    }

    if (chatbotSendButton) {
        chatbotSendButton.addEventListener('click', handleUserInput);
    }

    if (chatbotInput) {
        chatbotInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                handleUserInput();
            }
        });
    }

    // --- Utility Functions ---
    function playSound(sound) {
        sound.currentTime = 0;
        sound.play().catch(error => {
            console.warn("Audio play prevented by browser:", error);
            // User might need to interact with the page first for sounds to play.
        });
    }

    function toggleChatbot() {
        chatbotOpen = !chatbotOpen;
        if (chatbotOpen) {
            chatbotWindow.classList.remove('hidden');
            // chatbotIcon.style.display = 'none'; // Icon remains visible
            playSound(openSound);
            if (chatbotMessages.children.length === 0 ||
                (chatbotMessages.lastChild && chatbotMessages.lastChild.classList.contains('user'))) {
                addMessageToChat(botResponses.greeting, 'bot');
            }
            chatbotInput.focus();
        } else {
            chatbotWindow.classList.add('hidden');
            // chatbotIcon.style.display = 'flex'; // Icon display managed by CSS and initial JS
            playSound(closeSound);
        }
    }

    function closeChatbotWindow() {
        if (chatbotOpen) { // Only play sound if it was open
            playSound(closeSound);
        }
        chatbotOpen = false;
        chatbotWindow.classList.add('hidden');
        // chatbotIcon.style.display = 'flex'; // Icon display managed by CSS and initial JS
    }

    window.closeChatbotAndScroll = (targetSelector) => {
        closeChatbotWindow();
        const targetElement = document.querySelector(targetSelector);
        if (targetElement) {
             const headerOffset = document.querySelector('header')?.offsetHeight || 65;
             const elementPosition = targetElement.getBoundingClientRect().top;
             const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
             window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
        }
    };
    window.closeChatbotWindow = closeChatbotWindow;

    // Initial state: chatbot is hidden, icon is visible
    if (chatbotWindow) chatbotWindow.classList.add('hidden');
    if (chatbotIcon) chatbotIcon.style.display = 'flex'; // Ensure icon is 'flex' from the start

});