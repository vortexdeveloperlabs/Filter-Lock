export default class XORDecryptor {
	#key: string;

	constructor(key: string) {
		this.#key = key;
	}

	cipher(data: string): string {
		let encData = "";
		for (let i = 0; i < data.length; i++) {
			const charCodeData = data.charCodeAt(i);
			const charCodeKey = this.#key.charCodeAt(i % this.#key.length);
			const xoredCharCode = charCodeData ^ charCodeKey;
			encData += String.fromCharCode(xoredCharCode);
		}
		return encData;
	}
}
