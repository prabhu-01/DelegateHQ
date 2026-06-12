export interface PainPoint {
  stat: string;
  unit: string;
  color: string;
  title: string;
  body: string;
}

export interface ServiceItem {
  tag: string;
  tagColor: string;
  title: string;
  body: string;
  detail: string;
}

export interface ProofMetric {
  label: string;
  value: string;
  good?: boolean;
  warn?: boolean;
}

export interface ProofSection {
  title: string;
  metrics: ProofMetric[];
}

export interface ProofFlag {
  level: "P1" | "P2" | "INFO" | "WARN";
  text: string;
}

export interface PricingTier {
  name: string;
  price: { monthly: number; annual: number };
  description: string;
  features: Array<{ label: string; included: boolean }>;
  popular?: boolean;
  cta: string;
}

export interface DivisionData {
  slug: string;
  name: string;
  tagline: string;
  color: string;
  hero: {
    eyebrow: string;
    line1: string;
    line2: string;
    gradientLine: string;
    description: string;
    metrics: Array<{ value: string; label: string }>;
  };
  problem: {
    heading: string;
    subheading: string;
    points: PainPoint[];
  };
  services: {
    heading: string;
    subheading: string;
    items: ServiceItem[];
  };
  proof: {
    clientName: string;
    weekNumber: number;
    sections: ProofSection[];
    flags: ProofFlag[];
  };
  pricing: {
    tiers: PricingTier[];
  };
  faq: Array<{ q: string; a: string }>;
}

