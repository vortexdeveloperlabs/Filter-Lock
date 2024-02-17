// TODO: Document all the keys/properties/enum members with JSDoc according to how it is described in Dispenser Locking’s Tokens.md
declare module "PrivateTokenTypes" {
  export interface PrivateToken {
    hmacHashed_networkFingeprint: string;
    bfEnc_hmacHashed_browserFingeprint: string;
    creationDate: Date;
    expiryDate: Date;
    snowflakeID: string;
    nonce: string;
  }

  export interface NetworkVerifyPassthroughData {
    ua: string /** The user's User Agent */;
    clientHints: object; // An array containing the Client Hints headers and keys. All the keys must lowercased beforehand for consistency. If the UA's
    ipAddr: string; // An IPV4 or IPV6 address
    tlsFingerprint: string; // A JA3 fingerprint - See https://github.com/salesforce/ja3#how-it-works. If this is an empty string, it will deny unless HTTP is being used.
  }

  export enum TokenValidityStatus {
    PASS, // Anything member other than this is a failure
    EXPIRED,
    NETWORK_FINGERPRINT_MISMATCH,
  }
  export enum TokenViolations {
    NETWORK_FINGERPRINT_MISMATCH_UA,
    NETWORK_FINGERPRINT_MISMATCH_CLIENT_HINTS,
    NETWORK_FINGERPRINT_MISMATCH_IP_ADDRESS,
    NETWORK_FINGERPRINT_MISMATCH_TLS_FINGERPRINT,
  }

  export interface NetworkVerifyRet {
    status: TokenValidityStatus;
    // Only present in a failure and if there are multiple types of violations for that failure type
    violations: TokenViolations[];
  }
}

declare module "OneTimeTokenTypes" {}
