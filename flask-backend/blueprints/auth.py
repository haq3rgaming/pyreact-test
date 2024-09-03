from flask import Blueprint, Response
from flask import session, request, current_app

from flask_sqlalchemy import SQLAlchemy
from flask_cors import cross_origin

from models import Pouzivatel
from utils import now

auth = Blueprint("auth", __name__)
db: SQLAlchemy = current_app.config["db"]

@cross_origin
@auth.route("/login", methods=["POST"])
def login():
    if session.get("id"): return Response("Already logged in", status=400)

    username = request.json.get("username")
    password = request.json.get("password")
    if not username or not password: return Response("Invalid credentials", status=400)

    user = db.session.query(Pouzivatel).filter(Pouzivatel.username == username, Pouzivatel.password == password).first()
    
    if user:
        session.permanent = True
        session.update(user.json())
        return Response("Logged in!", status=200)
    
    return Response("Invalid credentials", status=401)

@cross_origin
@auth.route("/register", methods=["POST"])
def register():
    if session.get("id"): return Response("Already logged in", status=400)

    username = request.json.get("username")
    password = request.json.get("password")
    displayName = request.json.get("displayName")

    if not username or not password or not displayName: return Response("Invalid credentials", status=400)

    user = db.session.query(Pouzivatel).filter(Pouzivatel.username == username).first()
    if user: return Response("User already exists", status=409)

    user = Pouzivatel(username=username, password=password, displayName=displayName, joinedAt=now())
    db.session.add(user)
    db.session.commit()

    session.permanent = True
    session.update(user.json())
    return Response("Registered!", status=201)

@cross_origin
@auth.route("/logout", methods=["POST"])
def logout():
    if session.get("id"):
        session.permanent = False
        session.clear()
        return Response("Logged out!", status=200)
    else:
        return Response("Not logged in", status=400)