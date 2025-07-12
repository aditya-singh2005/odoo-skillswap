from flask import Blueprint, request, jsonify
from models import db, SwapRequest, User
import uuid
from datetime import datetime

request_bp = Blueprint('request_routes', __name__)

# Send swap request
@request_bp.route('/send', methods=['POST'])
def send_request():
    data = request.json

    from_user_id = data.get("from_user_id")
    to_user_id = data.get("to_user_id")
    skill_offered = data.get("skill_offered")
    skill_requested = data.get("skill_requested")

    if not all([from_user_id, to_user_id, skill_offered, skill_requested]):
        return jsonify({"error": "Missing required fields"}), 400

    if from_user_id == to_user_id:
        return jsonify({"error": "You can't send a request to yourself"}), 400

    new_request = SwapRequest(
        id=str(uuid.uuid4()),
        from_user_id=from_user_id,
        to_user_id=to_user_id,
        skill_offered=skill_offered,
        skill_requested=skill_requested,
        status="pending",
        timestamp=datetime.utcnow()
    )
    db.session.add(new_request)
    db.session.commit()

    return jsonify({"message": "Swap request sent"}), 201


# View requests sent by a user
@request_bp.route('/sent/<user_id>', methods=['GET'])
def get_sent_requests(user_id):
    requests = SwapRequest.query.filter_by(from_user_id=user_id).all()
    return jsonify([r.to_dict() for r in requests])

# View requests received by a user
@request_bp.route('/received/<user_id>', methods=['GET'])
def get_received_requests(user_id):
    requests = SwapRequest.query.filter_by(to_user_id=user_id).all()
    return jsonify([r.to_dict() for r in requests])

# Accept or Reject request
@request_bp.route('/respond/<request_id>', methods=['PATCH'])
def respond_request(request_id):
    data = request.json
    status = data.get("status")

    if status not in ["accepted", "rejected"]:
        return jsonify({"error": "Invalid status"}), 400

    swap_request = SwapRequest.query.get(request_id)
    if not swap_request:
        return jsonify({"error": "Request not found"}), 404

    swap_request.status = status
    db.session.commit()
    return jsonify({"message": f"Request {status}"})

# Delete a swap request
@request_bp.route('/<request_id>', methods=['DELETE'])
def delete_request(request_id):
    swap_request = SwapRequest.query.get(request_id)
    if not swap_request:
        return jsonify({"error": "Request not found"}), 404

    db.session.delete(swap_request)
    db.session.commit()
    return jsonify({"message": "Request deleted"})
