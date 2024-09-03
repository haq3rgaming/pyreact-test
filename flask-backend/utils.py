from flask import Blueprint
from datetime import datetime

utils = Blueprint("utils", __name__)

def now(format: str='%Y-%m-%d %H:%M:%S') -> str:
    """Return the current date and time"""
    return datetime.now().strftime(format)