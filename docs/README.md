## Table of contents

In the documents linked here, you can find summaries of any method/mode or guides for setting up Filter Lock for your proxy site or bot, but if you want a technical overview see [For developers](./For%20devs/Index.md).

## Glossary

- Request Repeating - Most advanced filters will repeat the same requests that the user sends to the site. They are aware that some systems are locked behind log-ins.
  - Extension-based Request Repeating - This is the worst-case scenario for us, because it allows the extension to bypass Network Fingerprinting with Link Bot Locking, by replicating the request in the extension, since it would have the same User Agent and IP. They might do the filtering on the extension or send the data to their own API's, similarly to how some filters check HTML Content for reactive sites. The good news is that this won't block it for everyone else using the filter globally or in your district, since the data would be able to be spoofed to get any site blocked maliciously, but it is an annoyance to the usser. The only way to bypass, if it ever becomes a problem, is to apply the encoding mechanisms in the Filter Lock config and from there on it is an endless cat and mouse game.

> Raffesia calls this "Imitate Probing"

- Wrapping - Storing code in a weird way or exceedingly standard way that the filters won't pick up on. See [this doc](./modes/"Wrapping"%20methods.md)

## Filter Lock-specific

- methods - These help to prevent manual blocks
- modes - When I say this I refer to the optional features that are not methods. These are made to prevent filters from automatically blocking the links, rather than locking them down to students.
- demo (main) links - Links that aren't protected by Filter Lock and are mainly used for showcasing the site
- per-server staff - This means staff in the proxy community's Discord server that have permission over the bot. It's usually used to make a distinction from the proxy bot hoster.
- Types of tokens
  - Sync Token - See [this doc](./For%20devs/standards/Sync%20Token.md)
  - One-time/Private Token - See [this doc](./For%20devs/standards/Link%20Bot%20Tokens.md)

> The lists are ordered by importance

### Methods - These are [always exclusive to the middleware](./For)

- [Filter Testing](./methods/Filter%20Testing.md)
  - [Resource Tunneling](./methods/Resource%20Tunneling.md)
- [Filter Lock Link Bot Integration](./info/how%20to%20implement/Link%20Bot%20Integration.md) (for link bot devs)

### Modes

- [Proxy Resource Randomization](./modes/Proxy%20Resource%20Randomization.md)
- [DOM Access Prevention for Filters](./modes/DOM%20Access%20Prevention%20for%20Filters.md)
- ["Wrapping" methods](./modes/"Wrapping"%20methods.md) - This doc details multiple modes inside it.
- [SEO Passthrough](./modes/SEO%20Passthrough.md)
- [Auto Text Escaping](./modes/Auto%20Text%20Escaping.md)

### General Information

- [How to setup the Filter Lock middleware](./info/How%20to%20setup%20the%20Filter%20Lock%20middleware.md) (for proxy site devs)
- [Proxies that Filter Lock supports](./info/Proxies%20that%20Filter%20Lock%20support.md)
- [How your data is protected](./info/How%20your%20data%20is%20protected.md)
- [How Filter Lock compares to Masqr](./info/How%20Filter%20Lock.md%20compares%20to%20Masqr)
