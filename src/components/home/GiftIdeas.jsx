const GiftIdeas = () => {
    const gifts = [
      {
        id: 1,
        name: "هدايا عيد الميلاد",
        image: "https://picsum.photos/300/400?random=29",
      },
      {
        id: 2,
        name: "هدايا الذكرى السنوية",
        image: "https://picsum.photos/300/400?random=30",
      },
      {
        id: 3,
        name: "عروض العطلات",
        image: "https://picsum.photos/300/400?random=31",
      },
      {
        id: 4,
        name: "هدايا فاخرة",
        image: "https://picsum.photos/300/400?random=32",
      },
    ];
  
    return (
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">هدايا مثالية لكل مناسبة</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {gifts.map((gift) => (
              <div key={gift.id} className="bg-gray-100 rounded-lg overflow-hidden shadow-lg text-center">
                <img src={gift.image} alt={gift.name} className="w-full h-64 object-cover" />
                <h3 className="text-xl font-semibold p-4">{gift.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default GiftIdeas;