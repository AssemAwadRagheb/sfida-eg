"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";

// بيانات الأنظمة الغذائية بدلاً من العطور
const DietPlans = [
  {
    id: 1,
    titleAr: "النظام الكيتوني",
    descriptionArShort: "نظام عالي الدهون منخفض الكربوهيدرات لفقدان الوزن",
    descriptionArLong: "نظام غذائي عالي الدهون ومنخفض الكربوهيدرات يحفز حرق الدهون في الجسم. مناسب للأشخاص الذين يريدون فقدان الوزن بسرعة ولتحسين صحة القلب.",
    benefits: ["فقدان الوزن", "تحسين صحة القلب", "تحسين السكر في الدم"],
    type: "low-carb",
    intensity: "high",
    duration: "long-term"
  },
  {
    id: 2,
    titleAr: "النظام النباتي",
    descriptionArShort: "نظام يعتمد على النباتات دون منتجات حيوانية",
    descriptionArLong: "نظام غذائي يعتمد كلياً على النباتات دون أي منتجات حيوانية. مناسب للأشخاص المهتمين بالبيئة والصحة العامة.",
    benefits: ["صحة القلب", "تقليل خطر الأمراض", "حماية البيئة"],
    type: "plant-based",
    intensity: "moderate",
    duration: "long-term"
  },
  {
    id: 3,
    titleAr: "نظام الصيام المتقطع",
    descriptionArShort: "نظام يعتمد على فترات صيام وأكل محددة",
    descriptionArLong: "نمط غذائي يتناوب بين فترات الصيام والأكل. يساعد في التحكم في الوزن وتحسين عمليات الأيض.",
    benefits: ["فقدان الوزن", "تحسين الأيض", "زيادة الطاقة"],
    type: "fasting",
    intensity: "moderate",
    duration: "flexible"
  },
  {
    id: 4,
    titleAr: "نظام البحر المتوسط",
    descriptionArShort: "نظام صحي مستوحى من حمية دول البحر المتوسط",
    descriptionArLong: "نظام غذائي صحي مستوحى من العادات الغذائية لدول البحر المتوسط. غني بالخضروات والفواكه وزيت الزيتون.",
    benefits: ["صحة القلب", "طول العمر", "توازن غذائي"],
    type: "balanced",
    intensity: "low",
    duration: "long-term"
  }
];

