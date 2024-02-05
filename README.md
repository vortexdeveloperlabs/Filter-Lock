# Filter Lock Proposal

[Dev Docs](./DEV.md)

Filter Lock makes your links almost unblockable and prevents automatic blocking and scanning, such as Google Safe Browsing.

## Configuring the methods used

You will be able to choose which ones you in the config file with a bitwise enum

## Backends

Filter Lock will have different "backends" for different frameworks in many languages, such as MW. For example: JS (Hono, Express), Rust (Tower MW/Axum), Go, and PHP.

Please ask, if you want me to make a custom backend for

## Extra

> Any of these features will be brought to Masqr in my project that adds supplemental server middleware to Masqr, making it easier to implement and more extensible. It will have the same config as Filter lock, but minus a few things, due to their architecural differences.

### Auto 404 cloaking

There's a quirk in Chrome where any site with a status code of 404 won't show in in. This will automatically force all the status codes to be 404 when a Chrome User Agent is sent.

### Proxy SW randomization

TODO: ...

### Restrict use

In the config, you will be able to set RegExps to grab specific phrases.
This will make it so that all the text nodes in the HTML document that is going to be returned is parsed before hand, and if a RegExp matches, it will be escaped, so that the filter won't autoblock it

### Open Graph Fixer

Obviously, social media sites wanting check a site secured with filter lock by default would find no [Open Graph tags](https://ogp.me/), because the decoy page would be displayed. This would inject the og: tags from the normal site into the decoy site, if user agents for known social media scraper are recognized.

### arc.io Hider

This is an option that will cosmetically hide the arc.io widget once you have passed the checks. This will use aero's sandboxing library, so the script doesn't detect styles on it.

### Dynamic Locking

This will work similar to anti-ddos solutions

There will be an option that will periodically lock down your links, depending on how frequently they are being blocked

## Integrations

- I will provide webhook integrations sent from Dispenser to an API endpoint on your hosted server instance. You must set a shared secret in either the web panel or config.
- There will be an optional web panel.

These integrations will have the same functionality but a different UI. From both of these, you will be able to:

- Here you will be able to view the percentage of users that are blocked.
- You must set the secret in your per-server bot settings.
- This will be accessed from a per-server Dispenser command.
