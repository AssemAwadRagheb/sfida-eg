import Image from "next/image";
import miskiStoryImage from "../../../public/imgs/home/Miski_story.webp";

const BrandStory = () => {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-3xl font-bold mb-4">قصتنا</h2>
            <p className="text-gray-600 mb-4">
              في{" "}
              <span className="text-[1.05rem] text-[#FDD017] font-bold">
                سفيدا
              </span>
              بدأت رحلتنا قبل أربعة أعوام برؤية بسيطة: أن نكون أكثر من مجرد شركة تبيع منتجات أردنا أن نكون شريكك في رحلتك نحو صحة أفضل وجمال طبيعي مع كل ابتكار جديد، نقترب خطوة واحدة من تحقيق هذا الحلم نستمع إليك، نفهم احتياجاتك، ونعمل بجد لتوفير حلول تجعلك تشعر بالثقة والسعادة انضم إلينا في هذه الرحلة و استمتع بتجربة فريدة
            </p>
            {/* <p className="text-gray-600 mb-4">
          
            </p> */}
            <p className="text-gray-600 mb-4">
              في{" "}
              <span className="text-[1.05rem] text-[#FDD017] font-bold">
              سفيدا
              </span>
              نحن أكثر من مجرد منتج، نحن رفيقك الموثوق به في رحلتك نحو إنقاص الوزن. منتجاتنا المصممة بعناية توفر الدعم والتغذية التي تحتاجها لتحقيق أهدافك معًا، سنصل إلى النتائج التي ترغب فيها وستشعر بالثقة والسعادة في جسدك
            </p>
            {/* <p className="text-gray-600 mb-4">
              منذ بدايتنا، كان هدفنا واضحًا: تقديم عطور تجمع بين الفخامة
              والأصالة، مستوحاة من الطبيعة وسحر التقاليد العطرية العريقة. نحن
              نسعى جاهدين لاختيار أجود المكونات من حول العالم، لنمنحك تجربة حسية
              تأسر الحواس وتبقى في الأذهان.
            </p> */}
            <p className="text-gray-600">
              كل منتج من {" "}
              <span className="text-[1.05rem] text-[#FDD017] font-bold">
              سفيدا
              </span>{" "}
              تركيبات مبتكرة

مواد طبيعية

جودة عالية
            </p>
          </div>
          <div className="flex justify-end">
            <Image
              src={miskiStoryImage}
              alt="قصتنا"
              className="rounded-lg shadow-lg"
              width={600}
              height={600}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrandStory;
