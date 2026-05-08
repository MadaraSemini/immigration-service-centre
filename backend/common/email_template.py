def contact_email_html(name: str, email: str, phone: str, service: str, message: str) -> str:
    return f"""
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0D1F3C; border-bottom: 3px solid #E8A020; padding-bottom: 8px;">
            New Contact Form Submission
        </h2>
        <table style="width: 100%; border-collapse: collapse; margin-top: 16px;">
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555; width: 120px;">Name</td>
                <td style="padding: 10px; color: #222;">{name}</td>
            </tr>
            <tr style="background: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Email</td>
                <td style="padding: 10px; color: #222;">{email}</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555;">Phone</td>
                <td style="padding: 10px; color: #222;">{phone or "Not provided"}</td>
            </tr>
            <tr style="background: #f9f9f9;">
                <td style="padding: 10px; font-weight: bold; color: #555;">Service</td>
                <td style="padding: 10px; color: #222;">{service}</td>
            </tr>
            <tr>
                <td style="padding: 10px; font-weight: bold; color: #555; vertical-align: top;">Message</td>
                <td style="padding: 10px; color: #222; white-space: pre-wrap;">{message}</td>
            </tr>
        </table>
        <p style="margin-top: 24px; color: #999; font-size: 12px;">
            Sent from the ICS website contact form.
        </p>
    </div>
    """
