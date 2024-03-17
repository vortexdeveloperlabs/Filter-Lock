# Dispenser Locking's Tokens - Developer notes

[Parent](../README.md)

## The purpose of the:

This documents components that both the tokens use:

> The question mark means that the respective keyword in the token isn't done by default and is therefore optional. Optional features are specified in the children (subheadings below).

The actual cookie names that are used for the token should be randomized and different per proxy site link. For now in my implementation, I have it so that it is something set in the config that applies to all of the proxy site links from the hoster, but I would like to have it so there is a KV store that correlates proxy site origins to their own randomized names (using genNonce) with the nonce length also being randomized.

### Delimiter

The delimiter is a character or a string (sequence of characters) that is not used in anywhere else in the actual token and it is used to split each part into what its respective purpose is. By default, this will be a newline terminator `\n`.

I recommend making the delimiter of your choice distinct from what is present on other proxy sites. For implementers of this standard, please allow the proxy site hoster to easily configure the delimiter.

### Encoding/Encryption

The encryption keys in the token shall be different per token.

Whatever encryption algorithms you use, make sure that no characters algorithm exceed the bounds of what is allowed in a cookie or are used in the delimiter.

You may also want to allow the proxy site hoster to specify what kind of encryption algorithm they want to use.

#### Subsitution encryption

> `SITE_NAME`, `subEncrypt()`.

