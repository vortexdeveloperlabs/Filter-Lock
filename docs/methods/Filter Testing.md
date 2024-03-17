# Filter Testing

`TODO: ...`

## Extension testing methods

Keep in mind, these are methods to guess if an extension is used. They are not perfect.

### Through pinging extension resources

The Web Accessibility URLs can be pinged and if the request is successful that means that the extension is being used.

### Through connection

See <https://developer.chrome.com/docs/extensions/reference/manifest/externally-connectable>

The Filter Lock Browser Library tries to connect to the extension. This requires for a list of all known Filter Extensions.

## Network Testing Method

It checks the content of the resources, or just ping them if that's how it is chosen in the config for the URL, on sites that are not protected by CORS and are known to be blocked by the filters the user has or blocked in general if you are not using Link Bot Locking. If it is checking, it will take in a method with the first parameter being the Response and the return type being a boolean, which indicates if the content matches to what is expected. This allows flexibility.
