"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import LenisWrapper from "@/components/LenisWrapper";
import Navigation from "@/components/Navigation";
import Hero from "@/components/sections/Hero";
import Problem from "@/components/sections/Problem";
import WhatWeDo from "@/components/sections/WhatWeDo";
import Divisions from "@/components/sections/Divisions";
import HowItWorks from "@/components/sections/HowItWorks";
// SOCIALS-LAUNCH: DelegateHQ pricing hidden — restore this import + <Pricing /> below to revert
// import Pricing from "@/components/sections/Pricing";
import Proof from "@/components/sections/Proof";
import FAQ from "@/components/sections/FAQ";
import CTASection from "@/components/sections/CTASection";
import Footer from "@/components/Footer";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

// The DelegateHQ agency landing page. Previously served at "/", moved here during the
// Socials launch so the agency work stays reachable while Socials owns the homepage.
export default function AgencyHome() {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <Loader onComplete={() => setLoaded(true)} />

      <AnimatePresence>
        {loaded && (
          <motion.div
            key="page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <ThreeBackground />
            <LenisWrapper>
              <Navigation />
              <main>
                <Hero />
                <Problem />
                <WhatWeDo />
                <Divisions />
                <HowItWorks />
                {/* SOCIALS-LAUNCH: DelegateHQ pricing hidden — restore <Pricing /> to revert */}
                {/* <Pricing /> */}
                <Proof />
                <FAQ />
                <CTASection />
              </main>
              <Footer />
            </LenisWrapper>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
