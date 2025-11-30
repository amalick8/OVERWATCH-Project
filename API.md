# API Documentation

Base URL: `http://localhost:5000/api`

## Auth

- `POST /users`: Register a new user.
- `POST /users/login`: Login user.
- `GET /users/profile`: Get user profile (Protected).

## Locations

- `GET /locations`: Get all locations.
- `POST /locations`: Create a location (Protected).
- `GET /locations/:id`: Get location by ID.
- `PUT /locations/:id`: Update location (Protected).
- `DELETE /locations/:id`: Delete location (Protected).

## Live Status

- `POST /live/update`: Update live status (Sensor).
- `GET /live/:locationId`: Get current live status.
- `GET /live/:locationId/history`: Get live status history.

## Models

### User
- name
- email
- password
- role (student, business, admin)

### Location
- name
- type
- capacity
- address
- description
- owner (User)

### LiveStatus
- location (Location)
- busynessScore (0-100)
- occupancy
- movementScore
- timestamp
