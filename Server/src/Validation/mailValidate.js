import https from "https";
import { fileURLToPath } from "url";

function fetchJson(url, timeoutMs = 10000) {
  return new Promise((resolve) => {
    const req = https.get(
      url,
      { timeout: timeoutMs },
      (res) => {
        let raw = "";

        res.on("data", (chunk) => {
          raw += chunk;
        });

        res.on("end", () => {
          try {
            resolve(JSON.parse(raw));
          } catch {
            resolve(null);
          }
        });
      }
    );

    req.on("error", () => resolve(null));

    req.on("timeout", () => {
      req.destroy();
      resolve(null);
    });
  });
}

function parseEmail(email) {
  if (typeof email !== "string") return null;

  const trimmed = email.trim().toLowerCase();
  const atIdx = trimmed.lastIndexOf("@");

  if (atIdx < 1) return null;

  const local = trimmed.slice(0, atIdx);
  const domain = trimmed.slice(atIdx + 1);

  if (!/^[^\s@]+$/.test(local)) return null;

  if (
    !/^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/.test(
      domain
    )
  ) {
    return null;
  }

  return { local, domain };
}

// Known providers that block SMTP probing but are always valid
const TRUSTED_DOMAINS = new Set([
  "gmail.com",
  "yahoo.com",
  "yahoo.in",
  "outlook.com",
  "hotmail.com",
  "live.com",
  "icloud.com",
  "me.com",
  "protonmail.com",
  "proton.me",
  "@jgec.ac.in",
  "@ce.jgec.ac.in",
  "@ee.jgec.ac.in",
  "@me.jgec.ac.in",
  "@cse.jgec.ac.in",
  "@ece.jgec.ac.in",
  "@it.jgec.ac.in"
]);

// Verify email using AbstractAPI's Email Reputation endpoint
async function verifyWithAbstractAPI(email) {
  const apiKey = process.env.ABSTRACT_API_KEY;

  if (!apiKey) {
    return {
      valid: false,
      reason: "ABSTRACT_API_KEY is missing in environment variables.",
    };
  }

  // ✅ Skip SMTP probing for trusted providers — they always block it
  const domain = email.split("@")[1]?.toLowerCase();
  if (TRUSTED_DOMAINS.has(domain)) {
    return {
      valid: true,
      freeEmail: true,
      domain,
      meta: { skipped: "trusted_domain" },
    };
  }

  const url =
    `https://emailreputation.abstractapi.com/v1/` +
    `?api_key=${apiKey}` +
    `&email=${encodeURIComponent(email)}`;

  const data = await fetchJson(url);

  if (!data) {
    return {
      valid: false,
      reason: "Unable to verify email address at this time. Please try again.",
    };
  }

  if (data.error) {
    return {
      valid: false,
      reason: data.error.message || "Email verification failed.",
    };
  }

  if (data.is_mx_found === false) {
    return {
      valid: false,
      reason: "This domain cannot receive emails.",
    };
  }

  // ⚠️ Only block on SMTP if AbstractAPI is confident (not just unverified)
  if (data.is_smtp_valid === false && data.is_mx_found === true) {
    return {
      valid: false,
      reason: "This email address does not exist or cannot receive emails.",
    };
  }

  if (data.is_disposable_email === true) {
    return {
      valid: false,
      reason: "Disposable email addresses are not allowed.",
    };
  }

  // ✅ Only hard-block on "undeliverable", not "unknown" or "risky"
  if (
    data.email_deliverability?.status === "UNDELIVERABLE"
  ) {
    return {
      valid: false,
      reason: "This email address does not exist.",
    };
  }

  return {
    valid: true,
    freeEmail: data.is_free_email === true,
    domain,
    meta: data,
  };
}

// Main validation function
async function validateEmailDomain(
  email,
  options = {}
) {
  const { blockFreeEmail = false } = options;

  /**
   * Step 1: Basic format check
   */
  const parsed = parseEmail(email);

  if (!parsed) {
    return {
      valid: false,
      reason: "Invalid email format.",
    };
  }

  /**
   * Step 2: Abstract API — handles MX, SMTP,
   *         disposable, and deliverability
   */
  const result = await verifyWithAbstractAPI(email);

  if (!result.valid) {
    return result;
  }

  /**
   * Step 3: Optional free email blocking
   */
  if (blockFreeEmail && result.freeEmail === true) {
    return {
      valid: false,
      reason:
        "Free email providers are not allowed.",
    };
  }

  return result;
}

export { validateEmailDomain };

// Allow running this file directly for quick testing
const __filename = fileURLToPath(import.meta.url);

if (process.argv[1] === __filename) {
  const email = process.argv[2];

  if (!email) {
    console.error(
      "Usage: node mailValidate.js <email>"
    );
    process.exit(1);
  }

  validateEmailDomain(email, {
    blockFreeEmail: false,
  })
    .then((result) => {
      console.log(result);
      process.exit(result.valid ? 0 : 1);
    })
    .catch((err) => {
      console.error("Error:", err);
      process.exit(2);
    });
}