import {NextResponse} from "next/server";

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

    // In a real app, you'd send the email here
    // Example with Nodemailer (commented out):
    /*
    const transporter = nodemailer.createTransport({
      host: "smtp.example.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transporter.sendMail({
      from: email,
      to: "younesouterbah1@gmail.com",
      subject: `GitMate Contact: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      html: `<p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p>${message}</p>`
    });
    */

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
