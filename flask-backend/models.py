from flask import Blueprint
from flask import current_app

from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import Column, ForeignKey
from sqlalchemy.dialects.mysql import TEXT, INTEGER, TIMESTAMP

models = Blueprint("models", __name__)

db: SQLAlchemy = current_app.config["db"]
db.create_all()

class Pouzivatel(db.Model):
    __tablename__ = "user"
    id = Column(INTEGER, primary_key=True)
    username = Column(TEXT, nullable=False)
    password = Column(TEXT, nullable=False)
    displayName = Column(TEXT, nullable=False)
    joinedAt = Column(TIMESTAMP, nullable=False)

    def __repr__(self):
        return f"<User {self.username}>"
    
    def __str__(self):
        return f"{self.username}"
    
    def json(self):
        return {
            "id": self.id,
            "username": self.username,
            "displayName": self.displayName,
            "joinedAt": self.joinedAt
        }

class Post(db.Model):
    __tablename__ = "post"
    id = Column(INTEGER, primary_key=True)
    authorId = Column(INTEGER, ForeignKey("user.id"), nullable=False)
    postedAt = Column(TIMESTAMP, nullable=False)
    content = Column(TEXT, nullable=False)

    def __repr__(self):
        return f"<Post {self.id}>"
    
    def __str__(self):
        return f"{self.id}"
    
    def json(self):
        return {
            "id": self.id,
            "authorId": self.authorId,
            "postedAt": self.postedAt,
            "content": self.content
        }