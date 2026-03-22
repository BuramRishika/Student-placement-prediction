from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle
import os
from utils.preprocess import extract_features

app = Flask(__name__)
CORS(app)  # Allow requests from React frontend

# Load model
model_path = os.path.join(os.path.dirname(__file__), 'model', 'placement_model.pkl')
model = None

try:
    with open(model_path, 'rb') as f:
        model = pickle.load(f)
    print("Model loaded successfully.")
except FileNotFoundError:
    print("WARNING: Model not found. Run train_model.py first.")


@app.route('/predict', methods=['POST'])
def predict():
    if model is None:
        return jsonify({"error": "Model not loaded. Run train_model.py first."}), 500

    data = request.json
    if not data:
        return jsonify({"error": "No input data provided."}), 400

    try:
        features = extract_features(data)
        prediction = model.predict(features)[0]
        confidence = float(max(model.predict_proba(features)[0]))

        return jsonify({
            "prediction": "Placed" if int(prediction) == 1 else "Not Placed",
            "confidence": round(confidence, 4)
        })
    except ValueError as e:
        return jsonify({"error": str(e)}), 400
    except Exception as e:
        return jsonify({"error": "Prediction failed.", "details": str(e)}), 500


@app.route('/health', methods=['GET'])
def health():
    return jsonify({"status": "ok", "model_loaded": model is not None})


if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
