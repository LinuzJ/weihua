import model
from flask import Flask, jsonify
app = Flask(__name__)

@app.route('/yolo_model', methods=['GET'])
def get_yolo_model():
    re = model.cool_thing() 
    return jsonify({'message': re})

if __name__ == '__main__':
    app.run(debug=True)