from flask import Flask, render_template, request, jsonify
from chat_rules import FashionBot

app = Flask(__name__)
bot = FashionBot()

@app.route('/')
def home():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    message = request.json.get('message', '')
    if message.lower() in ["exit", "quit"]:
        response = bot.get_response("bye")
    else:
        response = bot.get_response(message)
    return jsonify({'response': response})

if __name__ == '__main__':
    app.debug = True
    app.run(port=5000)