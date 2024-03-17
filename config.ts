import defaultProxyFileRandomizer from "./src/server-middleware/util/modes/defaultProxyFileRandomizer";

import { genNonce } from "./src/server-middleware/util/tokens/crypto/genNonce";
import XORCypher from "./src/server-middleware/util/tokens/crypto/XORCypher";

const nonceLen = 10;

const config: MiddlewareConfig.Config = {
	modes: {
		proxyFileRandomization: {
			enabled: true,
			handler: () => genNonce(nonceLen),
		},
		// TODO: Cont...
	},
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
						enabled: true,
						/** Recommended to use XORCypher. Security isn't too much of a concern here and I would prioritize speed. */
						cipher: XORCypher,
						/** Recommended to be true. */
						encryptNonce: true,
					},
					/** This is useless if network or browser fingerprints are disabled. */
					symEncryption: {
						/** Recommended to be true. */
						enabled: true,
						/** Recommended to be "blowfish". */
						symEncryptionType: "blowfish",
					},
					/** The fingerprinting is what actually provides the defense to Filter Lock. So, disabling it would be highly
					 * discouraged. */
					fingerprint: {
						enabled: true,
						networkFingerprint: {
							enabled: true,
						},
						browserFingerprint: {
							enabled: true,
						},
					},
				},
			},
		},
		filterLockTesting: {
			enabled: true,
			extensionDetection: {
				enabled: true,
				throughPingingResources: {
					enabled: true,
					map: new Map(),
				},
				throughPingingConnection: {
					enabled: true,
				},
				throughNetworkTesting: {
					enabled: true,
					/** An array of the IDs to hopefully all extension filters */
					knownFilters: [""],
				},
			},
			requestDetection: {
				enabled: true,
			},
		},
	},
	doubleLayerTLS: {
		enabled: true,
		encryptHeaders: true,
		encryptBody: true,
		KAA: "ECDH",
		KAKeyECDHType: { name: "AES-GCM", length: 128 },
	},
};

export default config;
