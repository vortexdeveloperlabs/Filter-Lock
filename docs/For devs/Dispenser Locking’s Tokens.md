# Dispenser Locking's Tokens - Dev Docs

[Parent](./Index.md)

## The purpose of the:

This documents components that both the tokens use:

### Delimiter

The delimiter is a character that is not used in anywhere else in the actual token and it is used to split each part into what its respective purpose is. By default, this will be a newline terminator.

### Encoding

Encoding prevents Filters from identifying the segments of the token through patterns The recommended encoding type for the token is XOR due it not adding any extra length due to it being a ceaser cypher, but it is ulimately up to the Filter Lock config. There will be a config option where you pass in your own Encoder class with the constructor being the token and it having the properties encode and decode available. The encoding token in the token shall be different per token.

### nonce

A nonce is used to ensure these tokens are distinct, so that they can't be bruteforced easily. It is the only thing that can't be assumed easily. You can actually disable nonce for One-time Tokens or Perm Tokens.

### The Discord Snowflake Tokens

This allows you to identify who the token is for, so that you can you can revoke their tokens.

### UNIX timestamp

The UNIX timestamp allows for the tokens to be able to be dated, therefore allowing them to be revoked in the future or non-invasive telemetry purposes. It also adds a hit of entropy for bruteforcers.

> It should be encoded because the first few digits of the UNIX Timestamp obviously won't change much over a short period of time.

### HMAC hashing

HMAC is a cryptographically secure hashing algorithm that is [natively supported in the browser](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#hmac). It is used to prevent the Filter Lock hoster from deanonymizing users based on their fingerprints, while still verifying them.

## Tokens

> These are not called tokens, because in addition to it containing encrypted data it also contains less important potentially encoded data. I say potentially, because you can either use an encoding or encryption algorithm for all of the data, except for the HMAC hashes, since they are already encrypted.

When reading the token description keep in mind:

- Ignore spacing here it is irrelevant
- Anything bold in block quotes is a variable

### One-time (Temp)

`ENCRYPTION_
` `DELIMITER` `Encode(`**The user's Discord Snowflake ID**`)` `DELIMITER` `Encode(`**UNIX Timestamp`)` `DELIMITER` `Encode(`**nonce\*\*`)`

By default it expires in 30 days, but this can be changed by the Filter Lock hoster. This token will only be valid once

### Private (Persistant)

> It's called Private, because it is locked to a certain device

`ENCRYPTION_KEY` `DELIMITER` `Encode(`**HMAC Hash of the Network-identifiable Fingerprint**`)` `DELIMITER` `Encode(`**HMAC Hash of thumbmarkjs ID**`)` `DELIMITER` `Encode(`**The user's Discord snowflake ID**`)` `DELIMITER` UNIX Timestamp `DELIMITER` `nonce`

Upon your initial and final usage of the PSK, the Filter Lock server middleware will inject a script that will set a cookie to the Private Tokens, which will be used to verify later requests.

#### Network-identifiable fingerprint

The UA and IP Address. This is verified on the server in Filter Lock's server middleware on every request. This is important, because the Browser-identifiable fingerprinting can be spoofed by the filter.

#### Browser-identifiable fingerprint

The ThumbMarkJS Token. This is better protects from the user possibly spoofing the token with Bookmarklets or Devtools. This is useful when your IP Address is from the School and they have School Chromebooks, which are pinned to a specific version. This layer makes you specifically stand out from the other students.

## How to

### Generate the nonce

```ts
// Not finished
function genNonce(nonceLen: number) {
  // Generates 6 values at a time
  const dividend = Math.floor(nonceLen / 6);
  const hasRemainder = nonceLen % 6 === 0;
  let timesToGen = divident;
  if (hasRemainder) timesToGen++;
  const randArr = new Uint32Array(timesToGen);
  self.crypto.getRandomValues(randArr);
  randArr.join("").substring(0, nonceLen);
}
```

### Verify

> The deconstructors are also exported, for the use in the `.../listTokens` API endpoint

#### One-time Token

```ts
// The functionality decode function returned going to internally depend upon config.tokenType
import decode from ...;

function deconstructOneTimeToken() {
    // TODO: ...
}

// TODO: ...

export default checkOneTimeToken;
export { deconstructPrivateToken };
```

`ENCRYPTION_KEY` `DELIMITER` `Encode(`**HMAC Hash of the Network-identifiable Fingerprint**`)` `DELIMITER` `Encode(`**HMAC Hash of thumbmarkjs ID**`)` `DELIMITER` `Encode(`**The user's Discord snowflake ID**`)` `DELIMITER` `DELIMITER` UNIX Timestamp `Encode(`**nonce**`)`

#### Private Token

```ts
import config from ...;
// The functionality decode function returned going to internally depend upon config.tokenType
import decode from ...;

function deconstructPrivateToken(id: string) {
    // Parse into segments
    const [key, encHMACHashedNetworkFingerprint, encHMACHashedBrowserFingerprint, encSnowflakeID, encTimestampStr, nonce] = id.split(config.delimiterChar);

    const decoder = new Decoder(key);

    let ret = {
        networkFingerprint: JSON.parse(decoder.decode(encHMACHashedNetworkFingerprint)),
        networkBrowser: JSON.parse(decoder.decode(encHMACHashedNetworkFingerprint)),
        creationDate: new Date(decoder.decode(encTimestampStr)),
        snowflakeID: decoder.decode(encSnowflakeID),
        nonce: node
    };

    if (nonce && config.nonce.enabled) {
        ret.nonce = nonce;
    }

    return ret;
}

// If pass
function checkPrivateToken(): boolean {
     // TODO: ...
}

export default checkPrivateToken;
export { deconstructPrivateToken };
```
