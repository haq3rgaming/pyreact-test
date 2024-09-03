from flask import Flask

from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

from datetime import timedelta

app = Flask(__name__, static_folder="static", template_folder="templates")
app.secret_key = 'WIP_SECRET_KEY'
app.permanent_session_lifetime = timedelta(minutes=60)
app.config["SQLALCHEMY_DATABASE_URI"] = "mariadb://flask-chat:Q8G#iYlX@localhost:3306/react-flask-chat"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
db = SQLAlchemy(app)
cors = CORS(app, supports_credentials=True)
app.config["db"] = db
app.app_context().push()

import utils, models
from blueprints import auth, chat

app.register_blueprint(utils.utils)
app.register_blueprint(models.models)

app.register_blueprint(auth.auth, url_prefix="/")
app.register_blueprint(chat.chat, url_prefix="/chat")

if __name__ == "__main__":
    from gevent import monkey; monkey.patch_all()
    from gevent.pywsgi import WSGIServer

    import tracemalloc
    tracemalloc.start()

    http_server = WSGIServer(("0.0.0.0", 5000), app)
    print(r"Running on: http://127.0.0.1:5000")
    http_server.serve_forever()