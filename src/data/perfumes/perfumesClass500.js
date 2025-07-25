import { ProductType } from "../types";

// Sizes for Aquanova Water Gel
const aquanovaWaterGelSizes = [
  {
    id: 3, // Unique ID
    bottleId: 13, // Unique bottleId
    available: true,
    price: 250,
    cost: 90,
    displayPrice: "180 ج.م",
  },

  

];



export const perfumesClass500 = [
  // Aquanova Water Gel Product
  {
    id: 5001, // Unique ID
    titleEn: "Aquanova Water Gel",
    titleAr: "أكوانوفا جل مائي",
    unitCost: 90,
    unitPriceAbs: 180,
    availability: 1,
    show: true,
    sizes: aquanovaWaterGelSizes,
    discountable: true,
    descriptionEnShort: "Advanced water gel for oily and combination skin",
    descriptionArShort: "جل مائي متقدم للبشرة الدهنية والمختلطة",
    descriptionArLong: `
💧 أكوانوفا جل مائي 💧

✔ مخصص للبشرة الدهنية والمختلطة
✔ 4 مكونات فعالة في منتج واحد

🔬 المكونات والفوائد:

1️⃣ الريتينول:
• علاج فعال لحب الشباب والبثور
• مقاومة علامات الشيخوخة المبكرة
• تجديد خلايا البشرة
• تقليل المسام الواسعة
• إزالة الرؤوس السوداء والبيضاء

2️⃣ حمض الهيالورونيك:
• ترطيب عميق للبشرة
• نضارة وإشراقة فورية
• ترميم حاجز البشرة
• تحفيز إنتاج الكولاجين والإيلاستين
• تقليل ندبات حب الشباب

3️⃣ النياسيناميد:
• تضييق المسام الواسعة
• تنظيم إفراز الدهون
• توحيد لون البشرة
• حماية من أشعة الشمس
• تعزيز إنتاج الكولاجين

4️⃣ فيتامين سي:
• مضاد أكسدة قوي
• الحفاظ على نضارة البشرة
• تفتيح لون البشرة
• تحفيز الكولاجين

✨ النتائج المتوقعة:
- بشرة نقية خالية من العيوب
- ترطيب عميق دون ملمس دهني
- تقليل واضح لحب الشباب والرؤوس السوداء
- تحسن في نسيج البشرة ولونها
- حماية من علامات الشيخوخة
`,
    defaultImage: 6,
    image: "",
    gender: "",
    type: ProductType.skincare,
    sku: "SKU-AQUA-5001",
    class: 500,
  },


];