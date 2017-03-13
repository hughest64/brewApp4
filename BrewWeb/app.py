from flask import (Flask, render_template, redirect,
                    url_for, request, make_response)
import random
import os
import json
from brewing_tools import BeerXMLParser

app = Flask(__name__)
# Timer object for setting our xml data
recipe_data = BeerXMLParser()
# may move this locally to the recipes view
FPATH = os.getcwd() +'\\recipes\\'
# default value has to be a dict with some value
recipe_name = {'recipe':"no recipe"}

def new_url():
    query = random.randint(100000000, 999999999)
    return '?q={}'.format(query)


def get_xml(name):
    try:
        path = FPATH + name + ".xml"
        recipe_data.set_XML(path)
        all_steps = recipe_data.get_all_steps()
        recipe = recipe_data.get_recipe_name()
        all_steps['recipe_name'] = recipe

    except IOError:
        all_steps = {}

    return all_steps


@app.route('/')
def index():
    query = new_url()
    extension = {'query':query}
    data = get_xml(recipe_name['recipe'])

    return render_template('index.html', data=data, **extension)


@app.route('/set')
def set():
    query = new_url()
    return render_template('set.html', query=query)


@app.route('/timer')
def timer():
    query = new_url()
    data = get_xml(recipe_name['recipe'])
    extension = {'query':query, 'data':data}
    return render_template('timer.html', **extension)


@app.route('/recipes')
def load_recipes():
    all_files = os.listdir(FPATH)
    recipes = []
    # we only populate .xml files
    for recipe in all_files:
        if recipe.split('.')[-1] == 'xml':
            name = '.'.join(recipe.split('.')[:-1])
            recipes.append(name)
    return render_template('recipes.html', recipes=recipes)


@app.route('/saverecipe', methods=['POST'])
def saverecipe():
    response = make_response(redirect(url_for('timer')))
    # we make this global so it is accesible in index function
    global recipe_name
    # key is 'recipe'
    recipe_name = dict(request.form.items())
    return response







app.run(debug=True, port=8000, host='0.0.0.0')
