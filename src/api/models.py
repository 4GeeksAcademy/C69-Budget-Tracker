from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime, date


db = SQLAlchemy()

class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(25), unique=True, nullable=False)
    phone = db.Column(db.String(20), unique=True, nullable=False)
    date_created = db.Column(db.DateTime, nullable=False, default=date.today)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
# uselist=False is to make a 1-1 relationship

    preferences = relationship("UserPreferences", back_populates="user", uselist=False, cascade="all, delete-orphan")   
    assets = relationship("Asset", back_populates = "user", cascade = "all, delete-orphan")
    liabilities = relationship("Liability", back_populates = "user", cascade = "all, delete-orphan")

    def __repr__(self):
        return f'<User {self.username}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "username": self.username,
            "phone": self.phone,
            "date_created": self.date_created
            # do not serialize the password, its a security breach
        }


class UserPreferences(db.Model):
    __tablename__ = "user_preferences"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable=False)
    text_notification = db.Column(db.Boolean, nullable=False, default=False)
    text_frequency = db.Column(db.String(20), nullable=False, default="none")
    user = relationship("User", back_populates="preferences") 

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "username": self.user.username,
            "text_notification": self.text_notification,
            "text_frequency": self.text_frequency, 
        }


class Asset(db.Model):
    __tablename__ = "assets"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable = False)
    category = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Numeric(20, 2), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="assets")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category": self.category,
            "amount": self.amount,
            "description": self.description,
            "last_updated": self.last_updated
            
        }
    
class Liability(db.Model):
    __tablename__ = "liabilities"
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("users.id"), nullable = False)
    category = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Numeric(20, 2), nullable=False)
    description = db.Column(db.String(500), nullable=False)
    last_updated = db.Column(db.DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="liabilities")

    def serialize(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "category": self.category,
            "amount": self.amount,
            "description": self.description,
            "last_updated": self.last_updated
            
        }

   