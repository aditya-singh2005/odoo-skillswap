from flask import Flask
from config import Config
from models import db
from routes.user_routes import user_bp
from routes.request_routes import request_bp

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

# Register Blueprints
app.register_blueprint(user_bp, url_prefix="/")
app.register_blueprint(request_bp, url_prefix="/request")

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
