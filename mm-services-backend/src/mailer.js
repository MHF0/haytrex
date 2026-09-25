import nodemailer from "nodemailer";

export function createMailer(config, log = console) {
  if (!config.smtp || !config.notifyEmail) {
    log.warn("Email notifications are off: set SMTP_HOST and NOTIFY_EMAIL to enable them.");
    return { async notify() {} };
  }

  const { from, ...transportOptions } = config.smtp;
  const transport = nodemailer.createTransport(transportOptions);

  return {
    // Never throws: a submission is already saved, so a mail outage must not fail the request.
    async notify({ subject, text, replyTo }) {
      try {
        await transport.sendMail({ from, to: config.notifyEmail, replyTo, subject, text });
      } catch (err) {
        log.error(`Notification email failed: ${err.message}`);
      }
    },
  };
}
