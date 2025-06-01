import Image from 'next/image';

const Gallery = () => {
  const images = [
    { src: '/1.jpg', alt: 'Intérieur Moderne', width: 400, height: 300 },
    { src: '/2.jpg', alt: 'Salon Élégant', width: 400, height: 300 },
    { src: '/3.jpg', alt: 'Cuisine Design', width: 400, height: 300 },
    { src: '/4.jpg', alt: 'Chambre Lumineuse', width: 400, height: 300 },
    { src: '/5.jpg', alt: 'Intérieur Moderne', width: 400, height: 300 },
    { src: '/6.jpg', alt: 'Salon Élégant', width: 400, height: 300 },
    { src: '/7.jpg', alt: 'Cuisine Design', width: 400, height: 300 },
    { src: '/13.jpg', alt: 'Chambre Lumineuse', width: 400, height: 300 },
    { src: '/9.jpg', alt: 'Intérieur Moderne', width: 400, height: 300 },
    { src: '/10.jpg', alt: 'Salon Élégant', width: 400, height: 300 },
    { src: '/11.jpg', alt: 'Cuisine Design', width: 400, height: 300 },
    { src: '/12.jpg', alt: 'Chambre Lumineuse', width: 400, height: 300 },
  ];

  return (
    <section id="gallery" className="section-padding bg-brand-gray-light">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-blue-dark">Galerie d'Intérieurs</h2>
          <p className="mt-4 text-lg text-brand-gray">Découvrez la qualité de nos rendus 3D.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {images.map((image, index) => (
            <div key={index} className="relative overflow-hidden rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
              <Image
                src={image.src}
                alt={image.alt}
                width={image.width}
                height={image.height}
                className="object-cover w-full h-full"
                unoptimized
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-opacity duration-300 flex items-center justify-center">
                <p className="text-white text-lg font-semibold opacity-0 hover:opacity-100 transition-opacity duration-300">{image.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
export default Gallery;