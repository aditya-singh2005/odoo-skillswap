from flask import Blueprint, request, jsonify
from models import db, User, AdminAction, UserReport
from datetime import datetime
import uuid

admin_bp = Blueprint('admin_routes', __name__)

# View all user reports
@admin_bp.route('/admin/reports', methods=['GET'])
def view_reports():
    reports = UserReport.query.all()
    return jsonify([{
        "id": r.id,
        "reporter_id": r.reporter_id,
        "reported_user_id": r.reported_user_id,
        "reason": r.reason,
        "reported_at": r.reported_at.isoformat()
    } for r in reports])

# Ban a user
@admin_bp.route('/admin/ban/<user_id>', methods=['PATCH'])
def ban_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_banned = True
    db.session.commit()

    action = AdminAction(
        admin_id=None,  # can link to a logged-in admin
        action_type="ban",
        target_user_id=user_id,
        details="User banned",
        created_at=datetime.utcnow()
    )
    db.session.add(action)
    db.session.commit()

    return jsonify({"message": "User banned successfully"})

# Unban a user
@admin_bp.route('/admin/unban/<user_id>', methods=['PATCH'])
def unban_user(user_id):
    user = User.query.get(user_id)
    if not user:
        return jsonify({"error": "User not found"}), 404

    user.is_banned = False
    db.session.commit()

    action = AdminAction(
        admin_id=None,
        action_type="unban",
        target_user_id=user_id,
        details="User unbanned",
        created_at=datetime.utcnow()
    )
    db.session.add(action)
    db.session.commit()

    return jsonify({"message": "User unbanned successfully"})

# View all swap requests with status
@admin_bp.route('/admin/swaps', methods=['GET'])
def view_all_swaps():
    from models import SwapRequest  # imported here to avoid circular import
    swaps = SwapRequest.query.all()
    return jsonify([s.to_dict() for s in swaps])

# Send platform-wide message (stub route)
@admin_bp.route('/admin/broadcast', methods=['POST'])
def broadcast_message():
    data = request.json
    message = data.get("message")
    if not message:
        return jsonify({"error": "Message content required"}), 400

    # This could be saved in DB, sent via email, notification etc.
    return jsonify({"message": "Broadcast sent", "content": message})

# Export reports as JSON (CSV/PDF later)
@admin_bp.route('/admin/export/reports', methods=['GET'])
def export_reports():
    reports = UserReport.query.all()
    data = [
        {
            "reporter_id": r.reporter_id,
            "reported_user_id": r.reported_user_id,
            "reason": r.reason,
            "reported_at": r.reported_at.isoformat()
        } for r in reports
    ]
    return jsonify({"report_data": data})