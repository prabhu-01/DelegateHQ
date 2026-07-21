"use client";

import { useState } from "react";
import LenisWrapper from "@/components/LenisWrapper";
import SocialsNav from "./SocialsNav";
import SocialsFooter from "./SocialsFooter";
import SocialsBookCallModal from "./SocialsBookCallModal";

// Reusable client chrome (nav + footer + book-a-call modal) so server components like
// the blog render inside the Socials UI. The `.socials` class scopes the warm editorial
// design tokens here (see globals.css); nothing outside it is affected.
export default function SocialsShell({ children }: { children: React.ReactNode }) {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => setModalOpen(true);

  return (
    <div className="socials" style={{ minHeight: "100vh" }}>
      <LenisWrapper>
        <SocialsNav onBookCall={openModal} />
        {children}
        <SocialsFooter onBookCall={openModal} />
      </LenisWrapper>
      <SocialsBookCallModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
}
