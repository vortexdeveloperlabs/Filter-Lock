declare namespace GlobalConfig {
	export interface ISubCypher {
		new (key: string);
		cipher(data: string): string;
	}
	export interface Config {
		modes: {
			proxyFileRandomization: {
				enabled: true;
				handler: (fileName?: string) => string;
			};
			// TODO: Cont...
		};
		methods: {
			// TODO: Cont...
			linkBotIntegration: {
				enabled: boolean;
				linksAffected: string[];
				linkBotLocking: {
					enabled: boolean;
					tokens: {
						subEncrypt: {
							/** Recommended to be true. */
							enabled: boolean;
							/** Recommended to use XORCypher. Security isn't too much of a concern here and I would prioritize speed. */
							cipher: ISubCypher;
							/** Recommended to be true. */
							encryptNonce: boolean;
						};
						/** This is useless if network or browser fingerprints are disabled. */
						symEncryption: {
							/** Recommended to be true. */
							enabled: boolean;
							/** Recommended to be "blowfish". */
							symEncryptionType: "blowfish";
						};
						/** The fingerprinting is what actually provides the defense to Filter Lock. So, disabling it would be highly
						 * discouraged. */
						fingerprint: {
							enabled: boolean;
							networkFingerprint: {
								enabled: boolean;
							};
							browserFingerprint: {
								enabled: boolean;
							};
						};
					};
				};
			};
		};
		doubleLayerTLS: {
			enabled: boolean;
			encryptHeaders: boolean;
			/** This option is useless if you are only trying to bypass only filter extensions, rather than network filters too. Besides, if you were only targetting filter extensions and ignoring network filters you should adopt extension concealment. */
			encryptBody: boolean;
			/** Key Agreement Algorithm. Only one is supported ATM. */
			KAA: "ECDH";
			/** Needed if ECDH is the KAA if it is anything else this is ignored and should be undefined. */
			KAKeyECDHType: AesKeyGenParams;
		};
	}
}
