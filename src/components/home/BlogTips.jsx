const BlogTips = () => {
    const blogPosts = [
      {
        id: 1,
        title: "كيف تختار العطر المثالي لحفل زفافك",
        description: "نصائح لاختيار عطر يليق بيومك الخاص.",
        image: "https://picsum.photos/400/250?random=14",
        link: "#",
      },
      {
        id: 2,
        title: "أفضل 5 عطور لفصل الصيف 2023",
        description: "اكتشف أفضل العطور الصيفية لإبقائك منتعشًا طوال الموسم.",
        image: "https://picsum.photos/400/250?random=15",
        link: "#",
      },
      {
        id: 3,
        title: "تاريخ العطور: من العصور القديمة إلى العصر الحديث",
        description: "تعرف على الرحلة المثيرة للعطور عبر العصور.",
        image: "https://picsum.photos/400/250?random=16",
        link: "#",
      },
      {
        id: 4,
        title: "كيف تختار العطر المناسب لشخصيتك",
        description: "ابحث عن العطر المثالي الذي يعكس أسلوبك وشخصيتك.",
        image: "https://picsum.photos/400/250?random=17",
        link: "#",
      },
    ];
  
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">المدونة والنصائح</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {blogPosts.map((post) => (
              <div key={post.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                <img
                  src={post.image}
                  alt={post.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
                  <p className="text-gray-600 mb-4">{post.description}</p>
                  <a
                    href={post.link}
                    className="text-black font-semibold hover:underline"
                  >
                    اقرأ المزيد →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default BlogTips;