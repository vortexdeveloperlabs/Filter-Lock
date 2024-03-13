/**
 * TODO: Finish
 * @param length - The lowest possible length for a nonce
 * @param excludeChars - This would be the delimiter
 * @returns - A string-compatible nonce with the length as specified in a range
 */
function genNonceForCookiesWithLenInRandRange(
  min: number,
  max: number,
  excludeChars = ""
): string {}

/**
 * TODO: Finish
 * @param length - How long the nonce is
 * @param excludeChars - This would be the delimiter
 * @returns - A cookie-compatible nonce
 */
function genNonceForCookies(length: number, excludeChars = ""): string {
  const excludeSet = new Set(excludeChars);

  // Allowed characters for cookie names excluding control and separator characters
  const allowedChars =
    "!#$%&'*+-.0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ^_`abcdefghijklmnopqrstuvwxyz|~";

  // Pre-encode allowed characters for faster lookup
  const allowedCharsEncoded = new TextEncoder().encode(allowedChars);

  // Calculate total bytes needed with 2 bytes per character
  const lengthInBytes = length * 2;

  const randomBytes = new Uint8Array(lengthInBytes);
  window.crypto.getRandomValues(randomBytes);

  const charCodes = new Uint8Array(length);

  // Mask for efficient char index selection within the allowed range
  const mask = allowedCharsEncoded.length - 1;

  // Loop through desired length, processing two characters at once for efficiency
  for (let i = 0; i < length; i += 2) {
    // Select two byte indices using bitmasking
    const index1 = randomBytes[i * 2] & mask;
    const index2 = randomBytes[i * 2 + 1] & mask;

    // Look up character codes using pre-encoded characters and store directly in result array
    charCodes[i] = allowedCharsEncoded[index1];
    charCodes[i + 1] = allowedCharsEncoded[index2];
  }

  // Decode all the charCodes at once
  return new TextDecoder().decode(charCodes);
}

export { genNonce, genNonceInRandRange, genNonceForCookies };
