from flask_sqlalchemy import SQLAlchemy
from datetime import datetime
from werkzeug.security import generate_password_hash, check_password_hash

import uuid

db = SQLAlchemy()

# ----- User Model -----
class User(db.Model):
    id = db.Column(db.String, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)
    location = db.Column(db.String(100), nullable=True)
    profile_photo = db.Column(db.String, nullable=True)
    skills_offered = db.Column(db.ARRAY(db.String), default=[])
    skills_wanted = db.Column(db.ARRAY(db.String), default=[])
    availability = db.Column(db.String(100), nullable=True)
    is_public = db.Column(db.Boolean, default=True)
    is_banned = db.Column(db.Boolean, default=False)

    def to_dict(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "location": self.location,
            "profile_photo": self.profile_photo,
            "skills_offered": self.skills_offered,
            "skills_wanted": self.skills_wanted,
            "availability": self.availability,
            "is_public": self.is_public,
            "is_banned": self.is_banned
        }
    
class Skills3(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(120))
    description = db.Column(db.Text)
    category = db.Column(db.String(50))
    location = db.Column(db.String(100))
    duration = db.Column(db.String(50))
    price = db.Column(db.String(20))
    rating = db.Column(db.Float)
    user_name = db.Column(db.String(100))
    user_avatar = db.Column(db.String(255))
    icon = db.Column(db.String(10))
    color1 = db.Column(db.String(20))
    color2 = db.Column(db.String(20))
    img = db.Column(db.String(255))

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "category": self.category,
            "location": self.location,
            "duration": self.duration,
            "price": self.price,
            "rating": self.rating,
            "userName": self.user_name,
            "userAvatar": self.user_avatar,
            "icon": self.icon,
            "color1": self.color1,
            "color2": self.color2,
            "img": self.img,
        }

# ----- SwapRequest Model -----
class SwapRequest(db.Model):
    id = db.Column(db.String, primary_key=True)
    from_user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    to_user_id = db.Column(db.String, db.ForeignKey('user.id'), nullable=False)
    skill_offered = db.Column(db.String, nullable=False)
    skill_requested = db.Column(db.String, nullable=False)
    status = db.Column(db.String, default="pending")
    timestamp = db.Column(db.DateTime)

    def to_dict(self):
        return {
            "id": self.id,
            "from_user_id": self.from_user_id,
            "to_user_id": self.to_user_id,
            "skill_offered": self.skill_offered,
            "skill_requested": self.skill_requested,
            "status": self.status,
            "timestamp": self.timestamp
        }

# ----- Admin Model -----
class Admin(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), unique=True, nullable=False)
    password_hash = db.Column(db.String(200), nullable=False)

# ----- Admin Actions Model -----
class AdminAction(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    admin_id = db.Column(db.Integer, db.ForeignKey('admin.id'), nullable=True)
    action_type = db.Column(db.String(50), nullable=False)
    target_user_id = db.Column(db.String, db.ForeignKey('user.id'))
    details = db.Column(db.Text)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

# ----- User Reports Model -----
class UserReport(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    reporter_id = db.Column(db.String, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    reported_user_id = db.Column(db.String, db.ForeignKey('user.id', ondelete='CASCADE'), nullable=False)
    reason = db.Column(db.Text, nullable=False)
    reported_at = db.Column(db.DateTime, default=datetime.utcnow)
