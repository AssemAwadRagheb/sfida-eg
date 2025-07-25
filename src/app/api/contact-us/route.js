import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request) {
  try {
    const { option, phoneNumber, email, message } = await request.json();

    if (!option) {
      return NextResponse.json({ message: "الخيار مطلوب" }, { status: 400 });
    }

    if (option === "subscribe" && !phoneNumber) {
      return NextResponse.json(
        { message: "رقم الهاتف مطلوب" },
        { status: 400 }
      );
    }

    if (option === "enhancement" && (!email || !message)) {
      return NextResponse.json(
        { message: "البريد الإلكتروني والرسالة مطلوبان" },
        { status: 400 }
      );
    }

    // Create a transporter for nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER, // Your sender email
        pass: process.env.EMAIL_PASS, // Your sender email password
      },
    });

    // Prepare email content based on the selected option
    let emailSubject = "";
    let emailText = "";

    if (option === "subscribe") {
      emailSubject = "طلب اشتراك جديد";
      emailText = `
        رقم الهاتف: ${phoneNumber}
        يريد الاشتراك لرؤية العروض الجديدة.
      `;
    } else if (option === "enhancement") {
      emailSubject = "اقتراحات أو ملاحظات جديدة";
      emailText = `
        البريد الإلكتروني: ${email}
        الرسالة: ${message}
      `;
    }

    // Send email to your provided sender email
    await transporter.sendMail({
      from: process.env.EMAIL_USER, // Sender email
      to: process.env.EMAIL_ADMIN, // Your provided sender email (same as sender for now)
      subject: emailSubject,
      text: emailText,
    });

    return NextResponse.json(
      { message: "تم استلام البيانات بنجاح وإرسالها بالبريد الإلكتروني" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting form:", error);
    return NextResponse.json(
      { message: "حدث خطأ أثناء معالجة البيانات" },
      { status: 500 }
    );
  }
}
