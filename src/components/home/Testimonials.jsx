import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const testimonials = [
  {
    id: 1,
    name: "منة الله احمد",
    review:
      "أول ما باخد الكبسولة بحس نفسي مقفولة وبطني مليانة. الكبسولة ساعدتني في التحكم في شهيتي بشكل كبير، وأصبحت أشعر بالشبع لفترات أطول.",
    rating: 5,
  },
  {
    id: 2,
    name: "تسنيم محمد",
    review:
      "المقاسات بتاعت لبسي اختلفت بعد 10 أيام بس. الكبسولة ساعدتني في خسارة الوزن بسرعة، وأصبحت أشعر بثقة أكبر في مظهري.",
    rating: 5,
  },
  {
    id: 3,
    name: "شهد عمر",
    review:
      "بقيت باخده قبل ما اروح الجيم أساسي، وفرق معايا جدا في شكل جسمي وطاقتي وأنا بتمرن. الكبسولة زادت من طاقتي وساعدتني في تحقيق نتائج أفضل.",
    rating: 5,
  },
  {
    id: 4,
    name: "Adel abedlaziz",
    review:
      "نزلي كل المية الزيادة اللي كانت في جسمي لأني في أول 3 أيام كان بيخليني أدخل الحمام كل شوية. الكبسولة ساعدتني في التخلص من السموم والوزن الزائد.",
    rating: 5,
  },
  {
    id: 5,
    name: "م.ع",
    review:
      "عملي اسهال شوية في أول أسبوع، وبعدها بدأت أنزل في الوزن والمقاسات. الكبسولة ساعدتني في تحسين عملية الهضم وخسارة الوزن بشكل صحي.",
    rating: 4,
  },
  {
    id: 6,
    name: "محمود احمد",
    review:
      "خسيت 3 كيلو بعد أسبوع. الكبسولة ساعدتني في خسارة الوزن بسرعة، وأصبحت أشعر بنشاط وحيوية أكبر في حياتي اليومية.",
    rating: 5,
  },
  {
    id: 7,
    name: "مريم صالح",
    review:
      "من ساعة ما اخدته وانا مش عارفة اخلص نصف الطبق بتاعي. الكبسولة ساعدتني في تقليل شهيتي، وأصبحت أتناول كميات أقل من الطعام.",
    rating: 5,
  },
];

const Testimonials = () => {
  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 2500,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-8">
          أراء العملاء
        </h2>
        <Slider {...settings}>
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="px-4">
              <div className="bg-white rounded-lg shadow-lg p-6 text-center">
                <p className="text-gray-600 italic">"{testimonial.review}"</p>
                <div className="mt-4 flex justify-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400">
                      ★
                    </span>
                  ))}
                </div>
                <h3 className="text-xl font-semibold mt-4">
                  {testimonial.name}
                </h3>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </section>
  );
};

export default Testimonials;
