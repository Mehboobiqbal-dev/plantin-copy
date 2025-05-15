import Image from "next/image";

const MushroomID = () => {
  return (
    <main>
      {/* Hero Section */}
      <section className="flex flex-col md:flex-row items-center justify-center px-4 py-8 mx-auto max-w-[1320px] gap-8">
        <div className="flex-1 p-6">
          <h1 className="text-4xl font-bold mb-4 text-left">
            Plantin Mushroom Identification App Feature
          </h1>
          <p className="text-lg mb-6 text-left">
            Want to go mushroom hunting but not sure which mushrooms you should pick? Don't worry! PlantIn has a mushroom identification app feature designed to make your shroom foraging trip safe and fun!
          </p>
           <div className="flex mt-6">
              <a
                href="https://apps.apple.com/us/app/plantin-plant-identifier-care/id1527399597"
                className="mb-2"
              >
                <img
                  src="https://developer.apple.com/assets/elements/badges/download-on-the-app-store.svg"
                  alt="Download on the App Store"
                  className="h-10"
                />
              </a>
               <a
                href="https://play.google.com/store/apps/details?id=com.plantin.app"
              >
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/7/78/Google_Play_Store_badge_EN.svg"
                  alt="Get it on Google Play"
                  className="h-10"
                />
              </a>
              </div>
          
        </div>
        <div className="flex-1 flex justify-center md:justify-end">
          <Image
            src="https://myplantin.com/_next/image?url=%2Fimages%2Fmushroom-id-app-1.png&w=1080&q=100"
            alt="Boost Plant Growth"
            width={600}
            height={400}
            className="w-full max-w-[600px] h-auto object-cover rounded-lg"
            priority
          />
        </div>
      </section>
    </main>
  );
};

export default MushroomID;