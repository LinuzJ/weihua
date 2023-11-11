from flask import Flask, jsonify

app = Flask(__name__)

@app.route('/yolo_model', methods=['GET'])
def get_yolo_model():

    return jsonify({'message': 'Hello, World!'})

if __name__ == '__main__':
    app.run(debug=True)