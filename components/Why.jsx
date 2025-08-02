"use client";
import React from "react";
import MouseSpotlightImage from "./MouseSpotlightImage";

export default function WhyChooseUs() {
  return (
    <div className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 bg-white min-h-screen">
      {/* Header Section */}
      <div className="text-center mb-12 sm:mb-14 md:mb-16">
        <div className="inline-block mb-4"></div>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4 leading-tight">
          Why Choose Our Platform?
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto leading-relaxed px-4 sm:px-0">
          Experience the future of recruitment with our AI-powered ecosystem
          that revolutionizes how HR professionals and job seekers connect,
          learn, and grow.
        </p>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-7xl mx-auto">
        {/* Main Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 h-auto lg:h-[500px] xl:h-[600px] 2xl:h-[700px]">
          {/* Left Column */}
          <div className="lg:col-span-2 flex flex-col gap-4 sm:gap-6 md:gap-8">
            {/* Top Left Rectangle */}
            <div className="flex-1 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden shadow-lg">
              <MouseSpotlightImage
                primaryImage="/content-1.gif"
                backgroundImage="/content-1.gif"
                alt="AI-Powered Recruitment Dashboard"
                title="AI Recruitment"
                subtitle="Smart hiring solutions"
                width={800}
                height={400}
                spotlightRadius={200}
                className="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0"
                splashType="organic"
                titleClassName="text-blue-600 text-xl sm:text-2xl font-bold mb-2 drop-shadow-lg"
                subtitleClassName="text-gray-700 text-sm sm:text-base"
                overlayClassName="bg-gradient-to-br from-blue-50/20 to-purple-50/20"
              />
            </div>

            {/* Bottom Row with 2 rectangles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 md:gap-8 flex-1">
              {/* Bottom Left Rectangle */}
              <div className="min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden shadow-lg">
                <MouseSpotlightImage
                  primaryImage="/content-2.gif"
                  backgroundImage="/content-2.gif"
                  alt="VR Interview Simulation"
                  title="VR Interviews"
                  subtitle="Immersive experience"
                  width={400}
                  height={300}
                  spotlightRadius={150}
                  className="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0"
                  splashType="splash"
                  titleClassName="text-green-600 text-lg sm:text-xl font-bold mb-2 drop-shadow-lg"
                  subtitleClassName="text-gray-700 text-sm"
                  overlayClassName="bg-gradient-to-br from-green-50/20 to-blue-50/20"
                />
              </div>

              {/* Bottom Right Rectangle */}
              <div className="min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden shadow-lg">
                <MouseSpotlightImage
                  primaryImage="/content-3.gif"
                  backgroundImage="/content-3.gif"
                  alt="Global Job Discovery Map"
                  title="Global Jobs"
                  subtitle="Worldwide opportunities"
                  width={400}
                  height={300}
                  spotlightRadius={140}
                  className="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0"
                  splashType="algae"
                  titleClassName="text-purple-600 text-lg sm:text-xl font-bold mb-2 drop-shadow-lg"
                  subtitleClassName="text-gray-700 text-sm"
                  overlayClassName="bg-gradient-to-br from-purple-50/20 to-pink-50/20"
                />
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0 rounded-lg overflow-hidden shadow-lg">
            <MouseSpotlightImage
              primaryImage="/content-4.gif"
              backgroundImage="/content-4.gif"
              alt="AI Learning Assistant Interface"
              title="AI Learning"
              subtitle="Personalized growth"
              width={400}
              height={600}
              spotlightRadius={180}
              className="w-full h-full min-h-[200px] sm:min-h-[250px] md:min-h-[300px] lg:min-h-0"
              splashType="organic"
              titleClassName="text-orange-600 text-lg sm:text-xl font-bold mb-2 drop-shadow-lg"
              subtitleClassName="text-gray-700 text-sm"
              overlayClassName="bg-gradient-to-br from-orange-50/20 to-yellow-50/20"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
