# SEO Passthrough - Developer notes - Proposal

## Configuration

TODO: ...

## Extra

TODO: ...

### Backlinking

When the `googlebot` UA is detected, extra links of your choice are added to the decoy page. This is a component of SEO Passthrough

> The idea was by Rafflesia

### Open Graph Tag fixer

Ssocial media sites wanting check a site secured with Filter Lock by default would find no [Open Graph tags](https://ogp.me/), because the decoy page would be displayed. This would inject the og: tags from the normal site into the decoy site, if user agents for known social media scraper are recognized.
