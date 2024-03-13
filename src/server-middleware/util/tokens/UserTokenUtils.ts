// TODO: Import the config - import config from ...;

import XORDecrypter from "./crypto/XORCypher";

import { Blowfish } from "egoroof-blowfish";

class UserTokenUtils {
	userToken: UserTokenTypes.UserToken;

	constructor(userToken) {
		this.userToken = this.#deconstruct(userToken);
	}

	// TODO: Make a construct method that is for the Filter Lock Browser Helper
	/**
	 * This will be used in the Filter Lock middleware for transforming a User Token and browserFingerprints the user provided and turning them into a proper User Token
	 * TODO: This method does nothing yet
	 * TODO: ... The params are not yet documented
	 */
	construct() {}

	/**
	 *This is used inside of the
	 * @param userToken This is the user token that the Filter Lock Browser Helper library has provided to the Filter Lock middleware
	 * @param networkInfo This is the same type of fingerprints on the network that is in the User Token, but except for the API request to ensure that nobody malicious is making the request for the user (E.g. extension repeating)
	 * @param KAServerPrivKey This is the private key used in the key-agreement that is stored by the Filter Lock middleware.
	 * @returns TODO: ...
	 */
	deconstruct(
		userToken: string,
		networkInfo: FullUserTokenTypes.NetworkVerifyPassthroughData,
		KAServerPrivKey: string
	): UserTokenTypes.UserToken {
		const parts = userToken.split(config.delimiterChar);
		// Parse into segments
		if (config.doubleLayerTLS.enabled) {
			const [KASharedSecret, ...restKAEncKey] = parts;

			const unwrappedServerPrivKey = null; // TODO: unwrap... Use https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/unwrapKey

			if (config.doubleLayerTLS.KAA === "ECDH")
				return this.#deconstructWithRest(
					restKAEncKey.map(KAEncrPartStr => {
						const KAEncrPartArrayBuffer = new TextEncoder().encode(
							KAEncrPartStr
						).buffer;
						return window.crypto.subtle.decrypt(
							config.doubleLayerTLS.KASharedKeyECDHType,
							unwrappedServerPrivKey,
							KAEncrPartArrayBuffer
						);
					}, true));
				);
			// TODO: Add support for more KAAs
		}
		return this.#deconstructWithRest(parts);
	}

	// This is nowhere near finished
	#deconstructWithRest(rest: any, doubleLayerTLSEnabled = false)/*: UserTokenTypes.UserToken*/ {
		let ret/*: UserTokenTypes.UserToken*/ = {};
		if (doubleLayerTLSEnabled) {
			// Remember that with Double Layer TLS enabled, Substitution Encryption is not necessary
			const [
				HMACHashed_NetworkFingerprint,
				SymEncr_HMACHashed_BrowserFingerprint,
				SnowflakeID,
				CreationTimestampStr,
				ExpiryTimestampStr,
				Nonce,
			] = rest;
			ret = {
				...rest
			};
		} else {
			const [
				subKey,
				subEnc_HMACHashed_NetworkFingerprint,
				subEnc_SymEncr_HMACHashed_BrowserFingerprint,
				subEncSnowflakeID,
				subEncCreationTimestampStr,
				subEncExpiryTimestampStr,
				subEncNonce,
			] = rest;

			const subDecrypter = new XORDecrypter(subKey);

			ret = {
				hmacHashed_networkFingeprint: JSON.parse(
					subDecrypter.decrypt(subEnc_HMACHashed_NetworkFingerprint)
				),
				symEncr_HMACHashed_browserFingeprint: JSON.parse(
					subDecrypter.decrypt(
						subEnc_SymEncr_HMACHashed_BrowserFingerprint
					)
				),
				creationDate: new Date(
					subDecrypter.decrypt(subEncCreationTimestampStr)
				),
				expiryDate: new Date(
					subDecrypter.decrypt(subEncExpiryTimestampStr)
				),
				snowflakeID: subDecrypter.decrypt(subEncSnowflakeID),
				nonce: subDecrypter.decrypt(subEncNonce),
			};

			if (subEncNonce && config.nonce.enabled) {
				ret.nonce = subEncNonce;
			}
		}

		if (config.browserFingerprint.enabled) {
			switch (config.browserFingerprint.symEncryptionType) {
				case "blowfish":
				// TODO: set ret.browserFingeprint from hmacHashed_browserFingeprint using networkFingeprint
				default:
					throw new Error(
						"Unsupported fingerprint encryption type; read the docs!"
					);
			}
		}

		return ret;
	}
	validate(
		userToken: UserToken,
		verifyPassthroughData: UserTokenTypes.NetworkVerifyPassthroughData
	): UserTokenTypes.NetworkVerifyRet {
		const verifyPassthroughDataStr = JSON.stringify(verifyPassthroughData);

		// TODO: If expired return EXPIRED and the corresponding violations

		// TODO: If any of the passthrough data keys don't match, return NETWORK_FINGERPRINT_MISMATCH with its respective (corresponding to the different keys) violations

		// Default
		return {
			status: UserTokenTypes.TokenValidityStatus.PASS,
			violations: [],
		};
	}
}

export default UserTokenUtils;
