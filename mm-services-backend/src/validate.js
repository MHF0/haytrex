// Must match the <option> text in the website's forms.
export const SERVICES = ["General Handyman", "Plumbing", "Electrical", "Landscaping", "Multiple / Not sure"];
export const POSITIONS = [
  "Handyman Technician",
  "Plumbing Technician",
  "Electrical Technician",
  "Landscaping Crew",
  "Administration / Office",
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function text(body, key, max) {
  const v = typeof body[key] === "string" ? body[key].trim() : "";
  return v.slice(0, max);
}

function contactFields(body, errors) {
  const name = text(body, "name", 100);
  const phone = text(body, "phone", 30);
  const email = text(body, "email", 200);
  if (name.length < 2) errors.name = "Please enter your name.";
  if (phone.replace(/\D/g, "").length < 7) errors.phone = "Please enter a phone number we can reach you on.";
  if (!EMAIL_RE.test(email)) errors.email = "Please enter a valid email address.";
  return { name, phone, email };
}

export function validateQuote(body = {}) {
  const errors = {};
  const value = contactFields(body, errors);
  value.service = text(body, "service", 50);
  value.message = text(body, "message", 3000);
  if (!SERVICES.includes(value.service)) errors.service = "Please choose a service.";
  if (value.message.length < 5) errors.message = "Please tell us a little about the job.";
  return { value, errors };
}

export function validateApplication(body = {}) {
  const errors = {};
  const value = contactFields(body, errors);
  value.position = text(body, "position", 50);
  value.message = text(body, "message", 3000);
  if (!POSITIONS.includes(value.position)) errors.position = "Please choose a position.";
  return { value, errors };
}

// A hidden field real visitors never see; bots that fill every input trip it.
export function isSpam(body = {}) {
  return typeof body.website === "string" && body.website.trim() !== "";
}
