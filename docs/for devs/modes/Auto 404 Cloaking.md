# Auto 404 Cloaking - Developer notes - Proposal

[Parent](../../modes/Auto%20404%20Cloaking.md)

There's a quirk in Chrome where any site with a status code of 404 won't show in in the browsing history. This feature will automatically force all the status codes to be 404 when a Chrome User Agent is sent in the Filter Lock middleware.
