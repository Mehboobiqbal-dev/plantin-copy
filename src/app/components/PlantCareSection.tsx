'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

interface CareSection {
  title: string;
  icon: string;
  description: string;
}

interface PlantCareSectionProps {
  plant: { _id: string; name: string };
  careSections?: CareSection[];
}

interface StaticSectionDetail {
  title: string;
  icon: string;
  content: React.ReactElement;
  isStatic: true;
}

interface DynamicSectionDetail {
  title: string;
  icon: string;
  description: string;
  isStatic?: false;
}

type SectionItem = DynamicSectionDetail | StaticSectionDetail;

const PlantCareSection: React.FC<PlantCareSectionProps> = ({ plant, careSections }) => {
  const router = useRouter();
  const [openStates, setOpenStates] = useState<{ [key: string]: boolean }>({});

  const toggleSection = (title: string) => {
    setOpenStates(prev => ({ ...prev, [title]: !prev[title] }));
  };

  const staticSections: StaticSectionDetail[] = [
    {
      title: 'PlantIn Care System',
      icon: 'https://strapi.myplantin.com/Info_Circle_5adb60d059.webp',
      content: (
        <div className="text-center">
          <img src="/attachments/poCvCp3zCDyLSNcu2tSXT.png" alt="PlantIn Care System" className="mx-auto my-4" />
          <p className="text-gray-700">Ease your plant care routine with PlantIn's personalized system.</p>
          <button
            onClick={() => router.push(`/care-plan/${plant?._id}`)}
            className="mt-3 px-4 py-2 bg-green-600 text-white rounded-lg"
          >
            Get Care Plan
          </button>
        </div>
      ),
      isStatic: true,
    },
  ];

  const dynamicSections: DynamicSectionDetail[] = (careSections || []).map(section => ({
    title: section.title,
    icon: section.icon,
    description: section.description,
  }));

  const combinedSections: SectionItem[] = [...dynamicSections, ...staticSections];

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

        if (section.isStatic) {
          currentContent = section.content;
        } else {
          currentContent = section.description ? (
            <p>{section.description}</p>
          ) : (
            <p>Care information not available for {section.title.toLowerCase()}.</p>
          );

          if (!section.description) {
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
                <button
                  onClick={() => toggleSection(section.title)}
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
                  {currentContent}
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
            {!section.isStatic &&
              (section.title === 'Fertilizer' || section.title === 'Popularity') &&
              section.description &&
              banner}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default PlantCareSection;