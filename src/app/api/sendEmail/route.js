import EmailTemplate from "@/components/email/EmailTemplate";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const ReactDOMServer = require("react-dom/server");

export async function POST(request) {
  try {
    const { clientEmail, orderDetails } = await request.json();

    if (!clientEmail || !orderDetails) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    // Create a transporter for nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Render the email template to HTML
    const clientEmailContent = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplate orderDetails={orderDetails} />
    );

    const adminEmailContent = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplate orderDetails={orderDetails} isAdmin={true} />
    );

    // Send confirmation email to the client
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: clientEmail,
      subject: "تم استلام الطلب، شكرًا لشرائك من سفيدا ❤️",
      html: clientEmailContent,
    });

    // Send notification email to the admin
    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_ADMIN,
      subject: "طلب جديد",
      html: adminEmailContent,
    });

    return NextResponse.json(
      { message: "Emails sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Email sending error:", error);
    return NextResponse.json(
      { message: "Failed to send emails" },
      { status: 500 }
    );
  }
}
