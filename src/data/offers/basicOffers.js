export const BasicOffers = [
  {
    id: 2,
    title: "Aquanova 6×1 Facial Cleanser – Multi-Action Formula for All Skin Types",
    titleAr: "غسول الوجه أكوانوفا 6×1 – متعدد الفوائد لجميع أنواع البشرة",
    titleArShort: "أكوانوفا 6×1 غسول الوجه",
    smallDescription: "6-in-1 gel cleanser with salicylic acid, niacinamide & shea butter for healthy skin.",
    smallDescriptionAr: "غسول هلامي 6×1 بحمض الساليسيليك والنياسيناميد وزبدة الشيا لبشرة صحية.",
    longDescription: "Aquanova 6×1 Facial Cleanser is a revolutionary formula...",
    longDescriptionAr: "أكوانوفا 6×1 غسول الوجه - معجزة العناية بالبشرة بتركيبة متعددة الفوائد",
    image: "/imgs/offers/category-M.webp",
    condition: (cartTotal) => cartTotal > 1000000,
    action: (cartTotal) => {
      const amountAbove400 = cartTotal - 450;
      return Math.floor(amountAbove400 / 10) * 10;
    },
    type: "rewardPoints",
    redemptionRules: {
      pointsPerPound: 1,
      maxDiscountPercentage: 15,
    },
    status: "AVAILABLE",
    productLink: "/products?search=Aquanova" // رابط منتج أكوانوفا
  },
  {
    id: 3,
    title: "🚀 زودياك - سلاحك السري لخسارة الوزن بسرعة البرق!",
    titleAr: "🚀 زودياك - سلاحك السري لخسارة الوزن بسرعة البرق!",
    titleArShort: " شحن مجاني",
    smallDescription: "ودع الكيلوجرامات الزائدة للأبد! تركيبة ثورية تحول جسمك إلى ماكينة حرق دهون!",
    smallDescriptionAr: "ودع الكيلوجرامات الزائدة للأبد! تركيبة ثورية تحول جسمك إلى ماكينة حرق دهون!",
    longDescription: "✨ اكتشف المعجزة التي يبحث عنها الجميع! ✨\nكبسولات زودياك تقوم بـ:\n\n• حرق الدهون حتى أثناء النوم 💤\n• قمع الشهية بشكل طبيعي 🍽️\n• تعزيز الطاقة والحيوية ⚡\n• تحسين التمثيل الغذائي بشكل ملحوظ 🔥\n\n💪 مع زودياك، لن تخسر الوزن فقط، بل ستكشف عن أفضل نسخة من نفسك!",
    longDescriptionAr: "✨ اكتشف المعجزة التي يبحث عنها الجميع! ✨\nكبسولات زودياك تقوم بـ:\n\n• حرق الدهون حتى أثناء النوم 💤\n• قمع الشهية بشكل طبيعي 🍽️\n• تعزيز الطاقة والحيوية ⚡\n• تحسين التمثيل الغذائي بشكل ملحوظ 🔥\n\n💪 مع زودياك، لن تخسر الوزن فقط، بل ستكشف عن أفضل نسخة من نفسك!",
    image: "/imgs/offers/5off-1.webp",
    condition: (cartTotal) => cartTotal >= 450,
    action: (shippingCost) => 0,
    type: "freeShipping",
    status: "AVAILABLE",
    productLink: "/products?search=زودياك" // رابط منتج زودياك
  },
  {
    id: 4,
    title: "Zodiac Weight Loss Capsules – Natural Formula for Effective Fat Burning",
    titleAr: "كبسولات زودياك للتخسيس تركيبة طبيعية لحرق الدهون بفعالية",
    titleArShort: "معلومات عن زودياك للتخسيس",
    smallDescription: "Advanced natural formula with African Mango, Green Tea & L-Carnitine for real weight loss support.",
    smallDescriptionAr: "تركيبة طبيعية فعالة تحتوي على مانجو أفريقي، شاي أخضر، وإل-كارنيتين لدعم فقدان الوزن.",
    longDescription: "Zodiac Weight Loss Capsules offer a powerful blend of scientifically backed natural ingredients designed to support your weight loss journey...",
    longDescriptionAr: "تقدم كبسولات زودياك للتخسيس مزيجًا قويًا من المكونات الطبيعية المصممة لدعم رحلتك في فقدان الوزن...",
    image: "/imgs/offers/category-F.webp",
    condition: (cartTotal) => cartTotal > 1000000,
    action: (cartTotal) => {
      if (cartTotal > 800) {
        return "Entered Lucky Draw (800+ L.E.)";
      } else if (cartTotal > 500) {
        return "Entered Lucky Draw (500+ L.E.)";
      }
      return null;
    },
    type: "luckyDraw",
    prizes: {
      "500+": "جوائز خاصة للطلبات فوق 500 جنيه (تواصل مع خدمة العملاء)",
      "800+": "جوائز مميزة للطلبات فوق 800 جنيه (تواصل مع خدمة العملاء)",
    },
    status: "AVAILABLE",
    productLink: "/products?search=Zodiac" // رابط منتج زودياك بالإنجليزية
  }
];