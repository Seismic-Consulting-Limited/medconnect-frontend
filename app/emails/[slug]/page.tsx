import { render } from "@react-email/render";
import WelcomeEmail from "@/react-email-starter/emails/WelcomeEmail";
import OtpEmail from "@/react-email-starter/emails/Otp";
import ActivateAccountEmail from "@/react-email-starter/emails/ActivateAccountEmail";

type EmailPageProps = {
  params: { slug: string };
};

export default async function EmailPage({ params }: EmailPageProps) {
  const { slug } = params;

  const html = await render(
    <ActivateAccountEmail
      userName="Muctar"
      role="doctor"
      hospitalName="Multicare Hospital"
      tempPassword="Ad65termv-275"
      ctaUrl="https://medkonnect.com/activate"
    />
  );

  return (
    <div
      dangerouslySetInnerHTML={{ __html: html }}
      style={{
        maxWidth: "600px",
        margin: "40px auto",
        border: "1px solid #e5e5e5",
        borderRadius: "10px",
        overflow: "hidden",
        boxShadow: "0 2px 10px rgba(0,0,0,0.05)",
      }}
    />
  );
}
