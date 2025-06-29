
import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { Resend } from "npm:resend@2.0.0";

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailVerificationRequest {
  email: string;
  confirmationUrl: string;
  fullName?: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, confirmationUrl, fullName }: EmailVerificationRequest = await req.json();

    const emailResponse = await resend.emails.send({
      from: "EDU ZAMBIA <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to EDU ZAMBIA - Verify Your Email",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="text-align: center; margin-bottom: 30px;">
            <h1 style="color: #2563eb; font-size: 28px; margin-bottom: 10px;">🎓 EDU ZAMBIA</h1>
            <h2 style="color: #374151; font-size: 24px; margin-bottom: 20px;">Welcome ${fullName || 'Student'}!</h2>
          </div>
          
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; border-radius: 12px; color: white; text-align: center; margin-bottom: 30px;">
            <h3 style="margin: 0 0 15px 0; font-size: 20px;">Your Learning Journey Starts Here!</h3>
            <p style="margin: 0; font-size: 16px; opacity: 0.9;">Join thousands of students across Zambia in revolutionizing education with AI-powered learning.</p>
          </div>
          
          <div style="background: #f8fafc; padding: 25px; border-radius: 8px; margin-bottom: 25px;">
            <p style="color: #374151; font-size: 16px; line-height: 1.6; margin: 0 0 20px 0;">
              To get started with your EDU ZAMBIA account and access our AI-powered learning platform, please verify your email address by clicking the button below:
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${confirmationUrl}" 
                 style="background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%); 
                        color: white; 
                        padding: 15px 35px; 
                        text-decoration: none; 
                        border-radius: 8px; 
                        font-weight: bold; 
                        font-size: 16px; 
                        display: inline-block;
                        box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);">
                ✅ Verify Email Address
              </a>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; text-align: center; margin: 20px 0 0 0;">
              Or copy and paste this link in your browser:<br>
              <a href="${confirmationUrl}" style="color: #2563eb; word-break: break-all;">${confirmationUrl}</a>
            </p>
          </div>
          
          <div style="border-left: 4px solid #10b981; padding: 20px; background: #f0fdf4; margin-bottom: 25px;">
            <h4 style="color: #065f46; margin: 0 0 10px 0; font-size: 16px;">🚀 What's waiting for you:</h4>
            <ul style="color: #374151; margin: 0; padding-left: 20px;">
              <li>AI-powered personalized learning plans</li>
              <li>Interactive homework help and tutoring</li>
              <li>Study groups and collaboration tools</li>
              <li>YouTube learning hub with curated content</li>
              <li>Real-time progress tracking and analytics</li>
              <li>Multi-AI tutor support (OpenAI, Claude, DeepSeek)</li>
              <li>Automated flashcard generation</li>
              <li>Smart learning recommendations</li>
            </ul>
          </div>
          
          <div style="background: #fef3c7; border: 1px solid #f59e0b; padding: 15px; border-radius: 6px; margin-bottom: 25px;">
            <p style="color: #92400e; margin: 0; font-size: 14px;">
              <strong>⚠️ Important:</strong> This verification link will expire in 24 hours. If you didn't create an account with EDU ZAMBIA, please ignore this email.
            </p>
          </div>
          
          <div style="text-align: center; padding: 20px 0; border-top: 1px solid #e5e7eb;">
            <p style="color: #6b7280; font-size: 14px; margin: 0 0 10px 0;">
              Need help? Contact our support team at 
              <a href="mailto:support@eduzambia.com" style="color: #2563eb;">support@eduzambia.com</a>
            </p>
            <p style="color: #9ca3af; font-size: 12px; margin: 0;">
              © 2025 EDU ZAMBIA. Revolutionizing education across Zambia with AI.
            </p>
          </div>
        </div>
      `,
    });

    console.log("Email verification sent successfully:", emailResponse);

    return new Response(JSON.stringify(emailResponse), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error sending email verification:", error);
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
