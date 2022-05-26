import os
from flask import Flask, render_template, request, url_for, redirect
from flask_cors import CORS
from flask_sqlalchemy import SQLAlchemy

from sqlalchemy.sql import func

import json

def row2dict(row):
    d = {}
    for column in row.__table__.columns:
        d[column.name] = str(getattr(row, column.name))

    return d

basedir = os.path.abspath(os.path.dirname(__file__))

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] =\
        'sqlite:///' + os.path.join(basedir, 'portal.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)
cors = CORS(app, resource={
    r"/*":{
        "origins":"*"
    }
})

class Project(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    code = db.Column(db.String(100), nullable=False)
    activeStatus = db.Column(db.Boolean, nullable=False)
    tasks = db.relationship('Task', backref='project')

class Task(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    projectID = db.Column(db.Integer, db.ForeignKey('project.id'), nullable=False)
    activeStatus = db.Column(db.Boolean, nullable=False)
    works = db.relationship('Work', backref='task')

class Work(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    date = db.Column(db.DateTime, nullable=False)
    duration = db.Column(db.Integer, nullable=False)
    name = db.Column(db.String(100), nullable=False)
    taskID = db.Column(db.Integer, db.ForeignKey('task.id'), nullable=False)

db.create_all()

@app.route('/projects/<int:id>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def projects(id):
    if request.method == 'GET':
        projects = Project.query.all()
        list_projects = []
        for project in projects:
            list_projects.append(row2dict(project))
        json_object = json.dumps(list_projects, indent = 4) 
        return json_object
    if request.method == 'POST':
        new_project = json.loads(request.data)
        print(new_project)
        proj = Project(name=new_project["name"], code=new_project["code"], activeStatus=new_project["activeStatus"])
        db.session.add(proj)
        db.session.commit()
        return "OK"
    if request.method == 'DELETE':
        print(id)
        project = Project.query.get_or_404(id)
        db.session.delete(project)
        db.session.commit()
        return "OK"
    if request.method == 'PUT':
        edit_project = json.loads(request.data)
        project = Project.query.get_or_404(edit_project["id"])
        project.name = edit_project["name"]
        project.code = edit_project["code"]
        project.activeStatus = edit_project["activeStatus"]
        db.session.add(project)
        db.session.commit()
        return "OK"

@app.route('/tasks/<int:id>', methods=['GET', 'POST', 'DELETE', 'PUT'])
def tasks(id):
    if request.method == 'GET':
        project = Project.query.get_or_404(id)
        tasks = project.tasks
        # projects = Project.query.all()
        list_tasks = []
        for task in tasks:
            list_tasks.append(row2dict(task))
        json_object = json.dumps(list_tasks, indent = 4) 
        return json_object
    if request.method == 'POST':
        new_task = json.loads(request.data)
        print(new_task)
        task = Task(name=new_task["name"], projectID=new_task["projectID"], activeStatus=new_task["activeStatus"])
        db.session.add(task)
        db.session.commit()
        return "OK"
    if request.method == 'DELETE':
        print(id)
        task = Task.query.get_or_404(id)
        db.session.delete(task)
        db.session.commit()
        return "OK"
    if request.method == 'PUT':
        edit_task = json.loads(request.data)
        task = Task.query.get_or_404(edit_task["id"])
        task.name = edit_task["name"]
        task.projectID = edit_task["projectID"]
        task.activeStatus = edit_task["activeStatus"]
        db.session.add(task)
        db.session.commit()
        return "OK"


app.run()