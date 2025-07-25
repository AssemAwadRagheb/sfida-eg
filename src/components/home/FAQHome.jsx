const FAQHome = () => {
  const faqs = [
    {
      id: 1,
      question: "كيف يعمل زودياك كبسول؟",
      answer: "زودياك كبسول يعمل على حرق الدهون المختزنة.",
    },
    {
      id: 2,
      question: "هل المنتج آمن للاستخدام؟",
      answer: "نعم، المنتج مصنوع من مكونات طبيعية وآمنة للاستخدام.",
    },
    {
      id: 3,
      question: "ما هي مدة ظهور النتائج؟",
      answer: "تظهر النتائج الأولية بعد أسبوعين من الاستخدام المنتظم.",
    },
  ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">الأسئلة الشائعة</h2>
          <div className="max-w-2xl mx-auto">
            {faqs.map((faq) => (
              <div key={faq.id} className="mb-6">
                <h3 className="text-xl font-semibold mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FAQHome;