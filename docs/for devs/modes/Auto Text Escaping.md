# Auto Text Escaping - Proposal - Developer Notes

In Filters Locks config `config.modes.textEscaping.escapes` you would be able to specify various RegExps and a handler (config.modes.textEscaping.handler). The arguments would be as follows: the RegExp that was matched, the captured text string, and the captured nodes that make up the string. It would be up to the handler to modify the nodes. This means that there would be no return value.

To prevent text detection in extensions, [DOM Access Prevention for filters](./DOM%20Access%20Prevention%20for%20Filters.md) is the ideal option. However, if you are using a Network Filter I recommend using padding escaping and if filters catch on switch to Custom Element escaping.

## Provided handlers

> Document these in the non dev docs

### 1: Custom Element escaping

### 2: Padding escaping

I will provide a default handler which will add a random number (random in the range of min and max which will be the two arguments in the handler) of zero width padding characters (different number each time) for each character.

> ⚠️ This is an easy thing to pick up on, so don't expect it to last for a while

### 3: Escaping through SVG

I will also provide another handler which will wrap links and text inside of an SVG.

> ⚠️ This does not help to prevent against Network Filters
