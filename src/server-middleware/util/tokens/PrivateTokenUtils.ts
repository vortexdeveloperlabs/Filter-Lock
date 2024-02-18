import config from ...;
// The functionality subDecrypter function returned going to internally depend upon config.tokenType
import subDecrypter from ...;

import { Blowfish } from 'egoroof-blowfish';

// TODO: Move these types to a module in index.d.ts


class PrivateTokenUtils {
    privateToken: PrivateTokenTypes.PrivateToken;

    constructor(privateToken) {
        this.privateToken = this.#deconstruct(privateToken);
    }
    #deconstruct(privateToken: string): PrivateTokenTypes.PrivateToken {
        // Parse into segments
        const [subKey, subEnc_hmacHashed_NetworkFingerprint, subEnc_bfEnc_hmacHashed_BrowserFingerprint, encSnowflakeID, encTimestampStr, nonce] = id.split(config.delimiterChar);
    
        const subDecrypter = new SubDecrypter(subKey);
    
    
        let ret = {
            hmacHashed_networkFingeprint: JSON.parse(subDecrypter.decrypt(subEnc_hmacHashed_NetworkFingerprint)),
            bfEnc_hmacHashed_browserFingeprint: JSON.parse(subDecrypter.decrypt(subEnc_bfEnc_hmacHashed_BrowserFingerprint)),
            creationDate: new Date(subDecrypter.decrypt(encTimestampStr)),
            expiryDate: new Date(subDecrypter.decrypt(encTimestampStr)),
            snowflakeID: subDecrypter.decrypt(encSnowflakeID),
            nonce: node
        };

        if (ret.networkFingerprint && config.browserFingerprint.enabled) {
            switch (config.browserFingerprint.encryptionType) {
                case "blowfish":
                    
                default:
                    throw new Error("Unsupported fingerprint encryption type; read the docs!")
            }
        } 
    
        if (nonce && config.nonce.enabled) {
            ret.nonce = nonce;
        }
    
        return ret;
    }
    verify(privateToken: PrivateToken, verifyPassthroughData: PrivateTokenTypes.NetworkVerifyPassthroughData): PrivateTokenTypes.NetworkVerifyRet  {
        const verifyPassthroughDataStr = JSON.stringify(verifyPassthroughData);


        // TODO: If expired return EXPIRED

        // TODO: If any of the passthrough data keys don't match, return NETWORK_FINGERPRINT_MISMATCH with its respective (corresponding to the different keys) violations 
    
        // Default
        return {
            status: PrivateTokenTypes.TokenValidityStatus.PASS,
            violations: []
        }
    }
}

// If pass
function verifyPrivateToken():  {

}

export default checkPrivateToken;
// The deconstructors are also exported, for the use in the `.../listTokens` API endpoint
export { deconstructPrivateToken };