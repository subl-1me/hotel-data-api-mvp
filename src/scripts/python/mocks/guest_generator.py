#!/usr/bin/env python3
import json
import random
import time
import uuid
from typing import List, Dict
import requests

class GuestGenerator:
    def __init__(self, count: int = 100):
        self.count = count
        self.first_names = ["John", "Jane", "Robert", "Emily", "Michael", "Sarah"]
        self.last_names = ["Smith", "Johnson", "Williams", "Brown", "Jones"]
        self.domains = ["gmail.com", "yahoo.com", "hotmail.com", "example.com"]
    
    def generate_guest(self) -> Dict:
        first = random.choice(self.first_names)
        last = random.choice(self.last_names)
        timestamp = str(time.time())
        email = f"{first.lower()}-{timestamp}-{last.lower()}@{random.choice(self.domains)}"
        
        return {
            "id": str(uuid.uuid4()),
            "names": first,
            "surnames": last,
            "email": email,
            "phone": f"+1-{random.randint(200, 999)}-{random.randint(200, 999)}-{random.randint(1000, 9999)}",
            "reservations": "[]"
        }
    
    def generate_all(self) -> List[Dict]:
        guests = []
        for i in range(self.count):
            guests.append(self.generate_guest())
        return guests
    
    def save_to_json(self, filename: str = "guests_mock.json"):
        guests = self.generate_all()
        with open(filename, 'w') as f:
            json.dump(guests, f, indent=2)
        print(f"Generated {len(guests)} guests in {filename}")

if __name__ == "__main__":
    import sys
    count = int(sys.argv[1]) if len(sys.argv) > 1 else 50
    generator = GuestGenerator(count)
    
    url = "http://localhost:5000/api/guests"
    guests = generator.generate_all()
    # send to API
    for guest in guests:
        response = requests.post(url, json=guest)
        print(response.json())
        print(guest)
    
    
    
    # generator.save_to_json() 