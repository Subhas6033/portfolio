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

// Abstract API email verification
async function verifyWithAbstractAPI(email) {
  const apiKey = process.env.ABSTRACT_API_KEY;

  if (!apiKey) {
    return {
      valid: false,
      reason:
        "ABSTRACT_API_KEY is missing in environment variables.",
    };
  }

  const url =
    `https://emailreputation.abstractapi.com/v1/` +
    `?api_key=${apiKey}` +
    `&email=${encodeURIComponent(email)}`;

  const data = await fetchJson(url);

  /**
   * Network / parse failure — fail closed
   */
  if (!data) {
    return {
      valid: false,
      reason:
        "Unable to verify email address at this time. Please try again.",
    };
  }

  /**
   * API error
   */
  if (data.error) {
    return {
      valid: false,
      reason:
        data.error.message ||
        "Email verification failed.",
    };
  }

  /**
   * MX not found — domain cannot receive emails
   */
  if (data.is_mx_found === false) {
    return {
      valid: false,
      reason: "This domain cannot receive emails.",
    };
  }

  /**
   * SMTP invalid — mailbox does not exist
   */
  if (data.is_smtp_valid === false) {
    return {
      valid: false,
      reason:
        "This email address does not exist or cannot receive emails.",
    };
  }

  /**
   * Disposable email
   */
  if (data.is_disposable_email === true) {
    return {
      valid: false,
      reason:
        "Disposable email addresses are not allowed.",
    };
  }

  /**
   * Deliverability check
   */
  if (
    data.email_deliverability &&
    data.email_deliverability.status !== "DELIVERABLE"
  ) {
    return {
      valid: false,
      reason:
        data.email_deliverability.status === "undeliverable"
          ? "This email address does not exist."
          : "This email address is not deliverable.",
    };
  }

  /**
   * SUCCESS
   */
  return {
    valid: true,
    freeEmail: data.is_free_email === true,
    domain: email.split("@")[1].toLowerCase(),
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

/**
 * ---------------------------------------------------------
 * CLI TESTING
 * ---------------------------------------------------------
 */

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