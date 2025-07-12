from flask import Blueprint, jsonify
from models import Skill

skill_bp = Blueprint('skills', __name__)

@skill_bp.route('/skills', methods=['GET'])
def get_skills():
    skills = Skill.query.all()
    return jsonify([skill.to_dict() for skill in skills])
