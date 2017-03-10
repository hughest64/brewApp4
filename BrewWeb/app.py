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


def get_saved_data():
    try:
        data = json.loads(request.cookies.get('recipe_name'))
    except TypeError:
        data = {}
    return data


def get_xml(name):
    try:
        path = FPATH + name['recipe'] + ".xml"
        recipe_data.set_XML(path)

        # this is a dict
        all_steps = recipe_data.get_all_steps()
        # this is a sting
        recipe_name = recipe_data.get_recipe_name()
        # add this to the same dict
        all_steps['recipe_name'] = recipe_name

        print all_steps

        return all_steps

    except IOError:
        print "The selected file does not exist"
        return "The selected file does not exist"


@app.route('/')
def index():
    query = new_url()
    extension = {'query':query}
    data = get_xml(recipe_name)

    return render_template('index.html', data=data, **extension)


@app.route('/set')
def set():
    return render_template('set.html')


@app.route('/timer')
def timer():
    data = get_saved_data()
    query = new_url()
    timer_vals = {'minutes':0, 'seconds':20}
    extension = {'query':query, 'timer_vals':timer_vals}
    return render_template('timer.html', saves=data, **extension)

# !!! refactor this, possibly deprecate cookie
@app.route('/recipes')
def load_recipes():
    all_files = os.listdir(FPATH)
    recipes = []
    # we only populate .xml files
    for recipe in all_files:
        if recipe.split('.')[-1] == 'xml':
            name = '.'.join(recipe.split('.')[:-1])
            recipes.append(name)
    #data = get_saved_data()
    return render_template('recipes.html', recipes=recipes)


@app.route('/save', methods=['POST'])
def save():
    response = make_response(redirect(url_for('timer')))
    # here you can get a cookie, but how do I do this without that?
    data = get_saved_data()
    data.update(dict(request.form.items()))
    response.set_cookie('recipe_name', json.dumps(data))
    return response


@app.route('/saverecipe', methods=['POST'])
def saverecipe():
    response = make_response(redirect(url_for('index')))
    # we make this global so it is accesible in index function
    global recipe_name
    # key is 'recipe'
    recipe_name = dict(request.form.items())
    return response







app.run(debug=True, port=8000, host='0.0.0.0')
