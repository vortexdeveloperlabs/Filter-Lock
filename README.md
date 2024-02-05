# Filter Lock Proposal

[Dev Docs](./DEV.md)

> TODO: I still need to move a lot of sections here to the Dev DOcs

Filter Lock makes your links almost unblockable and prevents automatic blocking and scanning, such as Google Safe Browsing.

Whenever you see `Config option: ...` this will correspond to a JSON property that can be configured through config.json or through Dispenser

## Configuring the methods used

You will be able to choose which ones you in the config file with a bitwise enum

## Backends

Filter Lock will have different "backends" for different frameworks in many languages, such as MW. For example: JS (Hono, Express), Rust (Tower MW/Axum), Go, and PHP.

Please ask, if you want me to make a custom backend for

## Extra features

> Any of these features will be brought to Masqr in my project that adds supplemental server middleware to Masqr, making it easier to implement and more extensible. It will have the same config as Filter lock, but minus a few things, due to their architecural differences.

### Auto 404 cloaking

This will be configurable through `Config option: filter_lock.seo_passthrough.status`

There's a quirk in Chrome where any site with a status code of 404 won't show in in. This will automatically force all the status codes to be 404 when a Chrome User Agent is sent.

### Auto-escaping

This will be configurable through `Config option: filter_lock.auto_escaping.status`
You can choose the RegExp values through `Config option: filter_lock.auto_escaping.matches {string[] of RegExps}`. The RegExp's will be validated before being put inside of the DB, and if they are incorrect it will respond with an error message.

You will be able to set RegExps to grab specific phrases or keywords. This will make it so that all the text nodes in the HTML document that is going to be returned is parsed before hand, and if a RegExp matches, it will be escaped, so that the filter won't auto-block it

### arc.io Widger Hider

This will be configurable through `Config option: filter_lock.hide_arc_widget`

This is an option that will cosmetically hide the arc.io widget once you have passed the checks. This will use aero's sandboxing library, so the script doesn't detect styles on it.

### Proxy code randomization

`Config option: filter_lock.seo_passthrough.status`

The files for your proxy will have their names altered and references to those names. Similar how VSCode updates references when you rename a file.

### SEO Passthrough

This will be configurable through dispenser with `Config option: filter_lock.seo_passthrough.status`

Passthrough basically means that the code relevant to SEO will remain, but only when it recognizes the respective searchbot UA

#### Generic search engine UA's

This will passthrough any HTML that may be used identify the site such as:

- meta tags
- links

##### Open Graph Fixer

This will be configurable through dispenser with `Config option: filter_lock.seo_passthrough.open_graph`

Obviously, social media sites wanting check a site secured with filter lock by default would find no [Open Graph tags](https://ogp.me/), because the decoy page would be displayed. This would inject the og: tags from the normal site into the decoy site, if user agents for known social media scraper are recognized.

#### Googlebot

This will be configurable through dispenser with `Config option: filter_lock.seo_passthrough.googlebot.status`

##### React SPA routes

This will be configurable through dispenser with `Config option: filter_lock.seo_passthrough.react_spa_routes.status`

### Dynamic Locking

This will be configurable through `Config option: filter_lock.seo_passthrough.status`

This will work similar to anti-ddos solutions

There will be an option that will periodically lock down your links, depending on how frequently they are being blocked
