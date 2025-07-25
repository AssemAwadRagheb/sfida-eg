const FragranceGuide = () => {
    const fragranceNotes = [
      {
        id: 1,
        name: "الورود",
        description: "خفيفة ورومانسية، مثالية للارتداء خلال النهار.",
        image: "https://picsum.photos/200/200?random=25",
      },
      {
        id: 2,
        name: "الخشب",
        description: "دافئة وترابية، مثالية للمناسبات المسائية.",
        image: "https://picsum.photos/200/200?random=26",
      },
      {
        id: 3,
        name: "الحمضيات",
        description: "منعشة وحمضية، مثالية لإضفاء الحيوية.",
        image: "https://picsum.photos/200/200?random=27",
      },
      {
        id: 4,
        name: "الشرقية",
        description: "غنية وغريبة، مثالية لترك انطباع قوي.",
        image: "https://picsum.photos/200/200?random=28",
      },
    ];
  
    return (
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8">اكتشف عوالم العطور</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {fragranceNotes.map((note) => (
              <div key={note.id} className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                <img src={note.image} alt={note.name} className="w-full h-48 object-cover" />
                <div className="p-4">
                  <h3 className="text-xl font-semibold mb-2">{note.name}</h3>
                  <p className="text-gray-600">{note.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  };
  
  export default FragranceGuide;