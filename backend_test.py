#!/usr/bin/env python3

import requests
import sys
import json
from datetime import datetime
from typing import Dict, Any

class ArkaaScopesAPITester:
    def __init__(self, base_url="https://green-build-premium.preview.emergentagent.com"):
        self.base_url = base_url
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name: str, success: bool, details: str = ""):
        """Log test result"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
        
        result = {
            "test_name": name,
            "success": success,
            "details": details,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        
        status = "✅ PASSED" if success else "❌ FAILED"
        print(f"{status} - {name}")
        if details:
            print(f"   Details: {details}")

    def run_test(self, name: str, method: str, endpoint: str, expected_status: int, data: Dict[Any, Any] = None) -> tuple:
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        headers = {'Content-Type': 'application/json'}

        print(f"\n🔍 Testing {name}...")
        print(f"   URL: {url}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=headers, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")

            success = response.status_code == expected_status
            
            if success:
                try:
                    response_data = response.json()
                    details = f"Status: {response.status_code}, Response: {json.dumps(response_data, indent=2)}"
                except:
                    details = f"Status: {response.status_code}, Response: {response.text[:200]}"
            else:
                details = f"Expected {expected_status}, got {response.status_code}. Response: {response.text[:200]}"

            self.log_test(name, success, details)
            return success, response.json() if success and response.content else {}

        except requests.exceptions.Timeout:
            details = "Request timed out after 10 seconds"
            self.log_test(name, False, details)
            return False, {}
        except requests.exceptions.ConnectionError:
            details = "Connection error - server may be down"
            self.log_test(name, False, details)
            return False, {}
        except Exception as e:
            details = f"Error: {str(e)}"
            self.log_test(name, False, details)
            return False, {}

    def test_health_endpoint(self):
        """Test health check endpoint"""
        return self.run_test(
            "Health Check",
            "GET",
            "api/health",
            200
        )

    def test_root_endpoint(self):
        """Test root API endpoint"""
        return self.run_test(
            "Root API Endpoint",
            "GET",
            "api/",
            200
        )

    def test_create_enquiry_valid(self):
        """Test creating a valid enquiry"""
        test_data = {
            "name": "John Doe",
            "email": "john.doe@example.com",
            "phone": "9876543210",
            "budget": "60-80",
            "package_interest": "solara",
            "message": "Interested in eco-luxury home construction"
        }
        
        success, response = self.run_test(
            "Create Valid Enquiry",
            "POST",
            "api/enquiries",
            200,
            test_data
        )
        
        if success:
            # Verify response structure
            required_fields = ['success', 'message', 'enquiry_id', 'whatsapp_link']
            missing_fields = [field for field in required_fields if field not in response]
            
            if missing_fields:
                self.log_test(
                    "Enquiry Response Structure",
                    False,
                    f"Missing fields: {missing_fields}"
                )
            else:
                self.log_test(
                    "Enquiry Response Structure",
                    True,
                    "All required fields present"
                )
                
                # Verify WhatsApp link format
                whatsapp_link = response.get('whatsapp_link', '')
                if whatsapp_link.startswith('https://wa.me/'):
                    self.log_test(
                        "WhatsApp Link Format",
                        True,
                        f"Valid WhatsApp link: {whatsapp_link[:50]}..."
                    )
                else:
                    self.log_test(
                        "WhatsApp Link Format",
                        False,
                        f"Invalid WhatsApp link format: {whatsapp_link}"
                    )
        
        return success, response

    def test_create_enquiry_minimal(self):
        """Test creating enquiry with minimal required fields"""
        test_data = {
            "name": "Jane Smith",
            "email": "jane.smith@example.com",
            "phone": "9876543211"
        }
        
        return self.run_test(
            "Create Minimal Enquiry",
            "POST",
            "api/enquiries",
            200,
            test_data
        )

    def test_create_enquiry_invalid_email(self):
        """Test creating enquiry with invalid email"""
        test_data = {
            "name": "Invalid User",
            "email": "invalid-email",
            "phone": "9876543212"
        }
        
        return self.run_test(
            "Create Enquiry - Invalid Email",
            "POST",
            "api/enquiries",
            422,  # Validation error
            test_data
        )

    def test_create_enquiry_missing_fields(self):
        """Test creating enquiry with missing required fields"""
        test_data = {
            "name": "Incomplete User"
            # Missing email and phone
        }
        
        return self.run_test(
            "Create Enquiry - Missing Fields",
            "POST",
            "api/enquiries",
            422,  # Validation error
            test_data
        )

    def test_get_enquiries(self):
        """Test getting all enquiries (admin endpoint)"""
        return self.run_test(
            "Get All Enquiries",
            "GET",
            "api/enquiries",
            200
        )

    def test_status_endpoints(self):
        """Test status check endpoints"""
        # Create status check
        test_data = {
            "client_name": "Test Client"
        }
        
        success, response = self.run_test(
            "Create Status Check",
            "POST",
            "api/status",
            200,
            test_data
        )
        
        # Get status checks
        self.run_test(
            "Get Status Checks",
            "GET",
            "api/status",
            200
        )
        
        return success, response

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting Arkaa Scapes API Tests")
        print("=" * 50)
        
        # Basic connectivity tests
        self.test_health_endpoint()
        self.test_root_endpoint()
        
        # Enquiry tests
        self.test_create_enquiry_valid()
        self.test_create_enquiry_minimal()
        self.test_create_enquiry_invalid_email()
        self.test_create_enquiry_missing_fields()
        self.test_get_enquiries()
        
        # Status tests
        self.test_status_endpoints()
        
        # Print summary
        print("\n" + "=" * 50)
        print(f"📊 Test Summary: {self.tests_passed}/{self.tests_run} tests passed")
        
        if self.tests_passed == self.tests_run:
            print("🎉 All tests passed!")
            return 0
        else:
            print(f"⚠️  {self.tests_run - self.tests_passed} tests failed")
            return 1

    def get_test_results(self):
        """Return detailed test results"""
        return {
            "total_tests": self.tests_run,
            "passed_tests": self.tests_passed,
            "failed_tests": self.tests_run - self.tests_passed,
            "success_rate": (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0,
            "test_details": self.test_results
        }

def main():
    tester = ArkaaScopesAPITester()
    exit_code = tester.run_all_tests()
    
    # Save detailed results
    results = tester.get_test_results()
    with open('/app/backend_test_results.json', 'w') as f:
        json.dump(results, f, indent=2)
    
    print(f"\n📄 Detailed results saved to: /app/backend_test_results.json")
    return exit_code

if __name__ == "__main__":
    sys.exit(main())