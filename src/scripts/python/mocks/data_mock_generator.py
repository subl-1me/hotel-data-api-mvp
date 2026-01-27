# FOR MVP TESTING ONLY
import requests
import uuid
import random
from datetime import datetime, timedelta
import json
import time
from typing import List, Dict, Any
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

class MockDataGenerator:
    def __init__(self, api_base_url: str):
        """Mock data generator for Hotel AI Assistant API"""
        self.api_base_url = api_base_url.rstrip('/')
        
        # spanish testing
        self.first_names = [
            "Juan", "María", "Carlos", "Ana", "Luis", "Laura", "Pedro", "Sofía",
            "Miguel", "Elena", "David", "Isabel", "Javier", "Carmen", "Daniel",
            "Patricia", "Alejandro", "Rosa", "Francisco", "Marta", "José", "Lucía",
            "Antonio", "Paula", "Manuel", "Cristina", "Jorge", "Teresa", "Sergio", "Nuria"
        ]
        
        self.last_names = [
            "García", "Rodríguez", "González", "Fernández", "López", "Martínez",
            "Sánchez", "Pérez", "Gómez", "Martín", "Jiménez", "Ruiz", "Hernández",
            "Díaz", "Moreno", "Muñoz", "Álvarez", "Romero", "Alonso", "Gutiérrez",
            "Navarro", "Torres", "Domínguez", "Vázquez", "Ramos", "Gil", "Ramírez",
            "Serrano", "Blanco", "Molina"
        ]
        
        self.email_domains = ["gmail.com", "yahoo.com", "hotmail.com", "outlook.com", "icloud.com"]
        self.room_types = ["SINGLE", "DOUBLE", "SUITE"]
        self.statuses = ["CONFIRMED", "CHECKED_IN", "CHECKED_OUT", "CANCELLED", "NO_SHOW"]
        self.payment_statuses = ["PAID", "PENDING", "PARTIAL_PAID", "PRE_PAID"]
        self.country_codes = ["+1", "+34", "+52", "+51", "+57", "+58", "+54"]
    
    def generate_guest(self, with_reservations: bool = False) -> Dict[str, Any]:
        """generate guest mock"""
        # names
        first_name = random.choice(self.first_names)
        last_name = random.choice(self.last_names)
        
        # email based on name
        email = f"{first_name.lower()}.{last_name.lower()}{random.randint(1, 99)}@{random.choice(self.email_domains)}"
        
        # phone
        phone = f"{random.choice(self.country_codes)} {random.randint(600, 699)} {random.randint(100, 999)} {random.randint(100, 999)}"
        
        guest = {
            "guestId": str(uuid.uuid4()),
            "names": first_name,
            "surnames": last_name,
            "email": email,
            "phone": phone,
            "reservations": [],
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
        
        return guest
    
    def generate_reservation(self, guest_id: str = None) -> Dict[str, Any]:
        today = datetime.now()
        days_in_future = random.randint(1, 60)
        date_in = today + timedelta(days=days_in_future)
        stay_duration = random.randint(1, 14)
        date_out = date_in + timedelta(days=stay_duration)
        
        # mock rates
        rates = {
            "room_rate": round(random.uniform(50, 300), 2),
            "taxes": round(random.uniform(5, 30), 2),
            "services": round(random.uniform(0, 50), 2),
            "total": 0  
        }
        rates["total"] = rates["room_rate"] + rates["taxes"] + rates["services"]
        
        # confirmation number
        confirmation = f"{random.randint(100000, 999999)}"
        
        reservation = {
            "reservationId": str(uuid.uuid4()),
            "guest": guest_id,
            "dateIn": date_in.strftime("%Y-%m-%d"),
            "dateOut": date_out.strftime("%Y-%m-%d"),
            "rates": rates,
            "roomType": random.choice(self.room_types),
            "status": random.choice(self.statuses),
            "paymentStatus": random.choice(self.payment_statuses),
            "confirmation": confirmation,
            "createdAt": datetime.now().isoformat(),
            "updatedAt": datetime.now().isoformat()
        }
        
        return reservation
    
    def send_guest_to_api(self, guest_data: Dict[str, Any], endpoint: str = "/guests") -> bool:
        """Envía un guest a la API"""
        try:
            url = f"{self.api_base_url}{endpoint}"
            
            if "createdAt" in guest_data and isinstance(guest_data["createdAt"], datetime):
                guest_data["createdAt"] = guest_data["createdAt"].isoformat()
            if "updatedAt" in guest_data and isinstance(guest_data["updatedAt"], datetime):
                guest_data["updatedAt"] = guest_data["updatedAt"].isoformat()
            
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            logger.info(guest_data)
            response = requests.post(url, json=guest_data, headers=headers)
            
            if response.status_code in [200, 201]:
                logger.info(f"New mock guest created: {guest_data['email']}")
                return True
            else:
                logger.error(f"Error creating mock guest: {response.status_code} - {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Connection error: {e}")
            return False
    
    def send_reservation_to_api(self, reservation_data: Dict[str, Any], endpoint: str = "/reservations") -> bool:
        try:
            url = f"{self.api_base_url}{endpoint}"
            
            for date_field in ["createdAt", "updatedAt"]:
                if date_field in reservation_data and isinstance(reservation_data[date_field], datetime):
                    reservation_data[date_field] = reservation_data[date_field].isoformat()
            
            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            logger.info(reservation_data)
            response = requests.post(url, json=reservation_data, headers=headers)
            
            if response.status_code in [200, 201]:
                logger.info(f"New mock Reservation created: {reservation_data['confirmation']}")
                return True
            else:
                logger.error(f"Error creating mock reservation: {response.status_code} - {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Connection error: {e}")
            return False
    
    def update_guest_reservation_items(self, guest_id: str, reservation: Dict[str, Any], endpoint: str = "/guests") -> bool:
        try:
            guest_url = f"{self.api_base_url}{endpoint}/{guest_id}"

            headers = {
                "Content-Type": "application/json",
                "Accept": "application/json"
            }
            
            logger.info(guest_url)
            guest_guest_response = requests.get(guest_url, headers)
            guest = guest_guest_response.json()
            guest["reservations"] = json.loads(guest["reservations"])
            guest["reservations"].append(reservation["reservationId"])
            logger.info(guest)
            response = requests.put(guest_url, json=guest, headers=headers)
            logger.info(response)
            
            if response.status_code in [200, 201]:
                logger.info(f"Guest's reservations upated: {response}")
                return True
            else:
                logger.error(f"Error trying to update guest's reservations: {response.status_code} - {response.text}")
                return False
                
        except requests.exceptions.RequestException as e:
            logger.error(f"Connection error: {e}")
            return False
    
    def generate_and_send_batch(self, num_guests: int = 10, reservations_per_guest: int = 2):
        logger.info(f"Working...")
        
        successful_guests = 0
        successful_reservations = 0
        
        for i in range(num_guests):
            try:
                logger.info(f"Processing guest {i+1}/{num_guests}...")
                
                # guest
                guest = self.generate_guest()
                
                # send to api
                if self.send_guest_to_api(guest):
                    successful_guests += 1
                    
                    # generate reservations
                    for j in range(reservations_per_guest):
                        logger.info(guest)
                        reservation = self.generate_reservation(guest["guestId"])
                        if self.send_reservation_to_api(reservation):
                            successful_reservations += 1
                            # update
                            update = self.update_guest_reservation_items(guest['guestId'], reservation)
                        else:
                            logger.warning(f"Error creating reservation # {j+1} for guest # {i+1}")
                        
            except Exception as e:
                logger.error(f"An unexpected error occured on guest # {i+1}: {e}")
                continue
        
        logger.info(f"Process completed.")
        logger.info(f"Mock guests generated: {successful_guests}/{num_guests}")
        logger.info(f"Mock reservation generated: {successful_reservations}/{num_guests * reservations_per_guest}")

def main():
    # Main config
    API_BASE_URL = "http://localhost:5009/api"  # default
    NUM_GUESTS = 5 # default
    RESERVATIONS_PER_GUEST = 2 # reservation per guest default
    
    # init generator
    generator = MockDataGenerator(API_BASE_URL)
    
    # menu
    print("\n" + "="*50)
    print("HOTEL AI ASSISTANT - MOCK DATA GENERATOR")
    print("="*50)
    print("1. Generate full data (guests + reservations)")
    print("5. Salir")
    
    try:
        option = input("\nSelect an option (1-5): ").strip()

        if option == "1":
            num_guests = int(input(f"Total guest to create [{NUM_GUESTS}]: ") or NUM_GUESTS)
            reservations_per_guest = int(input(f"Reservations per guest [{RESERVATIONS_PER_GUEST}]: ") or RESERVATIONS_PER_GUEST)
            
            print(f"\nGenerating {num_guests} guests with {reservations_per_guest} reservations...")
            generator.generate_and_send_batch(num_guests, reservations_per_guest)
        elif option == "5":
            print("\n Exiting...")
            return
        else:
            print("\n Invalid option. Please try again.")
            
    except ValueError as e:
        print(f"\n Value error: {e}")
    except KeyboardInterrupt:
        print("\n\n Script interrupted by user. Exiting...")
    except Exception as e:
        print(f"\n Unexpected error: {e}")

if __name__ == "__main__":
    main()