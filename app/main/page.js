"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { EpicTransitionsProvider } from "@/components/EpicTransitions";
import Aboutus from "@/components/About";
import Footeritem from "@/components/Footer";
import Headerpage from "@/components/Header";
import Heroitem from "@/components/Hero";
import LowerFooter from "@/components/Lowerfooter";
import Pricingitem from "@/components/Pricing";
import RevenueBreakdown from "@/components/Revenue";
import Servicesitem from "@/components/Services";
import Testimonialsitem from "@/components/Testimonials";
import WhyChooseUs from "@/components/Why";
import LoadingScreen from "@/components/LoadingScreen";

export default function MainPage() {
  const [isLoading, setIsLoading] = useState(true);

  const handleLoadingComplete = () => {
    setIsLoading(false);
  };

  return (
    <AnimatePresence mode="wait">
      {isLoading ? (
        <LoadingScreen key="loading" onComplete={handleLoadingComplete} />
      ) : (
        <EpicTransitionsProvider key="content">
          <motion.main
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="min-h-screen bg-white"
          >
            <Headerpage />
            <Heroitem />
            <Aboutus />
            <Servicesitem />
            <WhyChooseUs />
            <RevenueBreakdown />
            <Pricingitem />
            <Testimonialsitem />
            <LowerFooter />
            <Footeritem />
          </motion.main>
        </EpicTransitionsProvider>
      )}
    </AnimatePresence>
  );
}
