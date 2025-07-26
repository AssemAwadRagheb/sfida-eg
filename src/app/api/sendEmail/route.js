// app/api/sendEmail/route.js
import EmailTemplate from "@/components/email/EmailTemplate";
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");
const ReactDOMServer = require("react-dom/server");
const { generateAllOrdersExcel } = require("@/utils/excelHandler");
const { saveOrder, getAllOrders } = require("@/utils/storage");

export async function POST(request) {
  try {
    const { clientEmail, orderDetails } = await request.json();

    // 1. حفظ الطلب في قاعدة البيانات (تعديل هذه الدالة لاستخدام قاعدة بيانات حقيقية)
    const isSaved = await saveOrderToDatabase(orderDetails);
    if (!isSaved) {
      return NextResponse.json(
        { message: "فشل في حفظ الطلب", error: "Failed to save order" },
        { status: 500 }
      );
    }

    // 2. إنشاء محول البريد الإلكتروني
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // 3. إنشاء محتوى البريد الإلكتروني
    const clientEmailContent = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplate orderDetails={orderDetails} />
    );

    const adminEmailContent = ReactDOMServer.renderToStaticMarkup(
      <EmailTemplate orderDetails={orderDetails} isAdmin={true} />
    );

    // 4. الحصول على جميع الطلبات من قاعدة البيانات
    const allOrders = await getAllOrdersFromDatabase();
    
    // 5. إنشاء ملف Excel مع البيانات الحالية (بما فيها الطلب الجديد)
    const excelBuffer = await generateAllOrdersExcel([orderDetails, ...allOrders]);

    // 6. إعداد خيارات البريد
    const dateString = new Date().toLocaleDateString('ar-EG');
    const mailOptions = {
      from: `"سفيدا" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_ADMIN,
      subject: `طلب جديد - ${orderDetails.orderId}`,
      html: adminEmailContent,
      attachments: [
        {
          filename: `طلبات_سفيدا_${dateString}.xlsx`,
          content: excelBuffer,
          contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
        }
      ]
    };

    // 7. إرسال البريد
    await transporter.sendMail(mailOptions);

    // 8. إرسال بريد التأكيد للعميل (بدون مرفق)
    await transporter.sendMail({
      from: `"سفيدا" <${process.env.EMAIL_USER}>`,
      to: clientEmail,
      subject: "تم استلام طلبك بنجاح",
      html: clientEmailContent
    });

    return NextResponse.json(
      { message: "تم إرسال البريد الإلكتروني مع المرفق بنجاح" },
      { status: 200 }
    );

  } catch (error) {
    console.error("حدث خطأ أثناء معالجة الطلب:", error);
    return NextResponse.json(
      { 
        message: "فشل في معالجة الطلب",
        error: error.message,
        stack: process.env.NODE_ENV === 'development' ? error.stack : undefined
      },
      { status: 500 }
    );
  }
}

// دالة لحفظ الطلب في قاعدة البيانات (استبدلها بتنفيذك الفعلي)
async function saveOrderToDatabase(orderDetails) {
  try {
    // هنا يجب استبدال هذا الكود باتصال بقاعدة البيانات الفعلية
    // هذا مثال باستخدام localStorage (للتطوير فقط)
    if (typeof window !== 'undefined') {
      const allOrders = JSON.parse(localStorage.getItem('allOrders') || []);
      allOrders.unshift(orderDetails);
      localStorage.setItem('allOrders', JSON.stringify(allOrders));
    }
    return true;
  } catch (error) {
    console.error('Error saving order to database:', error);
    return false;
  }
}

// دالة لجلب جميع الطلبات من قاعدة البيانات (استبدلها بتنفيذك الفعلي)
async function getAllOrdersFromDatabase() {
  try {
    // هنا يجب استبدال هذا الكود باتصال بقاعدة البيانات الفعلية
    // هذا مثال باستخدام localStorage (للتطوير فقط)
    if (typeof window !== 'undefined') {
      return JSON.parse(localStorage.getItem('allOrders') || []);
    }
    return [];
  } catch (error) {
    console.error('Error getting orders from database:', error);
    return [];
  }
}