export const DIVISIONS: DivisionData[] = [
  {
    slug: "saas-tech",
    name: "SaaS & Tech",
    tagline: "For bootstrapped and early-stage SaaS companies",
    color: "#10b981",
    hero: {
      eyebrow: "SaaS & Tech Division",
      line1: "SaaS operations,",
      line2: "handled.",
      gradientLine: "so you can ship.",
      description: "We deploy a full operations stack for bootstrapped and early-stage SaaS companies — support, onboarding, docs, content, and customer success — so your founding team can stay focused entirely on the product.",
      metrics: [
        { value: "87%", label: "Auto-Resolution Rate" },
        { value: "<3 min", label: "First Response" },
        { value: "+34%", label: "Activation Lift" },
      ],
    },
    problem: {
      heading: "Ops are killing your momentum.",
      subheading: "Three numbers that explain why 80% of bootstrapped founders stall before finding product-market fit.",
      points: [
        {
          stat: "12 hrs", unit: "/week", color: "#f59e0b",
          title: "Lost to operations every week",
          body: "The average bootstrapped founder spends 12 hours every week on tasks that have nothing to do with the product — answering support tickets, chasing onboarding drop-offs, writing documentation. That's 624 hours per year not spent building.",
        },
        {
          stat: "₹40k+", unit: "/month", color: "#ef4444",
          title: "To hire one ops person",
          body: "A single operations hire costs ₹40k–₹80k per month in CTC, before recruiting time, onboarding overhead, and management bandwidth. Most early-stage companies need at least two. The math doesn't work pre-Series A.",
        },
        {
          stat: "23%", unit: "churn", color: "#6366f1",
          title: "Average early SaaS churn",
          body: "New user churn isn't a product problem — it's a support speed problem, an onboarding depth problem, a follow-up problem. These are operations failures. Every one of them is solvable without a single hire.",
        },
      ],
    },
    services: {
      heading: "Five disciplines. One team.",
      subheading: "Each capability is a fully staffed AI function, not a feature toggle. You get the output of a five-person ops team without the headcount.",
      items: [
        {
          tag: "Core Ops", tagColor: "#f59e0b",
          title: "Customer Support",
          body: "AI agents triage, classify, and resolve support tickets across email and chat. Complex cases escalate with full context. First-response time drops to under 3 minutes with 87%+ auto-resolution.",
          detail: "avg response: 2m 47s · resolution: 87%",
        },
        {
          tag: "Activation", tagColor: "#10b981",
          title: "User Onboarding",
          body: "Adaptive 7-touch onboarding sequences triggered by user behavior. Day-1 activation, feature introduction, and stall-detection flows that fire within 24 hours when a user misses a key action.",
          detail: "sequence depth: 7 · avg activation lift: +34%",
        },
        {
          tag: "Knowledge", tagColor: "#6366f1",
          title: "Documentation",
          body: "Product docs written and maintained by agents trained on your product. Feature guides, API references, integration tutorials, and release notes — always current, auto-synced with every push.",
          detail: "format: Notion / Mintlify / GitBook · auto-sync: yes",
        },
        {
          tag: "Growth", tagColor: "#f43f5e",
          title: "Content & Marketing",
          body: "SEO articles, LinkedIn posts, product newsletters, and changelog copy — all in your brand voice. 12–20 pieces per month, delivered on a consistent calendar without your attention.",
          detail: "output: 12–20 pieces/mo · SEO-optimized: yes",
        },
        {
          tag: "Retention", tagColor: "#8b5cf6",
          title: "Customer Success",
          body: "Daily health scoring, at-risk account flags, renewal nudges, and QBR preparation handled end-to-end. Agents monitor usage signals and send check-ins before accounts go dark.",
          detail: "health score cadence: daily · churn flag lag: <24h",
        },
      ],
    },
    proof: {
      clientName: "Funnl.io",
      weekNumber: 3,
      sections: [
        {
          title: "SUPPORT",
          metrics: [
            { label: "Tickets received", value: "47" },
            { label: "Auto-resolved", value: "41  (87.2%)", good: true },
            { label: "Escalated to human", value: "6  (12.8%)" },
            { label: "Avg first response", value: "2m 47s", good: true },
            { label: "CSAT (sampled)", value: "4.6 / 5.0", good: true },
          ],
        },
        {
          title: "ONBOARDING",
          metrics: [
            { label: "New signups", value: "23" },
            { label: "Day-1 email delivered", value: "23  (100%)", good: true },
            { label: "Activated (≥1 sequence)", value: "18  (78.3%)", good: true },
            { label: "Stall interventions", value: "4" },
            { label: "Conversion to paid", value: "6  (26.1%)", good: true },
          ],
        },
        {
          title: "CONTENT",
          metrics: [
            { label: "SEO articles published", value: "2" },
            { label: "LinkedIn posts", value: "5" },
            { label: "Changelog entry", value: "1" },
            { label: "Newsletter draft", value: "1" },
          ],
        },
      ],
      flags: [
        { level: "P1", text: "Ticket #038: Billing edge case — routed to founder" },
        { level: "INFO", text: "Onboarding Day 3 CTR dropped 12% — A/B variant queued" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 20000, annual: 16000 }, cta: "Start free trial",
          description: "Support and onboarding automation for early-stage SaaS.",
          features: [
            { label: "Customer Support (email + chat)", included: true },
            { label: "User Onboarding sequences (7-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Slack access to ops team", included: true },
            { label: "Up to 500 tickets/month", included: true },
            { label: "Documentation writing", included: false },
            { label: "Content & Marketing output", included: false },
            { label: "Customer Success & health scoring", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 40000, annual: 32000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for growing SaaS with an active user base.",
          features: [
            { label: "Customer Support (email + chat)", included: true },
            { label: "User Onboarding sequences (7-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Slack access to ops team", included: true },
            { label: "Up to 2,000 tickets/month", included: true },
            { label: "Documentation (up to 20 pages/mo)", included: true },
            { label: "Content & Marketing (12 pieces/mo)", included: true },
            { label: "Customer Success & health scoring", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 60000, annual: 48000 }, cta: "Start free trial",
          description: "End-to-end ops with proactive customer success included.",
          features: [
            { label: "Customer Support (email + chat)", included: true },
            { label: "User Onboarding sequences (7-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Slack access to ops team", included: true },
            { label: "Unlimited tickets", included: true },
            { label: "Documentation (unlimited)", included: true },
            { label: "Content & Marketing (20 pieces/mo)", included: true },
            { label: "Customer Success + QBR prep", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "How is this different from using Intercom AI or a generic chatbot?", a: "Generic AI tools respond to prompts in isolation. Our agent team connects to your actual tools — support inbox, CRM, product analytics — and is trained on your specific product, brand voice, and escalation logic. The difference is the same as comparing autocomplete to a hired ops person. We don't generate responses; we run a function end-to-end, from triage through resolution through reporting." },
      { q: "What tool access do you need?", a: "OAuth connections to your support inbox or helpdesk, your CRM, and your product analytics. Access is read/write only for specific functions — nothing broader. All credentials are stored encrypted. We provide a full credential audit doc showing exactly what each agent has access to and why." },
      { q: "Does this work for B2C consumer apps, not just B2B SaaS?", a: "Primarily B2B SaaS — our onboarding and health scoring logic is built around account-level behavior. For B2C apps with high support volume, the support triage layer works well, but onboarding sequences and customer success scoring are designed for product-led B2B workflows." },
      { q: "How long does setup take?", a: "Seven days from onboarding call to live ops. Day 1 is a 45-minute call. Days 2–4 are configuration on our end. Days 5–7 your agents run in monitored mode. By day 8 you're in the weekly rhythm. If you use Intercom, HubSpot, Notion, and Linear, we can configure in 36 hours." },
      { q: "Can we pause or cancel if we need to?", a: "All plans are month-to-month with 14-day notice. No cancellation penalty. When you cancel, you receive all agent configurations in readable format, a complete access revocation checklist, and an export of every report we generated." },
    ],
  },
  {
    slug: "ecommerce",
    name: "Ecommerce",
    tagline: "For D2C brands and marketplace sellers",
    color: "#f59e0b",
    hero: {
      eyebrow: "Ecommerce Division",
      line1: "Ecommerce operations,",
      line2: "handled.",
      gradientLine: "from order to loyalty.",
      description: "We deploy AI operations teams for D2C brands and marketplace sellers — handling order support, post-purchase sequences, product content, review management, and customer loyalty so your team can focus on growth and product.",
      metrics: [
        { value: "92%", label: "Order Query Resolution" },
        { value: "+38%", label: "Repeat Purchase Rate" },
        { value: "₹18k", label: "Starting Monthly" },
      ],
    },
    problem: {
      heading: "Revenue is leaking through your ops.",
      subheading: "Three places where ecommerce brands bleed revenue silently, every single month.",
      points: [
        {
          stat: "340", unit: "tickets/week", color: "#f59e0b",
          title: "Support queries during peak periods",
          body: "A mid-size D2C brand receives 300–400 support tickets per week during campaign periods — most of them order status, return policy, or delivery timeline queries. Your team answers these manually. Every minute spent there is a minute not spent on growth.",
        },
        {
          stat: "43%", unit: "lower repurchase", color: "#ef4444",
          title: "Revenue lost from poorly handled returns",
          body: "Brands that automate returns communication see 43% higher repurchase rates from returned-product customers. Every return is a retention opportunity. Most brands send one confirmation email and then go silent. That silence costs more than the return itself.",
        },
        {
          stat: "72 hrs", unit: "post-purchase", color: "#6366f1",
          title: "The window most brands miss entirely",
          body: "The most valuable moment in a customer's lifecycle is the 72 hours after their first purchase. What you communicate — and when — determines whether they become a repeat buyer. Most brands send a single order confirmation and nothing else.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One D2C team.",
      subheading: "Everything your brand needs to run customer operations at scale — without growing your headcount.",
      items: [
        {
          tag: "Support", tagColor: "#f59e0b",
          title: "Order Support",
          body: "Order status, delivery queries, damaged goods, address changes, and exchange requests — all handled with real-time fulfillment data. Integrates with your 3PL and carrier tracking. Resolves 92% without escalation.",
          detail: "avg response: 3m 12s · resolution: 92%",
        },
        {
          tag: "Retention", tagColor: "#10b981",
          title: "Post-Purchase Sequences",
          body: "Delivery confirmation, Day-3 usage prompt, Day-7 review request, Day-14 reorder nudge — all triggered automatically from your OMS. Turns first-time buyers into repeat customers without any manual intervention.",
          detail: "sequence depth: 6 · repeat rate lift: +38%",
        },
        {
          tag: "Content", tagColor: "#6366f1",
          title: "Product Catalogue",
          body: "Product descriptions, comparison guides, and category content written to convert. Agents trained on your brand voice produce listings that rank on Google and read like your best copywriter wrote them. Up to 50 listings per month.",
          detail: "output: up to 50 listings/mo · SEO-optimized: yes",
        },
        {
          tag: "Growth", tagColor: "#f43f5e",
          title: "Brand Content",
          body: "Blog posts, email newsletters, social captions, and campaign copy — delivered on a consistent monthly calendar. Your brand stays visible and on-voice without a dedicated content hire.",
          detail: "output: 15–20 pieces/mo · brand-trained: yes",
        },
        {
          tag: "Loyalty", tagColor: "#8b5cf6",
          title: "Review & Loyalty Management",
          body: "Review request sequences, response templates for positive and negative reviews, and loyalty flows for high-value customers. Automated touchpoints that feel personal — not templated.",
          detail: "review response: <4h · loyalty emails: monthly",
        },
      ],
    },
    proof: {
      clientName: "Kantha.co",
      weekNumber: 5,
      sections: [
        {
          title: "ORDER SUPPORT",
          metrics: [
            { label: "Tickets received", value: "187" },
            { label: "Auto-resolved", value: "172  (91.9%)", good: true },
            { label: "Escalated to team", value: "15  (8.0%)" },
            { label: "Avg first response", value: "3m 12s", good: true },
            { label: "CSAT (sampled)", value: "4.7 / 5.0", good: true },
          ],
        },
        {
          title: "POST-PURCHASE",
          metrics: [
            { label: "Orders fulfilled", value: "94" },
            { label: "Delivery sequences fired", value: "94  (100%)", good: true },
            { label: "Day-7 review requests", value: "71  (75.5%)" },
            { label: "Reviews received", value: "23  (32.4% rate)", good: true },
            { label: "Reorder nudges sent", value: "38" },
          ],
        },
        {
          title: "CONTENT",
          metrics: [
            { label: "Product listings written", value: "8" },
            { label: "Blog posts published", value: "2" },
            { label: "Email campaign drafted", value: "1" },
            { label: "Social captions", value: "12" },
          ],
        },
      ],
      flags: [
        { level: "WARN", text: "3 delivery exceptions — carrier delay, proactive comms sent" },
        { level: "INFO", text: "Review request Day-7 CTR up 18% vs last week" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 18000, annual: 14400 }, cta: "Start free trial",
          description: "Order support and post-purchase automation for growing D2C brands.",
          features: [
            { label: "Order Support (email + chat)", included: true },
            { label: "Post-purchase sequences (6-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 400 tickets/month", included: true },
            { label: "Product listing writing", included: false },
            { label: "Brand content output", included: false },
            { label: "Review & loyalty management", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 35000, annual: 28000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for brands scaling past ₹1Cr monthly GMV.",
          features: [
            { label: "Order Support (email + chat)", included: true },
            { label: "Post-purchase sequences (6-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 1,500 tickets/month", included: true },
            { label: "Product listings (up to 30/mo)", included: true },
            { label: "Brand content (12 pieces/mo)", included: true },
            { label: "Review & loyalty management", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 55000, annual: 44000 }, cta: "Start free trial",
          description: "End-to-end ops with loyalty and review management included.",
          features: [
            { label: "Order Support (email + chat)", included: true },
            { label: "Post-purchase sequences (6-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited tickets", included: true },
            { label: "Product listings (up to 50/mo)", included: true },
            { label: "Brand content (20 pieces/mo)", included: true },
            { label: "Review & loyalty management", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "Which ecommerce platforms and fulfilment tools do you connect to?", a: "Shopify, WooCommerce, and Magento on the storefront side. Shiprocket, Delhivery, Blue Dart, and most major Indian carriers on the fulfilment side. For marketplace sellers, we connect to Myntra, Amazon, and Flipkart seller portals. If you use a custom stack, we have an API integration layer that handles most setups within the onboarding window." },
      { q: "How do you handle returns and exchange requests?", a: "Returns are the highest-value touchpoint in ecommerce and we treat them that way. The agent confirms the return, retrieves the order, initiates the process in your OMS, and sends a returns-complete sequence designed to recover the customer — not just acknowledge the refund. Exchange requests go through a different sequence that presents alternatives before confirming the exchange." },
      { q: "Can you write product listings for a large catalogue?", a: "Yes. On the Growth plan, up to 30 listings per month. On Complete, up to 50. Each listing is written from a brief you provide (product specs, key benefits, target customer). We train agents on your brand voice in the setup week using your existing listings as reference. SEO metadata is included for every listing." },
      { q: "How do you handle seasonal support spikes during sale periods?", a: "We scale to volume. Our agents don't have fixed capacity limits — the support layer handles peak volume without degradation in response time. We do a pre-sale configuration brief 5 days before major sale events (Diwali, EOSS, etc.) to ensure FAQ coverage, return policy language, and carrier delay responses are pre-loaded." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day cancellation notice. No penalties, no lock-in. Offboarding includes full config export and access revocation." },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    tagline: "For agencies, brokers, and proptech platforms",
    color: "#14b8a6",
    hero: {
      eyebrow: "Real Estate Division",
      line1: "Real estate operations,",
      line2: "handled.",
      gradientLine: "from inquiry to close.",
      description: "We deploy AI operations teams for real estate agencies, brokers, and proptech platforms — managing lead qualification, property content, client communication, and tenant operations so your agents can focus on closing.",
      metrics: [
        { value: "85%", label: "Leads Qualified Automatically" },
        { value: "<5 min", label: "Lead Response Time" },
        { value: "40+", label: "Listings Written / Month" },
      ],
    },
    problem: {
      heading: "Deals lost to ops, not competition.",
      subheading: "Three ways that slow operations cost real estate businesses more than they realise.",
      points: [
        {
          stat: "15 min", unit: "before cold", color: "#f59e0b",
          title: "Time before a lead goes cold",
          body: "Research consistently shows 78% of buyers work with the first agent who responds. The average agency takes 4–6 hours to follow up on portal leads. In those 6 hours, the lead has spoken to three competitors, visited two properties, and formed a shortlist that doesn't include you.",
        },
        {
          stat: "8 hrs", unit: "per listing", color: "#ef4444",
          title: "Wasted on listing content",
          body: "Writing a quality property description, social post, brochure copy, and portal FAQ for a single listing takes 6–8 hours of non-selling time. For an agency doing 20 listings a month, that's 160 hours — an entire person's workload spent on content instead of closings.",
        },
        {
          stat: "34%", unit: "tenant churn", color: "#6366f1",
          title: "Tenants lost to preventable friction",
          body: "Tenant retention is cheap compared to vacancy costs. But most agencies lose tenants over operational friction — slow maintenance communication, confusing onboarding, missed renewal nudges. Every one of these is automatable.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One agency team.",
      subheading: "From first inquiry to long-term client relationship — the full ops stack your agency needs to scale.",
      items: [
        {
          tag: "Leads", tagColor: "#14b8a6",
          title: "Inquiry Triage",
          body: "Every portal, website, and email inquiry is qualified and responded to within 5 minutes. Agents capture lead type, budget, timeline, and preference before your agent makes the first call — so every call opens with context.",
          detail: "avg response: 4m 50s · qualification rate: 85%",
        },
        {
          tag: "Onboarding", tagColor: "#10b981",
          title: "Client Onboarding",
          body: "Welcome sequences for buyers, sellers, tenants, and landlords. Includes process overview, document checklist, timeline confirmation, and milestone updates — all automatic from the first point of contact.",
          detail: "sequence depth: 5 · document completion: 91%",
        },
        {
          tag: "Content", tagColor: "#6366f1",
          title: "Property Content",
          body: "Property descriptions, brochure copy, portal listings, and floor plan captions — written from a brief and SEO-optimised for the locality. Up to 40 listings per month on the Growth plan, with consistent voice across every listing.",
          detail: "output: up to 40 listings/mo · SEO + portal: yes",
        },
        {
          tag: "Growth", tagColor: "#f43f5e",
          title: "Agency Marketing",
          body: "Market reports, area guides, property investment newsletters, and LinkedIn content — all agency-branded. Position your firm as the local knowledge authority without a content team behind it.",
          detail: "output: 10–15 pieces/mo · market-data: yes",
        },
        {
          tag: "Retention", tagColor: "#8b5cf6",
          title: "Client Retention",
          body: "Renewal nudges for tenants and landlords, anniversary check-ins for homeowners, and market update emails for investor clients — automated touchpoints that keep your agency top-of-mind without manual effort.",
          detail: "renewal nudge: 90 days out · check-in: monthly",
        },
      ],
    },
    proof: {
      clientName: "Meridian Realty Group",
      weekNumber: 7,
      sections: [
        {
          title: "LEAD OPS",
          metrics: [
            { label: "Inquiries received", value: "34" },
            { label: "Auto-qualified", value: "29  (85.3%)", good: true },
            { label: "Avg response time", value: "4m 51s", good: true },
            { label: "Qualified to meeting", value: "14  (48.3%)" },
            { label: "Listings booked", value: "5", good: true },
          ],
        },
        {
          title: "CONTENT",
          metrics: [
            { label: "Property listings written", value: "12" },
            { label: "Brochures drafted", value: "8" },
            { label: "Market report", value: "1" },
            { label: "Social posts", value: "6" },
          ],
        },
        {
          title: "CLIENT OPS",
          metrics: [
            { label: "Onboarding sequences", value: "5" },
            { label: "Documents chased", value: "9  (7 received)" },
            { label: "Renewal nudges sent", value: "4" },
            { label: "Tenant check-ins", value: "11" },
          ],
        },
      ],
      flags: [
        { level: "INFO", text: "2 inquiries from non-target geography — marked low priority" },
        { level: "INFO", text: "Market report scheduled for Monday delivery" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 20000, annual: 16000 }, cta: "Start free trial",
          description: "Inquiry triage and client onboarding for independent agencies.",
          features: [
            { label: "Inquiry Triage (portal + email)", included: true },
            { label: "Client Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 60 inquiries/month", included: true },
            { label: "Property listing content", included: false },
            { label: "Agency marketing content", included: false },
            { label: "Client retention sequences", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 40000, annual: 32000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for agencies handling 15+ listings per month.",
          features: [
            { label: "Inquiry Triage (portal + email)", included: true },
            { label: "Client Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 200 inquiries/month", included: true },
            { label: "Property listings (up to 25/mo)", included: true },
            { label: "Agency marketing (10 pieces/mo)", included: true },
            { label: "Client retention sequences", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 65000, annual: 52000 }, cta: "Start free trial",
          description: "End-to-end ops with tenant management and retention included.",
          features: [
            { label: "Inquiry Triage (portal + email)", included: true },
            { label: "Client Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited inquiries", included: true },
            { label: "Property listings (up to 40/mo)", included: true },
            { label: "Agency marketing (15 pieces/mo)", included: true },
            { label: "Client retention + tenant ops", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "Which lead portals do you connect to?", a: "MagicBricks, 99acres, Housing.com, NoBroker, and your own website inquiry forms. We also connect to WhatsApp Business for agencies using it as a lead channel. Portal leads are pulled in real-time via API or webhook — no manual export required." },
      { q: "How does the property listing content work?", a: "You provide a brief: property type, location, key features, target buyer, and any specific selling points. Our agents produce the full listing copy within 4 hours — description, highlights, locality narrative, and portal metadata. You review and approve before publication. Most clients approve on first draft." },
      { q: "Can you handle both residential and commercial listings?", a: "Yes. Residential (apartments, villas, plots), commercial (office, retail, warehouse), and rental listings. The content agents are trained on locality-specific language for the markets you operate in — we configure this during the setup week." },
      { q: "What happens when a lead requires an in-person viewing?", a: "The agent qualifies the lead, confirms intent, and schedules the viewing in your calendar — or adds it to a queue for your agent to confirm, depending on your preference. The agent sends the lead a pre-viewing brief with property details and directions. Post-viewing follow-up is also automated." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. No penalties. Offboarding includes full config export, access revocation, and a 30-minute handover call." },
    ],
  },
  {
    slug: "legal",
    name: "Legal",
    tagline: "For law firms and legaltech platforms",
    color: "#d97706",
    hero: {
      eyebrow: "Legal Division",
      line1: "Law firm operations,",
      line2: "handled.",
      gradientLine: "so your team can bill.",
      description: "We deploy AI operations teams for law firms and legaltech platforms — managing client intake, matter communications, document drafting, and firm marketing so your lawyers can spend their time on billable work.",
      metrics: [
        { value: "30%", label: "Non-Billable Time Recovered" },
        { value: "<4 hr", label: "Intake to Brief" },
        { value: "68%", label: "Client Comms Automated" },
      ],
    },
    problem: {
      heading: "Non-billable work is your biggest write-off.",
      subheading: "Three operational realities that cost law firms revenue they never see on the P&L.",
      points: [
        {
          stat: "30%", unit: "of capacity", color: "#d97706",
          title: "Lost to non-billable admin",
          body: "Law firm benchmarks consistently show that 28–32% of lawyer time is consumed by non-billable administrative work — intake calls, status update emails, document formatting, and internal reporting. At ₹5,000/hour billing rates, that's a significant, measurable revenue leak.",
        },
        {
          stat: "42 min", unit: "per status call", color: "#ef4444",
          title: "Average client status call duration",
          body: "Clients call for status updates an average of three times per matter. Each call takes 35–45 minutes when you factor in retrieval, explanation, and documentation. Across a firm with 50 active matters, that's over 100 hours per month on communications that could be automated.",
        },
        {
          stat: "23%", unit: "post-matter churn", color: "#6366f1",
          title: "Clients lost after matter completion",
          body: "Firms that implement structured post-matter communication see 23% higher repeat engagement. Most firms send a closing letter and nothing else. Every client who doesn't return is an acquisition cost that was never justified by a retention investment.",
        },
      ],
    },
    services: {
      heading: "Five functions. One ops team for your firm.",
      subheading: "From intake to retention — every non-billable operation your firm performs, handled by an agent team.",
      items: [
        {
          tag: "Intake", tagColor: "#d97706",
          title: "Client Intake",
          body: "Structured intake workflows that capture matter type, background, urgency, jurisdiction, and document requirements before the first lawyer call. Lawyers join with full context — no 45-minute intake calls consuming billable capacity.",
          detail: "intake-to-brief: <4h · completeness: 94%",
        },
        {
          tag: "Comms", tagColor: "#10b981",
          title: "Matter Communication",
          body: "Update emails sent at defined matter milestones — filing, response, hearing, judgment. Clients receive clear, layperson-friendly updates without requiring lawyer time to draft. Status query calls drop by 68%.",
          detail: "update lag: <2h of milestone · status calls: -68%",
        },
        {
          tag: "Drafting", tagColor: "#6366f1",
          title: "Document Support",
          body: "First-draft generation for standard templates — NDAs, employment agreements, demand letters, notice formats, and engagement letters. Trained on your firm's templates. Lawyers review, not draft from scratch.",
          detail: "turnaround: same-day · template library: up to 50",
        },
        {
          tag: "Growth", tagColor: "#f43f5e",
          title: "Firm Marketing",
          body: "Thought leadership articles, legal explainers, practice area content, and firm newsletter — branded for your firm and published without your involvement. Position your firm with content that demonstrates expertise and attracts the right clients.",
          detail: "output: 8–12 pieces/mo · jurisdiction-aware: yes",
        },
        {
          tag: "Retention", tagColor: "#8b5cf6",
          title: "Client Retention",
          body: "Post-matter follow-up sequences, anniversary communications, legal update digests, and referral prompts — converting one-time clients into long-term relationships systematically and without manual effort.",
          detail: "post-matter sequence: 4 emails · referral: 90d",
        },
      ],
    },
    proof: {
      clientName: "Veritas Law Chambers",
      weekNumber: 6,
      sections: [
        {
          title: "CLIENT OPS",
          metrics: [
            { label: "New inquiries received", value: "18" },
            { label: "Intake briefs completed", value: "16  (88.9%)", good: true },
            { label: "Avg intake-to-brief", value: "3h 52m", good: true },
            { label: "Matter updates sent", value: "34" },
            { label: "Status calls avoided", value: "21", good: true },
          ],
        },
        {
          title: "DOCUMENTS",
          metrics: [
            { label: "First drafts generated", value: "11" },
            { label: "NDAs", value: "4" },
            { label: "Employment agreements", value: "3" },
            { label: "Demand letters", value: "2" },
            { label: "Other templates", value: "2" },
          ],
        },
        {
          title: "CONTENT",
          metrics: [
            { label: "Thought leadership articles", value: "2" },
            { label: "Legal explainers", value: "3" },
            { label: "Newsletter draft", value: "1" },
          ],
        },
      ],
      flags: [
        { level: "P1", text: "Matter #M-047: Client requesting urgent update — escalated to Priya" },
        { level: "INFO", text: "NDA template updated to reflect 2025 format changes" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 30000, annual: 24000 }, cta: "Start free trial",
          description: "Intake and matter communications for boutique firms.",
          features: [
            { label: "Client Intake workflows", included: true },
            { label: "Matter update communications", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 20 active matters", included: true },
            { label: "Document drafting (templates)", included: false },
            { label: "Firm marketing content", included: false },
            { label: "Client retention sequences", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 60000, annual: 48000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for firms with 3–10 lawyers and active marketing.",
          features: [
            { label: "Client Intake workflows", included: true },
            { label: "Matter update communications", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 60 active matters", included: true },
            { label: "Document drafting (up to 30 drafts/mo)", included: true },
            { label: "Firm marketing (8 pieces/mo)", included: true },
            { label: "Client retention sequences", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 90000, annual: 72000 }, cta: "Start free trial",
          description: "End-to-end firm ops with client retention and full drafting included.",
          features: [
            { label: "Client Intake workflows", included: true },
            { label: "Matter update communications", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited active matters", included: true },
            { label: "Document drafting (unlimited)", included: true },
            { label: "Firm marketing (12 pieces/mo)", included: true },
            { label: "Client retention sequences", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "Are AI-drafted documents legally reliable?", a: "Our document drafting is designed as a first-draft acceleration tool, not a replacement for legal judgment. Every document is generated from your firm's reviewed templates, trained on your style and jurisdiction. Lawyers review before any document goes to a client. The value is in eliminating the blank-page problem — not in bypassing legal expertise." },
      { q: "Which practice areas do you support?", a: "We work with corporate commercial, employment, real estate, dispute resolution, and technology law practices. We don't currently support IP prosecution, criminal defence, or family law, as these require highly fact-specific human judgment throughout. If your firm spans multiple practice areas, we configure agents per practice group." },
      { q: "What systems do you connect to?", a: "Clio, MyCase, and most cloud-based matter management platforms. For email, we connect to Gmail and Outlook. For documentation, Google Docs, Word, and Notion. If your firm uses a custom DMS, we assess integration feasibility during onboarding." },
      { q: "How do client communications stay compliant with Bar Council standards?", a: "All client-facing communications are reviewed against communication guidelines during the setup week. Escalation thresholds are set conservatively — any communication touching legal advice, deadlines, or financial matters routes to a lawyer. We draft; your lawyers deliver anything that requires legal authority." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. Full config export, access revocation checklist, and a 30-minute offboarding call are included." },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    tagline: "For healthtech platforms and clinic networks",
    color: "#06b6d4",
    hero: {
      eyebrow: "Healthcare Division",
      line1: "Patient operations,",
      line2: "handled.",
      gradientLine: "beyond the appointment.",
      description: "We deploy AI operations teams for healthtech platforms and clinic networks — managing patient onboarding, non-clinical queries, wellness content, and platform documentation so clinical staff can focus entirely on care.",
      metrics: [
        { value: "74%", label: "Non-Clinical Queries Resolved" },
        { value: "-28%", label: "No-Show Rate" },
        { value: "<1 wk", label: "Docs Update Lag" },
      ],
    },
    problem: {
      heading: "Clinical capacity lost to non-clinical work.",
      subheading: "Three operational failures that reduce care quality and patient experience simultaneously.",
      points: [
        {
          stat: "40%", unit: "of staff time", color: "#10b981",
          title: "Spent on non-clinical queries",
          body: "Clinical staff spend 38–42% of their available time on non-clinical communication — appointment confirmations, test result status inquiries, prescription clarification requests, and billing questions. This is a systems failure, not a staffing failure. Every minute of clinical time spent on admin is a consultation not delivered.",
        },
        {
          stat: "27%", unit: "no-show rate", color: "#ef4444",
          title: "Appointments missed due to poor prep",
          body: "No-shows cost the Indian healthcare system an estimated ₹2,400 crore annually. The primary driver is not patient indifference — it's inadequate pre-appointment communication. Patients who receive structured pre-visit sequences show 28% lower no-show rates.",
        },
        {
          stat: "3.4 wks", unit: "doc lag", color: "#6366f1",
          title: "Documentation behind current state",
          body: "Most health platforms have documentation that's 3–6 weeks behind current product state. For a regulated space, this creates both compliance and patient experience risk — patients finding outdated information lose trust, and compliance audits surface gaps.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One patient operations team.",
      subheading: "Every patient-facing operation that doesn't require clinical judgment — handled, so clinical staff can focus on care.",
      items: [
        {
          tag: "Support", tagColor: "#10b981",
          title: "Patient Query Triage",
          body: "Non-clinical queries routed, resolved, or escalated before they reach clinical staff. Appointment rescheduling, test result status, billing inquiries, medication refill requests, and general information — all handled without clinician involvement.",
          detail: "non-clinical resolution: 74% · avg response: 4m 20s",
        },
        {
          tag: "Onboarding", tagColor: "#6366f1",
          title: "Patient Onboarding",
          body: "Welcome sequences, pre-registration guidance, appointment prep, what-to-bring instructions, and post-first-visit follow-up — adapted for your specialty and patient demographic. No-show rates drop by 28% within 60 days.",
          detail: "no-show reduction: -28% · sequence: 5 touchpoints",
        },
        {
          tag: "Docs", tagColor: "#f59e0b",
          title: "Platform Documentation",
          body: "Health platform feature guides, clinical workflow docs, patient-facing FAQs, and compliance documentation — always current, written in clear language for both clinical users and patients. Updated within one week of any platform change.",
          detail: "update lag: <1 week · compliance-aware: yes",
        },
        {
          tag: "Content", tagColor: "#f43f5e",
          title: "Wellness Content",
          body: "Evidence-based wellness articles, condition explainers, preventive care guides, and patient newsletter — published in your brand voice. Position your platform as a trusted health resource without a dedicated content team.",
          detail: "output: 8–12 pieces/mo · medical review-ready: yes",
        },
        {
          tag: "Retention", tagColor: "#8b5cf6",
          title: "Patient Retention",
          body: "Post-visit follow-ups, preventive care reminders, chronic condition check-in flows, and re-engagement campaigns for lapsed patients. Keep patients connected between visits without adding to clinical workload.",
          detail: "post-visit sequence: 3 emails · lapse: 90-day trigger",
        },
      ],
    },
    proof: {
      clientName: "Medniva Health Platform",
      weekNumber: 4,
      sections: [
        {
          title: "PATIENT SUPPORT",
          metrics: [
            { label: "Non-clinical queries", value: "124" },
            { label: "Auto-resolved", value: "92  (74.2%)", good: true },
            { label: "Escalated to clinical", value: "32  (25.8%)" },
            { label: "Avg response time", value: "4m 20s", good: true },
            { label: "Patient satisfaction", value: "4.5 / 5.0", good: true },
          ],
        },
        {
          title: "ONBOARDING",
          metrics: [
            { label: "New patient registrations", value: "41" },
            { label: "Pre-visit sequences sent", value: "41  (100%)", good: true },
            { label: "No-shows (this week)", value: "3  (7.3%)", good: true },
            { label: "Baseline no-show rate", value: "18.6%" },
          ],
        },
        {
          title: "DOCUMENTATION",
          metrics: [
            { label: "Platform articles updated", value: "4" },
            { label: "New FAQs added", value: "7" },
            { label: "Compliance doc reviewed", value: "1" },
          ],
        },
      ],
      flags: [
        { level: "P1", text: "3 prescription refill queries — escalated to pharmacist team" },
        { level: "INFO", text: "Pre-appointment reminder timing A/B test started" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 25000, annual: 20000 }, cta: "Start free trial",
          description: "Patient support and onboarding for growing health platforms.",
          features: [
            { label: "Patient Query Triage", included: true },
            { label: "Patient Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 300 queries/month", included: true },
            { label: "Platform documentation", included: false },
            { label: "Wellness content", included: false },
            { label: "Patient retention flows", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 50000, annual: 40000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for platforms with 500+ active patients.",
          features: [
            { label: "Patient Query Triage", included: true },
            { label: "Patient Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 800 queries/month", included: true },
            { label: "Platform documentation", included: true },
            { label: "Wellness content (8 pieces/mo)", included: true },
            { label: "Patient retention flows", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 80000, annual: 64000 }, cta: "Start free trial",
          description: "End-to-end patient ops with retention and compliance docs.",
          features: [
            { label: "Patient Query Triage", included: true },
            { label: "Patient Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited queries", included: true },
            { label: "Platform documentation", included: true },
            { label: "Wellness content (12 pieces/mo)", included: true },
            { label: "Patient retention flows", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "How is patient data handled? Is this DPDP / HIPAA compliant?", a: "Patient data is processed strictly within the scope of the operations we perform — no data is stored beyond what's needed for the active session. We're aligned with India's DPDP Act and can operate within HIPAA-compliant architectures for international clients. All data handling is documented in a data processing agreement signed before onboarding." },
      { q: "Can you handle prescription or clinical queries?", a: "No — and this is a deliberate boundary. Any query that touches clinical advice, prescription decisions, diagnosis, or treatment recommendation is immediately escalated to your clinical team with full context. We handle everything that doesn't require clinical judgment. This line is configured during setup and never crossed." },
      { q: "Which systems do you connect to?", a: "Practo, HealthPlix, eHospital, and most major Indian EMR/EHR platforms. For patient communication, we use email and WhatsApp. For documentation, Notion or your existing knowledge base. If you use a custom patient portal, we assess API availability during the onboarding call." },
      { q: "How does escalation to clinical staff work?", a: "Escalation routes are configured per query type during setup. Clinical escalations include the full patient conversation, query classification, and a suggested response — so the clinician has context without needing to re-read the thread. Urgent escalations (anything involving active symptoms, medication questions, or patient distress) have a separate priority queue." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. Full configuration export and access revocation are included in offboarding." },
    ],
  },
  {
    slug: "finance",
    name: "Finance",
    tagline: "For fintech platforms and financial advisors",
    color: "#3b82f6",
    hero: {
      eyebrow: "Finance Division",
      line1: "FinTech operations,",
      line2: "handled.",
      gradientLine: "compliance-grade, always.",
      description: "We deploy AI operations teams for fintech platforms and financial advisors — managing KYC onboarding, account support, compliance documentation, and client communications so your team can focus on the product and portfolio.",
      metrics: [
        { value: "3.4x", label: "KYC Completion Rate" },
        { value: "91%", label: "Query Auto-Resolution" },
        { value: "<72 hr", label: "Compliance Doc Updates" },
      ],
    },
    problem: {
      heading: "Compliance overhead is eating your growth margin.",
      subheading: "Three operational bottlenecks that cost fintech platforms customers they've already acquired.",
      points: [
        {
          stat: "58%", unit: "KYC drop-off", color: "#3b82f6",
          title: "KYC applications abandoned mid-process",
          body: "An average of 56–60% of users who start KYC never complete it — not because they lack intent, but because the process is friction-heavy and unsupported. Every abandoned KYC is a customer acquisition cost written off. The fix is operational, not product.",
        },
        {
          stat: "3–6 wks", unit: "compliance lag", color: "#ef4444",
          title: "To update docs after a regulatory change",
          body: "When RBI, SEBI, or IRDAI updates regulations, most platforms take 3–6 weeks to update customer-facing documentation and product disclosures. That gap is a compliance risk and a customer trust problem. We update within 72 hours.",
        },
        {
          stat: "67%", unit: "of queries", color: "#6366f1",
          title: "Transaction queries not resolved on first contact",
          body: "Sixty-seven percent of transaction-related support queries require a second or third contact before resolution because agents lack real-time transaction data. This is an integration failure. Resolved, it becomes a retention advantage.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One compliance-grade team.",
      subheading: "Operations for a regulated industry — built to move fast without cutting corners on accuracy or compliance.",
      items: [
        {
          tag: "Support", tagColor: "#3b82f6",
          title: "Account & Transaction Support",
          body: "Account queries, transaction disputes, failed payments, and KYC status — all handled with real-time data integration. Resolves 91% without escalation to compliance or ops teams. Sensitive disputes route with full transaction history.",
          detail: "resolution: 91% · avg response: 3m 08s",
        },
        {
          tag: "Onboarding", tagColor: "#10b981",
          title: "KYC Onboarding",
          body: "Guided onboarding sequences that reduce KYC drop-off. Context-sensitive nudges, document guidance, real-time status updates, and re-engagement flows for incomplete applications. Completion rate lifts by 3.4x.",
          detail: "KYC completion lift: +3.4x · re-engagement: automated",
        },
        {
          tag: "Compliance", tagColor: "#f59e0b",
          title: "Compliance Documentation",
          body: "Product disclosures, scheme information documents, risk policy documents, and regulatory FAQs — updated within 72 hours of any regulatory change. Compliance-reviewed workflow, not just AI-generated text.",
          detail: "update lag: <72h · audit-trail: full",
        },
        {
          tag: "Content", tagColor: "#f43f5e",
          title: "Financial Content",
          body: "Investor education content, product explainers, market commentary, and platform newsletters — written in your brand voice, accurate, and aligned with SEBI/IRDAI communication guidelines. No compliance surprises.",
          detail: "output: 8–12 pieces/mo · compliance-reviewed: yes",
        },
        {
          tag: "Retention", tagColor: "#8b5cf6",
          title: "Client Retention",
          body: "Portfolio review nudges, investment milestone sequences, renewal communications for insurance clients, and proactive outreach for dormant accounts. Automated touchpoints that prevent silent churn before it shows in numbers.",
          detail: "dormant trigger: 30d · portfolio nudge: quarterly",
        },
      ],
    },
    proof: {
      clientName: "Vaultline",
      weekNumber: 8,
      sections: [
        {
          title: "ACCOUNT SUPPORT",
          metrics: [
            { label: "Queries received", value: "203" },
            { label: "Auto-resolved", value: "185  (91.1%)", good: true },
            { label: "Compliance escalations", value: "9  (4.4%)" },
            { label: "Avg first response", value: "3m 08s", good: true },
            { label: "CSAT", value: "4.5 / 5.0", good: true },
          ],
        },
        {
          title: "KYC OPS",
          metrics: [
            { label: "Applications started", value: "67" },
            { label: "Completed (this week)", value: "48  (71.6%)", good: true },
            { label: "Re-engagement nudges", value: "23" },
            { label: "Drop-off recoveries", value: "14  (60.9%)", good: true },
          ],
        },
        {
          title: "COMPLIANCE",
          metrics: [
            { label: "Docs reviewed", value: "3" },
            { label: "Updates published", value: "2" },
            { label: "Pending regulatory items", value: "0", good: true },
          ],
        },
      ],
      flags: [
        { level: "P1", text: "Transaction dispute #TXN-2847 — amount >₹1L, routed to compliance" },
        { level: "INFO", text: "KYC re-engagement flow improved 18% vs prior period" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 35000, annual: 28000 }, cta: "Start free trial",
          description: "Account support and KYC onboarding for early-stage fintech.",
          features: [
            { label: "Account & Transaction Support", included: true },
            { label: "KYC Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 400 queries/month", included: true },
            { label: "Compliance documentation", included: false },
            { label: "Financial content", included: false },
            { label: "Client retention flows", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 65000, annual: 52000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for platforms with regulatory obligations.",
          features: [
            { label: "Account & Transaction Support", included: true },
            { label: "KYC Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 1,000 queries/month", included: true },
            { label: "Compliance documentation", included: true },
            { label: "Financial content (8 pieces/mo)", included: true },
            { label: "Client retention flows", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 100000, annual: 80000 }, cta: "Start free trial",
          description: "End-to-end ops with retention and custom compliance review.",
          features: [
            { label: "Account & Transaction Support", included: true },
            { label: "KYC Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited queries", included: true },
            { label: "Compliance documentation", included: true },
            { label: "Financial content (12 pieces/mo)", included: true },
            { label: "Client retention flows", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "How do you handle regulatory compliance and data privacy?", a: "All data handling follows RBI/SEBI data localisation requirements. We operate on a data processing agreement that defines exactly what data each agent can access, for what purpose, and for how long. Compliance documentation updates are reviewed by a human compliance layer before publication — not published directly from AI generation." },
      { q: "Can you integrate with payment rails and core banking systems?", a: "We integrate with Razorpay, Cashfree, PayU, and most Indian payment gateways. For core banking, we assess API availability during onboarding — most modern CBS platforms (Finacle, Mambu, Thought Machine) support the integrations we need. We cannot currently access legacy core systems without API exposure." },
      { q: "How are large-value transaction disputes handled?", a: "Transaction disputes above a defined threshold (configurable — default ₹50,000) are automatically escalated to your compliance or ops team with full transaction history, customer conversation, and a dispute classification. The agent handles acknowledgment and status communication; resolution authority stays with your team." },
      { q: "What's the process for emergency compliance updates?", a: "When a regulatory change is published by RBI, SEBI, or IRDAI, we flag it to your team within 4 hours. Updated documentation is drafted within 24 hours and published after your review — target turnaround under 72 hours. We maintain a regulatory change log as part of the weekly ops report." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. Full config export, compliance documentation handover, and access revocation are included in offboarding." },
    ],
  },
  {
    slug: "hr-recruiting",
    name: "HR & Recruiting",
    tagline: "For HR platforms and talent agencies",
    color: "#8b5cf6",
    hero: {
      eyebrow: "HR & Recruiting Division",
      line1: "Talent operations,",
      line2: "handled.",
      gradientLine: "from sourcing to onboarding.",
      description: "We deploy AI operations teams for HR platforms and talent agencies — managing candidate communications, offer delivery, job description writing, and employer branding so your recruiters can focus on what only humans do.",
      metrics: [
        { value: "65%", label: "Recruiting Admin Automated" },
        { value: "<45 min", label: "Candidate Response Time" },
        { value: "15+", label: "JDs Written / Month" },
      ],
    },
    problem: {
      heading: "Your recruiters are doing the wrong work.",
      subheading: "Three operational realities that limit recruiting capacity without showing up on any dashboard.",
      points: [
        {
          stat: "60%", unit: "on admin", color: "#8b5cf6",
          title: "Of recruiter time spent on non-recruiting tasks",
          body: "Recruiters spend an average of 60% of their working day on administrative tasks — scheduling interviews, chasing candidate responses, formatting JDs, and writing rejection emails. That's 60% of your highest-leverage headcount doing work that an AI agent team handles from day one.",
        },
        {
          stat: "34 hrs", unit: "time-to-offer", color: "#ef4444",
          title: "Average time from verbal to written offer",
          body: "The average time from verbal offer to written offer letter is 34 hours. Thirty-four percent of candidates who receive a competitor offer during that window accept it. A sub-4-hour offer delivery system eliminates this risk entirely.",
        },
        {
          stat: "23%", unit: "first-90-day", color: "#6366f1",
          title: "Attrition from poor onboarding",
          body: "Nearly a quarter of new hires leave within their first 90 days. The primary driver isn't compensation — it's poor onboarding experience. Structured onboarding sequences reduce first-90-day attrition by 29% on average. Most companies still onboard ad hoc.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One talent operations team.",
      subheading: "Every recruiting operation that doesn't require human judgment — automated, so your team focuses on hiring decisions.",
      items: [
        {
          tag: "Support", tagColor: "#8b5cf6",
          title: "Candidate Support",
          body: "Application status queries, interview scheduling conflicts, benefits questions, and role clarifications — handled within 45 minutes, at any hour. Candidates get real responses, not auto-responder acknowledgments.",
          detail: "avg response: 42m · resolution without HR: 78%",
        },
        {
          tag: "Onboarding", tagColor: "#10b981",
          title: "Candidate Onboarding",
          body: "Offer delivery sequences, pre-joining document collection, first-week briefing, and 30-60-90 day check-in flows. Onboarding starts the moment the offer is signed — not the first day on the job.",
          detail: "offer-to-start: 8 touchpoints · doc completion: 94%",
        },
        {
          tag: "Content", tagColor: "#6366f1",
          title: "JD Library",
          body: "Job descriptions written from a role brief in under 2 hours. Branded to your voice, inclusive-language compliant, role-level appropriate, and formatted for your ATS. Up to 15 per month with same-day turnaround.",
          detail: "turnaround: <2h · output: up to 15 JDs/mo",
        },
        {
          tag: "Brand", tagColor: "#f43f5e",
          title: "Employer Branding",
          body: "LinkedIn content, company culture posts, employee spotlight stories, and talent newsletter — positioning your employer brand consistently and attractively without a dedicated content hire.",
          detail: "output: 10–15 pieces/mo · platform: LinkedIn + email",
        },
        {
          tag: "Retention", tagColor: "#f59e0b",
          title: "Placement & Retention",
          body: "Post-placement check-in sequences for staffing agencies, 90-day retention communications for in-house HR, referral program management, and lapsed-candidate re-engagement flows.",
          detail: "post-placement: 3 check-ins · referral: 60d prompt",
        },
      ],
    },
    proof: {
      clientName: "Bridgework Talent",
      weekNumber: 5,
      sections: [
        {
          title: "CANDIDATE OPS",
          metrics: [
            { label: "Applications received", value: "147" },
            { label: "Queries auto-handled", value: "114  (77.6%)", good: true },
            { label: "Avg response time", value: "42m 15s", good: true },
            { label: "Interview confirmations", value: "38" },
            { label: "Offer letters sent (avg 3h 22m)", value: "9", good: true },
          ],
        },
        {
          title: "CONTENT",
          metrics: [
            { label: "JDs written", value: "11" },
            { label: "LinkedIn posts", value: "8" },
            { label: "Newsletter draft", value: "1" },
          ],
        },
        {
          title: "ONBOARDING",
          metrics: [
            { label: "Pre-joining sequences active", value: "9" },
            { label: "Documents collected", value: "43 of 47  (91.5%)", good: true },
            { label: "30-day check-ins sent", value: "4" },
          ],
        },
      ],
      flags: [
        { level: "INFO", text: "2 candidates non-responsive >48h — re-engagement sent" },
        { level: "INFO", text: "Senior PM JD: tone review requested before publish" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 18000, annual: 14400 }, cta: "Start free trial",
          description: "Candidate support and JD writing for lean recruiting teams.",
          features: [
            { label: "Candidate Support & queries", included: true },
            { label: "JD writing (up to 8/mo)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 100 candidates/month", included: true },
            { label: "Candidate Onboarding sequences", included: false },
            { label: "Employer Branding content", included: false },
            { label: "Placement retention flows", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 35000, annual: 28000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for agencies or HR teams with active hiring.",
          features: [
            { label: "Candidate Support & queries", included: true },
            { label: "JD writing (up to 15/mo)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 300 candidates/month", included: true },
            { label: "Candidate Onboarding sequences", included: true },
            { label: "Employer Branding (10 pieces/mo)", included: true },
            { label: "Placement retention flows", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 55000, annual: 44000 }, cta: "Start free trial",
          description: "End-to-end talent ops with retention and placement follow-up.",
          features: [
            { label: "Candidate Support & queries", included: true },
            { label: "JD writing (unlimited)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited candidates", included: true },
            { label: "Candidate Onboarding sequences", included: true },
            { label: "Employer Branding (15 pieces/mo)", included: true },
            { label: "Placement & retention flows", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "Which ATS platforms do you integrate with?", a: "Keka, Darwinbox, GreytHR, Zoho Recruit, Lever, and Greenhouse. For email-based workflows, we connect to Gmail and Outlook. Most ATS platforms expose the candidate and job data we need via API — we assess availability during onboarding and configure accordingly." },
      { q: "How does JD writing work — what do we provide?", a: "You provide a role brief: title, team, level, key responsibilities, must-have qualifications, and any specific tone notes. Our agents produce a formatted JD within 2 hours — structured for your ATS, inclusive-language checked, and in your employer brand voice. You review and publish. Most JDs are approved on first draft." },
      { q: "Can you handle high-volume hiring — 100+ positions?", a: "Yes. The candidate support layer scales with volume without degradation. JD writing volume is capped per plan (15/month on Growth), but we can increase this on request for bulk hiring periods. Pre-hire events (campus recruitment, bulk sourcing) require a configuration brief 5 days in advance." },
      { q: "How are sensitive conversations — like rejection — handled?", a: "Rejection communications are one of the highest-impact touchpoints for employer brand. Our rejection sequences are written to be respectful, specific (where appropriate), and to leave the door open for future applications. The tone is configured against your employer brand guidelines during setup." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. No penalties. Full configuration export and access revocation are included in offboarding." },
    ],
  },
  {
    slug: "education",
    name: "Education",
    tagline: "For edtech platforms and institutions",
    color: "#0ea5e9",
    hero: {
      eyebrow: "Education Division",
      line1: "Student success operations,",
      line2: "handled.",
      gradientLine: "from enrollment to outcome.",
      description: "We deploy AI operations teams for edtech platforms and educational institutions — managing student onboarding, learning progress communication, curriculum documentation, and institutional content so educators can focus on teaching.",
      metrics: [
        { value: "+41%", label: "Week-2 Student Retention" },
        { value: "89%", label: "Day-1 Completion Rate" },
        { value: "<1 wk", label: "Curriculum Doc Update" },
      ],
    },
    problem: {
      heading: "Students drop off because operations fail them.",
      subheading: "Three data points that explain edtech's retention problem — and why better product rarely fixes it.",
      points: [
        {
          stat: "62%", unit: "drop by week 3", color: "#0ea5e9",
          title: "Students who never reach week 3",
          body: "Students who receive no communication after enrollment show 62% drop-off by week 3. Those who receive structured progress nudges and milestone communications show 41% better retention. The content and the product are often excellent. The operations are not.",
        },
        {
          stat: "4.5 hrs", unit: "avg response", color: "#ef4444",
          title: "Support response time for stuck students",
          body: "Student support queries — password resets, access issues, assignment problems — have an average response time of 4.5 hours on most edtech platforms. A student stuck before a submission deadline who waits 4 hours is a student who churns and writes a negative review.",
        },
        {
          stat: "6 wks", unit: "docs behind", color: "#6366f1",
          title: "Documentation lag behind current curriculum",
          body: "Most platforms have course content updated regularly but documentation — FAQs, assessment rubrics, institutional policies — that's 4–8 weeks behind. For premium programs, this is a quality signal that directly affects enrollment decisions and NPS.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One student success team.",
      subheading: "Every student-facing operation that doesn't require teaching — automated, so your faculty can focus on the craft.",
      items: [
        {
          tag: "Support", tagColor: "#0ea5e9",
          title: "Student Support",
          body: "Access issues, payment failures, assessment problems, and course navigation — resolved within 4 minutes. Academic queries route to the appropriate faculty. Non-academic queries resolve without any manual involvement.",
          detail: "avg response: 3m 45s · resolution: 82%",
        },
        {
          tag: "Onboarding", tagColor: "#10b981",
          title: "Student Onboarding",
          body: "Enrollment confirmation, welcome sequences, first-lesson prompts, peer community invites, and week-1 progress check-ins — structured to turn signups into active, retained learners from day one.",
          detail: "sequence: 7 touchpoints · week-2 retention lift: +41%",
        },
        {
          tag: "Docs", tagColor: "#6366f1",
          title: "Curriculum Documentation",
          body: "Course FAQs, assessment rubrics, study guides, program handbooks, and institutional policies — written, maintained, and updated within one week of any curriculum or policy change. LMS-compatible formats.",
          detail: "update lag: <1 week · format: LMS-compatible",
        },
        {
          tag: "Content", tagColor: "#f43f5e",
          title: "Institutional Content",
          body: "Blog posts, course preview content, testimonial formatting, LinkedIn presence for your institution, and admissions newsletters — produced without consuming your faculty's time.",
          detail: "output: 8–12 pieces/mo · admissions-optimized: yes",
        },
        {
          tag: "Retention", tagColor: "#8b5cf6",
          title: "Engagement & Retention",
          body: "Progress nudges at milestone intervals, re-engagement flows for inactive students, completion certificate sequences, and alumni community content. Turn completions into advocates and advocates into referrals.",
          detail: "milestone triggers: wk 2, 4, 8 · lapse: 7-day trigger",
        },
      ],
    },
    proof: {
      clientName: "Ascent Academy",
      weekNumber: 9,
      sections: [
        {
          title: "STUDENT SUPPORT",
          metrics: [
            { label: "Queries received", value: "78" },
            { label: "Auto-resolved", value: "64  (82.1%)", good: true },
            { label: "Escalated to faculty", value: "14  (17.9%)" },
            { label: "Avg first response", value: "3m 45s", good: true },
            { label: "Student satisfaction", value: "4.6 / 5.0", good: true },
          ],
        },
        {
          title: "ONBOARDING",
          metrics: [
            { label: "New enrollments", value: "34" },
            { label: "Day-1 sequences sent", value: "34  (100%)", good: true },
            { label: "Day-7 completion rate", value: "27  (79.4%)", good: true },
            { label: "Re-engagement nudges", value: "7  (4 reactivated)" },
          ],
        },
        {
          title: "CONTENT",
          metrics: [
            { label: "Study guides updated", value: "3" },
            { label: "Blog posts published", value: "2" },
            { label: "Admissions newsletter", value: "1" },
          ],
        },
      ],
      flags: [
        { level: "INFO", text: "Week-4 nudge CTR up 22% with updated subject line" },
        { level: "INFO", text: "2 students inactive >7 days — re-engagement sent" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 15000, annual: 12000 }, cta: "Start free trial",
          description: "Student support and onboarding for growing edtech platforms.",
          features: [
            { label: "Student Support triage", included: true },
            { label: "Student Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 200 students active", included: true },
            { label: "Curriculum documentation", included: false },
            { label: "Institutional content", included: false },
            { label: "Retention & re-engagement flows", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 28000, annual: 22400 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for platforms with 500+ enrolled students.",
          features: [
            { label: "Student Support triage", included: true },
            { label: "Student Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 1,000 students active", included: true },
            { label: "Curriculum documentation", included: true },
            { label: "Institutional content (8 pieces/mo)", included: true },
            { label: "Retention & re-engagement flows", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 45000, annual: 36000 }, cta: "Start free trial",
          description: "End-to-end student ops with retention and alumni engagement.",
          features: [
            { label: "Student Support triage", included: true },
            { label: "Student Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited active students", included: true },
            { label: "Curriculum documentation", included: true },
            { label: "Institutional content (12 pieces/mo)", included: true },
            { label: "Retention & re-engagement flows", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "Which LMS platforms do you integrate with?", a: "Teachable, Thinkific, Moodle, Canvas, LearnDash, and most major platforms that expose a student and course API. For custom-built LMS platforms, we assess integration feasibility during onboarding. Communication channels are email and WhatsApp for learner-facing sequences." },
      { q: "Can you handle parent/guardian communication for K-12 platforms?", a: "Yes. For K-12 and under-18 learner platforms, we configure a parent-facing communication layer alongside the student-facing one. Parent communications cover enrollment confirmation, progress updates, and academic milestone notifications. All content is reviewed against age-appropriate communication standards." },
      { q: "How does support escalation to faculty work?", a: "Academic queries — assessment feedback, content disputes, curriculum questions — are escalated to the relevant faculty member with the full student conversation and query classification. Faculty receive a structured brief, not a raw email thread. This reduces faculty response time and prevents context loss." },
      { q: "Do you work for cohort-based programs as well as self-paced?", a: "Both models work well. For cohort-based programs, sequences are triggered by cohort calendar events (module launch, assessment week, live session). For self-paced programs, sequences are triggered by individual learner behaviour — completion milestones, inactivity, and feature engagement events." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. No penalties. Curriculum documentation, sequence configurations, and all reports are exported as part of offboarding." },
    ],
  },
  {
    slug: "logistics",
    name: "Logistics",
    tagline: "For logistics platforms and fleet operators",
    color: "#f43f5e",
    hero: {
      eyebrow: "Logistics Division",
      line1: "Logistics operations,",
      line2: "handled.",
      gradientLine: "from dispatch to doorstep.",
      description: "We deploy AI operations teams for logistics platforms and fleet operators — managing shipment queries, driver onboarding, delay communications, and exception handling so your ops team can focus on network growth and scale.",
      metrics: [
        { value: "88%", label: "Shipment Queries Auto-Resolved" },
        { value: "<15 min", label: "Delay Alert Time" },
        { value: "90 min", label: "Driver Activation Time" },
      ],
    },
    problem: {
      heading: "Operational silence is your biggest cost.",
      subheading: "Three places where logistics platforms lose revenue, customers, and driver capacity — quietly.",
      points: [
        {
          stat: "45%", unit: "of support volume", color: "#f43f5e",
          title: "Is just shipment status queries",
          body: "Across logistics platforms, 43–47% of all support volume is shipment status queries that could be auto-resolved with real-time tracking integration. Every agent answering 'where is my shipment' is an agent not solving actual operational problems. This is infrastructure, not headcount.",
        },
        {
          stat: "₹12,000", unit: "per escalation", color: "#ef4444",
          title: "Average cost of a single complaint escalation",
          body: "A delayed shipment communicated proactively costs almost nothing. A delay discovered by the customer because no one told them costs an average of ₹12,000 when you account for retention spend, refund, and CS overhead. Proactive delay communication is a financial decision, not a courtesy.",
        },
        {
          stat: "4.2 days", unit: "driver onboarding", color: "#6366f1",
          title: "Average time to activate a new driver",
          body: "Driver onboarding takes 4–5 days from document upload to first assignment. Each day of delay is a capacity cost. Structured onboarding sequences, automated document collection, and compliance verification reduce this to under 90 minutes.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One logistics operations team.",
      subheading: "From shipment query to driver activation — the full ops stack your platform needs to scale without adding headcount.",
      items: [
        {
          tag: "Support", tagColor: "#f43f5e",
          title: "Shipment Support",
          body: "Real-time tracking integration for instant status resolution. Handles delivery queries, address exceptions, failed delivery rescheduling, and damage claims — with carrier data pulled automatically. Resolves 88% without escalation.",
          detail: "resolution: 88% · avg response: 2m 30s",
        },
        {
          tag: "Onboarding", tagColor: "#10b981",
          title: "Driver Onboarding",
          body: "Document collection sequences, compliance verification coordination, vehicle registration tracking, and first-assignment briefing — reducing time-to-active from 4+ days to under 90 minutes. Drivers can start earning faster; you scale capacity faster.",
          detail: "time-to-active: <90 min · doc completion: 97%",
        },
        {
          tag: "Ops", tagColor: "#f59e0b",
          title: "Delay Communication",
          body: "Proactive delay alerts sent within 15 minutes of any exception event — with ETA updates, reason codes, and rescheduling options. Customers who receive proactive communication are 4x less likely to file a formal complaint.",
          detail: "alert lag: <15 min · complaint rate: -78%",
        },
        {
          tag: "Docs", tagColor: "#6366f1",
          title: "Operations Documentation",
          body: "Route guides, carrier integration docs, driver SOPs, and compliance checklists — always current, formatted for your platform's knowledge base. Updated within one week of any process or carrier change.",
          detail: "update lag: <1 week · format: Notion / Confluence",
        },
        {
          tag: "Retention", tagColor: "#8b5cf6",
          title: "Partner Retention",
          body: "Regular performance summaries for logistics partners and carriers, SLA compliance reports, renewal communications, and incentive program content for driver networks. Keep partners informed and engaged.",
          detail: "SLA report: weekly · partner comms: monthly",
        },
      ],
    },
    proof: {
      clientName: "SwiftRoute Logistics",
      weekNumber: 6,
      sections: [
        {
          title: "SHIPMENT SUPPORT",
          metrics: [
            { label: "Queries received", value: "412" },
            { label: "Auto-resolved", value: "362  (87.9%)", good: true },
            { label: "Escalated", value: "50  (12.1%)" },
            { label: "Avg response", value: "2m 30s", good: true },
            { label: "CSAT", value: "4.4 / 5.0", good: true },
          ],
        },
        {
          title: "EXCEPTION HANDLING",
          metrics: [
            { label: "Delay events detected", value: "28" },
            { label: "Proactive alerts sent <15 min", value: "28  (100%)", good: true },
            { label: "Formal complaints filed", value: "2", good: true },
            { label: "Prior week complaints", value: "9" },
          ],
        },
        {
          title: "DRIVER OPS",
          metrics: [
            { label: "New driver applications", value: "12" },
            { label: "Activated (avg 87 min)", value: "11", good: true },
            { label: "Documents outstanding", value: "3" },
          ],
        },
      ],
      flags: [
        { level: "P1", text: "Carrier API outage 14:20–16:40 — fallback to manual tracking" },
        { level: "INFO", text: "Delay alert CTR 67% — customers clicking for live updates" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 20000, annual: 16000 }, cta: "Start free trial",
          description: "Shipment support and proactive delay communication.",
          features: [
            { label: "Shipment Support (tracking + queries)", included: true },
            { label: "Delay Communication sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 500 queries/month", included: true },
            { label: "Driver Onboarding sequences", included: false },
            { label: "Operations documentation", included: false },
            { label: "Partner retention content", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 40000, annual: 32000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for platforms with active driver networks.",
          features: [
            { label: "Shipment Support (tracking + queries)", included: true },
            { label: "Delay Communication sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 2,000 queries/month", included: true },
            { label: "Driver Onboarding sequences", included: true },
            { label: "Operations documentation", included: true },
            { label: "Partner retention content", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 60000, annual: 48000 }, cta: "Start free trial",
          description: "End-to-end ops with partner retention and exception management.",
          features: [
            { label: "Shipment Support (tracking + queries)", included: true },
            { label: "Delay Communication sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited queries", included: true },
            { label: "Driver Onboarding sequences", included: true },
            { label: "Operations documentation", included: true },
            { label: "Partner retention content", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "Which carriers and tracking systems do you integrate with?", a: "Delhivery, Blue Dart, DTDC, Ecom Express, Amazon Logistics, and most major Indian carriers via Shiprocket, ClickPost, or direct API. For international shipments, we connect to FedEx, DHL, and UPS tracking APIs. If your carrier uses a proprietary system, we assess integration during onboarding." },
      { q: "How quickly can you send delay alerts after an exception?", a: "Within 15 minutes of exception detection — either from carrier API or GPS signal. The alert includes the ETA update, reason code, and rescheduling option. For customer-facing communications, tone is configured to be informative and resolution-focused rather than apologetic." },
      { q: "How does escalation work for high-value or time-sensitive shipments?", a: "You can define shipment priority tiers during setup. High-value or express shipments have a separate escalation queue with immediate notification to your ops team. Customer communications for these shipments route through a stricter review layer before sending." },
      { q: "Can you handle B2B logistics queries as well as D2C last-mile?", a: "Yes. B2B logistics queries — bulk shipment status, freight invoice disputes, credit note requests — have a different communication pattern from D2C queries. We configure separate agent instances for B2B and D2C if you serve both, with appropriate tone and data access for each." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. No penalties. Full configuration export and carrier integration documentation are included in offboarding." },
    ],
  },
  {
    slug: "hospitality",
    name: "Hospitality",
    tagline: "For hotels, restaurants, and travel platforms",
    color: "#f97316",
    hero: {
      eyebrow: "Hospitality Division",
      line1: "Guest operations,",
      line2: "handled.",
      gradientLine: "every stay, perfectly prepared.",
      description: "We deploy AI operations teams for hotels, hotel groups, and travel platforms — managing pre-arrival communication, booking support, review management, and guest loyalty so your team can focus on delivering exceptional experiences.",
      metrics: [
        { value: "95%", label: "Guests Receive Pre-Arrival Sequence" },
        { value: "<2 hr", label: "Review Response Time" },
        { value: "+22%", label: "Upsell Conversion" },
      ],
    },
    problem: {
      heading: "Silent guests become lost guests.",
      subheading: "Three operational gaps that cost hospitality businesses revenue and reputation.",
      points: [
        {
          stat: "81%", unit: "receive nothing", color: "#f97316",
          title: "Of guests get no pre-arrival communication",
          body: "Research shows 81% of guests receive no communication between booking confirmation and check-in. Guests who receive structured pre-arrival sequences show 22% higher upsell conversion, 31% fewer check-in queries, and 18% higher NPS. The opportunity cost of silence is measurable.",
        },
        {
          stat: "14 days", unit: "avg response", color: "#ef4444",
          title: "Average lag on review responses",
          body: "Hotel reviews are responded to, on average, 14 days after posting — when relevance has disappeared. Brands that respond within 4 hours see measurably higher OTA search ranking and conversion. Every unanswered review is a signal to prospective guests.",
        },
        {
          stat: "4.3x", unit: "support spike", color: "#6366f1",
          title: "Support volume surge during peak season",
          body: "Hospitality support spikes 4–5x during peak periods. Most properties staff for average volume, meaning guests during your most revenue-critical periods receive the worst support experience. Peak is when you can least afford a bad impression.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One guest operations team.",
      subheading: "From first booking to loyal return visit — the complete guest operations stack for modern hospitality brands.",
      items: [
        {
          tag: "Support", tagColor: "#f97316",
          title: "Guest Support",
          body: "Booking queries, modification requests, check-in/check-out questions, and amenity inquiries — handled within 2 hours, any time of day. Integrates with your PMS for real-time reservation data. Resolves 86% without escalation.",
          detail: "avg response: 1h 52m · resolution: 86%",
        },
        {
          tag: "Onboarding", tagColor: "#10b981",
          title: "Pre-Arrival Sequences",
          body: "Booking enhancement email, T-7 arrival prep, T-1 day welcome brief, and day-of check-in guide — all automated from your PMS. Guests arrive informed, upsold, and with fewer questions. Upsell conversion lifts by 22%.",
          detail: "sequence: 4 touchpoints · upsell conversion: +22%",
        },
        {
          tag: "Docs", tagColor: "#6366f1",
          title: "Property Documentation",
          body: "Room category descriptions, amenity guides, local area content, F&B menus, and hotel policy documents — written to the standard of a premium property and updated monthly. Consistent across OTA listings and your own website.",
          detail: "review cycle: monthly · format: OTA + own website",
        },
        {
          tag: "Content", tagColor: "#f43f5e",
          title: "Brand Content",
          body: "Blog posts, destination guides, seasonal campaign copy, OTA description updates, and hotel newsletters — keeping your brand visible and converting browsers to bookers without a content team.",
          detail: "output: 10–15 pieces/mo · OTA-optimized: yes",
        },
        {
          tag: "Loyalty", tagColor: "#8b5cf6",
          title: "Guest Loyalty",
          body: "Post-stay review request sequences, loyalty program communications, anniversary offers for repeat guests, and re-engagement campaigns for lapsed bookers. Automated touchpoints that feel personal.",
          detail: "post-stay sequence: 3 emails · repeat booking: +18%",
        },
      ],
    },
    proof: {
      clientName: "The Arcadia Hotels",
      weekNumber: 7,
      sections: [
        {
          title: "GUEST SUPPORT",
          metrics: [
            { label: "Queries received", value: "89" },
            { label: "Auto-resolved", value: "77  (86.5%)", good: true },
            { label: "Escalated to front desk", value: "12  (13.5%)" },
            { label: "Avg response", value: "1h 52m", good: true },
            { label: "Guest satisfaction", value: "4.8 / 5.0", good: true },
          ],
        },
        {
          title: "PRE-ARRIVAL",
          metrics: [
            { label: "Check-ins this week", value: "34" },
            { label: "Pre-arrival sequences sent", value: "34  (100%)", good: true },
            { label: "Upsell conversions", value: "7  (20.6%)", good: true },
          ],
        },
        {
          title: "REVIEWS",
          metrics: [
            { label: "New reviews posted", value: "12" },
            { label: "Responses sent", value: "12  (100%)", good: true },
            { label: "Avg response time", value: "1h 44m", good: true },
            { label: "Avg review rating", value: "4.7 / 5.0", good: true },
          ],
        },
      ],
      flags: [
        { level: "INFO", text: "2 guests requested early check-in — noted for housekeeping" },
        { level: "INFO", text: "Summer upsell in T-7 email performing 28% above target" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 18000, annual: 14400 }, cta: "Start free trial",
          description: "Guest support and pre-arrival sequences for independent properties.",
          features: [
            { label: "Guest Support (booking + queries)", included: true },
            { label: "Pre-Arrival sequences (4-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 150 guests/month", included: true },
            { label: "Property documentation", included: false },
            { label: "Brand content", included: false },
            { label: "Guest loyalty flows", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 35000, annual: 28000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for properties with consistent occupancy.",
          features: [
            { label: "Guest Support (booking + queries)", included: true },
            { label: "Pre-Arrival sequences (4-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 500 guests/month", included: true },
            { label: "Property documentation", included: true },
            { label: "Brand content (10 pieces/mo)", included: true },
            { label: "Guest loyalty flows", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 55000, annual: 44000 }, cta: "Start free trial",
          description: "End-to-end guest ops with loyalty and review management.",
          features: [
            { label: "Guest Support (booking + queries)", included: true },
            { label: "Pre-Arrival sequences (4-touch)", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited guests", included: true },
            { label: "Property documentation", included: true },
            { label: "Brand content (15 pieces/mo)", included: true },
            { label: "Guest loyalty + review management", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "Which PMS systems do you integrate with?", a: "Opera, Mews, Cloudbeds, StayNTouch, and most modern cloud PMS platforms. We pull reservation data for pre-arrival sequences and guest support in real-time. For older on-premise PMS systems without API access, we work with exported data — setup takes longer but the sequences function identically." },
      { q: "How does the pre-arrival upsell work?", a: "The T-7 email includes a curated upsell offer based on room category and stay type — early check-in, room upgrade, F&B package, or local experience. Offers are configured during setup against your actual inventory and pricing. Guests who click are tracked and confirmed against your PMS availability before confirmation is sent." },
      { q: "Can you handle multi-property hotel groups?", a: "Yes. We configure separate agent instances per property with property-specific tone, documentation, and upsell inventory. Group-level reporting consolidates data across properties into a single weekly ops report. Multi-property setup requires an extended onboarding call — 90 minutes rather than 45." },
      { q: "How do you handle negative reviews?", a: "Negative review responses are drafted to acknowledge, empathise, and resolve — not to defend. The tone is configured against your brand standards and escalation thresholds. Reviews mentioning specific staff or incidents above a severity threshold are flagged to your GM before response is sent." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. No penalties. Pre-arrival sequence configurations, review response templates, and all reports are exported as part of offboarding." },
    ],
  },
  {
    slug: "insurance",
    name: "Insurance",
    tagline: "For insurtech platforms and brokers",
    color: "#a855f7",
    hero: {
      eyebrow: "Insurance Division",
      line1: "Insurance operations,",
      line2: "handled.",
      gradientLine: "policy to renewal, covered.",
      description: "We deploy AI operations teams for insurtech platforms and brokers — managing policy onboarding, claims query triage, renewal communications, and compliance documentation so your team can focus on underwriting and relationships.",
      metrics: [
        { value: "65%", label: "Policy Ops Automated" },
        { value: "+34%", label: "Renewal Retention Rate" },
        { value: "-28%", label: "Year-1 Policy Cancellation" },
      ],
    },
    problem: {
      heading: "Policyholders who don't understand, don't renew.",
      subheading: "Three operational failures that drive cancellation and lapse in insurance — and none of them are product problems.",
      points: [
        {
          stat: "38%", unit: "year-1 cancellation", color: "#a855f7",
          title: "Policies cancelled in the first year",
          body: "Year-one policy cancellation in India averages 36–40%. The primary driver is not price — it's confusion. Policyholders who don't understand their coverage, claims process, or communication timeline are 3x more likely to cancel. Structured post-sale onboarding directly reduces this.",
        },
        {
          stat: "4.8 hrs", unit: "claims query wait", color: "#ef4444",
          title: "Average first response on claims queries",
          body: "A customer with an active claim is your most vulnerable customer. The average claims query takes 4.8 hours to receive a first response. In those 4.8 hours, the customer has formed opinions about your brand that affect renewal — regardless of how well the claim is ultimately resolved.",
        },
        {
          stat: "₹25k", unit: "per lapsed policy", color: "#6366f1",
          title: "Average cost of a lapsed policy",
          body: "The cost of a lapsed policy — including renewal outreach, lost premium revenue, and reacquisition cost — averages ₹25,000 per policy in the retail segment. Structured renewal sequences reduce lapse rates by 34%. The maths clearly favour automation.",
        },
      ],
    },
    services: {
      heading: "Five ops functions. One policyholder operations team.",
      subheading: "From policy issuance to renewal confirmation — every policyholder operation that doesn't require underwriting judgment.",
      items: [
        {
          tag: "Support", tagColor: "#a855f7",
          title: "Policyholder Support",
          body: "Claims status, coverage clarification, document requests, payment queries, and nomination changes — all handled with core policy system integration. Resolves 74% without escalation to your ops or compliance teams.",
          detail: "avg response: 3h 48m · resolution: 74%",
        },
        {
          tag: "Onboarding", tagColor: "#10b981",
          title: "Policy Onboarding",
          body: "Welcome sequences, coverage explanation, claims process guide, first-payment confirmation, and 30-day check-in — all automated from policy issuance. Year-one cancellation rate drops by 28%.",
          detail: "sequence: 5 touchpoints · year-1 cancellation: -28%",
        },
        {
          tag: "Compliance", tagColor: "#f59e0b",
          title: "Compliance Documentation",
          body: "Policy wordings, Key Information Documents, exclusion guides, and product disclosure statements — always current, updated within 72 hours of any IRDAI regulatory change or product update.",
          detail: "update lag: <72h · IRDAI-aware: yes",
        },
        {
          tag: "Content", tagColor: "#f43f5e",
          title: "Insurance Content",
          body: "Educational articles, product explainers, claims guides, and insurance literacy content — building trust with a category that consumers historically approach with scepticism. Every piece is compliance-reviewed before publication.",
          detail: "output: 8–12 pieces/mo · compliance-reviewed: yes",
        },
        {
          tag: "Retention", tagColor: "#6366f1",
          title: "Renewal & Retention",
          body: "Renewal reminders starting 90 days before expiry, lapse re-engagement flows, post-claim follow-up for policy continuation, and loyalty communications for multi-policy holders. Structured sequences that reduce lapse by 34%.",
          detail: "renewal trigger: 90/30/7 days · lapse recovery: 34%",
        },
      ],
    },
    proof: {
      clientName: "Coverly Insurance",
      weekNumber: 8,
      sections: [
        {
          title: "POLICY SUPPORT",
          metrics: [
            { label: "Queries received", value: "134" },
            { label: "Auto-resolved", value: "99  (73.9%)", good: true },
            { label: "Escalated to ops", value: "35  (26.1%)" },
            { label: "Avg first response", value: "3h 48m", good: true },
            { label: "CSAT", value: "4.3 / 5.0", good: true },
          ],
        },
        {
          title: "ONBOARDING",
          metrics: [
            { label: "New policies issued", value: "28" },
            { label: "Welcome sequences sent", value: "28  (100%)", good: true },
            { label: "30-day check-ins", value: "22" },
            { label: "Year-1 cancellations", value: "1  (3.6%)", good: true },
          ],
        },
        {
          title: "RENEWALS",
          metrics: [
            { label: "Renewal due (next 30d)", value: "47" },
            { label: "Sequences started", value: "47  (100%)", good: true },
            { label: "Early renewals confirmed", value: "9  (19.1%)", good: true },
          ],
        },
      ],
      flags: [
        { level: "P1", text: "Claim #CL-0394 — pending >14 days, customer escalation risk" },
        { level: "INFO", text: "90-day renewal reminder variant B showing 14% lift" },
      ],
    },
    pricing: {
      tiers: [
        {
          name: "Starter", price: { monthly: 25000, annual: 20000 }, cta: "Start free trial",
          description: "Policy support and onboarding for early-stage insurtech.",
          features: [
            { label: "Policyholder Support triage", included: true },
            { label: "Policy Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 300 queries/month", included: true },
            { label: "Compliance documentation", included: false },
            { label: "Insurance content", included: false },
            { label: "Renewal & retention sequences", included: false },
          ],
        },
        {
          name: "Growth", price: { monthly: 50000, annual: 40000 }, cta: "Start free trial", popular: true,
          description: "Full ops stack for platforms with IRDAI regulatory obligations.",
          features: [
            { label: "Policyholder Support triage", included: true },
            { label: "Policy Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Up to 800 queries/month", included: true },
            { label: "Compliance documentation", included: true },
            { label: "Insurance content (8 pieces/mo)", included: true },
            { label: "Renewal & retention sequences", included: false },
          ],
        },
        {
          name: "Complete", price: { monthly: 80000, annual: 64000 }, cta: "Start free trial",
          description: "End-to-end policyholder ops with renewal and retention sequences.",
          features: [
            { label: "Policyholder Support triage", included: true },
            { label: "Policy Onboarding sequences", included: true },
            { label: "Weekly ops report", included: true },
            { label: "Unlimited queries", included: true },
            { label: "Compliance documentation", included: true },
            { label: "Insurance content (12 pieces/mo)", included: true },
            { label: "Renewal & retention sequences", included: true },
          ],
        },
      ],
    },
    faq: [
      { q: "How do you handle queries requiring regulatory knowledge?", a: "All policyholder communications touching coverage interpretation, claims decisions, or regulatory rights are routed to your ops team with full context before being sent. We handle acknowledgment and status updates; your licensed team handles anything requiring regulatory or underwriting authority." },
      { q: "Can you integrate with insurance core systems?", a: "We work with most API-exposed platforms — Majesco, Duck Creek, and custom-built core systems with REST APIs. For claims status integration specifically, we need read access to your claims management system. For policy data, we need read access to your policy administration system. Both are scoped and documented in the credential audit." },
      { q: "Are compliance documents reviewed by human experts before publication?", a: "Yes, always. Our compliance documentation workflow produces a draft from the regulatory update, flags the specific changes, and routes it to your compliance team for review before publication. We never publish compliance documents without human sign-off. The turnaround is under 72 hours from draft to published." },
      { q: "Can you handle both life and general insurance products?", a: "Yes. Life insurance (term, ULIP, endowment) and general insurance (motor, health, property) have different communication patterns, coverage language, and compliance requirements. We configure separate agent instances for each product type, each trained on the appropriate regulatory and product-specific language." },
      { q: "Can we cancel at any time?", a: "All plans are month-to-month with 14-day notice. All compliance documentation, sequence configurations, and reports are exported as part of offboarding. No cancellation penalty." },
    ],
  },
];

export function getDivisionBySlug(slug: string): DivisionData | undefined {
  return DIVISIONS.find((d) => d.slug === slug);
}
