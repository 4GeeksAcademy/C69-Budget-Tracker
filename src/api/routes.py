from werkzeug.security import generate_password_hash, check_password_hash



from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS
from datetime import timedelta
from flask_jwt_extended import create_access_token

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/signup', methods=['POST'])
def sign_up():
    email = request.json.get("email")
    password = request.json.get("password")

    user = User.query.filter_by(email = email).one_or_none()
    if user:
        return jsonify({"message": "User already exists"}), 400

    new_user = User(
       email = email,
       password = generate_password_hash(password) 
    )
    db.session.add(new_user)
    db.session.commit()
    

    response_body = {
        "message": "User successfully created",
        "user": new_user.serialize() 
    }

    return jsonify(response_body), 201

@api.route("/login", methods=["POST"])
def login():
    email = request.json.get("email")
    password = request.json.get("password")
        
    user = User.query.filter_by(email = email).one_or_none()
    if user is None:
        return jsonify({"message": "Email does not exist"}), 404
    
    if not check_password_hash(user.password, password):
        return jsonify({"message": "Incorrect password"}), 401
    
    access_token = create_access_token(
        identity = user.email,
        expires_delta=timedelta(days=30)
    )
    return jsonify({"token": access_token}), 200

    

    
