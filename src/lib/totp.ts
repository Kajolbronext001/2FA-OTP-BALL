/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import * as OTPAuth from "otpauth";

/**
 * Generates a TOTP code from a secret key.
 * Supports standard Base32 keys.
 */
export function generateTOTP(secret: string): string | null {
  try {
    // Basic cleanup of the secret string
    const cleanSecret = secret.replace(/\s+/g, "").toUpperCase();
    
    // Create TOTP object
    const totp = new OTPAuth.TOTP({
      issuer: "Floating2FA",
      label: "User",
      algorithm: "SHA1",
      digits: 6,
      period: 30,
      secret: cleanSecret,
    });

    return totp.generate();
  } catch (error) {
    console.error("TOTP Generation Error:", error);
    return null;
  }
}

/**
 * Extracts a potential 2FA secret from text.
 * Usually 16, 32 or more character Base32 string.
 */
export function extractSecret(text: string): string | null {
  // Common 2FA secret pattern: uppercase letters and digits 2-7
  const pattern = /[A-Z2-7]{16,}/i;
  const match = text.match(pattern);
  return match ? match[0] : null;
}
