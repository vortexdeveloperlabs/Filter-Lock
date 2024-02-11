# Filter Lock

[Dev Docs](./docs/For%20devs/Index.md)

Filter Lock makes your links nearly unblockable and prevents automatic blocking and scanning, such as Google Safe Browsing. It works through HTTP Router Middleware.

## Middleware Backends

Filter Lock will have many different "backends" for different frameworks in many languages, such as MW. For example: JS (Hono, Express), Rust (Tower Middleware/Axum), Go, and PHP

> Please ask, if you want me to make a custom backend for your use cases

## Methods used

> You will able to choose which methods are ussed in the config file with a bitwise enum

### [Link Bot Locking](./docs/For%20devs/link)

> [Dispenser V3](https://github.com/VyperGroup/Dispenser) will be my flagship implementation of Filter Bot locking when it releases

### Filter testing

Filter testing involves checking the user's device for Extensions or testing for Network Blocks.

### School student checking

This requires that you provide your own Google API key for [implicit flow OAuth V2](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow) or if you use GCloud [Identity Platform](https://cloud.google.com/identity-platform/docs/web/google)

> Even if external sign-in is blocked by the workspace, you can actually detect that

This is the easiest to use on a GAS-based proxy site.

## Extra (listed by importance)

### Auto 404 cloaking

There's a quirk in Chrome where any site with a status code of 404 won't show in in. This will automatically force all the status codes to be 404 when a Chrome User Agent is sent in the Filter Lock middleware.

### [Site / Bare content encoding](./docs/For%20devs/"Wrapping"%20methods.md)

#### Restrict use of terms

In the config, you will be able to set RegExps to grab specific phrases. This will make it so that all the text nodes in the HTML document that is going to be returned is parsed before hand, and if a RegExp matches, it will be escaped, so that the filter won't autoblock it

### Proxy SW randomization

> TODO: ...

### Cosmetic

#### Open Graph Fixer

Obviously, social media sites wanting check a site secured with filter lock by default would find no [Open Graph tags](https://ogp.me/), because the decoy page would be displayed. This would inject the og: tags from the normal site into the decoy site, if user agents for known social media scraper are recognized.

#### arc.io Hider

This is an option that will cosmetically hide the arc.io widget once you have passed the checks. This will use aero's sandboxing library, so the script doesn't detect styles on it.

## Integrations

### [Dispenser](...)

- I will provide webhook integrations sent from Dispenser to an API endpoint on Filter Lock for any of your working links.
- There will be an optional web panel too

These integrations will have the same functionality but a different UI. From both of these, you will be able to:

- Here you will be able to view the percentage of users that are blocked.
- You must set the secret in your per-server bot settings.
- This will be accessed from a per-server Dispenser command.

## [How this compares to Masqr](./docs/For%20devs/How%20Masqr%20compares%20to%20Filter%20Lock.md)
