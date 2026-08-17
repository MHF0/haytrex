import { COMPANY, PORTAL } from "@/lib/constants";

export interface KnowledgeEntry {
  /** Words and phrases that should route a question to this answer. */
  keywords: string[];
  answer: string;
  /** Follow-up chips offered after the answer. */
  followUps?: string[];
}

/**
 * What the assistant knows. Everything here is drawn from the site's own
 * content, so the answers and the pages cannot drift apart. Matching is by
 * keyword score rather than a language model, which keeps it honest: an
 * unmatched question falls through to an offer to pass it to the team.
 */
export const KNOWLEDGE: KnowledgeEntry[] = [
  {
    keywords: ["portal", "dashboard", "hi ivy", "management system", "all in one", "workspace"],
    answer:
      `Our portals put your whole operation in one place: work orders, invoicing and proposals, team and client messaging, employee management, a client self-service login, document storage, and live reporting. Portals start at $99 a month, and we build the workflow around how you already work.`,
    followUps: ["What does a portal cost?", "How long does a portal take?", "Book a demo"],
  },
  {
    keywords: ["portal cost", "portal price", "99", "monthly", "subscription", "how much portal"],
    answer:
      `Portals start at $99 per month. The final figure depends on how many modules you need and how much custom workflow is involved — there is no large upfront licence fee, and it scales as you grow.`,
    followUps: ["What is included?", "Book a demo"],
  },
  {
    keywords: ["website", "web design", "web development", "site", "seo", "landing page"],
    answer:
      `We design and build custom sites — no templates. Every project includes a design built around your brand, full mobile and tablet responsiveness, SEO fundamentals in the markup, integration with your portal or CRM, fast load times with SSL, an easy content editor, and lead capture forms.`,
    followUps: ["Can it connect to a portal?", "How long does a website take?", "Book a consultation"],
  },
  {
    keywords: ["formation", "llc", "incorporate", "incorporation", "c-corp", "s-corp", "entity", "register company", "start a business"],
    answer:
      `We handle formation end to end: choosing the right entity, preparing and filing the documents, operating agreements or bylaws, registered agent service, and ongoing state compliance. We work with both US founders and international ones.`,
    followUps: ["Which state should I choose?", "Can I form from outside the US?", "What about an EIN?"],
  },
  {
    keywords: ["ein", "tax id", "bank account", "business bank"],
    answer:
      `We prepare and submit the EIN application, including for founders without a Social Security number, and help you get a business bank account opened with the right documentation.`,
    followUps: ["Can I form from outside the US?", "Book a consultation"],
  },
  {
    keywords: ["state", "delaware", "wyoming", "nevada", "texas", "florida", "which state", "best state"],
    answer:
      `It depends on where you actually operate, your tax position and whether you plan to raise investment. Delaware suits companies raising venture money, Wyoming and Nevada are popular for low fees and privacy, and registering in your home state is often simplest. Our Business Map compares filing times, annual fees, benefits and drawbacks state by state.`,
    followUps: ["Open the Business Map", "Book a consultation"],
  },
  {
    keywords: ["international", "outside the us", "foreign", "non-resident", "abroad", "overseas", "not a citizen"],
    answer:
      `Yes — a large share of our clients are based outside the United States. You do not need to be a citizen or resident to own a US company. We handle the formation, the EIN without an SSN, the registered agent, and remote bank account opening.`,
    followUps: ["Which state should I choose?", "Book a consultation"],
  },
  {
    keywords: ["consulting", "strategy", "growth", "scale", "optimi"],
    answer:
      `Our consulting covers strategy, market research, process optimisation, growth planning, risk assessment and KPI design — practical work aimed at making the operation run better, not a slide deck.`,
    followUps: ["Book a consultation"],
  },
  {
    keywords: ["business plan", "investor", "funding", "pitch", "projections", "raise"],
    answer:
      `We build investor-ready plans: market and competitor research, the business model, marketing and sales strategy, five-year financial projections, an executive summary and pitch deck, plus an implementation roadmap.`,
    followUps: ["Book a consultation"],
  },
  {
    keywords: ["accounting", "bookkeeping", "payroll", "tax", "invoice", "financial"],
    answer:
      `We cover bookkeeping, financial statements, payroll and tax filing, accounts payable and receivable, tax planning, forecasting and cash flow management.`,
    followUps: ["Book a consultation"],
  },
  {
    keywords: ["how long", "timeline", "how fast", "take", "duration", "when"],
    answer:
      `Formation is usually a few business days once we have your details, though it varies by state — some file in one to three days, others take one to two weeks. A first portal build typically runs two to four weeks depending on the modules, and a website three to six weeks.`,
    followUps: ["Book a consultation"],
  },
  {
    keywords: ["price", "cost", "fee", "how much", "pricing", "budget", "expensive"],
    answer:
      `Portals start at $99 a month. Formation and website pricing depends on the state and the scope, so we quote it properly rather than guessing — a short call is usually enough to give you a firm number. The first 15-minute consultation is free.`,
    followUps: ["Book a consultation", "What does a portal cost?"],
  },
  {
    keywords: ["consultation", "book", "meeting", "call", "appointment", "demo", "schedule", "talk to"],
    answer:
      `You can book straight into the calendar — the first 15-minute call is free, and there is a longer strategic session if you want a deeper review. Would you like me to pass your details to the team as well so they can prepare?`,
    followUps: ["Open the booking calendar", "Yes, take my details"],
  },
  {
    keywords: ["contact", "email", "phone", "reach", "address", "office", "where are you", "location"],
    answer:
      `You can reach us at ${COMPANY.email} or ${COMPANY.phone}. The office is at ${COMPANY.address}, and we are open Monday to Friday, 9:00 to 17:00.`,
    followUps: ["Book a consultation", "Yes, take my details"],
  },
  {
    keywords: ["hours", "open", "when are you", "availability"],
    answer: `We are open Monday to Friday, 9:00 to 17:00, and closed at weekends. Messages left outside those hours are answered the next working day.`,
    followUps: ["Book a consultation"],
  },
  {
    keywords: ["who are you", "about", "company", "experience", "founded", "how long have you"],
    answer:
      `${COMPANY.name} has been running since ${COMPANY.foundingYear}, working with business owners worldwide. We sit between two things most firms separate: the operational and legal side of getting a company running, and the software that runs it day to day.`,
    followUps: ["What services do you offer?", "Book a consultation"],
  },
  {
    keywords: ["service", "what do you do", "offer", "help with", "provide"],
    answer:
      `Four main areas: business formation and compliance, business consulting, business plan development, and the digital side — custom ${PORTAL.tagline.toLowerCase().includes("portal") ? "portals" : "portals"} and websites built around your operation.`,
    followUps: ["Tell me about portals", "Tell me about formation", "What does it cost?"],
  },
];

/** Opening message and the chips shown before the visitor types anything. */
export const GREETING = {
  message: `Hi — I can answer questions about ${COMPANY.name}: forming a company, our portals and websites, pricing, or timelines. What would you like to know?`,
  chips: ["What services do you offer?", "Tell me about portals", "What does it cost?", "Which state should I choose?"],
};

/** Used when nothing matches well enough to answer honestly. */
export const FALLBACK =
  `I'm not sure about that one — I only know what's on this site. I can pass the question to the team and they'll come back to you directly. Shall I take your details?`;
