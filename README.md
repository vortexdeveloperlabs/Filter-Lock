# Filter Lock

Filter Lock is a standard for HTTP Router Middleware that makes your links nearly unblockable and prevents automatic blocking and helps to prevent manual blocks.

Please see the [documentation](./docs/README.md)

> The official JS implementation can be found in src/. Anything you see there will most likely change because the code is not finished yet. Don't attempt to use it. Not even the TODO's or docs are fully completed yet and some are outdated!

The best way to use Filter Lock is to reserve a certain % of your links to be Link Bot Verification and the rest to use Filter Testing for unlocking. These should be subdivided themselves into ones for network filters (Double-layer TLS), extension filters, and both. Also, have demo links for those who aren't subject to filtering or to a lesser extent. For the locked links

## The three parts to Filter Lock:

- Filter Lock Middleware: this is what the proxy site dev sets-up
- Filter Lock Browser Library: this is automatically injected by the Filter Lock Middleware, so you don't have to worry about it as a user
- Filter Lock Link Bot - only needs to be implemented by the link bot devs and is only needed if you use the Link Bot Locking feature
