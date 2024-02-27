# Table of contents - for developers

Developer Notes are for those interested in developing your own implementation. Consider them as the standard.

[Parent](../../README.md)

## Standards

- [API Endpoints for Link Bot Link Bot Locking.md](standards) (a standard as well)
- [Sync Tokens](./standards/Sync%20Token.md) (onboarding for the Filter Lock middleware)

## Methods

- [Filter Testing Methods](./methods/Filter%20Testing%20Methods.md)
- [Link Bot Locking](./standards/Link%20Bot%20Tokens.md)

  - [The Token System](./methods/Link%20Bot%20Tokens.md)
    - [Network fingerprinting](./methods/Link%20Bot%20Tokens.md#Network-identifiable%20fingerprint)
    - [Browser Fingerprinting](./methods/Link%20Bot%20Tokens.md#Browser-identifiable%20fingerprint)
  - [Resource Tunneling](./Resource%20Tunneling.md)

- [Filter Lock Link Bot Integration Guide](./Filter%20Lock%20Link%20Bot%20Integration%20Guide.md) (for link bot devs)

### Modes (listed by importance)

> Please see [How modes are implemented](./misc/How%20modes%20are%20implemented.md) before reading any of the documents below.

- [Proxy Resource Randomization](./modes/Proxy%20Resource%20Randomization.md)
- [DOM Access Prevention for Filters](./modes/DOM%20Access%20Prevention%20for%20Filters.md)
- ["Wrapping" methods](./modes/"Wrapping"%20methods.md) - This doc details multiple modes inside of it.
- [SEO Passthrough](./modes/SEO%20Passthrough.md)
  - [Open Graph Tag Passthrough](./modes/SEO%20Passthrough.md#Open%20Graph%20Tag%20Fixer)
- [Auto Text Escaping](./modes/Auto%20Text%20Escaping.md)
