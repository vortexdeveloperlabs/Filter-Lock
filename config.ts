import defaultProxyFileRandomizer from "./src/server-middleware/util/modes/defaultProxyFileRandomizer";

interface Config {
	modes: {
		proxyFileRandomization: {
			enabled: true;
			handler: (fileName: string) => string;
		};
		// TODO: Cont...
	};
	methods: {
		// TODO: Cont...
		linkBotIntegration: {
			enabled: true;
			linkBotLocking: {
				enabled: true;
				browserFingerprint: {
					symEncryptionType: "blowfish";
				};
			};
		};
	};
	doubleLayerTLS: {
		enabled: boolean;
		/** Key Agreement Algorithm. Only one is supported ATM. */
		KAA: "ECDH";
		/** Needed if ECDH is the KAA if it is anything else this is ignored and should be undefined. */
		KAKeyECDHType: AesKeyGenParams;
	};
}

const config = {
	proxyFileRandomization: {
		enabled: true,
		handler: defaultProxyFileRandomizer(5, 15),
	},
	doubleLayerTLS: {
		enabled: true,
		KAA: "ECDH",
		KAKeyECDHType: { name: "AES-GCM", length: 128 },
	},
};

export default config;
