from flask import Flask, render_template, request, session
import datetime
from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")
db = client['simonbryn']
messages = db['messages']
users = db['users']
app = Flask(__name__)
app.secret_key = 'PizzlyBear'

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html', 
        messages=messages.find({}),
        loggedIn=('username' in session),
        username=session.get('username', '')
    )

@app.route('/register', methods=['POST'])
def register():
    username = request.form['username']
    password = request.form['password']
    if (users.count_documents({'username': username}) > 0):
        return 'failure'
    users.insert_one({'username': username, 'password': password})
    session['username'] = username
    return 'success'

@app.route('/login', methods=['POST'])
def login():
    session['username'] = request.form['username']
    return 'success'

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return 'success'

@app.route('/message', methods=['POST'])
def message():
    message = session['username'] + ": " + request.form['message']
    now = datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S")
    messages.insert_one({'message': message, 'ts': now})
    return 'success'

if __name__ == '__main__':
    app.run(port=3000, debug=True, host='0.0.0.0')
