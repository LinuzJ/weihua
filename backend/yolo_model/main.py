from flask import Flask, request, jsonify

import comparison
from yolo import inference

app = Flask(__name__)


@app.route('/infer', methods=['GET'])
def infer():
    # parameter 'video' - link or path
    return jsonify(inference(request.args.get('video')))


@app.route('/compare')
def compare():
    frames1 = request.args.get('frames1')
    frames2 = request.args.get('frames2')
    return comparison.score(frames1, frames2)


if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0")
