import * as React from "react";
import { Text, Section } from "@react-email/components";
import EmailLayout from "./layouts/EmailLayout";

type UserRole = "doctor" | "consultant" | "client" | "hospital";

type OtpEmailProps = {
  userName: string;
  role?: UserRole;
  otpCode: string;
  expiryMinutes?: number;
};

const OtpEmail: React.FC<OtpEmailProps> = ({
  userName,
  role,
  otpCode,
  expiryMinutes = 10,
}) => {
  // Role-specific greeting prefix
  const displayName =
    role === "doctor"
      ? `${userName}`
      : role === "consultant"
      ? `Consultant ${userName}`
      : role === "hospital"
      ? `${userName} Hospital`
      : userName;

  return (
    <EmailLayout
      preview={`Your MedKonnect OTP Code`}
      title="MedKonnect OTP Verification"
      userName={displayName}
      role={role}
    >
      <Section style={styles.section}>
        <Text style={styles.intro}>
          Hi {displayName}, here’s your One-Time Password (OTP):
        </Text>

        <Text style={styles.otp}>{otpCode}</Text>

        <Text style={styles.body}>
          Please enter this code to verify your account. It will expire in{" "}
          {expiryMinutes} minutes for your security.
        </Text>

        <Text style={styles.note}>
          If you didn’t request this code, you can safely ignore this message.
        </Text>
      </Section>
    </EmailLayout>
  );
};

export default OtpEmail;

// --- Styles ---
const styles = {
  section: {
    textAlign: "center" as const,
    marginTop: "20px",
  },
  intro: {
    fontSize: "15px",
    color: "#333",
    marginBottom: "16px",
  },
  otp: {
    fontSize: "32px",
    fontWeight: "bold",
    color: "#7E22CE",
    letterSpacing: "6px",
    backgroundColor: "#EDEDED",
    display: "inline-block",
    padding: "12px 28px",
    borderRadius: "8px",
    borderWidth: '0.5px',
    borderColor: '#C0C0C0',
    marginBottom: "20px",
  },
  body: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "22px",
    marginTop: "8px",
  },
  note: {
    fontSize: "13px",
    color: "#888",
    marginTop: "16px",
    fontStyle: "italic",
  },
};
