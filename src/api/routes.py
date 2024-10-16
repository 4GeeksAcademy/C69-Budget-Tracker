from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import jwt_required, get_jwt_identity

from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Asset, Liability, UserPreferences
from api.utils import generate_sitemap, APIException
from api.send_email import send_email
from flask_cors import CORS
from datetime import timedelta
from flask_jwt_extended import create_access_token
import os 
from datetime import datetime, timedelta
import jwt

# TODO:
# Test new routes, fix bugs
# Make sure its getting sent correctly from the front end to the actions to the flux.js actions.signup to the backend routes

#  TODO:
    # Add to sign-up
    # username = request.json.get("username")
    # phone = request.json.get("phone")
    # text_notification = request.json.get("text_notification", False)
    # text_frequency = request.json.get("text_frequency", "none")

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)

# Need to add preferences table later
@api.route('/signup', methods=['POST'])
def sign_up():
    email = request.json.get("email")
    password = request.json.get("password")
    username = request.json.get("username")
    phone = request.json.get("phone")
    text_notification = request.json.get("text_notification", False)
    text_frequency = request.json.get("text_frequency", "none")

    user = User.query.filter_by(email = email).one_or_none()
    if user:
        return jsonify({"message": "User already exists"}), 400

    new_user = User(
       email = email,
       password = generate_password_hash(password),
       username = username,
       phone = phone
    )
    db.session.add(new_user)
    db.session.commit()

    new_preferences = UserPreferences(
        user_id = new_user.id,
        text_notification = text_notification,
        text_frequency = text_notification and text_frequency or "none",
    )
    db.session.add(new_preferences)
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

@api.route("/forgot-password", methods=["POST"])
def forgot_password(): 
    email=request.json.get("email")

    user = User.query.filter_by(email=email).first()
    if user is None: 
        return jsonify({"message": "email does not exist"}), 400
    
    expiration_time=datetime.utcnow() + timedelta(hours = 1)
    token = jwt.encode({"email": email, "exp": expiration_time}, os.getenv("FLASK_APP_KEY"), algorithm="HS256")

    email_value=f"Click here to reset password.\n{os.getenv('FRONTEND_URL')}/forgot-password?token={token}"
    send_email(email, email_value, "password recover: Koyo")
    return jsonify({"message": "recovery email sent"}), 200

@api.route("/reset-password/<token>", methods=["PUT"])
def reset_password(token):
    data=request.get_json()
    password=data.get("password")

    try:
        decoded_token=jwt.decode(token, os.getenv("FLASK_APP_KEY"), algorithms=["HS256"])
        email=decoded_token.get("email")
    except jwt.ExpiredSignatureError:
        return jsonify({"message": "Token has expired" }), 400
    except jwt.InvalidTokenError:
        return jsonify({"message": "Invalid token"}), 400
    
    user=User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User does not exist"}), 400
    
    user.password=generate_password_hash(password)
    db.session.commit()

    send_email(email, "password successfully reset", "password reset confirmation for Koyo")
    return jsonify({"message": "password reset email sent"}), 200

# Asset routes
# C
@api.route("/create-asset", methods=["POST"])
@jwt_required()
def create_asset():
    current_user = get_jwt_identity() 
    user = User.query.filter_by(email=current_user).first()

    category = request.json.get("category")
    amount = request.json.get("amount")
    description = request.json.get("description")

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    new_asset = Asset(
        user_id=user.id,
        category=category,
        amount=amount,
        description=description
    )

    db.session.add(new_asset)
    db.session.commit()

    return jsonify(new_asset.serialize()), 201

# R
@api.route("/get-asset", methods=["GET"])
@jwt_required()
def get_assets():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    assets = Asset.query.filter_by(user_id=user.id).all()
    # Get total asset
    total_assets = 0
    for asset in assets:
        total_assets += asset.amount
    return jsonify(asset_list=[asset.serialize() for asset in assets], total=total_assets), 200

