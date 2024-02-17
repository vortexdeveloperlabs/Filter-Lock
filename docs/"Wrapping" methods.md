# "Wrapping" methods - Proposal

These are proposed methods for making Bare V4 endpoints and site content nearly undetectable, while also solve the problem of filters filtering based on what the HTML is to you (personalized blocking is common nowadays).

With any of these methods, filters may start to catch-on. "Wrapping" methods are a cat and mouse game. Some are harder than others to block without sacrificing unintentionally blocking a large percent of sites that use that feature. The unintended consequence to these are they might catch on to these, so I will release them one by one. When one method gets caught on by a certain filter, I will make it so that it can fallback on another method, allowing there to always be a loophole. This would work by giving the links with filter information in the url fragment Additionally, through the configuration on Dispenser, you will be able to chain multiple together and add your own fallbacks.

> I recommend this to be to be used as a secondary layer too with Dispenser Locking, because it can still prevent local analysis.
