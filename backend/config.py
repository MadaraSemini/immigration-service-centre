from dotenv import load_dotenv
import os

load_dotenv()

RESEND_API_KEY: str = os.getenv("RESEND_API_KEY", "")
MAIL_RECIPIENT: str = os.getenv("MAIL_RECIPIENT", "")

ALLOWED_ORIGINS: list[str] = [
    "http://localhost:5173",
    "http://localhost:5174",
    "https://madarasemini.github.io",  # GitHub Pages frontend
    # Add your Render backend URL here once deployed if needed
]
