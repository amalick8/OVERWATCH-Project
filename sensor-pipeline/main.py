import cv2
import numpy as np
import requests
import time
import os
import random
from dotenv import load_dotenv

load_dotenv()

# Configuration
API_URL = os.getenv('API_URL', 'http://localhost:5001/api/live/update')
LOCATION_ID = os.getenv('LOCATION_ID', '656565656565656565656565') # Replace with actual ID
CAMERA_ID = 0 # Default camera
DUMMY_MODE = os.getenv('DUMMY_MODE', 'True').lower() == 'true'

def detect_movement(frame, prev_frame):
    if prev_frame is None:
        return 0
    
    diff = cv2.absdiff(prev_frame, frame)
    gray = cv2.cvtColor(diff, cv2.COLOR_BGR2GRAY)
    blur = cv2.GaussianBlur(gray, (5, 5), 0)
    _, thresh = cv2.threshold(blur, 20, 255, cv2.THRESH_BINARY)
    dilated = cv2.dilate(thresh, None, iterations=3)
    contours, _ = cv2.findContours(dilated, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
    
    movement_score = 0
    for contour in contours:
        if cv2.contourArea(contour) < 900:
            continue
        movement_score += 1
        
    return movement_score

def estimate_occupancy(frame):
    # In a real scenario, this would use a people detection model like YOLO or SSD.
    # For this prototype, we'll simulate it or use basic blob detection.
    if DUMMY_MODE:
        return random.randint(5, 50)
    
    # Placeholder for actual detection logic
    return random.randint(5, 50)

def main():
    print(f"Starting Sensor Pipeline... Dummy Mode: {DUMMY_MODE}")
    
    cap = None
    if not DUMMY_MODE:
        cap = cv2.VideoCapture(CAMERA_ID)
    
    prev_frame = None
    
    while True:
        try:
            if DUMMY_MODE:
                # Simulate data
                busyness_score = random.randint(0, 100)
                occupancy = random.randint(0, 50)
                movement_score = random.randint(0, 20)
                time.sleep(5) # Update every 5 seconds
            else:
                ret, frame = cap.read()
                if not ret:
                    print("Failed to grab frame")
                    break
                
                # Resize for performance
                frame = cv2.resize(frame, (640, 480))
                
                movement = detect_movement(frame, prev_frame)
                prev_frame = frame
                
                occupancy = estimate_occupancy(frame)
                movement_score = movement
                
                # Calculate busyness score based on movement and occupancy
                # Normalize to 0-100
                busyness_score = min(100, (occupancy * 2) + (movement_score * 5))
                
                # Display feed (optional, for debugging)
                cv2.imshow('Overwatch Sensor Feed', frame)
                if cv2.waitKey(1) & 0xFF == ord('q'):
                    break
                
                time.sleep(5) # Send updates every 5 seconds

            payload = {
                'locationId': LOCATION_ID,
                'busynessScore': busyness_score,
                'occupancy': occupancy,
                'movementScore': movement_score
            }
            
            print(f"Sending update: {payload}")
            try:
                response = requests.post(API_URL, json=payload)
                print(f"Status: {response.status_code}")
            except Exception as e:
                print(f"Error sending update: {e}")

        except KeyboardInterrupt:
            break
    
    if cap:
        cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
