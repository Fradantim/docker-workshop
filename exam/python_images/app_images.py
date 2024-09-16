# pip install flask

import os
from flask import Flask, request, jsonify, send_from_directory
from werkzeug.utils import secure_filename

app = Flask(__name__)

# Folder where images are stored
UPLOAD_FOLDER = os.environ.get('UPLOAD_FOLDER', 'default_uploads_directory')

os.makedirs(UPLOAD_FOLDER, exist_ok=True)

ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# ex: curl -X POST -F 'file=@file.png' http://localhost:5000/upload
@app.route('/upload', methods=['POST'])
def upload_image():
    if 'file' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['file']
    
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        
        # Guardar imagen en la carpeta
        file.save(filepath)

        return jsonify({"message": f"Image {filename} uploaded successfully!"}), 201
    else:
        return jsonify({"error": "Invalid file type"}), 400

@app.route('/images', methods=['GET'])
def list_images():
    files = os.listdir(app.config['UPLOAD_FOLDER'])
    images = [file for file in files if allowed_file(file)]
    return jsonify(images), 200

@app.route('/health', methods=['GET'])
def health():
    return "Everything is awesome", 200

@app.route('/images/<filename>', methods=['GET'])
def get_image(filename):
    if allowed_file(filename):
        try:
            return send_from_directory(app.config['UPLOAD_FOLDER'], filename)
        except FileNotFoundError:
            return jsonify({"error": "File not found"}), 404
    else:
        return jsonify({"error": "Invalid file type"}), 400

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)

