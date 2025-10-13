import * as React from "react";
import { Text, Section, Button, Container } from "@react-email/components";
import EmailLayout from "./layouts/EmailLayout";

type UserRole = "doctor" | "consultant" | "client" | "hospital";

type ActivateAccountEmailProps = {
  userName: string;
  role?: UserRole;
  hospitalName?: string;
  tempPassword: string;
  ctaUrl: string;
};

const ActivateAccountEmail: React.FC<ActivateAccountEmailProps> = ({
  userName,
  role,
  hospitalName = "Multicare Hospital",
  tempPassword,
  ctaUrl,
}) => {
  // Role-specific display name
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
      preview={`Activate your MedKonnect account`}
      title="Activate Your MedKonnect Account"
      userName={displayName}
      role={role}
    >
      <Section style={styles.section}>
        <Text style={styles.intro}>
          You’ve been added to <b>{hospitalName}</b> on{" "}
          <b>MedKonnect</b>, our secure healthcare platform that connects
          patients worldwide with Nigerian hospitals and doctors.
        </Text>

        <Text style={styles.body}>
          To get started, you’ll need to set up your account.
        </Text>

        <Text style={styles.subheading}>Next Step</Text>

        <ul style={styles.list}>
            <li>Click the button below to access your account.</li>
            <li>Use the temporary password sent with this invite.</li>
            <li>You’ll be prompted to create a new password on your first login.</li>
        </ul>

        <Section style={styles.passwordBox}>
            <Text style={styles.passwordLabel}>Password</Text>
            <Text style={styles.passwordText}>{tempPassword}</Text>
        </Section>

        <div style={{ textAlign: "center", marginTop: "22px" }}>
          <Button href={ctaUrl} style={styles.button}>
            Activate My Account
          </Button>
        </div>
      </Section>
    </EmailLayout>
  );
};

export default ActivateAccountEmail;

// --- Styles ---
const styles = {
  section: {
    marginTop: "20px",
    textAlign: "left" as const,
  },
  intro: {
    fontSize: "15px",
    color: "#333",
    lineHeight: "22px",
    marginBottom: "12px",
  },
  body: {
    fontSize: "14px",
    color: "#555",
    lineHeight: "22px",
    marginBottom: "12px",
  },
  subheading: {
    fontSize: "15px",
    fontWeight: "600",
    color: "#222",
    marginTop: "16px",
  },
  button: {
    backgroundColor: "#7E22CE",
    color: "#fff",
    padding: "12px 20px",
    borderRadius: "6px",
    textDecoration: "none",
    fontWeight: "600",
    fontSize: "15px",
    display: "inline-block",
    width: '100%'
  },
  passwordLabel: {
    marginTop: "22px",
    fontSize: "10px",
    color: "#C0C0C0",
    fontWeight: "600",
  },
    passwordBox: {
        backgroundColor: "#EDEDED",
        color: "#7E22CE",
        fontWeight: "700",
        fontSize: "16px",
        padding: "10px 18px",
        borderRadius: "20px",
        marginTop: "8px",
        letterSpacing: "1px",
        textAlign: "center" as const, // ✅ Type-safe
    },

  passwordText: {
    color: "#9946E1",
  },
list: {
  margin: "8px 0 16px 22px",
  padding: "0",
  color: "#555",
  fontSize: "14px",
  lineHeight: "22px",
  listStyleType: "disc", // ✅ dotted bullets
},


};
