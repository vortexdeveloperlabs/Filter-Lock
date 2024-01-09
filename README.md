# Filter Lock

Filter Lock makes your links nearly unblockable and prevents automatic blocking and scanning.

[Dev Docs](./DEV.md)

## Backends

Filter Lock will have different "backends" for different frameworks in many languages, such as middleware. These are in the Backends/ folder. This will support, likely in this order: JS (Native, Hono, Express), Rust (Tower middleware/Axum), Zig (Zap), PHP, and Go (FastHTTP)

## Lock modes

**Unlock Key** - This can either be the browser's current user agent (htmlOutput.getUserAgent() in GAS) or IP address (unsupported in GAS).
After the unlock is successful, a cookie is set so that the unlock key process doesn't have to be repeated.

> On GAS, because cookies aren't accessible, inside of removeSandbox.html (I will rename this to wrap.html), I will use Aero's rewriter library to rewrite every url to append the unlock key.

You will be allowed to customize which options are required and what the fallbacks are.

1. Unless opted out, the site is loaded and locked and will be automatically loaded to the correct "key" in the url. It will be so seamless that the user will never notice Proxy Lock.
       I will provide the option to periodically encrypt these so that filters do not notice these patterns.

There will be two key types:
Foolproof
    - ?key=<{IP};{User-Agent}>
        > With templating
Unsecure
    - Unlock IP: ?ip=
    - Unlock User-Agent: ?ua=

In **normal** mode, you can do any of the three, starting with keys. Additionally, filter detection will be used to auto-unlock.
If in **semistrict** mode, instead of the key, you would have to go through filter checking or Google OAuth as well.
In **ultrastrict** mode, you will need to have both the key and Google OAuth.

### Fallbacks

1. **Filter detection**: This will use loading or network errors to check if commonly blocked sites are blocked. This is done to ensure that the sites that are used for filter detection
2. **Second Fallback**: Google account checking: instead of locking the user out when the detection methods fail, it will instead check to see if their school Google account is a student one through Oauth.

## Extra

### Open Graph Fixer

This will fix social media embeds on your sites. Please note that this will leave a possible future attack vector open for filters. This is because the filters might try scraping the site with the social media scraper's user agent, if they catch on to this.

### Security features

There will be an option that will periodically lock down your links, depending on how frequently they are being blocked. This will be called "dynamic locking."

### arc.io Hider

This is an option that will cosmetically hide the arc.io widget once you have passed Fitler Lock. This will use the aero sandboxing library, so the script doesn't detect styles on it.

## Integrations

- I will provide webhook integrations sent from Dispenser to an API endpoint on your hosted server instance. You must set a shared secret in either the web panel or config.
  There will be an optional web panel.

These integrations will have the same functionality but a different UI. From both of these, you will be able to:

- Here you will be able to view the percentage of users that are blocked.
- You must set the secret in your per-server bot settings.
- This will be accessed from a per-server Dispenser command.
