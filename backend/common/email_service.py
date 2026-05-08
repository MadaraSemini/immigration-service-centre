import asyncio
import resend
from config import RESEND_API_KEY, MAIL_RECIPIENT
from common.email_template import contact_email_html


class EmailService:
    def __init__(self):
        resend.api_key = RESEND_API_KEY

    def _send(self, name: str, email: str, phone: str, service: str, message: str) -> None:
        params: resend.Emails.SendParams = {
            "from": "ICS Website <onboarding@resend.dev>",
            "to": [MAIL_RECIPIENT],
            "reply_to": email,
            "subject": f"New Enquiry: {service} — {name}",
            "html": contact_email_html(name, email, phone, service, message),
        }
        result = resend.Emails.send(params)
        print(f"[EMAIL SENT] id={result.get('id')}")

    async def send_contact_email(
        self,
        name: str,
        email: str,
        phone: str,
        service: str,
        message: str,
    ) -> None:
        await asyncio.to_thread(self._send, name, email, phone, service, message)


email_service = EmailService()