# U
@api.route("/update-asset/<int:asset_id>", methods=["PUT"])
@jwt_required()
def update_asset(asset_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    asset = Asset.query.get(asset_id)
    if not asset or asset.user_id != user.id:
        return jsonify({"message": "Asset not found or unauthorized"}), 404
    
    asset.category = request.json.get("category", asset.category)
    asset.amount = request.json.get("amount", asset.amount)
    asset.description = request.json.get("description", asset.description)
    asset.last_updated = datetime.utcnow()

    db.session.commit()
    return jsonify(asset.serialize()), 200

# D
@api.route("/delete-asset/<int:asset_id>", methods=["DELETE"])
@jwt_required()
def delete_asset(asset_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    asset = Asset.query.get(asset_id)
    if not asset or asset.user_id != user.id:
        return jsonify({"message": "Asset not found or unauthorized"}), 404
    
    db.session.delete(asset)
    db.session.commit()
    return jsonify({"message": "Asset deleted"}), 200

# Liability routes
# C
@api.route("/create-liability", methods=["POST"])
@jwt_required()
def create_liability():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    category = request.json.get("category")
    amount = request.json.get("amount")
    description = request.json.get("description")

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    new_liability = Liability(
        user_id=user.id,
        category=category,
        amount=amount,
        description=description
    )

    db.session.add(new_liability)
    db.session.commit()

    return jsonify(new_liability.serialize()), 201

# R
@api.route("/get-liabilities", methods=["GET"])
@jwt_required()
def get_liabilities():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    liabilities = Liability.query.filter_by(user_id=user.id).all()
    # Get all liabilities
    total_liabilities = 0
    for liability in liabilities:
        total_liabilities += liability.amount
    return jsonify(liability_list=[liability.serialize() for liability in liabilities], total=total_liabilities), 200

# U
@api.route("/update-liability/<int:liability_id>", methods=["PUT"])
@jwt_required()
def update_liability(liability_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    liability = Liability.query.get(liability_id)
    if not liability or liability.user_id != user.id:
        return jsonify({"message": "Liability not found or unauthorized"}), 404
    
    liability.category = request.json.get("category", liability.category)
    liability.amount = request.json.get("amount", liability.amount)
    liability.description = request.json.get("description", liability.description)
    liability.last_updated = datetime.utcnow()

    db.session.commit()
    return jsonify(liability.serialize()), 200

# D
@api.route("/delete-liability/<int:liability_id>", methods=["DELETE"])
@jwt_required()
def delete_liability(liability_id):
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    liability = Liability.query.get(liability_id)
    if not liability or liability.user_id != user.id:
        return jsonify({"message": "Liability not found or unauthorized"}), 404
    
    db.session.delete(liability)
    db.session.commit()
    return jsonify({"message": "Liability deleted"}), 200



# routes for user data 
@api.route("/user-info", methods=["GET"])
@jwt_required()
def get_user_info():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()
    if not user:
        return jsonify({"message": "User not found"}), 404
    user_preferences = UserPreferences.query.filter_by(user_id=user.id).first()
    user_data = user.serialize()
    preferences_data = user_preferences.serialize() if user_preferences else {}

    response_body = {
        "user": user_data,
        "preferences": preferences_data
    }

    return jsonify(response_body), 200



        # Change password
@api.route("/change-password", methods=["PUT"])
@jwt_required()
def change_password():
    current_user = get_jwt_identity()
    user = User.query.filter_by(email=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.get_json()
    current_password = data.get("current_password")
    new_password = data.get("new_password")

    if not check_password_hash(user.password, current_password):
        return jsonify({"message": "Incorrect current password"}), 401

    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Password changed successfully"}), 200


@api.route("/edit-user-info", methods=["PUT"])
@jwt_required()
def edit_user_info():
    current_user = get_jwt_identity()
    user=User.query.filter_by(email=current_user).first()

    if not user:
        return jsonify({"message": "User not found"}), 404
    
    user_preferences = UserPreferences.query.filter_by(user_id=user.id).first()

    
    new_username = request.json.get("username", user.username)
    new_phone = request.json.get("phone", user.phone)
    new_text_notification = request.json.get("text_notification", user_preferences.text_notification)
    new_text_frequency = request.json.get("text_frequency", user_preferences.text_frequency)

    existing_user = User.query.filter_by(username = new_username).first()
    if existing_user and existing_user.id != user.id:
        return jsonify({"message": "username already in use"}), 404



    # assigned values
    user.username = new_username
    user.phone = new_phone
    user_preferences.text_notification = new_text_notification
    user_preferences.text_frequency = new_text_frequency

    db.session.commit()
    db.session.refresh(user)
    db.session.refresh(user_preferences)


    response_body = {
        "message": "User information updated successfully",
        "user": user.serialize(),
        "preferences": user_preferences.serialize() 
    }

    return jsonify(response_body), 200