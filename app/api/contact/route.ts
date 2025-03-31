import {NextResponse} from "next/server";
import {EmailJSResponseStatus} from "@emailjs/browser";
import emailjs from "@emailjs/nodejs";

// Configure EmailJS with your service ID, template ID, and user ID
// You can get these from your EmailJS dashboard
const serviceId = "service_youremail"; // Replace with your service ID
const templateId = "template_contact"; // Replace with your template ID
const userId = "YOUR_USER_ID"; // Replace with your user ID

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

    try {
      // Send email using EmailJS
      const response = await emailjs.send(
        serviceId,
        templateId,
        {
          from_name: name,
          from_email: email,
          subject: subject,
          message: message,
          to_email: "younesouterbah1@gmail.com",
          reply_to: email
        },
        {
          publicKey: userId,
          privateKey: "" // Add your private key if needed
        }
      );

      console.log("Email sent successfully!", response);

      return NextResponse.json({
        success: true,
        message: "Message received! We'll get back to you soon."
      });
    } catch (emailError) {
      console.error("Failed to send email:", emailError);
      return NextResponse.json(
        {
          error: "Failed to send message. Please try again later."
        },
        {status: 500}
      );
    }
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
