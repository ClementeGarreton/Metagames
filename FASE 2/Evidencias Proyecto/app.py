import os
import sqlite3
import json
from flask import Flask, request, g, jsonify, render_template_string
from flask_cors import CORS

# ================= CONFIG =================
app = Flask(__name__, instance_relative_config=True)
CORS(app, origins=["https://metagameslatam.com", "http://localhost:5173"])

# Carpeta instance
os.makedirs(app.instance_path, exist_ok=True)

# Base de datos SQLite
DB_PATH = os.path.join(app.instance_path, "prospectos.db")

def get_db():
    if "db" not in g:
        g.db = sqlite3.connect(DB_PATH)
        g.db.row_factory = sqlite3.Row
    return g.db

@app.teardown_appcontext
def close_db(exception):
    db = g.pop("db", None)
    if db is not None:
        db.close()

def init_db():
    db = get_db()
    db.execute("""
        CREATE TABLE IF NOT EXISTS prospectos (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nombre_completo TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE,
            telefono TEXT,
            fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    """)
    db.commit()

# ================= JSON WINNERS =================
DATA_DIR = os.path.join(app.instance_path, "data")
EMAIL_FILE = os.path.join(DATA_DIR, "emails.json")
os.makedirs(DATA_DIR, exist_ok=True)
if not os.path.exists(EMAIL_FILE):
    with open(EMAIL_FILE, 'w') as f:
        json.dump([], f, indent=4)

def load_emails():
    with open(EMAIL_FILE, 'r') as f:
        return json.load(f)

def save_emails(data):
    with open(EMAIL_FILE, 'w') as f:
        json.dump(data, f, indent=4)

# ================= RUTAS =================

@app.route("/")
def home():
    return "<h1>Servidor Flask Activo</h1>"

# Agregar ganador email+score
@app.route("/api/add_email", methods=["POST"])
def add_email():
    try:
        data = request.get_json()
        email = data.get("email")
        score = data.get("score")
        if not email or score is None:
            return jsonify({"error": "Faltan datos: email o score"}), 400
        emails = load_emails()
        emails.append({"email": email, "score": score})
        save_emails(emails)
        return jsonify({"message": "Email y score guardados correctamente"}), 201
    except Exception as e:
        return jsonify({"error": f"Error en el servidor: {e}"}), 500

# Listar ganadores
@app.route("/api/winners", methods=["GET"])
def list_winners():
    return jsonify(load_emails())

# Registrar prospecto
@app.route("/prospectos", methods=["POST"])
def add_prospecto():
    data = request.get_json()
    if not data or "nombre" not in data or "email" not in data:
        return jsonify({"error": "Faltan datos requeridos"}), 400
    try:
        db = get_db()
        db.execute(
            "INSERT OR IGNORE INTO prospectos (nombre_completo, email, telefono) VALUES (?, ?, ?)",
            (data["nombre"], data["email"], data.get("telefono"))
        )
        db.commit()
        return jsonify({"message": "Prospecto registrado correctamente"}), 200
    except Exception as e:
        return jsonify({"error": f"Error en el servidor: {e}"}), 500

# Ver prospectos con estilo
@app.route("/view_prospectos", methods=["GET"])
def view_prospectos():
    db = get_db()
    rows = db.execute("SELECT * FROM prospectos ORDER BY fecha_registro DESC").fetchall()

    html = """
    <!DOCTYPE html>
    <html lang="es">
    <head>
        <meta charset="UTF-8">
        <title>Prospectos Registrados</title>
        <style>
            body { font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; background:#1a1a1a; color:#f0f0f0; padding:2rem;}
            h2 { text-align:center; color:#ff9900; margin-bottom:1rem; }
            table { border-collapse: collapse; width:90%; margin:auto; background:#2a2a2a; border-radius:8px; overflow:hidden; box-shadow:0 0 10px rgba(0,0,0,0.5);}
            th, td { padding:12px 15px; text-align:left; }
            th { background: linear-gradient(90deg, #ff9900, #ff5500); color:white; text-transform:uppercase; }
            tr:nth-child(even) { background:#333; }
            tr:hover { background:#444; cursor:pointer; }
        </style>
    </head>
    <body>
        <h2>Prospectos Registrados</h2>
        <table>
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Nombre</th>
                    <th>Email</th>
                    <th>Teléfono</th>
                    <th>Fecha de Registro</th>
                </tr>
            </thead>
            <tbody>
            {% for row in rows %}
                <tr>
                    <td>{{ row['id'] }}</td>
                    <td>{{ row['nombre_completo'] }}</td>
                    <td>{{ row['email'] }}</td>
                    <td>{{ row['telefono'] or '-' }}</td>
                    <td>{{ row['fecha_registro'] }}</td>
                </tr>
            {% endfor %}
            </tbody>
        </table>
    </body>
    </html>
    """
    return render_template_string(html, rows=rows)

# ================= RUN =================
if __name__ == "__main__":
    with app.app_context():
        init_db()
    app.run(debug=True, port=5000)
