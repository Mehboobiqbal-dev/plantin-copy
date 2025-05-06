"use client";
import * as React from "react";
import { HeroSection } from "./HeroSection";
import { FeatureSection } from "./FeatureSection";
import PlantIdentifierSlider from "./PlantIdentifierSlider";
import MediaSection from "./MediaSection";

function InputDesign() {
  return (
    <div className="overflow-x-hidden max-w-[100vw]">
     
      <main className="min-h-[330px]">
        <PlantIdentifierSlider />
        <HeroSection />
        <FeatureSection />
        <MediaSection />
      </main>
      
    </div>
  );
}

export default InputDesign;
