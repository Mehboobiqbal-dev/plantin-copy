import React, { useState } from "react";

const PlantCareSection = ({ plant }) => {
  const [isWaterOpen, setIsWaterOpen] = useState(false);
  const [isPruningOpen, setIsPruningOpen] = useState(false);
  const [isFertilizerOpen, setIsFertilizerOpen] = useState(false);
  const [isSunlightOpen, setIsSunlightOpen] = useState(false);
  const [isSoilOpen, setIsSoilOpen] = useState(false);
  const [isPropogationOpen, setIsPropogationOpen] = useState(false)
  const [isTemperatureOpen, setIsTemperatureOpen] = useState(false);
  const [isContainerOpen, setIsContainerOpen] = useState(false);
  const [isPopularityOpen, setIsPopularityOpen] = useState(false);
  const [isCommonPestsOpen, setIsCommonPestsOpen] = useState(false);
  const [isFrequentDiseaseOpen, setIsFrequentDiseaseOpen] = useState(false);
  const [isBotanistTipsOpen, setIsBotanistTipsOpen] = useState(false);

  const sections = [
    {
      title: "Water",
      isOpen: isWaterOpen,
      toggle: () => setIsWaterOpen(!isWaterOpen),
      icon: "https://strapi.myplantin.com/plant_care_water_74ea6d9cdc.webp",
      content: <p>Water the Chinese banyan as soon as a soil becomes dry on one centimeter, water so as to moisten all of it. During a growth period (spring, summer), watering should be regular - once or twice a week - but measured in order not to asphyxiate a roots of plants. In a fall, space a waterings gently, until winter.</p>
    },
    {
      title: "Pruning",
      isOpen: isPruningOpen,
      toggle: () => setIsPruningOpen(!isPruningOpen),
      icon: "https://strapi.myplantin.com/Planting_icon_ed780f57c5.webp",
      content: <p>Use sharp pruning shears to remove the sucker branches and the errant branches that are growing in the wrong direction or making it difficult to fertilize the tree. Since lemon cypress has a conical habit, trim the tree as per its natural shape. Trimming should be done every week during the summer.</p>
    },
    {
      title: "Fertilizer",
      isOpen: isFertilizerOpen,
      toggle: () => setIsFertilizerOpen(!isFertilizerOpen),
      icon: "https://strapi.myplantin.com/plant_care_fertilizer_8feecd00c0.webp",
      content: <p>Mix the recommended amount of liquid fertilizer and water in a watering can. Then simply pour the mix into the soil as if you're watering the plant.</p>
    },
    {
      title: "PlantIn Care System",
      isOpen: false,
      toggle: () => {},
      icon: "https://strapi.myplantin.com/Info_Circle_5adb60d059.webp",
      content: (
        <div className="text-center">
          <img src="/attachments/poCvCp3zCDyLSNcu2tSXT.png" alt="PlantIn Care System" className="mx-auto my-4" />
          <p className="text-gray-700">Ease your plant care routine with PlantIn's personalized system.</p>
          <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg">Get Care Plan</button>
        </div>
      )
    },
    {
      title: "Sunlight",
      isOpen: isSunlightOpen,
      toggle: () => setIsSunlightOpen(!isSunlightOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_sunlight_30ed9006a6.webp&w=48&q=75",
      content: <p> Requires either part sun or part shade do well in filtered light for most of the day. </p>
    },
    {
      title: "Soil",
      isOpen: isSoilOpen,
      toggle: () => setIsSoilOpen(!isSoilOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_2c3ce2a493.webp&w=48&q=75",
      content: <p> Loam soil offers a great balance of silt, sand, and clay as well as a bit of hummus. </p>
    },
    {
      title: "Propogation",
      isOpen: isPropogationOpen,
      toggle: () => setIsPropogationOpen(!isPropogationOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_propagation_74ac28ce96.webp&w=48&q=75",
      content: <p> Chinese banyan can be propagated by cuttings, which can be taken from the tips and rooted. Alternatively, you can do eye cuttings. </p>
    },
    {
      title: "Temperature",
      isOpen: isTemperatureOpen,
      toggle: () => setIsTemperatureOpen(!isTemperatureOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_temperature_330abe06c7.webp&w=48&q=75",
      content: <p> Temperatures hovering around 60 to 70 or 75°F (15 to 25°C) are perfect if kept all year round. </p>
    },
    {
      title: "Container",
      isOpen: isContainerOpen,
      toggle: () => setIsContainerOpen(!isContainerOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_container_f7effc877d.webp&w=48&q=75",
      content: <p> Choose a pot with drainage holes, which also ensures potting soil doesn't stay too wet after watering your houseplants. The excess can freely escape out the bottom of the container, allowing oxygen to make its way to plant roots. </p>
    },
    {
      title: "Popularity",
      isOpen: isPopularityOpen,
      toggle: () => setIsPopularityOpen(!isPopularityOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_popularity_9ca536794d.webp&w=48&q=75",
      content: <p> 118,984 people already have this plant 10,992 people have added this plant to their wishlists </p>
    },
    {
      title: "PlantIn Care System",
      
      icon: "https://strapi.myplantin.com/Info_Circle_5adb60d059.webp",
      content: (
        <div className="text-center">
          <img src="/attachments/poCvCp3zCDyLSNcu2tSXT.png" alt="PlantIn Care System" className="mx-auto my-4" />
          <p className="text-gray-700">Ease your plant care routine with PlantIn's personalized system.</p>
          <button className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg">Get Care Plan</button>
        </div>
      )
    },
    {
      title: "Common Pests",
      isOpen: isCommonPestsOpen,
      toggle: () => setIsCommonPestsOpen(!isCommonPestsOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_bf400946b0.webp&w=48&q=75",
      content: <p> {/* placeholder: add pest identification here */} </p>
    },
    {
      title: "Frequent Diseases",
      isOpen: isFrequentDiseaseOpen,
      toggle: () => setIsFrequentDiseaseOpen(!isFrequentDiseaseOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_7542bc8e22.webp&w=48&q=75",
      content: <p> {/* placeholder: add disease prevention here */} </p>
    },
    {
      title: "Botanist Tips",
      isOpen: isBotanistTipsOpen,
      toggle: () => setIsBotanistTipsOpen(!isBotanistTipsOpen),
      icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_69b6afa7c1.webp&w=48&q=75",
      content: <p> {/* placeholder: add expert tips here */} </p>
    }
  ];
   const banner = (
    <div className="border border-emerald-300 rounded-xl p-6 flex items-center justify-between space-x-4">
      <p className="flex-1 text-emerald-600 font-medium">
        Ease your plant care routine with PlantIn's personalized system.
      </p>
      <button
        onClick={() => navigate(`/care-plan/${plant.id}`)}
        className="px-6 py-2 bg-emerald-500 text-white rounded-full shadow hover:bg-emerald-600"
      >
        Get Care Plan
      </button>
    </div>
  );


  return (
    <div className="space-y-4">
      {sections.map(({ title, isOpen, toggle, icon, content }) => (
      <React.Fragment key={title}>
        <div key={title} className="border border-gray-200 rounded-xl">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center">
              <div className="p-2 bg-emerald-100 rounded-full">
                <img src={icon} alt={`${title} icon`} className="w-6 h-6" />
              </div>
              <h3 className="ml-3 text-lg font-semibold text-gray-800">{title}</h3>
            </div>
            <button onClick={toggle} className="p-2 bg-green-100 rounded-full text-green-500">
              {isOpen ? (
                <img src="https://strapi.myplantin.com/Info_Circle_5adb60d059.webp" alt="Collapse" className="w-6 h-6" />
              ) : (
                <img src="https://strapi.myplantin.com/Info_Circle_963151da74.webp" alt="Expand" className="w-6 h-6" />
              )}
            </button>
          </div>
          {isOpen && (
            <div className="px-6 pb-6">
              {content}
              <div className="flex mt-6">
                <button disabled className="ml-auto w-1/2 px-2.5 py-1 border border-gray-300 rounded-full text-gray-400 cursor-not-allowed">
                  Get Care Tool
                </button>
              </div>
            </div>
          )}
        </div>
         {title === "Fertilizer" && banner}

          
          {title === "Popularity" && banner}
          </React.Fragment>
      ))}
    </div>
    
  );
};

export default PlantCareSection;
