# Site content tunneled over Wisp - Proposal

[Developer notes](./For%20devs/Site%20content%20over%20Wisp.md)

This will be the foulproof way to prevent Network Fitlers from peeping using [wisp](https://github.com/MercuryWorkshop/wisp-protocol) or any future encrypted backend. This would be the undetectable compared to the "Wrapping" methods, however those will still be supported because this may incur delays and the [Bare V4 Proposal](https://github.com/VyperGroup/specifications-v4) isn't finished yet, would technically allow for encrypted backends through an optional specification. aIt will do this by getting the site content from an encrypted backend. For extension filters, I recommend using [WT/WRTC Data channel/WS resource tunneling](./For%20devs/Index.md) whenever that releases.
