# Filter Testing

`TODO: ...`

One thing that Filter Testing is flawed on is the low immunity from Network Filters. This means that, network filters are able to "grant" themselves their own key through one spoofed API call by the filter's backend. This is because there is no one-time "[Access Token](../for%20devs/standards/Link%20Locking%20Tokens.md)" that is locked behind Discord, where there is actually some form of vetting before you can get your link. It's tedious to make a Discord alts and to get a new unblocked link to be blocked. It obviously can't be automated on the spot. Discord has many rate limits and sometimes requires Phone Numbers if your IP has many accounts in addition to the email you have to provide. I lightly believe emails are too easy to create by themselves, but Discord has enough safeguards to the point where it it should be valued enough to vet.

## Extension testing methods

Keep in mind, these are methods to guess if an extension is used. They are not perfect.

### Through pinging extension resources

The Web Accessibility URLs can be pinged and if the request is successful that means that the extension is being used.

### Through connection

See <https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable>

The Filter Lock Browser Library tries to connect to the extension. This requires for a list of all known Filter Extensions.

## Network Testing Method

It checks the content of the resources, or just ping them if that's how it is chosen in the config for the URL, on sites that are not protected by CORS and are known to be blocked by the filters the user has or blocked in general if you are not using Link Bot Locking. If it is checking, it will take in a method with the first parameter being the Response and the return type being a boolean, which indicates if the content matches to what is expected. This allows flexibility.
