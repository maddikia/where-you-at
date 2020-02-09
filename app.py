from flask import Flask, render_template, request, session
import datetime
from pymongo import MongoClient

app = Flask(__name__)
app.secret_key = '12riddlemarvolo311926'

client = MongoClient("mongodb+srv://maddikia:lol@cluster0-3l4ee.mongodb.net/test?retryWrites=true&w=majority")
db = client['whereyouat']
quests = db['quests']
users = db['users']

@app.route('/', methods=['GET'])
def home():
    return render_template('index.html',
        quests = quests.find({}),
        loggedIn = ('username' in session),
        username = session.get('username', ''),
        points = session.get('points', 0),
        users = users.find({}))

@app.route('/quest', methods=['POST'])
def quest():
    description = request.form['description']
    value = request.form['value']
    quests.insert_one({'description': description, 'author': session['username'], 'value': value})
    return 'success'

@app.route('/login', methods=['POST'])
def login():
    session['username'] = request.form['username']
    if (users.count_documents({'username': session['username']}) < 1):
        now = datetime.datetime.now().strftime("%m/%d/%Y %H:%M:%S")
        users.insert_one({'username': session['username'], 'creation_time': now, 'points': 0})
    return 'success'

@app.route('/logout', methods=['POST'])
def logout():
    session.pop('username', None)
    return 'success'

@app.route('/endquest', methods=['POST'])
def endquest():
    value = int(request.form['listedquest'])
    users.update_one({'username':session['username']}, {'$inc': {'points': value}})
   # points = #code 
   # quests.delete_one({"description": description})

@app.route('/addpoints', methods=['POST'])
def addpoints():
    points = 5
    users.update_one({'username':session['username']}, {'$inc': {'points': points}})
    
    

app.run(port=3000, debug=True, host='0.0.0.0')

