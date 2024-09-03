from flask import Blueprint, Response
from flask import session, request, current_app
from flask import jsonify

from flask_sqlalchemy import SQLAlchemy

from models import Pouzivatel, Post
from utils import now

chat = Blueprint("chat", __name__)
db: SQLAlchemy = current_app.config["db"]

@chat.route("/post", methods=["POST"])
def post():
    if not session.get("id"): return Response("Not logged in", status=401)

    content = request.json.get("content")
    if not content: return Response("Invalid content", status=400)

    post = Post(authorId=session.get("id"), postedAt=now(), content=content)
    db.session.add(post)
    db.session.commit()

    return Response("Posted!", status=201)

@chat.route("/posts", methods=["GET"])
def posts():
    if not session.get("id"): return Response("Not logged in", status=401)

    posts = db.session.query(Post).all()
    return jsonify([post.json() for post in posts])

@chat.route("/user/<int:userID>", methods=["GET"])
def user(userID: int):
    if not session.get("id"): return Response("Not logged in", status=401)

    user = db.session.query(Pouzivatel).filter(Pouzivatel.id == userID).first()
    if not user: return Response("User not found", status=404)
    return Response(user.displayName, status=200)