export default function Quiz() {
  const router = useRouter();
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [result, setResult] = useState(null);

  // أسئلة النظام الغذائي بالعربية
  const questions = [
    {
      question: "ما هو هدفك الرئيسي من النظام الغذائي؟",
      options: ["فقدان الوزن", "تحسين الصحة العامة", "بناء العضلات", "تحسين الهضم"],
    },
    {
      question: "ما هي حالتك الصحية الحالية؟",
      options: ["سكري", "ضغط مرتفع", "صحة جيدة", "كوليسترول مرتفع"],
    },
    {
      question: "كم من الوقت يمكنك تخصيصه لإعداد الوجبات؟",
      options: ["وقت قليل (أقل من 30 دقيقة)", "متوسط (30-60 دقيقة)", "وقت كافي (أكثر من ساعة)", "غير محدد"],
    },
    {
      question: "ما هي تفضيلاتك الغذائية؟",
      options: ["أحب اللحوم", "أفضل النباتات", "لا تفضيلات", "أحب الألبان"],
    },
    {
      question: "ما هو مستوى التزامك بالنظام الغذائي؟",
      options: ["منخفض (أريد شيئاً سهلاً)", "متوسط (يمكنني الالتزام)", "عالي (مستعد للتغيير)", "غير متأكد"],
    },
    {
      question: "هل تعاني من أي حساسيات غذائية؟",
      options: ["لا", "اللاكتوز", "الغلوتين", "المكسرات"],
    },
  ];

  // Handle answer selection
  const handleAnswer = (answer) => {
    setAnswers([...answers, answer]);
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResult([...answers, answer]);
    }
  };

  // حساب النظام الغذائي المناسب بناء على الإجابات
  const calculateResult = (answers) => {
    const preferences = {
      goal: answers[0],
      health: answers[1],
      time: answers[2],
      foodPref: answers[3],
      commitment: answers[4],
      allergies: answers[5],
    };

    // تصفية الأنظمة حسب الحساسيات
    const filteredDiets = DietPlans.filter((diet) => {
      if (preferences.allergies === "اللاكتوز") {
        return !diet.descriptionArLong.includes("ألبان");
      }
      if (preferences.allergies === "الغلوتين") {
        return !diet.descriptionArLong.includes("قمح");
      }
      if (preferences.allergies === "المكسرات") {
        return !diet.descriptionArLong.includes("مكسرات");
      }
      return true;
    });

    // تقييم كل نظام غذائي
    const scoredDiets = filteredDiets.map((diet) => {
      let score = 0;

      // هدف النظام الغذائي
      if (
        (preferences.goal === "فقدان الوزن" && diet.benefits.includes("فقدان الوزن")) ||
        (preferences.goal === "تحسين الصحة العامة" && diet.benefits.includes("صحة القلب")) ||
        (preferences.goal === "بناء العضلات" && diet.type === "balanced") ||
        (preferences.goal === "تحسين الهضم" && diet.descriptionArLong.includes("صحة"))
      ) {
        score += 1;
      }

      // الحالة الصحية
      if (
        (preferences.health === "سكري" && diet.benefits.includes("تحسين السكر في الدم")) ||
        (preferences.health === "ضغط مرتفع" && diet.benefits.includes("صحة القلب")) ||
        (preferences.health === "كوليسترول مرتفع" && diet.type === "low-carb") ||
        (preferences.health === "صحة جيدة")
      ) {
        score += 1;
      }

      // وقت التحضير
      if (
        (preferences.time === "وقت قليل (أقل من 30 دقيقة)" && diet.intensity === "low") ||
        (preferences.time === "متوسط (30-60 دقيقة)" && diet.intensity !== "high") ||
        (preferences.time === "وقت كافي (أكثر من ساعة)")
      ) {
        score += 1;
      }

      // التفضيلات الغذائية
      if (
        (preferences.foodPref === "أحب اللحوم" && diet.type !== "plant-based") ||
        (preferences.foodPref === "أفضل النباتات" && diet.type === "plant-based") ||
        (preferences.foodPref === "أحب الألبان" && !diet.descriptionArLong.includes("خالي من الألبان")) ||
        (preferences.foodPref === "لا تفضيلات")
      ) {
        score += 1;
      }

      // مستوى الالتزام
      if (
        (preferences.commitment === "منخفض (أريد شيئاً سهلاً)" && diet.intensity === "low") ||
        (preferences.commitment === "متوسط (يمكنني الالتزام)" && diet.intensity !== "high") ||
        (preferences.commitment === "عالي (مستعد للتغيير)")
      ) {
        score += 1;
      }

      return { ...diet, score };
    });

    // ترتيب الأنظمة حسب النتيجة
    const sortedDiets = scoredDiets.sort((a, b) => b.score - a.score);

    // أفضل 3 أنظمة
    const topDiets = sortedDiets.slice(0, 3);
    setResult(topDiets);
  };

  // إعادة الاختبار
  const resetQuiz = () => {
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="py-[1.5rem] lg:py-[4rem] ">
      <div className="min-h-[90vh] flex flex-col items-center justify-center bg-gradient-to-b from-green-100 to-blue-100 p-6 rounded-lg">
        {!result ? (
          <motion.div
            key={currentQuestion}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              {questions[currentQuestion].question}
            </h2>
            <div className="space-y-4">
              {questions[currentQuestion].options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleAnswer(option)}
                  className="w-full bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  {option}
                </button>
              ))}
            </div>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-md bg-white rounded-lg shadow-lg p-6"
          >
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              أفضل الأنظمة الغذائية المناسبة لك
            </h2>
            {result.map((diet, index) => (
              <div
                key={diet.id}
                className={`p-4 rounded-lg mb-[1rem] transition duration-300 cursor-pointer ${
                  index === 0
                    ? "bg-[#4CAF50] hover:bg-[#45a049]"
                    : "bg-gray-100 hover:bg-[#4CAF50]"
                }`}
                onClick={() => router.push(`/diet-plans/${diet.id}`)}
              >
                <h3 className="text-xl font-semibold text-gray-800">
                  {diet.titleAr}
                </h3>
                <p className="text-gray-600">{diet.descriptionArShort}</p>
                <p className="text-sm text-gray-500 mt-2">
                  الفوائد: {diet.benefits.join("، ")}
                </p>
              </div>
            ))}
            <button
              onClick={resetQuiz}
              className="w-full mt-6 bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600"
            >
              إعادة الاختبار
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}