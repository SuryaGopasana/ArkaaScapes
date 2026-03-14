from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Define Models
class EnquiryCreate(BaseModel):
    name: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    phone: str = Field(..., min_length=10, max_length=15)
    budget: Optional[str] = None
    message: Optional[str] = None
    package_interest: Optional[str] = None

class Enquiry(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str
    email: str
    phone: str
    budget: Optional[str] = None
    message: Optional[str] = None
    package_interest: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))
    status: str = "new"

class EnquiryResponse(BaseModel):
    success: bool
    message: str
    enquiry_id: Optional[str] = None
    whatsapp_link: Optional[str] = None

class StatusCheck(BaseModel):
    model_config = ConfigDict(extra="ignore")
    
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class StatusCheckCreate(BaseModel):
    client_name: str

# WhatsApp configuration - placeholder number
WHATSAPP_NUMBER = os.environ.get('WHATSAPP_NUMBER', '919999999999')

def generate_whatsapp_link(enquiry: Enquiry) -> str:
    """Generate WhatsApp click-to-chat link with pre-filled message"""
    message = f"""🏠 New Enquiry from Arkaa Scapes Website

*Name:* {enquiry.name}
*Email:* {enquiry.email}
*Phone:* {enquiry.phone}
*Budget:* {enquiry.budget or 'Not specified'}
*Package Interest:* {enquiry.package_interest or 'Not specified'}

*Message:*
{enquiry.message or 'No additional message'}

---
Enquiry ID: {enquiry.id}"""
    
    # URL encode the message
    import urllib.parse
    encoded_message = urllib.parse.quote(message)
    return f"https://wa.me/{WHATSAPP_NUMBER}?text={encoded_message}"

# Routes
@api_router.get("/")
async def root():
    return {"message": "Arkaa Scapes API - Building Tomorrow's Legacy, Today"}

@api_router.post("/enquiries", response_model=EnquiryResponse)
async def create_enquiry(input: EnquiryCreate):
    """Create a new enquiry and return WhatsApp link"""
    try:
        enquiry_data = input.model_dump()
        enquiry = Enquiry(**enquiry_data)
        
        # Prepare document for MongoDB
        doc = enquiry.model_dump()
        doc['created_at'] = doc['created_at'].isoformat()
        
        # Insert into database
        await db.enquiries.insert_one(doc)
        
        # Generate WhatsApp link
        whatsapp_link = generate_whatsapp_link(enquiry)
        
        return EnquiryResponse(
            success=True,
            message="Thank you for your interest! We'll contact you shortly.",
            enquiry_id=enquiry.id,
            whatsapp_link=whatsapp_link
        )
    except Exception as e:
        logging.error(f"Error creating enquiry: {e}")
        raise HTTPException(status_code=500, detail="Failed to submit enquiry")

@api_router.get("/enquiries", response_model=List[Enquiry])
async def get_enquiries():
    """Get all enquiries (admin endpoint)"""
    enquiries = await db.enquiries.find({}, {"_id": 0}).to_list(1000)
    for enquiry in enquiries:
        if isinstance(enquiry.get('created_at'), str):
            enquiry['created_at'] = datetime.fromisoformat(enquiry['created_at'])
    return enquiries

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.model_dump()
    status_obj = StatusCheck(**status_dict)
    
    doc = status_obj.model_dump()
    doc['timestamp'] = doc['timestamp'].isoformat()
    
    await db.status_checks.insert_one(doc)
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find({}, {"_id": 0}).to_list(1000)
    for check in status_checks:
        if isinstance(check['timestamp'], str):
            check['timestamp'] = datetime.fromisoformat(check['timestamp'])
    return status_checks

# Health check endpoint
@api_router.get("/health")
async def health_check():
    return {"status": "healthy", "service": "Arkaa Scapes API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
