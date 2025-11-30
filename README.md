# OVERWATCH

Overwatch is a real-time environment-awareness platform that lets apps see the real world (busyness, crowd levels, line lengths, traffic, occupancy, etc.) via sensors, cameras, and live data.

## Project Structure

- **overwatch-backend**: Node.js + Express + MongoDB backend API.
- **overwatch-frontend**: React + Vite + Tailwind frontend dashboard.
- **sensor-pipeline**: Python script for motion detection and busyness scoring.
- **environment**: Environment configuration files.

## Features

- **Real-time Busyness Scoring**: Calculates busyness based on motion and occupancy.
- **Live Dashboard**: View live status of locations.
- **Location Management**: Add and manage locations (gyms, libraries, etc.).
- **User Authentication**: JWT-based authentication for users and business owners.
- **Admin Panel**: Verify businesses and manage system.

## Quick Start

1.  **Backend**:
    ```bash
    cd overwatch-backend
    npm install
    npm start
    ```

2.  **Frontend**:
    ```bash
    cd overwatch-frontend
    npm install
    npm run dev
    ```

3.  **Sensor Pipeline**:
    ```bash
    cd sensor-pipeline
    pip install -r requirements.txt
    python main.py
    ```

See [SETUP.md](SETUP.md) for detailed instructions.
