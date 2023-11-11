from flask import Flask

import comparison

app = Flask(__name__)


@app.route('/infer')
def infer():
    return model.cool_thing()


@app.route('/compare')
def compare(frames1, frames2):
    return comparison.score(frames1, frames2)


if __name__ == '__main__':
    app.run(debug=True)
