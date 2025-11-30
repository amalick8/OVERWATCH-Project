# Setup Instructions

## Prerequisites

- Node.js (v16+)
- Python (v3.8+)
- MongoDB (Local or Atlas)

## 1. Environment Setup

Copy the example environment file to the backend directory:

```bash
cp environment/.env.example overwatch-backend/.env
```

Edit `overwatch-backend/.env` with your MongoDB URI and JWT Secret.

## 2. Backend Setup

```bash
cd overwatch-backend
npm install
npm start
```

The server will run on port 5000.

## 3. Frontend Setup

```bash
cd overwatch-frontend
npm install
npm run dev
```

The frontend will run on port 5173 (usually).

## 4. Sensor Pipeline Setup

```bash
cd sensor-pipeline
pip install -r requirements.txt
```

Create a `.env` file in `sensor-pipeline` if needed (see `main.py` for variables).

Run the pipeline:

```bash
python main.py
```

By default, it runs in DUMMY_MODE, simulating data updates.
