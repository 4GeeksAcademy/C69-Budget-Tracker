from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime






db = SQLAlchemy()

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(256), unique=False, nullable=False)
    is_active = db.Column(db.Boolean(), unique=False, nullable=True)


    assets = relationship("Asset", back_populates = "user", cascade = "all, delete-orphan")
    liabilities = relationship("Liability", back_populates = "user", cascade = "all, delete-orphan")

    def __repr__(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }

class Asset(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"), nullable = False)
    category = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Numeric(20, 2), nullable=False)
    description = db.Column(db.String(500), nullable=True)
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
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, ForeignKey("user.id"), nullable = False)
    category = db.Column(db.String(255), nullable=False)
    amount = db.Column(db.Numeric(20, 2), nullable=False)
    description = db.Column(db.String(500), nullable=True)
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