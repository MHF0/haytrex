import { LEADS } from "@/lib/constants";

/** How the enquiry actually reached the recipient. */
export type Delivery = "sent" | "draft";

export interface Enquiry {
  recipient: string;
  subject: string;
  /** Ordered label/value pairs laid out as the body of the message. */
  fields: [string, string][];
  /** Optional extra block appended under the fields, e.g. a transcript. */
  appendix?: string;
}

function composeBody({ fields, appendix }: Enquiry) {
  const lines = fields
    .filter(([, value]) => value.trim() !== "")
    .map(([label, value]) => `${label}: ${value}`);

  return appendix ? `${lines.join("\n")}\n\n${appendix}` : lines.join("\n");
}

/** Opens a pre-filled draft in the visitor's own mail client. */
function openMailDraft(enquiry: Enquiry) {
  window.location.href =
    `mailto:${enquiry.recipient}` +
    `?subject=${encodeURIComponent(enquiry.subject)}` +
    `&body=${encodeURIComponent(composeBody(enquiry))}`;
}

/**
 * Delivers an enquiry to the given address.
 *
 * Posts to the configured endpoint so the visitor never has to send anything
 * themselves. If no endpoint is configured, or the request fails, it opens a
 * pre-filled mail draft rather than losing the message — and reports which of
 * the two happened so the caller can tell the visitor the truth.
 */
export async function sendEnquiry(enquiry: Enquiry): Promise<Delivery> {
  const endpoint = LEADS.endpointTemplate
    ? LEADS.endpointTemplate.replace("{recipient}", enquiry.recipient)
    : "";

  if (!endpoint) {
    openMailDraft(enquiry);
    return "draft";
  }

  const payload: Record<string, string> = { _subject: enquiry.subject };
  for (const [label, value] of enquiry.fields) {
    if (value.trim() !== "") payload[label] = value;
  }
  payload.message = composeBody(enquiry);

  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(payload),
    });

    if (!response.ok) throw new Error(`Enquiry endpoint returned ${response.status}`);
    return "sent";
  } catch {
    openMailDraft(enquiry);
    return "draft";
  }
}
