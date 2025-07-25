import { ProductType } from "../types";

// الأحجام الخاصة بالمنتج رقم 2
const zodiacSizesForProduct2 = [
  {
    id: 1,
    bottleId: 3,
    available: true,
    price: 450,
    cost: 60,
    label: "عبوتين (30 كبسولة)",
  },
  
  {
    id: 2,
    bottleId: 2,
    available: true,
    price: 800,
    cost: 150,
    label: "3 عبوات (90 كبسولة) - أفضل عرض",
  },
  {
  id: 3,
  bottleId: 10,
  available: true,
  price: 999,
  cost: 150,
  label: "3 عبوات (90 كبسولة) - أفضل عرض",
},
];




// المنتجات
export const perfumesClass300 = [
  {
    id: 2,
    titleEn: "Zodiac Weight Loss Capsules",
    titleAr: "  كبسولات زودياك للتخسيس",
    unitCost: 5,
    unitPriceAbs: 10,
    availability: 1,
    show: true,
    sizes: zodiacSizesForProduct2,
    discountable: true,
    descriptionEnShort: "Advanced natural formula for effective weight loss",
    descriptionArShort: "تركيبة طبيعية متقدمة لفقدان الوزن الفعال",
    descriptionEnLong:
      "Zodiac Weight Loss Capsules offer a powerful blend of natural ingredients designed to support your weight loss journey. The formula includes African Mango, Green Tea Extract, L-Carnitine, and other metabolism-boosting components that help burn fat, reduce appetite, and regulate blood sugar levels. These capsules are suitable for all lifestyles and provide comprehensive support for achieving your ideal weight. With regular use, you can experience enhanced energy levels and noticeable results in your body composition.",
    descriptionArLong:
      "تقدم كبسولات زودياك للتخسيس مزيجًا قويًا من المكونات الطبيعية المصممة لدعم رحلتك في فقدان الوزن. تحتوي التركيبة على مانجو أفريقي، مستخلص الشاي الأخضر، إل-كارنيتين، ومكونات أخرى تعزز عملية التمثيل الغذائي التي تساعد في حرق الدهون، وتقليل الشهية، وتنظيم مستويات السكر في الدم. هذه الكبسولات مناسبة لجميع أنماط الحياة وتوفر دعمًا شاملًا لتحقيق وزنك المثالي. مع الاستخدام المنتظم، يمكنك تجربة مستويات طاقة محسنة ونتائج ملحوظة في تكوين جسمك.",
    defaultImage: 0,
    image: "",
    gender: "",
    type: ProductType.supplement,
    sku: "SKU-WL-000001",
    class: 300,
  },

];