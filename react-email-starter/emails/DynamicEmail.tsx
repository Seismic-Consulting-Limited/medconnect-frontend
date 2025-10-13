import * as React from "react";
import { Section, Text, Heading, Button } from "@react-email/components";
import EmailLayout from "./layouts/EmailLayout";

type DynamicEmailProps = {
  userName: string;
  message: string;
  ctaText?: string;
  ctaUrl?: string;
};

const DynamicEmail: React.FC<DynamicEmailProps> = ({
  userName,
  message,
  ctaText = "View Details",
  ctaUrl = "https://triphive.com",
}) => {
  return (
    <EmailLayout preview={`Message for ${userName}`} title="TripHive Notification">
      <Heading style={styles.heading}>Hello {userName} 👋</Heading>
      <Text style={styles.text}>{message}</Text>

      <Section style={{ textAlign: "center", marginTop: "24px" }}>
        <Button href={ctaUrl} style={styles.button}>
          {ctaText}
        </Button>
      </Section>
    </EmailLayout>
  );
};

export default DynamicEmail;

const styles = {
  heading: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#222",
    marginBottom: "12px",
  },
  text: {
    fontSize: "15px",
    color: "#555",
    lineHeight: "22px",
  },
  button: {
    backgroundColor: "#7E22CE",
    color: "#ffffff",
    padding: "12px 24px",
    borderRadius: "8px",
    textDecoration: "none",
    fontSize: "16px",
    fontWeight: "600",
    width: '100%'
  },
};
