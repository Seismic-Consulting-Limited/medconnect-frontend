import * as React from "react";
import { Text, Button, Section } from "@react-email/components";
import EmailLayout from "./layouts/EmailLayout";

type UserRole = "doctor" | "consultant" | "client" | "hospital";

type WelcomeEmailProps = {
  userName: string;
  role: UserRole;
  message: string; // 👈 dynamic message
  ctaText: string; // 👈 dynamic button text
  ctaUrl: string;  // 👈 dynamic button link
  specialization?: string;
  field?: string;
};

const WelcomeEmail: React.FC<WelcomeEmailProps> = ({
  userName,
  role,
  message,
  ctaText,
  ctaUrl,
}) => {
  // --- Role-specific intro / titles ---
  const roleContent = {
    doctor: {
      title: "Welcome Doctor",
      preview: "Welcome to MedKonnect, Doctor!",
      intro: `Welcome aboard, Dr. ${userName}! 👋 We're excited to have you join the MedKonnect network where healthcare meets innovation.`,
    },
    consultant: {
      title: "Welcome Consultant",
      preview: "Welcome to MedKonnect, Consultant!",
      intro: `Hello ${userName}, welcome to MedKonnect! 🎉 Collaborate, consult, and connect seamlessly with healthcare professionals across our platform.`,
    },
    client: {
      title: "Welcome Client",
      preview: "Welcome to MedKonnect!",
      intro: `Hi ${userName}, welcome to MedKonnect! 🌿 We're here to help you access trusted healthcare professionals and services easily.`,
    },
    hospital: {
      title: "Welcome Hospital Partner",
      preview: "Welcome to MedKonnect, Hospital Partner!",
      intro: `${userName}, welcome to MedKonnect! 🏥 `,
    },
  };


  const content = roleContent[role] || roleContent.client;

  return (
    <EmailLayout role={role} preview={content.preview} title={content.title} userName={userName}>
      <Section>
        <Text style={styles.intro}>{content.intro}</Text>
        <Text style={styles.body}>{message}</Text>

        <div style={{ textAlign: "center", marginTop: "20px" }}>
          <Button href={ctaUrl} style={styles.button}>
            {ctaText}
          </Button>
        </div>
      </Section>
    </EmailLayout>
  );
};

export default WelcomeEmail;

const styles = {
  intro: {
    fontSize: "16px",
    color: "#333",
    lineHeight: "24px",
    fontWeight: 600,
  },
  body: {
    fontSize: "14px",
    color: "#555",
    marginTop: "12px",
    lineHeight: "22px",
  },
  button: {
    backgroundColor: "#7E22CE",
    color: "#fff",
    padding: "10px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    display: "inline-block",
    fontWeight: 600,
    width: "100%",
  },
};
