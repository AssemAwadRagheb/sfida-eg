import ExcelJS from 'exceljs';
import path from 'path';
import fs from 'fs/promises'; // Use fs.promises for async file operations

// Define the directory for temporary files if needed, or just use the root
const EXCEL_FILE_NAME = 'Orders.xlsx';
const EXCEL_FILE_PATH = path.join(process.cwd(), EXCEL_FILE_NAME); // Save in the root of the project

export async function saveOrderToExcel(orderDetails) {
  const workbook = new ExcelJS.Workbook();
  let worksheet;

  try {
    // Check if the file exists
    await fs.access(EXCEL_FILE_PATH);
    // If it exists, load it
    await workbook.xlsx.readFile(EXCEL_FILE_PATH);
    worksheet = workbook.getWorksheet('Orders');
    if (!worksheet) {
      worksheet = workbook.addWorksheet('Orders');
      setupHeaders(worksheet);
    }
  } catch (error) {
    // If file doesn't exist or cannot be accessed, create a new workbook and worksheet
    worksheet = workbook.addWorksheet('Orders');
    setupHeaders(worksheet);
  }

  // Add a new row with order details
  worksheet.addRow([
    orderDetails.orderId,
    new Date(orderDetails.createdAt).toLocaleString('ar-EG'),
    orderDetails.clientInfo.name,
    orderDetails.clientInfo.email,
    orderDetails.clientInfo.phone,
    orderDetails.clientInfo.country.nameAr,
    orderDetails.clientInfo.governorate.nameAr,
    orderDetails.clientInfo.city.nameAr,
    orderDetails.clientInfo.district,
    orderDetails.clientInfo.detailedAddress,
    orderDetails.cartItems.map(item => `${item.titleAr} (${item.selectedSize.price} ج.م)`).join(', '),
    orderDetails.preTotalBeforeDiscount.toFixed(2),
    orderDetails.discount.toFixed(2),
    orderDetails.shippingCost.toFixed(2),
    orderDetails.total.toFixed(2),
    orderDetails.promocode ? `${orderDetails.promocode.code} (${orderDetails.promocode.value}%)` : 'لا يوجد',
    orderDetails.promocode ? orderDetails.promocode.provider : 'لا يوجد',
    orderDetails.luckyDraw || 'لا يوجد',
  ]);

  // Save the workbook
  await workbook.xlsx.writeFile(EXCEL_FILE_PATH);
  console.log('Order details saved to Excel successfully!');

  return EXCEL_FILE_PATH; // Return the path to the saved Excel file
}

function setupHeaders(worksheet) {
  worksheet.columns = [
    { header: 'رقم الطلب', key: 'orderId', width: 20 },
    { header: 'تاريخ الطلب', key: 'createdAt', width: 25 },
    { header: 'اسم العميل', key: 'clientName', width: 30 },
    { header: 'بريد العميل', key: 'clientEmail', width: 30 },
    { header: 'هاتف العميل', key: 'clientPhone', width: 20 },
    { header: 'البلد', key: 'country', width: 15 },
    { header: 'المحافظة', key: 'governorate', width: 20 },
    { header: 'المدينة', key: 'city', width: 20 },
    { header: 'الحي', key: 'district', width: 25 },
    { header: 'العنوان التفصيلي', key: 'detailedAddress', width: 40 },
    { header: 'المنتجات', key: 'products', width: 50 },
    { header: 'إجمالي قبل الخصم', key: 'preTotal', width: 20 },
    { header: 'الخصم', key: 'discount', width: 15 },
    { header: 'تكلفة الشحن', key: 'shippingCost', width: 15 },
    { header: 'الإجمالي النهائي', key: 'finalTotal', width: 20 },
    { header: 'كود الخصم', key: 'promocode', width: 25 },
    { header: 'مقدم كود الخصم', key: 'promocodeProvider', width: 25 },
    { header: 'سحب الحظ', key: 'luckyDraw', width: 30 },
  ];
}
