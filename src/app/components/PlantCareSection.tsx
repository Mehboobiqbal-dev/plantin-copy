import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ExpandableCareSection from "../components/Exapendable"; // Fixed typo in import

interface CareData {
  Water?: string;
  Pruning?: string;
  Fertilizer?: string;
  Sunlight?: string;
  Soil?: string;
  Propagation?: string;
  Temperature?: string;
  Container?: string;
  Popularity?: string;
  'Common Pests'?: string;
  'Frequent Diseases'?: string;
  'Botanist Tips'?: string;
}

interface PlantCareSectionProps {
  plant: { _id: string; name: string; /* other plant props */ };
  careData: CareData | null | undefined;
}

// Define more specific types for the section objects
interface DynamicSectionDetail {
  title: string;
  icon: string;
  dataKey: keyof CareData; // Use keyof CareData for better type safety
  isStatic?: false; // Explicitly mark as not static or undefined
  content?: never; // Ensure static content specific properties are not on dynamic sections
}

interface StaticSectionDetail {
  title: string;
  icon: string;
  content: React.ReactElement;
  isStatic: true;
  dataKey?: never; // Ensure dynamic content specific properties are not on static sections
}

type SectionItem = DynamicSectionDetail | StaticSectionDetail;

const PlantCareSection: React.FC<PlantCareSectionProps> = ({ plant, careData }) => {
  const router = useRouter();
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setOpenStates(prev => ({ ...prev, [title]: !prev[title] }));
  };

  // Use the more specific types for these arrays
  const sectionDetails: DynamicSectionDetail[] = [
    { title: "Water", icon: "https://strapi.myplantin.com/plant_care_water_74ea6d9cdc.webp", dataKey: "Water" },
    { title: "Pruning", icon: "https://strapi.myplantin.com/Planting_icon_ed780f57c5.webp", dataKey: "Pruning" },
    { title: "Fertilizer", icon: "https://strapi.myplantin.com/plant_care_fertilizer_8feecd00c0.webp", dataKey: "Fertilizer" },
    { title: "Sunlight", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_sunlight_30ed9006a6.webp&w=48&q=75", dataKey: "Sunlight" },
    { title: "Soil", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_2c3ce2a493.webp&w=48&q=75", dataKey: "Soil" },
    { title: "Propagation", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_propagation_74ac28ce96.webp&w=48&q=75", dataKey: "Propagation" },
    { title: "Temperature", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_temperature_330abe06c7.webp&w=48&q=75", dataKey: "Temperature" },
    { title: "Container", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_container_f7effc877d.webp&w=48&q=75", dataKey: "Container" },
    { title: "Popularity", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2Fplant_care_popularity_9ca536794d.webp&w=48&q=75", dataKey: "Popularity" },
    { title: "Common Pests", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_bf400946b0.webp&w=48&q=75", dataKey: "Common Pests" },
    { title: "Frequent Diseases", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_7542bc8e22.webp&w=48&q=75", dataKey: "Frequent Diseases" },
    { title: "Botanist Tips", icon: "https://myplantin.com/_next/image?url=https%3A%2F%2Fstrapi.myplantin.com%2FPlanting_icon_69b6afa7c1.webp&w=48&q=75", dataKey: "Botanist Tips" }
  ];

  const staticSections: StaticSectionDetail[] = [
    {
      title: "PlantIn Care System",
      icon: "https://strapi.myplantin.com/Info_Circle_5adb60d059.webp",
      content: (
        <div className="text-center">
          <img src="/attachments/poCvCp3zCDyLSNcu2tSXT.png" alt="PlantIn Care System" className="mx-auto my-4" />
          <p className="text-gray-700">Ease your plant care routine with PlantIn's personalized system.</p>
          <button
            onClick={() => router.push(`/care-plan/${plant?._id}`)}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg">Get Care Plan</button>
        </div>
      ),
      isStatic: true
    }
  ];

  // The combinedSections will correctly infer its type as SectionItem[]
  const combinedSections: SectionItem[] = [...sectionDetails, ...staticSections];

  const banner = (
    <div className="border border-emerald-300 rounded-xl p-6 flex items-center justify-between space-x-4">
      <p className="flex-1 text-emerald-600 font-medium">
        Ease your plant care routine with PlantIn's personalized system.
      </p>
      <button
        onClick={() => router.push(`/care-plan/${plant?._id}`)}
        className="px-6 py-2 bg-emerald-500 text-white rounded-full shadow hover:bg-emerald-600"
      >
        Get Care Plan
      </button>
    </div>
  );


  return (
    <div className="space-y-4">
      
      {combinedSections.map((section) => {
        const isOpen = openStates[section.title] || false;
        let currentContent;

        // Type guard to differentiate between DynamicSectionDetail and StaticSectionDetail
        if (section.isStatic) {
          currentContent = section.content;
        } else {
          currentContent = careData && section.dataKey && careData[section.dataKey]
            ? <p>{careData[section.dataKey]}</p>
            : <p>Care information not available for {section.title.toLowerCase()}.</p>;
          
          // Skip rendering the dynamic section if no careData is available for it
          if (!careData || !section.dataKey || !careData[section.dataKey]) {
            return null;
          }
        }

        return (
          <React.Fragment key={section.title}>
            <div className="border border-gray-200 rounded-xl">
              <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center">
                  <div className="p-2 bg-emerald-100 rounded-full">
                    <img src={section.icon} alt={`${section.title} icon`} className="w-6 h-6" />
                  </div>
                  <h3 className="ml-3 text-lg font-semibold text-gray-800">{section.title}</h3>
                </div>
                <button onClick={() => toggleSection(section.title)} className="p-2 bg-green-100 rounded-full text-green-500">
                  {isOpen ? (
                    <img src="https://strapi.myplantin.com/Info_Circle_5adb60d059.webp" alt="Collapse" className="w-6 h-6" />
                  ) : (
                    <img src="https://strapi.myplantin.com/Info_Circle_963151da74.webp" alt="Expand" className="w-6 h-6" />
                  )}
                </button>
              </div>
              {isOpen && (
                <div className="px-6 pb-6">
                  {currentContent}
                  <div className="flex mt-6">
                    <button disabled className="ml-auto w-1/2 px-2.5 py-1 border border-gray-300 rounded-full text-gray-400 cursor-not-allowed">
                      Get Care Tool
                    </button>
                  </div>
                </div>
              )}
            </div>
            {/* Conditionally render banner after specific sections */}
            {!section.isStatic && (section.title === "Fertilizer" || section.title === "Popularity") && careData && section.dataKey && careData[section.dataKey] && banner}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PlantCareSection;