import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CareData {
  Water?: string;
 
}

interface ExpandableCareSectionProps {
  plant: { _id: string; name: string;  };
  careData: CareData | null | undefined;
}

const ExpandableCareSection: React.FC<ExpandableCareSectionProps> = ({ plant, careData }) => {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const toggleSection = () => {
    setIsOpen((prev) => !prev);
  };

  const section = {
    title: 'Water',
    icon: 'https://strapi.myplantin.com/plant_care_water_74ea6d9cdc.webp',
  };

  const content = careData?.Water || 'Water the Chinese banyan as soon as the soil becomes dry on one centimeter, water so as to moisten all of it. During a growth period (spring, summer), watering should be regular - once or twice a week - but measured in order not to asphyxiate the roots of plants. In the fall, space the waterings gently, until winter';

  return (
    <div className="border border-gray-200 rounded-xl">
      <div className="flex items-center justify-between px-6 py-4">
        <div className="flex items-center">
          <div className="p-2 bg-emerald-100 rounded-full">
            <img
              src={section.icon}
              alt={`${section.title} icon`}
              className="w-6 h-6"
            />
          </div>
          <h3 className="ml-3 text-lg font-semibold text-gray-800">{section.title}</h3>
        </div>
        <button
          onClick={toggleSection}
          className="p-2 bg-green-100 rounded-full text-green-500"
        >
          {isOpen ? (
            <img
              src="https://strapi.myplantin.com/Info_Circle_5adb60d059.webp"
              alt="Collapse"
              className="w-6 h-6"
            />
          ) : (
            <img
              src="https://strapi.myplantin.com/Info_Circle_963151da74.webp"
              alt="Expand"
              className="w-6 h-6"
            />
          )}
        </button>
      </div>
      {isOpen && (
        <div className="px-6 pb-6">
          <p>{content}</p>
          <div className="flex mt-6">
            <button
              disabled
              className="ml-auto w-1/2 px-2.5 py-1 border border-gray-300 rounded-full text-gray-400 cursor-not-allowed"
            >
              Get Care Tool
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ExpandableCareSection;