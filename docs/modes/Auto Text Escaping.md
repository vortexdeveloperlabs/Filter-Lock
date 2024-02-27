# Auto Text Escaping

[Developer notes](../for%20devs/modes/Auto%20Text%20Escaping.md)

This would allow keywords like "Proxy" and "Ultraviolet" to automatically be escaped helping to prevent the detection of the site's text through injected content scripts or analysis in a network filter. This will be done in the Middleware itself, unless "Filter Detection" is employed, where the rewrites will happen in a SW (the data comes from a tunnel anyways).
