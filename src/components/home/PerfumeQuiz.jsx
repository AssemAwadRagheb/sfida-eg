import { useRouter } from "next/navigation";

const PerfumeQuiz = () => {
  const router = useRouter();

  return (
    <section className="py-12 mt-8 mb-8 animatedBackground">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-4">اكتشف نظامك الغذائي المناسب</h2>
        <p className="text-xl text-gray-600 mb-8">
          خذ اختبارنا السريع لاكتشاف النظام المثالي لك.
        </p>
        <button
          className="bg-black text-white px-8 py-3 rounded-lg hover:bg-gray-800 transition"
          onClick={() => {
            router.push("/quiz");
          }}
        >
          ابدأ الاختبار
        </button>
      </div>
    </section>
  );
};

export default PerfumeQuiz;
