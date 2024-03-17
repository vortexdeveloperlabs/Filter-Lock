import defaultProxyFileRandomizer from "./src/server-middleware/util/modes/defaultProxyFileRandomizer";

import XORCypher from "./util/tokens/crypto/XORCypher";

const config: GlobalConfig.Config = {
	modes: {
		proxyFileRandomization: {
			enabled: true;
			handler: (fileName: string) => string;
		};
		// TODO: Cont...
	};
	proxyFileRandomization: {
		enabled: true,
		handler: defaultProxyFileRandomizer(5, 15),
	},
	methods: {
		// TODO: Cont...
		linkBotIntegration: {
			enabled: true,
			linksAffected: [""],
			linkBotLocking: {
				enabled: true,
				tokens: {
					subEncrypt: {
						/** Recommended to be true. */
						enabled: boolean;
						/** Recommended to use XORCypher. Security isn't too much of a concern here and I would prioritize speed. */
						cipher: ICypher;
						/** Recommended to be true. */
						encryptNonce: boolean;
					};
					/** This is useless if network or browser fingerprints are disabled. */
					symEncryption: {
						/** Recommended to be true. */
						enabled: true;
						/** Recommended to be "blowfish". */
						symEncryptionType: "blowfish";
					};
					/** The fingerprinting is what actually provides the defense to Filter Lock. So, disabling it would be highly
					 * discouraged. */
					fingerprint: {
						enabled: true;
						networkFingerprint: {
							enabled: true;
						};
						browserFingerprint: {
							enabled: true;
						};
					};
				};
			};
		};
	};
	doubleLayerTLS: {
		enabled: true,
		encryptHeaders: true,
		encryptBody: true,
		KAA: "ECDH",
		KAKeyECDHType: { name: "AES-GCM", length: 128 },
	},
};

export default config;
