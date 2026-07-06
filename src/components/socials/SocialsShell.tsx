"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import LenisWrapper from "@/components/LenisWrapper";
import SocialsNav from "./SocialsNav";
import SocialsFooter from "./SocialsFooter";
import SocialsBookCallModal from "./SocialsBookCallModal";

const ThreeBackground = dynamic(() => import("@/components/ThreeBackground"), { ssr: false });

// Socials launch: reusable client chrome (nav + footer + book-a-call modal) so server
// components like the blog can render inside the Socials UI. Holds the modal state.
export default function SocialsShell({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <>
      <ThreeBackground />
      <LenisWrapper>
        <SocialsNav onBookCall={openModal} />
        {children}
        <SocialsFooter onBookCall={openModal} />
      </LenisWrapper>
      <SocialsBookCallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
}
