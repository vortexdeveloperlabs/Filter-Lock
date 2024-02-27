# API Endpoints - Developer notes

\[Parent](`TODO: ...`)

If the auth fails, no error is returned, instead it will pass the request to the next route, because these shouldn't be a problem.

To prevent request repeating, the API endpoints are hashed. This does not apply to the endpoints used by Link Bots, since they have a special Token that won't be used anywhere by a browser. It will use the same [HMAC Hashing used in the Link Bot Tokens](../../for%20devs/standards/Link%20Bot%20Tokens.md#H), but to hash the API endpoint names. They will be hashed by the nonce used in the User Token itself. This is because the extensions can't peep the body of the requests, so they can't get the nonce, therefore they can't bruteforce the API endpoint name.

TODO: I plan to write JSON schemas for the API endpoints

## Used by

### Link bots

#### Link bot Integration Library Developers

The tokens here are used in the onboarding process

- `Filter Lock API`/onboarding/checkSyncTokenValidity

  - It returns: a `200` status code if the Sync Token is valid and a `401` if it is not.

> This is used in the onboarding process to verify that the Sync Token you provided is valid. If it fails and it is not on a demo link it would pass the request to the next route, so that filters can't abuse the endpoint to auto detect the link

- `Filter Lock API`/onboarding/renewSyncToken
  - It returns: `a new token` (body) with a `200` status code

> This is for if your Sync Token gets leaked and you need a new one

### Managing tokens manually

These are used in cooridination with the decoy page to verify the user

> With all of these must post: `API_TOKEN` `DELIMITER` `The user's Discord Snowflake ID`. Not to be confused with the user tokens.

> This doesn't need any form of encoding, because it will never be used by the site itself and there not affectable by extension-based request repeating

- `Filter Lock API`/genOneTimeToken (GET)
  - It returns: `the Access Token` (body) with a `200` status code
- `Filter Lock API`/revokeUserToken (POST)
  - The post body: ...`DELIMITER` + `The user token to revoke`
  - It returns: a `200` status code or `403` if the User Token provided in the body is invalid
- `Filter Lock API`/listUserTokens (GET)
  - It returns: A `JSON response of the deconstructed Tokens in "OneTimeTokens" or "UserTokens" array` (body)

### [Site / Trading](../standards/Filter%20Lock%20middleware%20functionality%20.md#When-using-the-Access-Token)

> You must post the `Access Token`

- `Filter Lock API`/trade (POST)
  - The post body: ...`DELIMITER` + `The Access token to trade with`
  - It returns: the User Token and revokes the Access Token or `403` if the Access token is invalid

> There is no form of encoding, because even with request repeating, it only works once, since the Access Token is revoked after this.

### For [Unblock Externals](../../modes/Unblock%20Externals.md)

> You must post the `User Token`

- `Filter Lock API`/isSiteBlocked?link=`...` (POST)
  - The post body: ...`DELIMITER` + `A JSON array of filter`
  - It returns: a JSON response of a single property "isBlocked" with the value of a boolean

It will fetch the APIs the filters themselves use for determining if a site is blocked. If the link is blocked on any of the filters that are
