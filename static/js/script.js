class ChatHandler {
    constructor() {
        this.chatMessages = document.getElementById('chat-messages');
        this.userInput = document.getElementById('user-message');
        this.sendButton = document.getElementById('send-btn');
        this.recommendBtn = document.getElementById('recommend-btn');
        
        this.bindEvents();
    }

    bindEvents() {
        this.sendButton.addEventListener('click', () => this.sendMessage());
        this.userInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') this.sendMessage();
        });
        this.recommendBtn.addEventListener('click', () => this.getRecommendation());
    }

    async sendMessage() {
        const message = this.userInput.value.trim();
        if (!message) return;

        // Add user message
        this.addMessage(message, 'user');
        this.userInput.value = '';

        try {
            // Make API call to backend
            const response = await fetch('/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ message: message })
            });

            const data = await response.json();
            
            // Add bot response from backend
            this.addMessage(data.response, 'bot');
        } catch (error) {
            console.error('Error sending message:', error);
            this.addMessage('Sorry, I encountered an error. Please try again.', 'bot');
        }
    }

    addMessage(text, sender) {
        const messageDiv = document.createElement('div');
        messageDiv.className = `message ${sender}-message`;
        messageDiv.innerHTML = `
            <span class="avatar">${sender === 'user' ? '👤' : '🤖'}</span>
            <span class="message-text">${text}</span>
        `;
        this.chatMessages.appendChild(messageDiv);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
    }

    getRecommendation() {
        const recommendation = document.getElementById('recommendation');
        const styleName = document.getElementById('style-name');
        const styleDesc = document.getElementById('style-description');
        const styleConf = document.getElementById('style-confidence');
        const styleElements = document.getElementById('style-elements');

        // Get current style selections
        const model = window.characterModel;
        const styles = {
            hair: model.currentHairstyle,
            hairColor: model.hairColor,
            clothing: model.currentClothing,
            clothesColor: model.clothesColor
        };

        // Generate recommendation based on selections
        // Update the styleRecommendations object in your script
        const styleRecommendations = {
            casual: {
                name: "Everyday Comfort",
                description: "Simple, comfortable clothes perfect for daily activities.",
                elements: ["Easy-to-wear clothes", "Simple colors", "Basic accessories"]
            },
            formal: {
                name: "Professional Look",
                description: "Clean, neat appearance for work and formal events.",
                elements: ["Well-fitted clothes", "Basic dark colors", "Simple jewelry"]
            },
            dress: {
                name: "Special Occasion",
                description: "Eye-catching outfit for parties and events.",
                elements: ["Loose, comfortable fit", "Bright, pretty colors", "Standout accessories"]
            },
            sporty: {
                name: "Active Style",
                description: "Comfortable clothes perfect for movement and sports.",
                elements: ["Stretchy, comfortable material", "Bright, fun colors", "Easy-to-move-in design"]
            },
            witch: {
                // This style exists in clothes but not in hairstyles
            }
        };

        const currentStyle = styleRecommendations[styles.clothing];

        // Update recommendation panel
        recommendation.classList.remove('hidden');
        styleName.textContent = currentStyle.name;
        styleDesc.textContent = currentStyle.description;
        styleConf.textContent = "Style Match: 95%";
        styleElements.innerHTML = `
            <ul>
                ${currentStyle.elements.map(elem => `<li>${elem}</li>`).join('')}
            </ul>
        `;

        // Add recommendation to chat
        this.addMessage(`Based on your selections, I recommend the "${currentStyle.name}" style. ${currentStyle.description}`, 'bot');
    }
}

// Initialize chat handler
document.addEventListener('DOMContentLoaded', () => {
    window.chatHandler = new ChatHandler();
});