from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv
import os

from waitress import serve

from app.login.login import login
from app.todos.todos import todos
from app.register.register import register


def createApp():

    app = Flask(__name__, static_folder="app/static", template_folder="app/templates")

    app.register_blueprint(login)
    app.register_blueprint(todos)
    app.register_blueprint(register)

    CORS(app)

    return app


if __name__=='__main__':
    
    load_dotenv()

    mode = os.getenv('APP_MODE')
    
    app = createApp()
    
    if mode == "dev":
        app.run(host=os.getenv("APP_HOST"), port=os.getenv("APP_PORT"), debug=True)
    else:
        serve(app, host=os.getenv("APP_HOST"), port=os.getenv("APP_PORT"))