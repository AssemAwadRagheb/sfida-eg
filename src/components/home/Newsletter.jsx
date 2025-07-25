const Newsletter = () => {
    return (
      <section className="py-12 bg-black text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">اشترك في نشرتنا الإخبارية</h2>
          <p className="text-gray-300 mb-8">
            احصل على عروض حصرية، تحديثات، ونصائح عن منتجاتنا مباشرة إلى بريدك الإلكتروني.
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="أدخل بريدك الإلكتروني"
              className="flex-1 p-3 rounded-r-lg text-black"
            />
            <button
              type="submit"
              className="bg-white text-black px-6 py-3 rounded-l-lg hover:bg-red-200 transition"
            >
              اشتراك
            </button>
          </form>
        </div>
      </section>
    );
  };
  
  export default Newsletter;