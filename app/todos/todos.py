from flask import Blueprint, render_template

todos = Blueprint("todos", __name__)

@todos.route("/todos_list")
def todos_list():
    return render_template("todos.html")

