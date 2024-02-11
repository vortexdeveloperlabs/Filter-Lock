# [Filter Lock](./What%20the%20Filter%20Lock%20middleware%20does.md) Developer Notes (Index)

[Parent](../../README.md)

## Glossary

- Request Repeating - Most advanced filters will repeat the same requests that the user sends to the site. They are aware that some systems are locked behind log-ins.
  - Extension-based Request Repeating - This is the worst-case scenario for us, because it allows the extension to bypass Network Fingerprinting with Link Bot Locking, by replicating the request in the extension, since it would have the same User Agent and IP. They might do the filtering on the extension or send the data to their own API's, similarly to how some filters check HTML Content for reactive sites. The good news is that this won't block it for everyone else using the filter globally or in your district, since the data would be able to be spoofed to get any site blocked maliciously, but it is an annoyance to the usser. The only way to bypass, if it ever becomes a problem, is to apply the encoding mechanisms in the Filter Lock config and from there on it is an endless cat and mouse game.

> Raffesia calls this "Imitate Probing"

- Wrapping - Storing code in a weird way or exceedingly standard way that the filters won't pick up on

## Link Bot Integration

- [Tokens](./Dispenser%20Locking’s%20Tokens.md)

## [HTTP Router Middleware](./What%20the%20Filter%20Lock%20middleware%20does.md)
