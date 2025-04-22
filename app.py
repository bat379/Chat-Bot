from flask import Flask, render_template, request, jsonify
import json
import random
import re

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
        "clothing": ["dress", "casual", "formal", "sporty", "witch"]
    },
    "male": {
        "hairstyles": ["short", "medium", "long", "buzz cut", "slicked back"],
        "clothing": ["suit", "casual", "formal", "sporty", "witch"]
    }
}

@app.route('/')
def index():
    return render_template('index.html', model_config=MODEL_CONFIG)

class Rule:
    def __init__(self, patterns, responses, priority=1):
        self.patterns = patterns
        self.responses = responses
        self.priority = priority

    def matches(self, message):
        return any(re.search(pattern, message, re.IGNORECASE) for pattern in self.patterns)

# Define rules with priorities
CHAT_RULES = [
    Rule(
        patterns=[r'\b(hello|hi|hey|greetings)\b'],
        responses=[
            "Hello! I'm your style assistant. How can I help you today?",
            "Hi there! Ready to find your perfect style?",
            "Welcome! Let's discover your unique style together."
        ],
        priority=2
    ),
    Rule(
        patterns=[r'\b(hair(style|cut)?)\b'],
        responses=[
            "You can change your hair color using the color picker. For casual style, try warm browns (#CC9966) or classic black (#333333). What's your preferred style?",
            "Let's find the perfect hairstyle for you! We have options from sleek formal looks to relaxed casual styles. What kind of look are you going for?",
            "Hair can really transform your look! Try our color picker to find your ideal shade. For formal looks, dark tones work well, while bohemian styles suit warmer colors."
        ],
        priority=3
    ),
    Rule(
        patterns=[r'\b(clothes|clothing|outfit|dress)\b'],
        responses=[
            "Let me help you with clothing choices! We have several styles:\n- Casual: Relaxed t-shirts and jeans\n- Formal: Elegant suits and dresses\n- Sporty: Athletic wear\n- Bohemian: Flowy, artistic pieces\n- Minimalist: Clean, simple cuts\nWhich interests you?",
            "What kind of occasion are you dressing for? I can suggest formal wear for special events, casual styles for everyday, or sporty looks for active days!",
            "Fashion is about expressing yourself! Are you looking for something casual, formal, sporty, bohemian, or minimalist? Each style has unique color recommendations!"
        ],
        priority=3
    ),
    Rule(
        patterns=[r'\b(casual|everyday)\b'],
        responses=[
            f"Casual style is perfect for everyday comfort! Here's what I recommend:\n- Hair colors: Warm brown (#CC9966) or classic black (#333333)\n- Clothes: {', '.join(STYLE_CATEGORIES['casual']['style_elements'])}\n- Outfit colors: Blue (#3333CC), Red (#CC3333), or Green (#33CC33)\nWould you like to try this style?",
            "For a casual look, think comfortable and relaxed! Try pairing t-shirts with jeans, or hoodies with sneakers. Want to see how these combinations look?",
            "Casual style is all about being comfortable while looking great! I can help you pick the perfect color combinations for this laid-back look."
        ],
        priority=4
    ),
    Rule(
        patterns=[r'\b(formal|professional|elegant)\b'],
        responses=[
            f"Formal style exudes elegance! Here's my suggestion:\n- Hair colors: Classic black (#333333) or rich brown (#996633)\n- Clothes: {', '.join(STYLE_CATEGORIES['formal']['style_elements'])}\n- Outfit colors: Black (#333333), Grey (#CCCCCC), or Navy (#1A1A80)\nShall we try this sophisticated look?",
            "For formal occasions, I recommend elegant suits or dresses paired with formal shoes. Would you like to see some color combinations?",
            "Professional style is all about sophistication! Let's find the perfect formal look that makes you feel confident."
        ],
        priority=4
    ),
    Rule(
        patterns=[r'\b(sporty|athletic|active)\b'],
        responses=[
            f"Sporty style is perfect for an active lifestyle! Here's what I suggest:\n- Hair colors: Bright (#CCCC00) or warm orange (#CC6600)\n- Clothes: {', '.join(STYLE_CATEGORIES['sporty']['style_elements'])}\n- Outfit colors: Red (#CC3333), Green (#33CC33), or Blue (#3333CC)\nReady to try this energetic look?",
            "Athletic wear is all about comfort and functionality! Let's find the perfect combination of sports shoes and activewear for you.",
            "For a sporty look, I recommend comfortable track pants and athletic wear. Want to see how these pieces come together?"
        ],
        priority=4
    ),
    Rule(
        patterns=[r'\b(bohemian|boho|artistic)\b'],
        responses=[
            f"Bohemian style is all about free-spirited expression! Here's my recommendation:\n- Hair colors: Warm orange (#CC6600) or natural brown (#663300)\n- Clothes: {', '.join(STYLE_CATEGORIES['bohemian']['style_elements'])}\n- Outfit colors: Earth (#CC9966), Sage (#66CC99), or Purple (#9966CC)\nShall we explore this artistic style?",
            "Bohemian style celebrates creativity! Try flowy dresses with layered accessories and natural fabrics. Would you like to see some combinations?",
            "For a boho look, think patterns and earthy tones! Let's find the perfect mix of colors and textures for your free-spirited style."
        ],
        priority=4
    ),
    Rule(
        patterns=[r'\b(minimalist|simple|clean)\b'],
        responses=[
            f"Minimalist style is about elegant simplicity! Here's what I suggest:\n- Hair colors: Classic black (#333333) or grey (#CCCCCC)\n- Clothes: {', '.join(STYLE_CATEGORIES['minimalist']['style_elements'])}\n- Outfit colors: Black (#333333), Grey (#CCCCCC), or Silver (#999999)\nReady to try this clean, modern look?",
            "Less is more with minimalist style! Let's focus on clean lines and neutral colors for a sophisticated look.",
            "Minimalist fashion is about quality basics and clean silhouettes. Would you like to see how these elements work together?"
        ],
        priority=4
    ),
    Rule(
        patterns=[r'\b(color|colours|palette)\b'],
        responses=[
            "Let's talk about colors! Each style has its unique palette:\n- Casual: Blues and reds for a relaxed look\n- Formal: Classic blacks and navys for sophistication\n- Sporty: Bright, energetic colors\n- Bohemian: Earthy and natural tones\n- Minimalist: Clean neutrals and monochrome\nWhich palette interests you?",
            "Colors can transform your look! Would you like to explore warm tones, cool shades, or neutral colors?",
            "The right color combination can make your style pop! Tell me what colors you're drawn to, and I'll suggest matching pieces."
        ],
        priority=3
    ),
    Rule(
        patterns=[r'\b(recommend|suggest)\b'],
        responses=[
            "I'd love to make some recommendations! Tell me what you're looking for:\n1. Specific style (casual, formal, etc.)\n2. Color preferences\n3. Occasion\nOr try our style matcher with the current model colors!",
            "Let's find your perfect style! Are you looking for everyday wear, special occasion outfits, or something specific?",
            "I can suggest styles based on your preferences! What's most important to you - comfort, elegance, or expressing your personality?"
        ],
        priority=2
    )
]

