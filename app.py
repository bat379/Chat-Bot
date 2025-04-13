from flask import Flask, render_template, request, jsonify
import json
import random

app = Flask(__name__)

# Style categories with descriptions and recommended colors
STYLE_CATEGORIES = {
    "casual": {
        "description": "Comfortable, everyday clothing that's relaxed and expressive.",
        "hair_colors": ["#CC9966", "#333333", "#CCCCCC"],
        "clothes_colors": ["#3333CC", "#CC3333", "#33CC33"],
        "style_elements": ["t-shirts", "jeans", "sneakers", "hoodies"]
    },
    "formal": {
        "description": "Elegant, sophisticated clothing suitable for professional or special occasions.",
        "hair_colors": ["#333333", "#CC9966", "#996633"],
        "clothes_colors": ["#333333", "#CCCCCC", "#1A1A80"],
        "style_elements": ["suits", "dresses", "blazers", "formal shoes"]
    },
    "sporty": {
        "description": "Athletic, functional clothing designed for comfort and movement.",
        "hair_colors": ["#CCCC00", "#333333", "#CC6600"],
        "clothes_colors": ["#CC3333", "#33CC33", "#3333CC"],
        "style_elements": ["athletic wear", "track pants", "sports shoes", "caps"]
    },
    "bohemian": {
        "description": "Free-spirited, artistic clothing with natural fabrics and ethnic influences.",
        "hair_colors": ["#CC6600", "#663300", "#CCCC99"],
        "clothes_colors": ["#CC9966", "#66CC99", "#9966CC"],
        "style_elements": ["flowy dresses", "layered accessories", "earthy tones", "patterns"]
    },
    "minimalist": {
        "description": "Simple, clean clothing with neutral colors and clean lines.",
        "hair_colors": ["#333333", "#CCCCCC", "#999999"],
        "clothes_colors": ["#333333", "#CCCCCC", "#999999"],
        "style_elements": ["basic tees", "simple cuts", "monochrome", "clean silhouettes"]
    }
}

# Add model configuration
MODEL_CONFIG = {
    "female": {
        "hairstyles": ["long", "short", "curly", "straight", "bob"],
        "clothing": ["dress", "casual", "formal", "sporty"]
    },
    "male": {
        "hairstyles": ["short", "medium", "long", "buzz cut", "slicked back"],
        "clothing": ["suit", "casual", "formal", "sporty"]
    }
}

@app.route('/')
def index():
    return render_template('index.html', model_config=MODEL_CONFIG)

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '').lower()
    
    # Process the message and generate a response
    if 'hello' in message or 'hi' in message or 'hey' in message:
        response = random.choice([
            "Hello! I'm your style assistant.",
            "Hi there! Ready to find your perfect style?",
            "Welcome! Let's discover your unique style together."
        ])
    elif 'hair' in message:
        response = "You can change your hair color using the color picker. Try different colors to see what suits you best!"
    elif 'clothes' in message or 'clothing' in message:
        response = "You can change your clothes color using the color picker. Experiment with different colors to find your style!"
    elif 'style' in message:
        response = "I can recommend a style based on your choices. Click the 'Get Style Recommendation' button when you're ready."
    elif 'help' in message:
        response = "I'm here to help you find your style. Try customizing the model's appearance and I'll give you recommendations based on your choices."
    elif 'male' in message or 'man' in message:
        response = "You can switch to the male model by clicking the 'Male' button at the top."
    elif 'female' in message or 'woman' in message:
        response = "You can switch to the female model by clicking the 'Female' button at the top."
    else:
        response = random.choice([
            "Tell me more about what style you're looking for, or customize the model to see what suits you.",
            "I'm not sure I understand. Try asking about hair, clothes, or style recommendations.",
            "Could you rephrase that? I'm here to help with your style choices."
        ])
    
    return jsonify({"response": response})

@app.route('/recommend', methods=['POST'])
def recommend():
    data = request.json
    hair_color = data.get('hairColor', '#000000')
    clothes_color = data.get('clothesColor', '#000000')
    
    # Find the best matching style
    best_match = None
    best_score = float('inf')
    
    for style_name, style_data in STYLE_CATEGORIES.items():
        score = float('inf')
        
        # Compare hair color
        for color in style_data['hair_colors']:
            hair_diff = color_difference(hair_color, color)
            score = min(score, hair_diff)
        
        # Compare clothes color
        for color in style_data['clothes_colors']:
            clothes_diff = color_difference(clothes_color, color)
            score = min(score, clothes_diff)
        
        if score < best_score:
            best_score = score
            best_match = style_name
    
    confidence = max(0, 1 - best_score / 3)
    
    return jsonify({
        "style": best_match,
        "description": STYLE_CATEGORIES[best_match]["description"],
        "confidence": f"{confidence:.0%}"
    })

def color_difference(color1, color2):
    """Calculate the difference between two hex colors"""
    r1, g1, b1 = int(color1[1:3], 16), int(color1[3:5], 16), int(color1[5:7], 16)
    r2, g2, b2 = int(color2[1:3], 16), int(color2[3:5], 16), int(color2[5:7], 16)
    
    # Simple color distance formula
    return abs(r1 - r2) / 255 + abs(g1 - g2) / 255 + abs(b1 - b2) / 255

if __name__ == '__main__':
    app.run(debug=True)
