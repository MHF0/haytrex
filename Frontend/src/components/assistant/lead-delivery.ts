import { COMPANY, LEADS } from "@/lib/constants";
import { sendEnquiry, type Delivery } from "@/lib/enquiry";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  /** The conversation that led here, oldest first. */
  transcript: { role: "bot" | "user"; text: string }[];
}

/**
 * Sends a captured lead to the address in LEADS.recipient, with the
 * conversation attached so the reply can pick up where the assistant left off.
 */
export async function deliverLead(lead: Lead): Promise<Delivery> {
  const conversation = lead.transcript
    .map((line) => `${line.role === "user" ? "Visitor" : "Assistant"}: ${line.text}`)
    .join("\n");

  return sendEnquiry({
    recipient: LEADS.recipient,
    subject: `Website enquiry — ${lead.name}`,
    fields: [
      ["Name", lead.name],
      ["Email", lead.email],
      ["Phone", lead.phone],
    ],
    appendix: [
      `Captured by the ${COMPANY.name} website assistant.`,
      "",
      "Conversation",
      "------------",
      conversation,
    ].join("\n"),
  });
}
