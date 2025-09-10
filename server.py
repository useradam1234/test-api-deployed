from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)


CORS(app, resources={
    r"/*": {
        "origins": "http://localhost:5000", 
        "methods": ["GET", "POST", "OPTIONS"],
        "allow_headers": ["Content-Type"]
    }
})

PORT = 5001


@app.route("/api/crm", methods=["POST"])
def crm_endpoint():
    payload = request.get_json()
    print("payload :", payload)

    return jsonify({
        "success": True,
        "message": "Payload received",
        "received": payload
    }), 200

@app.route("/", methods=["GET"])
def health_check():
    return "crm test ", 200

if __name__ == "__main__":
    print(f"running  at port : {PORT}")
    app.run(host="0.0.0.0", port=PORT, debug=True)
