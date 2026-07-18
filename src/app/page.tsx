"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { motion } from "framer-motion";

import Loader from "@/components/Loader";
import LenisWrapper from "@/components/LenisWrapper";
import SocialsNav from "@/components/socials/SocialsNav";
import SocialsHero from "@/components/socials/SocialsHero";
import VideoCarousel from "@/components/socials/VideoCarousel";
import Pipeline from "@/components/socials/Pipeline";
import PromoVideo from "@/components/socials/PromoVideo";
import Features from "@/components/socials/Features";
import EarningsEstimator from "@/components/socials/EarningsEstimator";
import Testimonials from "@/components/socials/Testimonials";
import SocialsFAQ from "@/components/socials/SocialsFAQ";
import FreeMonthOffer from "@/components/socials/FreeMonthOffer";
import SocialsCTA from "@/components/socials/SocialsCTA";
import SocialsFooter from "@/components/socials/SocialsFooter";
import SocialsBookCallModal from "@/components/socials/SocialsBookCallModal";
import { SOCIALS_VIDEOS } from "@/components/socials/videos";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), {
  ssr: false,
});

// Only the hero clip + the first few wall clips are worth blocking the loader on; the
// rest of the wall lazy-loads as the user scrolls to it (preload="metadata" per card).
const PRELOAD_VIDEOS = SOCIALS_VIDEOS.slice(0, 4);

// "/" is the marketing landing for the Socials product.
// The DelegateHQ agency landing lives at /agency (see src/app/agency/page.tsx).
export default function Home() {
  const [loaded, setLoaded] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [showThree, setShowThree] = useState(false);
  const openModal = () => setModalOpen(true);

  // The particle background is a desktop-only flourish: skip the WebGL canvas entirely
  // on mobile to keep scroll buttery on weaker GPUs.
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    setShowThree(mq.matches);
    const onChange = (e: MediaQueryListEvent) => setShowThree(e.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  return (
    <>
      {/* Preload the hero + first wall clips during the loading screen so nothing pops in */}
      <Loader onComplete={() => setLoaded(true)} preloadAssets={PRELOAD_VIDEOS} />

      {/* Content is always mounted (not conditionally rendered on `loaded`), so the real
          page text is present in the server-rendered HTML from the first response, not
          only after client JS runs. Search and AI crawlers that read raw HTML without
          executing JavaScript see the actual content this way. The loader is a full-screen
          opaque overlay on top (see Loader.tsx) plus this opacity fade, so sighted users
          still get the exact same reveal experience as before. */}
      <motion.div
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {showThree && <ThreeBackground />}
        <LenisWrapper>
          <SocialsNav onBookCall={openModal} />
          <main>
            <SocialsHero onBookCall={openModal} />
            <VideoCarousel />
            <Pipeline />
            <PromoVideo />
            <Features onBookCall={openModal} />
            <EarningsEstimator onBookCall={openModal} />
            <Testimonials />
            <SocialsFAQ onBookCall={openModal} />
            <FreeMonthOffer onBookCall={openModal} />
            <SocialsCTA onBookCall={openModal} />
          </main>
          <SocialsFooter onBookCall={openModal} />
        </LenisWrapper>

        <SocialsBookCallModal open={modalOpen} onClose={() => setModalOpen(false)} />
      </motion.div>
    </>
  );
}
