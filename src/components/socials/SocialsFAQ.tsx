"use client";

import * as Accordion from "@radix-ui/react-accordion";
import Reveal from "./anim/Reveal";

// Answers the exact questions people search around Reel ideation, both because
// creators genuinely ask them and because they're long-tail queries worth ranking
// for (mirrored in FAQPage JSON-LD in page.tsx). Keep every answer accurate to
// what the product actually does, nothing invented for keyword coverage.
const FAQ_ITEMS = [
  {
    q: "How do I find viral Reel ideas?",
    a: "Socials continuously curates fresh Reel ideas into your Idea Bucket and scores each one before you see it. Instead of hunting for viral Reel ideas yourself, you review a ranked list and pick the strongest ones to script.",
  },
  {
    q: "What makes a Reel idea worth filming?",
    a: "Every idea is scored on its hook, its angle, and how well it fits your creator profile, with the reasoning shown alongside the score, so you can judge whether it is actually worth turning into a script, not just trust a number.",
  },
  {
    q: "Are these trending Reel ideas or generic suggestions?",
    a: "Ideas are curated for your specific niche and creator profile, not pulled from a generic trending list, so what lands in your bucket reflects what is actually working in your space.",
  },
  {
    q: "Is Socials only for Instagram Reels?",
    a: "Today, yes. Instagram Reels is where Socials started, and we are expanding to more short-form platforms next.",
  },
  {
    q: "Do I need scripting or editing experience?",
    a: "No. Once you pick an idea, one click drafts a full script (hook, beats, caption, hashtags), and Aria refines it with you in chat. You still do the filming.",
  },
  {
    q: "How does Reel Audit work?",
    a: "Upload the take you actually filmed and it is scored beat by beat against the script it came from, with a specific note on what to fix on your next take.",
  },
  {
    q: "Can I turn a script into other content?",
    a: "Yes. Blog Writer expands any finished script into a long-form article you can publish, so one idea becomes two pieces of content.",
  },
  {
    q: "How much does Socials cost?",
    a: "Access is invite-gated and pricing is set per workspace. Book a call and, if your idea is a fit, your first month is free.",
  },
];

// FAQPage schema, generated from the exact same Q&A shown on the page. Kept in the
// same file as the visible accordion so the two can never drift out of sync.
function FAQSchema() {
  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />;
}

export default function SocialsFAQ({ onBookCall }: { onBookCall: () => void }) {
  return (
    <section id="faq" className="relative py-28 px-6">
      <FAQSchema />
      <div className="w-full max-w-6xl mx-auto accent-divider mb-24" />
      <div className="w-full max-w-2xl mx-auto">
        <Reveal className="flex justify-center mb-5">
          <span className="section-label">Common questions</span>
        </Reveal>
        <Reveal delay={0.06}>
          <h2
            className="text-center mb-14"
            style={{ fontSize: "clamp(30px, 4vw, 46px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, color: "var(--ink-primary)" }}
          >
            Reel ideas, scored and answered.
          </h2>
        </Reveal>

        <Reveal delay={0.1}>
          <Accordion.Root type="single" collapsible>
            {FAQ_ITEMS.map((item, i) => (
              <Accordion.Item key={i} value={`item-${i}`} style={{ borderBottom: "1px solid var(--edge)" }}>
                <Accordion.Header>
                  <Accordion.Trigger
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    style={{ background: "transparent", border: "none", cursor: "pointer" }}
                  >
                    <span className="text-sm font-medium transition-colors duration-150" style={{ lineHeight: "1.6", color: "var(--ink-secondary)" }}>
                      {item.q}
                    </span>
                    <span
                      className="shrink-0 flex items-center justify-center rounded-lg transition-all duration-200"
                      style={{ width: "28px", height: "28px", background: "var(--canvas)", border: "1px solid var(--edge-strong)" }}
                    >
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden>
                        <path
                          d="M6 2v8M2 6h8"
                          stroke="var(--accent)"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          className="transition-all duration-200 group-data-[state=open]:[transform:rotate(45deg)] group-data-[state=open]:[transform-origin:center]"
                        />
                      </svg>
                    </span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="overflow-hidden data-[state=open]:animate-[accordion-down_0.22s_ease] data-[state=closed]:animate-[accordion-up_0.22s_ease]">
                  <p className="pb-6 text-sm" style={{ color: "var(--ink-muted)", lineHeight: "1.85" }}>{item.a}</p>
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </Reveal>

        <Reveal delay={0.12} className="flex justify-center mt-12">
          <button onClick={onBookCall} className="btn-secondary">
            Still have questions? Book a call
          </button>
        </Reveal>
      </div>
    </section>
  );
}

export { FAQ_ITEMS };
