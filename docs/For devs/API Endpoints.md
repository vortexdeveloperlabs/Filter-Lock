# API Endpoints - Developer notes

[Parent](./Index.md)

> These are all used internally and should not be useable by anyone other than by code by the proxy site dev

If the auth fails, no error is returned, instead it will pass the request to the next route, because these shouldn't be a problem.

## Used by

### Dispenser

> With all of these must post: `API_TOKEN` `DELIMITER` `The user's Discord Snowflake ID`. Not to be confused with the user tokens.

> This doesn't need any form of encoding, because it will never be used by the site itself and there not affectable by extension-based request repeating

- `Filter Lock API`/genOneTimeToken
  - It returns: `the One-time Token` (body) with a `200` status code
- `Filter Lock API`/revokePrivateToken
  - It returns: a `200` status code
- `Filter Lock API`/listTokens
  - A `JSON response of the deconstructed Tokens in "OneTimeTokens" or "PrivateTokens" array` (body)

### [Site / Trading](https://hedge.soundar.eu.org/s/1J_rfGDAb#When-using-the-One-time-Token)

> You must post the `One-time Token`

- `Filter Lock API`/trade
  - Returns the Private Token and revokes the One-time Token

> There is no form of encoding, because even with request repeating, it only works once, since the One-time Token is revoked after this.
