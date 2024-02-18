# Site content tunneled over Wisp - Developer notes - Proposal

[Parent](../Site%20content%20over%20Wisp)

This will add code to the SW, (or create one, if it doesn't exist. Perhaps Filter Lock is being used by a game site or a proxy site using SW-less) that makes it so that any request to the site's resources will be tunneled through wisp itself. This would prevent the extension and the Network Filters from peeping. There will also be a Fetch API interceptor, so that any request to the site's resources will be tunneled through wisp itself.
