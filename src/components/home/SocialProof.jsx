const SocialProof = () => {
    const images = [
      "https://picsum.photos/300/300?random=19",
      "https://picsum.photos/300/300?random=20",
      "https://picsum.photos/300/300?random=21",
      "https://picsum.photos/300/300?random=22",
      "https://picsum.photos/300/300?random=23",
      "https://picsum.photos/300/300?random=24",
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">انضم إلى مجتمعنا</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`إثبات اجتماعي ${index + 1}`}
                className="rounded-lg shadow-lg"
              />
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default SocialProof;