from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from config import ALLOWED_ORIGINS
from common.email_service import email_service

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=ALLOWED_ORIGINS,
    allow_methods=["POST"],
    allow_headers=["*"],
)


class ContactForm(BaseModel):
    name: str
    email: EmailStr
    phone: str = ""
    service: str
    message: str


@app.post("/api/contact")
async def send_contact(form: ContactForm):
    try:
        await email_service.send_contact_email(
            name=form.name,
            email=form.email,
            phone=form.phone,
            service=form.service,
            message=form.message,
        )
        return {"status": "sent"}
    except Exception as e:
        print(f"[EMAIL ERROR] {type(e).__name__}: {e}")
        raise HTTPException(status_code=500, detail=str(e))
