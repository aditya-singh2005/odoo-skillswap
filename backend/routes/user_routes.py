from flask import Blueprint, request, jsonify
from models import db, User
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

user_bp = Blueprint('user_routes', __name__)

@user_bp.route('/')
def home():
    return "✅ SkillSwap API is running"

# Register new user
@user_bp.route('/register', methods=['POST'])
def register_user():
    data = request.json
    if User.query.filter_by(email=data.get("email")).first():
        return jsonify({"error": "User already exists"}), 409

    hashed_password = generate_password_hash(data.get("password"))

    new_user = User(
        id=str(uuid.uuid4()),
        name=data.get("name"),
        email=data.get("email"),
        password_hash=hashed_password,
        location=data.get("location"),
        profile_photo=data.get("profile_photo"),
        skills_offered=data.get("skills_offered", []),
        skills_wanted=data.get("skills_wanted", []),
        availability=data.get("availability"),
        is_public=data.get("is_public", True)
    )
    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "User registered", "user_id": new_user.id}), 201

# User login
@user_bp.route('/login', methods=['POST'])
def login_user():
    data = request.get_json()
    user = User.query.filter_by(email=data.get("email")).first()
    if not user or not check_password_hash(user.password_hash, data.get("password")):
        return jsonify({"error": "Invalid credentials"}), 401

    token = create_access_token(identity={"user_id": user.id})
    return jsonify({"access_token": token})

# Get all public users
@user_bp.route('/users', methods=['GET'])
def get_users():
    users = User.query.filter_by(is_public=True).all()
    return jsonify([u.to_dict() for u in users])

# Get single user by ID
@user_bp.route('/users/<user_id>', methods=['GET'])
def get_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404
    return jsonify(user.to_dict())

# Search users by skill
@user_bp.route('/search', methods=['GET'])
def search_users():
    skill = request.args.get("skill", "").lower()
    results = User.query.filter(
        User.is_public == True,
        db.or_(
            db.func.lower(db.any(User.skills_offered)).like(f"%{skill}%"),
            db.func.lower(db.any(User.skills_wanted)).like(f"%{skill}%")
        )
    ).all()
    return jsonify([u.to_dict() for u in results])

# Update skills / availability
@user_bp.route('/update', methods=['PUT'])
@jwt_required()
def update_user():
    current_user = get_jwt_identity()['user_id']
    user = User.query.get(current_user)
    if not user:
        return jsonify({"error": "User not found"}), 404

    data = request.json
    user.skills_offered = data.get("skills_offered", user.skills_offered)
    user.skills_wanted = data.get("skills_wanted", user.skills_wanted)
    user.availability = data.get("availability", user.availability)
    db.session.commit()

    return jsonify({"message": "User updated", "user": user.to_dict()})

# Toggle visibility
@user_bp.route('/visibility', methods=['PATCH'])
@jwt_required()
def toggle_visibility():
    current_user = get_jwt_identity()['user_id']
    user = User.query.get(current_user)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_public = not user.is_public
    db.session.commit()
    return jsonify({"message": "Visibility toggled", "is_public": user.is_public})

# Delete user
@user_bp.route('/delete', methods=['DELETE'])
@jwt_required()
def delete_user():
    current_user = get_jwt_identity()['user_id']
    user = User.query.get(current_user)
    if not user:
        return jsonify({"error": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()
    return jsonify({"message": "User deleted"})

# Filter users by availability
@user_bp.route('/availability', methods=['GET'])
def get_by_availability():
    slot = request.args.get("slot", "").lower()
    users = User.query.filter(
        User.is_public == True,
        db.func.lower(User.availability) == slot
    ).all()
    return jsonify([u.to_dict() for u in users])
