# "Wrapping" methods - Dev Docs

> TODO: Make a version of this, but without technical explanations in the parent folder (..)

[Parent](./Index.md)

> TLDR; these are methods for making bare endpoints nearly undetectable and also solve the problem of filters filtering based on what the HTML is to you (personalized blocking is common nowadays)

> With any of these methods, filters may start to catch-on. Some are harder than others to block without sacrificing unintentionally blocking a large percent of sites that use that feature. The unintended consequence to these are they might catch on to these, so I will release them one by one. When one method gets caught on by a certain filter, I will make it so that it can fallback on another method, allowing there to always be a loophole. This would work by giving the links with filter information in the url fragment Additionally, through the configuration on Dispenser, you will be able to chain multiple together and add your own fallbacks.

> I recommend this to be to be used as a secondary layer too with Dispenser Locking, because it can still prevent local analysis.

They will work by either redirecting to a new content type and extension or inject the HTML in a strange way.

## srcdoc

Most filters probably already are aware of this vector. Its use should be obvious. Make sure that the iframe is granted all the permissions that it can have.

## data:html;base64

This involves wrapping all of the content in data:html;base64.

Caveats:

- Filters may already check the content of these, because this protocol is specifically made for HTML

## Bare-only (can't be used for encoding the site content)

### HTML-based

#### [Origin Trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)

HTML with an origin trial with the normal bare response encoded in discreet Origin Trial tags. They wouldn't block this because youtube makes use of them and the Chrome browser itself, for example chrome://tracing. The HTML will randomly be fetched from an educational website of your choice. This will be able to be configured through the [Filter Lock](TODO: link to the Filter Lock HedgeDoc). TOML config and Dispenser.

##### [Chrome Origin trials](https://googlechrome.github.io/OriginTrials/developer-guide.html) ([How common](https://trends.builtwith.com/docinfo/Origin-Trials))

###### Example

If the encoding has patterns that :

```html
<!-- The content hides as a usual Base64-encoded token provided by browser developers -->
<meta
  http-equiv="origin-trial"
  content="{ENCRYPTED BARE RESPONSE ENCODED IN BASE64}"
/>
<!-- The bare response will be encoded with a encryption key from another origin-trial: -->
<meta http-equiv="origin-trial" content="{ENCRYPTION KEY ENCODED IN BASE64}" />
```

> Base64 encoding is used as a secondary layer, because real origin trials use Base64

> A similar thing can be done with data:html;base64 URLs, but TODO: ...

#### [Edge Origin Trials](https://microsoftedge.github.io/MSEdgeExplainers/origin-trials)

> TODO: ...

#### [Mozilla Origin Trials](...)

> TODO: ...

### Conventional / standard file faking

These are meant to put the responses inside of conventional files that they obviously wouldn't block because use of them is standard. These consist of an encryption key somewhere and the encoded content somewhere else.
Since these are meant to only operate in attribute, properties, or comments, if the file already exists, it will simply append to it.
For each of the types of files, you will be able to specify templates on the Dispenser where it wouldllow you to customize the decoy
Since many of these only support one exact file name and relative path, you will be able to chain multiple methods on Dispenser

#### JSON-based

This would add a property to the JSON, which will have the bare meta encoded on it. They obviously wouldn't block the manifest.json.

##### /manifest.json ([How common](https://trends.builtwith.com/docinfo/Web-App-Manifest))

> This would only work with for the bare meta. This is because there is only one default manifest.json, so there could be only one thing using this method. It also happens that manifest.json is only requested once, so more requests, if it was a proxying endpoint, would be suspicious.

#### XML/Text-based

These will return the site content as a comment inside of the file with randomized (per request) encryption of your choice

> XOR is the default, but note that they might start detecting it cracking it soon due to it being a simple (Caeser Cypher-like encryption algorithm)
> Supported conventions: sitemap.xml, robots.txt, or any SVG file

XML-based templating will give you more concealing options (like how the HTML Origin Trials work)
With these you would be able to specify attributes for certain elements or the element content to look for the encryption key and one for the encrypted content

###### data:text;base64

This involves encoding the bare responses in a link
