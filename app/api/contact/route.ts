import {NextResponse} from "next/server";
import nodemailer from "nodemailer";

// In a real app, you'd use Nodemailer or a service like SendGrid
// For demo purposes, we'll just log the data
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const {name, email, subject, message} = body;

    // Validate the request
    if (!name || !email || !subject || !message) {
      return NextResponse.json({error: "Missing required fields"}, {status: 400});
    }

    console.log("Contact form submission:", {
      to: "younesouterbah1@gmail.com",
      from: email,
      name,
      subject,
      message
    });

    // Create a test transporter using Gmail SMTP
    // For production, use an actual email service API or secure SMTP server
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "younesouterbah1@gmail.com", // Use your email
        pass: "Enter your app password here" // You'll need to create an app password for Gmail
      }
    });

    // Send the email
    try {
      await transporter.sendMail({
        from: `"GitMate Contact Form" <younesouterbah1@gmail.com>`,
        to: "younesouterbah1@gmail.com",
        replyTo: email,
        subject: `GitMate Contact: ${subject}`,
        text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
        html: `
          <h2>New Contact Form Submission</h2>
          <p><strong>From:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <div style="margin-top: 20px; padding: 15px; border-left: 4px solid #ccc;">
            ${message.replace(/\n/g, "<br>")}
          </div>
        `
      });

      console.log("Email sent successfully!");
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      // We'll still return success to the user but log the email failure
    }

    return NextResponse.json({
      success: true,
      message: "Message received! We'll get back to you soon."
    });
  } catch (error) {
    console.error("Error handling contact form submission:", error);
    return NextResponse.json(
      {
        error: "Failed to send message. Please try again later."
      },
      {status: 500}
    );
  }
}
