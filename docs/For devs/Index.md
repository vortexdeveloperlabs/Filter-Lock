# [Filter Lock](./What%20the%20Filter%20Lock%20middleware%20does.md) Developer Notes (Index)

[Parent](../../README.md)

## Glossary

- WT/WRTC Data channel/WS resource tunneling - Once you pass the Network Fingerprint Hash Checks, you are given the same decoy site, but with the Browser Fingerprint Hash Checks. In Filter Lock, faliure only results in the HTML being cleared. Of course, if the extension imitates the request they will be given the full site content to pass to the filter. This is my proposed mitigation to this problem, include the HTML through WT/WRTC Data Channels and cache it through the SW later on after the pass. Extensions wouldn't be able to imitate it, because they can't imitate.

> TODO: I will eventually document this method into its own files

> This method is not guaranteed work with Network Filters. At this time, I recommend serving the HTML through Wisp. This requires the use of the Wisp backend.

- Request Repeating - Most advanced filters will repeat the same requests that the user sends to the site. They are aware that some systems are locked behind log-ins.
  - Extension-based Request Repeating - This is the worst-case scenario for us, because it allows the extension to bypass Network Fingerprinting with Link Bot Locking, by replicating the request in the extension, since it would have the same User Agent and IP. They might do the filtering on the extension or send the data to their own API's, similarly to how some filters check HTML Content for reactive sites. The good news is that this won't block it for everyone else using the filter globally or in your district, since the data would be able to be spoofed to get any site blocked maliciously, but it is an annoyance to the usser. The only way to bypass, if it ever becomes a problem, is to apply the encoding mechanisms in the Filter Lock config and from there on it is an endless cat and mouse game.

> Raffesia calls this "Imitate Probing"

- Wrapping - Storing code in a weird way or exceedingly standard way that the filters won't pick up on

## Link Bot Integration

- [Tokens](./Dispenser%20Locking’s%20Tokens.md)

## [HTTP Router Middleware](./What%20the%20Filter%20Lock%20middleware%20does.md)
