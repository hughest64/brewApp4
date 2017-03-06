from flask import Flask, render_template, redirect, url_for, request, make_response
import random
import os
import json

app = Flask(__name__)
# may move this locally to the recipes view
FPATH = os.getcwd() +'\\recipes\\'

def new_url():
    query = random.randint(100000000, 999999999)
    return '?q={}'.format(query)


def get_saved_data():
    try:
        data = json.loads(request.cookies.get('recipe_name'))
    except TypeError:
        data = {}
    return data


# this view will alter greatly
@app.route('/')
@app.route('/<int:sec>')
def index():
    query = new_url()
    timer_vals = {'MN':0, 'SEC':10}
    extension = {'timer_vals':timer_vals, 'query':query}
    return render_template('index.html', **extension)


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


@app.route('/recipes')
def load_recipes():
    all_files = os.listdir(FPATH)
    recipes = []
    # we only populate .xml files
    for recipe in all_files:
        if recipe.split('.')[-1] == 'xml':
            name = '.'.join(recipe.split('.')[:-1])
            recipes.append(name)
    data = get_saved_data()
    return render_template('recipes.html', saves=data,  recipes=recipes)


@app.route('/save', methods=['POST'])
def save():
    response = make_response(redirect(url_for('timer')))
    # here you can get a cookie, but how do I do this without that?
    data = get_saved_data()
    data.update(dict(request.form.items()))
    response.set_cookie('recipe_name', json.dumps(data))
    return response








app.run(debug=True, port=8000, host='0.0.0.0')
