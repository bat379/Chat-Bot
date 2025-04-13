document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const femaleBtn = document.getElementById('female-btn');
    const maleBtn = document.getElementById('male-btn');
    const hairColorPicker = document.getElementById('hair-color');
    const clothesColorPicker = document.getElementById('clothes-color');
    const colorSwatches = document.querySelectorAll('.color-swatch');
    const recommendBtn = document.getElementById('recommend-btn');
    const recommendation = document.getElementById('recommendation');
    const styleName = document.getElementById('style-name');
    const styleDescription = document.getElementById('style-description');
    const styleConfidence = document.getElementById('style-confidence');
    const styleElements = document.getElementById('style-elements');
    const chatMessages = document.getElementById('chat-messages');
    const userMessageInput = document.getElementById('user-message');
    const sendBtn = document.getElementById('send-btn');
    
    // Event Listeners
    femaleBtn.addEventListener('click', function() {
        femaleBtn.classList.add('active');
        maleBtn.classList.remove('active');
        window.characterModel.setModel('female');
    });
    
    maleBtn.addEventListener('click', function() {
        femaleBtn.classList.remove('active');
        maleBtn.classList.add('active');
        window.characterModel.setModel('male');
    });
    
    hairColorPicker.addEventListener('input', function() {
        window.characterModel.setHairColor(this.value);
    });
    
    clothesColorPicker.addEventListener('input', function() {
        window.characterModel.setClothesColor(this.value);
    });
    
    // Color swatch selection
    colorSwatches.forEach(swatch => {
        swatch.addEventListener('click', function() {
            const color = this.dataset.color;
            const isHairSwatch = this.parentElement.previousElementSibling.htmlFor === 'hair-color';
            
            if (isHairSwatch) {
                hairColorPicker.value = color;
                window.characterModel.setHairColor(color);
            } else {
                clothesColorPicker.value = color;
                window.characterModel.setClothesColor(color);
            }
        });
    });
    
    recommendBtn.addEventListener('click', getStyleRecommendation);
    
    sendBtn.addEventListener('click', sendMessage);
    
    userMessageInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            sendMessage();
        }
    });
    
    // Functions
    function getStyleRecommendation() {
        const settings = window.characterModel.getCurrentSettings();
        
        fetch('/recommend', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                hairColor: settings.hairColor,
                clothesColor: settings.clothesColor
            })
        })
        .then(response => response.json())
        .then(data => {
            styleName.textContent = `Style: ${data.style.charAt(0).toUpperCase() + data.style.slice(1)}`;
            styleDescription.textContent = `Description: ${data.description}`;
            styleConfidence.textContent = `Match: ${data.confidence}`;
            
            // Display style elements if available
            if (data.style_elements) {
                styleElements.innerHTML = '<p>Key Elements:</p><ul>' + 
                    data.style_elements.map(element => `<li>${element}</li>`).join('') + 
                    '</ul>';
            }
            
            recommendation.classList.remove('hidden');
            
            // Add bot message about recommendation
            addMessage(`Based on your selections, I recommend a ${data.style} style. ${data.description}`, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function sendMessage() {
        const message = userMessageInput.value.trim();
        
        if (message === '') return;
        
        // Add user message to chat
        addMessage(message, 'user');
        
        // Clear input
        userMessageInput.value = '';
        
        // Send message to server
        fetch('/chat', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                message: message
            })
        })
        .then(response => response.json())
        .then(data => {
            // Add bot response to chat
            addMessage(data.response, 'bot');
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
    
    function addMessage(text, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message', sender);
        messageElement.textContent = text;
        
        chatMessages.appendChild(messageElement);
        
        // Scroll to bottom
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }
});
