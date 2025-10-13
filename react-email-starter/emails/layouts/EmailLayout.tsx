import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Img,
  Link,
} from "@react-email/components";

type UserRole = "doctor" | "consultant" | "client" | "hospital";

type EmailLayoutProps = {
  preview?: string;
  title?: string;
  userName?: string;
  role?: UserRole;
  children: React.ReactNode;
};

const EmailLayout: React.FC<EmailLayoutProps> = ({
  preview,
  userName,
  role,
  children,
}) => {
  // ✅ Personalized title based on role
  const displayName =
    role === "doctor"
      ? `Dr. ${userName}`
      : role === "consultant"
      ? `Consultant ${userName}`
      : role === "hospital"
      ? `${userName}`
      : userName || "Guest";

  return (
    <Html>
      <Head />
      {preview && <title>{preview}</title>}
      <Body style={styles.main}>
        <Container style={styles.outerWrapper}>
          <Container style={styles.container}>
            {/* --- Header --- */}
            <Section style={styles.header}>
              <Text style={styles.headerText}>
                <Img src="/heart-pulse.svg" width="32" height="32" alt="logo" />{" "}
                MedKonnect
              </Text>
            </Section>

            {/* --- Hero Section --- */}
            <Section style={styles.hero}>
              <div style={styles.heroOverlay}>
                <div style={styles.heroContent}>
                  <div style={styles.heroTextBox}>
                    <Text style={styles.helloText}>Hello,</Text>
                    <Text style={styles.userNameText}>{displayName} 👋</Text>
                  </div>
                  <Img
                    src="/hospital-removebg-preview.png"
                    alt="Healthcare Illustration"
                    width="170"
                    height="170"
                    style={styles.heroImg}
                  />
                </div>
              </div>
            </Section>

            {/* --- Content --- */}
            <Section style={styles.content}>{children}</Section>

            {/* --- Footer --- */}
            <Section style={styles.footer}>
              <Text style={styles.footerSmall}>
                If you run into any issues, visit our{" "}
                <Link
                  href="https://help.triphive.com"
                  target="_blank"
                  style={styles.link}
                >
                  Help Center
                </Link>{" "}
                or contact support at{" "}
                <Link href="mailto:support@medkonnect.com" style={styles.link}>
                  support@medkonnect.com
                </Link>
                .
              </Text>
              <Text style={styles.footerText}>
                MedKonnect &copy; {new Date().getFullYear()} | Secure Healthcare
                Connections
              </Text>
            </Section>
          </Container>
        </Container>
      </Body>
    </Html>
  );
};

export default EmailLayout;

const styles = {
  main: {
    backgroundColor: "#f9f9f9",
    fontFamily: "Helvetica, Arial, sans-serif",
  },
  outerWrapper: {
    padding: "0 16px",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px 24px",
    margin: "0 auto",
  },
  header: {
    textAlign: "center" as const,
    marginBottom: "24px",
  },
  headerText: {
    display: "flex" as const,
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    fontWeight: "900",
    fontSize: "25px",
    color: "#7E22CE",
    marginTop: "30px",
  },
  hero: {
    backgroundImage: "url('/f9a39733d4ad9a424269e719e6dfccf4e0a80915.jpg')",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    borderRadius: "10px",
    height: "140px",
    width: "90%",
    margin: "0 auto",
    position: "relative" as const,
    overflow: "hidden",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  heroOverlay: {
    backgroundColor: "rgba(126, 34, 206, 0.6)",
    borderRadius: "10px",
    position: "absolute" as const,
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "0 20px",
  },
  heroContent: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
  heroTextBox: {
    color: "#fff",
  },
  helloText: {
    fontSize: "16px",
    color: "#f2e8ff",
    marginBottom: "5px",
  },
  userNameText: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#fff",
  },
  heroImg: {
    borderRadius: "8px",
  },
  content: {
    textAlign: "left" as const,
    marginTop: "20px",
    width: "90%",
  },
  footer: {
    marginTop: "40px",
    borderTop: "1px solid #eee",
    paddingTop: "20px",
    textAlign: "center" as const,
    width: "90%",
  },
  footerText: {
    fontSize: "13px",
    color: "#777",
  },
  footerSmall: {
    fontSize: "13px",
    color: "#999",
    lineHeight: "18px",
  },
  link: {
    fontSize: "13px",
    color: "#007bff",
    textDecoration: "underline",
  },
};
