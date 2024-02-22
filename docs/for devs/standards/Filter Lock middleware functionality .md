# What the Filter Lock middleware does - Developer Notes

[Parent](../Index.md)

## It has APIs

Since Filter Lock is configured different for each proxy Discord community, it is configured in the server itself, using their own link bot. This means that there needs to be [APIs available for it](../For%20devs/standards/API%20Endpoints%20for%20Link%20Bot%20Locking.md) and more importantly a token to allow the changes to be made from the Discord bot iself. This token is called the "[Sync Token](./Sync%20Token.md)".

## Security

These are methods that only let students in

### When using the One-time Token

> TLDR; Essentially the entire niche of One-time Token is to be traded for a Private Token.

The original site will not load on this intial request. It only loads when you use the Private Token. This is for getting the Private Token.

The temp will be recieved from a fragment in the URL

It will post the fingerprints and the One-time Token to the getPermToken endpoint to get the Private Token. This token is then set in the cookies. There will also be a copy in the localstorage and IndexedDB incase it is lost. After this it reloads.

#### In static-only mode

You can get the user agent, rather than through the header with `navigator.userAgent`. If the user agen't check fails, Filter Lock will require the user agent in the Browser Fingerprint. You can't get the IP Address in GAS without an external request to be fullfilled.

Static only mode will also require the site's HTML to be injected after it is loaded, which may cause speed delay. Additionally, there would be no UV randomization and you would need a bare server that supports encoding.

#### In GAS (semi-static)

You can get the user agent in the middleware through htmlOutput.getUserAgent(), however you can't get the IP Address.

### When using the Private Token

In the network request, if the Private Token is provided in the cookies. It will read it and try to get only the Network Fingerprint. If the fingerprint matches it will continue as below, [or else](#When-there-is-no-Private-Token-in-the-cookies).

It will inject a script to your top of your site. It will read the token from the cookies and try to get only the [Browser Fingerprint](https://www.thumbmarkjs.com), if this fails it will reset cookies and reload, so that it can go to the decoy page.

## When there is no Private Token in the cookies

It will show the decoy page, but it will also inject a script at the top which will look in localstorage and IndexedDB for the copy of the token. This is a protection against the token being mistakenly deleted. If one is found, it will reload and set the proper token.
