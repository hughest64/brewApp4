from flask import Flask, render_template, redirect, url_for
import random

app = Flask(__name__)

is_running = False

def new_url():
    query = random.randint(100000000, 999999999)
    return '?q={}'.format(query)


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
    query = new_url()
    timer_vals = {'minutes':0, 'seconds':20}
    extension = {'query':query, 'timer_vals':timer_vals}
    return render_template('timer.html', **extension)


@app.route('/save', methods=["POST"])
def save():
    return redirect(url_for('index'))








app.run(debug=True, port=8000, host='0.0.0.0')
