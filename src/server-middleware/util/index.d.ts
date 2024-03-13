// These types are probably all wrong IDK I will look back at them later

declare module "UserTokenTypes" {
	export interface Token {
		/**
		 * The user's Discord snowflake ID.
		 */
		snowflakeID: string;

		/**
		 * Date and time the token was created.
		 */
		creationDate: Date;

		/**
		 * Date and time the token expires (optional).
		 */
		expiryDate?: Date;

		/**
		 * Optional nonce added for uniqueness and protection against replay attacks.
		 */
		nonce?: string;
	}

	/**
	 * Interface representing data passed for network verification.
	 */
	export interface NetworkPassthroughData {
		fingerMarkJSID: string;

		// TODO: ...
	}

	/**
	 * Enumeration representing the validity status of a token.
	 */
	export enum ValidityStatus {
		/**
		 * Token is valid.
		 */
		PASS,

		/**
		 * Token has expired.
		 */
		EXPIRED,

		/**
		 * Browser fingerprint mismatch detected.
		 */
		BROWSER_FINGEPRINT_MISMATCH,
	}

	/**
	 * Enumeration representing specific network fingerprint mismatch types.
	 */
	export enum MismatchViolations {
		fingerMarkJSID,
		gpu, // This is kinda generic, I will split this into more categories
		extensions,
		ports,
		dns,
	}

	/**
	 * Interface representing the result of browser verification.
	 */
	export interface BrowserVerifyRet {
		/**
		 * Status of the token verification.
		 */
		status: UserTokenValidityStatus;

		/**
		 * Optional array of specific violations detected in case of failure.
		 * Only present if `status` is not `PASS`.
		 */
		violations?: UserTokenMismatchViolations[];
	}

	// TODO: ...
}

declare module "FinalUserTokenTypes" {
	/**
	 * Interface representing a user dispenser locking token.
	 */
	export interface UserToken {
		/**
		 * HMAC hash of the network-identifiable fingerprint, encrypted using the subEncryption key.
		 * This value is used to verify the user's network fingerprint on the server side.
		 */
		hmacHashed_networkFingeprint: string;

		/**
		 * Encrypted value containing the HMAC hash of the browser-identifiable fingerprint,
		 * encrypted with the symmetric encryption key using the unhashed network fingerprint as a key.
		 * This value is used to verify the user's browser fingerprint on the client side.
		 */
		bfEnc_hmacHashed_browserFingeprint: string;

		/**
		 * The user's Discord snowflake ID.
		 */
		snowflakeID: string;

		/**
		 * Date and time the token was created.
		 */
		creationDate: Date;

		/**
		 * Date and time the token expires (optional).
		 */
		expiryDate?: Date;

		/**
		 * Optional nonce added for uniqueness and protection against replay attacks.
		 */
		nonce?: string;
	}

	/**
	 * Interface representing data passed for network verification.
	 */
	export interface NetworkVerifyPassthroughData {
		/**
		 * Object containing HTTP headers used for fingerprinting, all keys in lowercase.
		 */
		headers: {};

		/**
		 * User's IP address (IPv4 or IPv6).
		 */
		ipAddr: string;

		/**
		 * Optional JA3 fingerprint (https://github.com/salesforce/ja3#how-it-works).
		 * Required for HTTPS connections, ignored otherwise.
		 */
		tlsFingerprint?: string;

		/**
		 * Optional Akamai hash required for HTTP2 connections (https://browserleaks.com/http2).
		 */
		akamaiHash?: string;
	}

	/**
	 * Enumeration representing the validity status of a token.
	 */
	export enum UserTokenValidityStatus {
		/**
		 * Token is valid.
		 */
		PASS,

		/**
		 * Token has expired.
		 */
		EXPIRED,

		/**
		 * Network fingerprint mismatch detected.
		 */
		NETWORK_FINGERPRINT_MISMATCH,
	}

	/**
	 * Enumeration representing specific network fingerprint mismatch types.
	 */
	export enum UserTokenMismatchViolations {
		/**
		 * Fingerprintable headers mismatch in network fingerprint.
		 */
		HEADERS,

		/**
		 * IP address mismatch in network fingerprint.
		 */
		IP_ADDRESS,

		/**
		 * JA3 fingerprint mismatch in network fingerprint.
		 */
		NETWORK_FINGERPRINT_MISMATCH_JA3,

		/**
		 * Akami fingerprint mismatch in network fingerprint.
		 */
		NETWORK_FINGERPRINT_MISMATCH_AKAMI,
	}

	/**
	 * Interface representing the result of network verification.
	 */
	export interface NetworkVerifyRet {
		/**
		 * Status of the token verification.
		 */
		status: UserTokenValidityStatus;

		/**
		 * Optional array of specific violations detected in case of failure.
		 * Only present if `status` is not `PASS`.
		 */
		violations?: UserTokenMismatchViolations[];
	}
}

// TODO: Create types for the Access Tokens
