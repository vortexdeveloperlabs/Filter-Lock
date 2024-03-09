# "Wrapping" methods

[Developer notes](../for%20devs/modes/"Wrapping"%20methods.md)

These are proposed methods for making Bare V4 endpoints and site content nearly undetectable while also solving the problem of filtering based on what the HTML is to you (personalized blocking is common nowadays).

Filters may start to catch on with any of these methods. "Wrapping" methods are a cat-and-mouse game. Some are harder than others to block without sacrificing unintentionally blocking a large percent of sites that use that feature. The main concern of these is that they might catch on to them. When one method gets caught by a certain filter, it will be designed to fall back on another method, allowing there to always be a loophole. This will work by giving the links filter information in the URL fragment. Additionally, through the configuration on Dispenser, you will be able to chain multiples together and add your own fallbacks.

- Consider this to be inferior to Double-layer TLS and Resource Tunneling and this should used if you want to sacrifice undetectability for minor performance gains.

TODO: Summarize the methods here in subsections...
