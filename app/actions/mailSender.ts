"use server";
import { Resend } from "resend";

const resend = new Resend(process.env.SEND_API_KEY);

const sendEmail = async (to: string, subject: string, html: string) => {
  try {
    const response = await resend.emails.send({
      from: "StartupSL <onboarding@resend.dev>",
      to: "keitamorie@gmail.com",
      subject,
      html,
    });
    return response;
  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Failed to send email");
  }
};

export async function sendResourceUploadNotification(
  email: string,
  resourceTitle: string
) {
  const subject = `New Resource Uploaded: ${resourceTitle}`;

  const html = `
    <h1>New Resource Uploaded</h1>
    <p>A new resource titled "<strong>${resourceTitle}</strong>" has been uploaded.</p>
    <p>Thank you for using our service!</p>
  `;

  return sendEmail("lanskabba2@gmail.com", subject, html);
}