@app.route('/chat', methods=['POST'])
def chat():
    data = request.json
    message = data.get('message', '').lower().strip()
    
    # Find all matching rules with their match scores
    matching_rules = []
    for rule in CHAT_RULES:
        if rule.matches(message):
            match_count = sum(1 for pattern in rule.patterns if re.search(pattern, message, re.IGNORECASE))
            matching_rules.append((rule, match_count))
    
    if matching_rules:
        # Sort by priority first, then by number of matches
        matching_rules.sort(key=lambda x: (x[0].priority, x[1]), reverse=True)
        best_rule = matching_rules[0][0]
        
        # Return response with message type
        response = random.choice(best_rule.responses)
        
        return jsonify({
            "response": response,
            "matched_rule": best_rule.patterns[0],
            "priority": best_rule.priority,
            "type": "bot"  # Add message type to indicate bot response
        })
    else:
        response = random.choice([
            "Tell me more about what style you're looking for! Are you interested in casual, formal, sporty, bohemian, or minimalist?",
            "I'm here to help with your style choices. What kind of look are you going for?",
            "Could you tell me more about the style you're interested in? I can provide specific recommendations!"
        ])
        
        return jsonify({
            "response": response,
            "matched_rule": None,
            "priority": 0,
            "type": "bot"  # Add message type to indicate bot response
        })

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