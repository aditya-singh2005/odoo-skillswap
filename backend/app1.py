from flask import Flask, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend

# Configure PostgreSQL DB
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://swllswapdb_user:gTeN5pcSx8AlMyzIX23MYxBjq74BsIui@dpg-d1otvpur433s73coutsg-a.singapore-postgres.render.com:5432/swllswapdb'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

# Model for skill3 table
class Skill3(db.Model):
    __tablename__ = 'skill3'
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String)
    description = db.Column(db.String)
    category = db.Column(db.String)
    location = db.Column(db.String)
    duration = db.Column(db.String)
    price = db.Column(db.String)
    rating = db.Column(db.Float)
    userName = db.Column(db.String)
    userAvatar = db.Column(db.String)
    icon = db.Column(db.String)
    color1 = db.Column(db.String)
    color2 = db.Column(db.String)
    img = db.Column(db.String)

# Route to fetch skill3 data
@app.route('/skill3', methods=['GET'])
def get_skill3():
    skills = Skill3.query.all()
    return jsonify([{
        'id': skill.id,
        'title': skill.title,
        'description': skill.description,
        'category': skill.category,
        'location': skill.location,
        'duration': skill.duration,
        'price': skill.price,
        'rating': skill.rating,
        'userName': skill.userName,
        'userAvatar': skill.userAvatar,
        'icon': skill.icon,
        'color1': skill.color1,
        'color2': skill.color2,
        'img': skill.img
    } for skill in skills])

if __name__ == '__main__':
    app.run(debug=True)
