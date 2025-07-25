import { ProductType } from "../types";

const sunscreenSizes = [
  {
    id: 3, // Unique ID
    bottleId: 11, // Unique bottleId
    available: true,
    price: 350,
    cost: 90,
    displayPrice: "180 ج.م",

  },
  
  

];

export const perfumesClass200 = [
  {
    id: 2001, // Unique ID
    titleEn: "Aquanova Sunscreen Gel Cream",
    titleAr: "  أكوانوفا واقي شمس  ",
    unitCost: 90,
    unitPriceAbs: 180,
    availability: 1,
    show: true,
    sizes: sunscreenSizes,
    discountable: true,
    descriptionEnShort: "High protection sunscreen for oily and combination skin",
    descriptionArShort: "واقي شمسي عالي الحماية للبشرة الدهنية والمختلطة",
    descriptionArLong: `
✨ أكوانوفا واقي شمسي جل كريم ✨

✅ حماية فائقة مع الحفاظ على بشرة مشرقة
✅ يحمي من أشعة الشمس الضارة بنسبة تقترب من 99٪
✅ مقاوم للماء والتعرق
✅ امتصاص سريع بدون ملمس دهني

🔹 المميزات:
• حماية عالية من الأشعة فوق البنفسجية UVA & UVB
• يحتوي على فيتامين C لمقاومة التصبغات والبقع
• يمنع ظهور البقع الداكنة
• غير مرئي على البشرة ولا يترك آثار بيضاء
• مناسب للبشرة الدهنية والمختلطة والحساسة
• خفيف الوزن ويسرع امتصاصه
• يحافظ على ترطيب البشرة
• يترك البشرة مشدودة ونضرة

💎 النتائج المتوقعة:
- حماية يومية كاملة من الشمس
- بشرة موحدة اللون
- تقليل التصبغات والبقع الداكنة
- ملمس ناعم خالٍ من اللمعان الدهني
- ترطيب مثالي دون انسداد المسام
`,
    defaultImage: 4,
    image: "",
    gender: "",
    type: ProductType.skincare,
    sku: "SKU-SUN-2001",
    class: 200,
  },

];