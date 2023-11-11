from flask import Flask, request

import comparison
from yolo import inference

app = Flask(__name__)


@app.route('/infer', methods=['GET'])
def infer():
    # parameter 'video' - link or path
    return inference(request.args.get('video'))


@app.route('/compare', methods=['POST'])
def compare():
    frames1 = request.form.get('frames1')
    frames2 = request.form.get('frames2')
    return str(comparison.score(frames1, frames2))


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")