> [Subsitution encryption](https://www.csfieldguide.org.nz/en/chapters/coding-encryption/substitution-ciphers) is used in this way as a shorthand for text subsitution-based (Ceaser Cypher-like) encryption algorithms. Sub encryption should be optional, but all instances of them should be used by default. I recommend using XOR for this. These aren't meant to add any extra layer of cryptographic security.

When it comes to substitution algorithms, there is no decode and encode. Substitution algorithms can be undone through the same function that made it.

This is specifically for shifting the characters of the HMAC hashes, because all the can be detected by filters through searching for patterns. It is also used to shuffle around the numbers in the Discord Snowflake. This precaution adds a bit of entropy to make it more expensive to detect these tokens.

#### `SITE_HOST`

This is the domain of the proxy site and actually serves the purpose as being the encryption key, because the encryption key should be the same for everyone per a specific site. The reasoning is, if they have the site domain in their database (they know about it), they most definitely have the site blocked already.

### nonce

> `subEncrypt(` **nonce** `)`

A [nonce](https://datatracker.ietf.org/doc/html/rfc4949#:~:text=$%20nonce) is used to ensure these tokens are distinct adding a hint of entropy, so that they can't be generated easily or conflict with other identical fingerprints. It is the only thing that can't be assumed easily.

The nonce should be at the end with the exception of optional features in the tokens. This is because the nonce is used in most cases, but it is at the end because there is little reason to parse the nonce at the end unless you make use of the optional features yourself.

> The length of the nonce should be easily changeable, but the nonce shouldn't be removable by the hoster because it is the only way to issue multiple similar tokens. XOR keys aren't enough because they are different per each

### The [Discord Snowflake IDs](https://discord.com/developers/docs/reference#snowflakes)

Using them in the key allows you to identify who the token is for, so that you can you can revoke their tokens.

> It should be sub encrypted because the first few numbers of the Discord Snowflake obviously won't change much over a short period of time and a number of that length can easily be detected.

### UNIX timestamp

The UNIX timestamp allows for the tokens to be able to be dated, therefore allowing them to be revoked in the future or non-invasive telemetry purposes. It also adds a hit of entropy for bruteforcers.

> It should be sub encrypted because the first few digits of the UNIX Timestamp obviously won't change much over a short period of time and a number of that length can easily be detected.

### HMAC hashing

[HMAC](https://www.wikiwand.com/en/HMAC) is a cryptographically secure hashing algorithm that is [natively supported in the browser](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/sign#hmac). It is used to prevent the Filter Lock hoster from deanonymizing users based on their fingerprints, while still verifying them.

> The HMAC hash should use [SHA-256](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#algorithm) by default

## Filter Identification meta

You can find the types inside of ./types

## Tokens

> These are not called tokens, because in addition to it containing encrypted data it also contains less important potentially encoded data. I say potentially, because you can either use an encoding or encryption algorithm for all of the data, except for the HMAC hashes, since they are already encrypted.

When reading the token description keep in mind:

- Ignore spacing here it is irrelevant
- Anything bold in block quotes is a variable

### Access (temp)

Token: `SUB_ENCRYPTION_KEY?` `DELIMITER` `subEncrypt?(`**The user's Discord Snowflake ID**`)` `DELIMITER` `subEncrypt?(` **Filter Identification object for Access Tokens** `)` `DELIMITER` `subEncrypt?(`**UNIX Timestamp at the time of creation**`)` `DELIMITER` `subEncrypt?(`**UNIX Timestamp for the expiry date**`)` `DELIMITER` `subEncrypt?(` **nonce** `)`

By default it expires in 30 days, but this can be changed by the Filter Lock hoster through the link bot. This token will only be valid once

### User (persistant)

> It's called User, because it is locked to a certain device. This isn't something that you can share.

The token is:

- If using Double-layer TLS: `KA_SHARED_SECRET` `DELIMITER` `KA_DERIVATIVE_ENCRYPT(` `SUB_ENCRYPTION_KEY` `DELIMITER` **HMAC Hash of the Network-identifiable Fingerprint** `DELIMITER` `symEncrypt(`**HMAC Hash of the Browser-identifiable Fingerprint**, **The unhashed Network-identifiable Fingerprint**`)` _Filter Identification object for User Tokens_ `DELIMITER` _The user's Discord snowflake ID_ `DELIMITER` _UNIX Timestamp at the time of creation_ `DELIMITER` _UNIX Timestamp for the expiry date_ `DELIMITER` _nonce?_ `)`

> This doesn't need to have [Subsitution encryption](#subsitution-encryption), because it is KA encrypted already.

- Else: `SUB_ENCRYPTION_KEY` `DELIMITER` **HMAC Hash of the Network-identifiable Fingerprint** `DELIMITER` `symEncrypt(`**HMAC Hash of the Browser-identifiable Fingerprint**, **The unhashed Network-identifiable Fingerprint**`)` `subEncrypt?(`**Filter Identification object for User Tokens**`)` `DELIMITER` `subEncrypt?(`**The user's Discord snowflake ID**`)` `DELIMITER` `subEncrypt?(`**UNIX Timestamp at the time of creation**`)` `DELIMITER` `subEncrypt?(`**UNIX Timestamp for the expiry date**`)` `DELIMITER` `subEncrypt?(` **nonce?** `)`

#### Shared Secret

This is a part of [Double-layer TLS](./Double-layer%20TLS.md)

I use KA as a shorthand for any key-agreement algorithm

#### Symmetrical encryption

> `symEncrypt(`_msg_, _plaintext key_`)`.

[Symmetrical encryption](https://simple.wikipedia.org/wiki/Symmetric-key_algorithm) is used in this way to decrypt the Browser Fingerprints using the unhashed Network Fingerprints. I recommend using blowfish with a plaintext key as the unhashed Network Fingerprinting with no nonce.

#### Network-identifiable fingerprint

These fingerprints are verified on the server in Filter Lock's server middleware on every request. This is important, because the Browser-identifiable fingerprinting can be spoofed by the filter, especially dangerous when used in a request repeating attack.

##### Methods used

- [UA](https://www.rfc-editor.org/rfc/rfc9110#section-10.1.5) (http)
- [The IP Address](https://www.iana.org/numbers)
- [The JA3 hash](https://engineering.salesforce.com/tls-fingerprinting-with-ja3-and-ja3s-247362855967/) (tcp)
- [The Akamai hash](https://privacycheck.sec.lrz.de/passive/fp_h2/fp_http2.html) (http/2)

#### Browser-identifiable fingerprint

The user's [ThumbMarkJS ID](https://www.thumbmarkjs.com). This is better protects from the user possibly spoofing the token with Bookmarklets or Devtools. This is useful when your IP Address is from the School and they have School Chromebooks, which are pinned to a specific version. This layer makes you specifically stand out from the other students.

##### Possible additional methods to consider adding on top of ThumbMarkJS

- [Port Contention](https://blog.amiunique.org/port-contention-goes-portable-port-contention-side-channels-in-web-browsers)
- [drawnapart](https://blog.amiunique.org/an-explicative-article-on-drawnapart-a-gpu-fingerprinting-technique)
