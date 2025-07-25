import { ProductType } from "../types";

const aquanovaSizes = [
  {
    id: 3, // Unique ID
    bottleId: 12, // Unique bottleId
    available: true,
    price: 250,
    cost: 90,
    displayPrice: "180 ج.م",
  },

  
  

];

export const perfumesClass400 = [
  {
    id: 401, // Changed from 1 to avoid conflicts
    titleEn: "AquanovaCleanser",
    titleAr: " أكوانوفا غسول  جل للوجه",
    unitCost: 75,
    unitPriceAbs: 150,
    availability: 1,
    show: true,
    sizes: aquanovaSizes,
    discountable: true,
    descriptionEnShort: "Facial cleanser 6-in-1",
    descriptionArShort: "غسول وجه 6 في 1 للبشرة الدهنية والمختلطة",
    descriptionArLong: `
🫧 غسول اكوانوفا العلاجي 🫧

✔ مخصص للبشرة الدهنية والمختلطة
✔ 6 مكونات فعالة في منتج واحد

🔍 المكونات والفوائد:

• حمض الساليسيليك:
  - تنظيف عميق للمسام
  - علاج حب الشباب
  - تقشير لطيف
  - تخفيف آثار الحبوب

• النياسيناميد:
  - تضييق المسام
  - تنظيم إفراز الدهون
  - توحيد لون البشرة

• زيت شجرة الشاي:
  - مضاد للبكتيريا
  - تهدئة الالتهابات

• حمض الكوجيك:
  - تفتيح البقع الداكنة
  - علاج الكلف

• زبدة الشيا:
  - ترطيب عميق
  - نعومة فائقة

• فيتامين سي:
  - إشراقة ونضارة
  - تحفيز الكولاجين

💎 النتائج المتوقعة:
- بشرة نقية خالية من الشوائب
- مسام ضيقة ونظيفة
- توحيد لون البشرة
`,
    defaultImage: 3,
    image: "",
    gender: "",
    type: ProductType.skincare,
    sku: "SKU-AQUA-001",
    class: 400,
  },

];