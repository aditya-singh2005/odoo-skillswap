from flask import Flask
from config import Config
from flask_cors import CORS
from models import db
from flask_jwt_extended import JWTManager
from routes.user_routes import user_bp
from routes.request_routes import request_bp
from routes.admin_routes import admin_bp
from routes.skill_routes import skill_bp
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes
app.config.from_object(Config)
db.init_app(app)
app.config['JWT_SECRET_KEY'] = 'skillswap' 
jwt = JWTManager(app)

# Register Blueprints
app.register_blueprint(user_bp, url_prefix="/")
app.register_blueprint(request_bp, url_prefix="/request")
app.register_blueprint(admin_bp, url_prefix="/admin")
app.register_blueprint(skill_bp)
if __name__ == '__main__':
    with app.app_context():
        db.drop_all()      # 🚨 This will clear the existing tables
        db.create_all()    # 🛠️ Recreate tables as per updated models
    app.run(debug=True)