"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";

import Loader from "@/components/Loader";
import LenisWrapper from "@/components/LenisWrapper";
import SocialsNav from "@/components/socials/SocialsNav";
import SocialsHero from "@/components/socials/SocialsHero";
import VideoCarousel from "@/components/socials/VideoCarousel";
import PromoVideo from "@/components/socials/PromoVideo";
import Pipeline from "@/components/socials/Pipeline";
import Features from "@/components/socials/Features";
import EarningsEstimator from "@/components/socials/EarningsEstimator";
import Testimonials from "@/components/socials/Testimonials";
import Trust from "@/components/socials/Trust";
import FreeMonthOffer from "@/components/socials/FreeMonthOffer";
import SocialsCTA from "@/components/socials/SocialsCTA";
import SocialsFooter from "@/components/socials/SocialsFooter";
import SocialsBookCallModal from "@/components/socials/SocialsBookCallModal";
import { SOCIALS_VIDEOS } from "@/components/socials/videos";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

// Socials launch: "/" is now the marketing landing for the Socials product.
// The DelegateHQ agency landing moved to /agency (see src/app/agency/page.tsx).
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      {/* Preload the hero + carousel clips during the loading screen so nothing pops in */}
      <Loader onComplete={() => setLoaded(true)} preloadAssets={SOCIALS_VIDEOS} />

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
              <SocialsNav onBookCall={openModal} />
              <main>
                <SocialsHero onBookCall={openModal} />
                <VideoCarousel />
                <PromoVideo />
                <Pipeline />
                <Features onBookCall={openModal} />
                <EarningsEstimator onBookCall={openModal} />
                <Testimonials />
                <Trust />
                <FreeMonthOffer onBookCall={openModal} />
                <SocialsCTA onBookCall={openModal} />
              </main>
              <SocialsFooter onBookCall={openModal} />
            </LenisWrapper>

            <SocialsBookCallModal open={modalOpen} onClose={() => setModalOpen(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
