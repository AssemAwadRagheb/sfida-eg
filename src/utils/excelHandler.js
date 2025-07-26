// utils/excelHandler.js
import ExcelJS from 'exceljs';

export async function generateAllOrdersExcel(allOrders) {
  try {
    // 1. إنشاء مصنف Excel جديد
    const workbook = new ExcelJS.Workbook();
    workbook.creator = 'سفيدا';
    workbook.created = new Date();
    
    // 2. إنشاء ورقة العمل
    const worksheet = workbook.addWorksheet('الطلبات', {
      properties: { tabColor: { argb: 'FF2E86C1' } }
    });

    // 3. تعريف الأعمدة مع تحسين العرض
    worksheet.columns = [
      { header: 'رقم الطلب', key: 'orderId', width: 20 },
      { header: 'التاريخ', key: 'date', width: 20 },
      { header: 'اسم العميل', key: 'name', width: 20 },
      { header: 'الهاتف', key: 'phone', width: 15 },
      { header: 'البريد الإلكتروني', key: 'email', width: 25 },
      { header: 'البلد', key: 'country', width: 15 },
      { header: 'المحافظة', key: 'governorate', width: 15 },
      { header: 'المدينة', key: 'city', width: 15 },
      { header: 'الحي', key: 'district', width: 15 },
      { header: 'العنوان التفصيلي', key: 'address', width: 30 },
      { header: 'الإجمالي', key: 'total', width: 15, style: { numFmt: '#,##0.00' } },
      { header: 'الخصم', key: 'discount', width: 15, style: { numFmt: '#,##0.00' } },
      { header: 'الشحن', key: 'shipping', width: 15, style: { numFmt: '#,##0.00' } },
      { header: 'النهائي', key: 'final', width: 15, style: { numFmt: '#,##0.00' } },
      { header: 'كود الخصم', key: 'promoCode', width: 20 },
      { header: 'المنتجات', key: 'products', width: 40 },
      { header: 'ملاحظات', key: 'notes', width: 30 }
    ];

    // 4. تنسيق رأس الجدول
    worksheet.getRow(1).eachCell((cell) => {
      cell.font = { 
        bold: true, 
        color: { argb: 'FFFFFFFF' },
        size: 12,
        name: 'Arial'
      };
      cell.fill = {
        type: 'pattern',
        pattern: 'solid',
        fgColor: { argb: 'FF2E86C1' },
      };
      cell.alignment = { 
        horizontal: 'center',
        vertical: 'middle',
        wrapText: true
      };
      cell.border = {
        top: { style: 'thin', color: { argb: 'FF000000' } },
        left: { style: 'thin', color: { argb: 'FF000000' } },
        bottom: { style: 'thin', color: { argb: 'FF000000' } },
        right: { style: 'thin', color: { argb: 'FF000000' } }
      };
    });

    // 5. إضافة جميع الطلبات إلى الملف
    allOrders.forEach(order => {
      // تحضير بيانات المنتجات
      const productsInfo = order.cartItems.map(item => {
        return `${item.titleAr} (${item.quantity || 1} × ${item.selectedSize?.price || 0} ج.م)`;
      }).join('\n');

      // حساب القيم المالية
      const total = order.preTotalBeforeDiscount || 0;
      const discount = order.discount || 0;
      const shipping = order.shippingCost || 0;
      const final = total - discount + shipping;

      // إضافة الصف
      const row = worksheet.addRow({
        orderId: order.orderId || 'غير معروف',
        date: order.createdAt ? new Date(order.createdAt).toLocaleString('ar-EG') : 'غير محدد',
        name: order.clientInfo?.name || 'غير معروف',
        phone: order.clientInfo?.phone || 'غير معروف',
        email: order.clientInfo?.email || 'غير معروف',
        country: order.clientInfo?.country?.nameAr || 'غير معروف',
        governorate: order.clientInfo?.governorate?.nameAr || 'غير معروف',
        city: order.clientInfo?.city?.nameAr || 'غير معروف',
        district: order.clientInfo?.district || 'غير معروف',
        address: order.clientInfo?.detailedAddress || 'غير معروف',
        total: total,
        discount: discount,
        shipping: shipping,
        final: final,
        promoCode: order.promocode ? `${order.promocode.code} (${order.promocode.value}%)` : 'لا يوجد',
        products: productsInfo,
        notes: order.notes || ''
      });

      // تنسيق الصف
      row.eachCell({ includeEmpty: true }, (cell) => {
        cell.border = {
          top: { style: 'thin', color: { argb: 'FFD3D3D3' } },
          left: { style: 'thin', color: { argb: 'FFD3D3D3' } },
          bottom: { style: 'thin', color: { argb: 'FFD3D3D3' } },
          right: { style: 'thin', color: { argb: 'FFD3D3D3' } }
        };
        cell.alignment = { 
          vertical: 'middle',
          wrapText: true
        };
      });
    });

    // 6. تجميد رأس الجدول
    worksheet.views = [{ state: 'frozen', xSplit: 0, ySplit: 1 }];

    // 7. توليد الملف في الذاكرة
    const buffer = await workbook.xlsx.writeBuffer();
    return buffer;
  } catch (error) {
    console.error('Error generating Excel file:', error);
    throw error;
  }
}
