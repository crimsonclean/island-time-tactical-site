import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface ContactEmailRequest {
  name: string;
  email: string;
  phone?: string;
  message: string;
  productName?: string;
  type: "contact" | "inquiry";
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { name, email, phone, message, productName, type }: ContactEmailRequest = await req.json();

    console.log("Received email request:", { name, email, type, productName });

    const businessEmail = "paul@islandtimetactical.com";
    
    // Email to business owner
    const subject = type === "inquiry" 
      ? `Product Inquiry: ${productName}`
      : "New Contact Form Submission - Island Time Tactical";

    const businessEmailHtml = type === "inquiry"
      ? `
        <h2>New Product Inquiry</h2>
        <p><strong>Product:</strong> ${productName}</p>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Island Time Tactical website contact form.
        </p>
      `
      : `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        ${phone ? `<p><strong>Phone:</strong> ${phone}</p>` : ''}
        <p><strong>Message:</strong></p>
        <p>${message}</p>
        <hr />
        <p style="color: #666; font-size: 12px;">
          This email was sent from the Island Time Tactical website contact form.
        </p>
      `;

    const businessEmailResponse = await resend.emails.send({
      from: "Island Time Tactical <onboarding@resend.dev>",
      to: [businessEmail],
      subject: subject,
      html: businessEmailHtml,
      replyTo: email,
    });

    console.log("Business email sent successfully:", businessEmailResponse);

    // Confirmation email to customer
    const customerEmailHtml = type === "inquiry"
      ? `
        <h1>Thank you for your inquiry, ${name}!</h1>
        <p>We received your inquiry about <strong>${productName}</strong>.</p>
        <p>We'll review your message and get back to you as soon as possible.</p>
        <p>If you need immediate assistance, please call us at <strong>(713) 553-7419</strong>.</p>
        <p>Best regards,<br>Island Time Tactical Team</p>
      `
      : `
        <h1>Thank you for contacting us, ${name}!</h1>
        <p>We have received your message and will get back to you as soon as possible.</p>
        <p>If you need immediate assistance, please call us at <strong>(713) 553-7419</strong>.</p>
        <p>Best regards,<br>Island Time Tactical Team</p>
      `;

    const customerEmailResponse = await resend.emails.send({
      from: "Island Time Tactical <onboarding@resend.dev>",
      to: [email],
      subject: "We received your message - Island Time Tactical",
      html: customerEmailHtml,
    });

    console.log("Customer confirmation email sent successfully:", customerEmailResponse);

    return new Response(
      JSON.stringify({ 
        success: true,
        businessEmailId: businessEmailResponse.data?.id,
        customerEmailId: customerEmailResponse.data?.id
      }), 
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in send-contact-email function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);
