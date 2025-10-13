#!/usr/bin/env tsx
import { render } from "@react-email/render";
import * as fs from "fs";
import ActivateAccountEmail from "../emails/ActivateAccountEmail";

async function main() {
  const html = await render(
    <ActivateAccountEmail
      userName="Muctar"
      role="doctor"
      hospitalName="Multicare Hospital"
      tempPassword="Ad65termv-275"
      ctaUrl="https://medkonnect.com/activate"
    />
  );

  fs.writeFileSync("activate_account.html", html);
  console.log("✅ Email exported to activate_account.html");
}

main();
