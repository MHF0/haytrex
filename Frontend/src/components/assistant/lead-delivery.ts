import { COMPANY, LEADS } from "@/lib/constants";

export interface Lead {
  name: string;
  email: string;
  phone: string;
  /** The conversation that led here, oldest first. */
  transcript: { role: "bot" | "user"; text: string }[];
}

/** Formats the lead and its conversation as plain text for the email body. */
function composeBody(lead: Lead) {
  const conversation = lead.transcript
    .map((line) => `${line.role === "user" ? "Visitor" : "Assistant"}: ${line.text}`)
    .join("\n");

  return [
    `New enquiry from the ${COMPANY.name} website assistant.`,
    "",
    `Name:  ${lead.name}`,
    `Email: ${lead.email}`,
    `Phone: ${lead.phone}`,
    "",
    "Conversation",
    "------------",
    conversation,
  ].join("\n");
}

/** Opens a pre-filled draft in the visitor's mail client. */
function openMailDraft(lead: Lead) {
  const subject = `Website enquiry — ${lead.name}`;
  window.location.href =
    `mailto:${LEADS.recipient}` +
    `?subject=${encodeURIComponent(subject)}` +
    `&body=${encodeURIComponent(composeBody(lead))}`;
}

/**
 * Sends a captured lead to the configured recipient.
 *
 * Posts to the configured endpoint so the visitor never has to send anything
 * themselves. If that is not configured, or the request fails, it falls back
 * to opening a pre-filled mail draft rather than silently losing the enquiry.
 *
 * Returns how the lead was delivered, so the assistant can tell the visitor
 * the truth about what just happened.
 */
export async function deliverLead(lead: Lead): Promise<"sent" | "draft"> {
  if (!LEADS.endpoint) {
    openMailDraft(lead);
    return "draft";
  }

  try {
    const response = await fetch(LEADS.endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        _subject: `Website enquiry — ${lead.name}`,
        name: lead.name,
        email: lead.email,
        phone: lead.phone,
        message: composeBody(lead),
      }),
    });

    if (!response.ok) throw new Error(`Lead endpoint returned ${response.status}`);
    return "sent";
  } catch {
    openMailDraft(lead);
    return "draft";
  }
}
