# Filter Lock Dev Docs Proposal

> TODO: I still need to move a lot of sections here to the README

## Lock modes

### Base fingerprinting detection

This is to protect automatic link blocking. There is no checks done here.

**Unlock Key** - This can either be the browser's current User Agent and IP address,

After the unlock is successful, a cookie is set so that the unlock key process doesn't have to be repeated. By default the lock mode will be block filter testing.

You will be allowed to customize which options are required and what the fallbacks are.

1. Unless opted out, the site is loaded and locked and will be automatically loaded to the correct "key" in the url. It will be so seamless that the user will never notice Proxy Lock.
       I will provide the option to periodically encrypt these so that filters do not notice these patterns.

The keys will work with this:
    - # `XOR Key`_xorEncode(`IP Addr`_`User-Agent`)
        > With templating > There will be multiple encryption types supported, not just XOR

Filters can't detect hash urls, unless with an injected script with onhashchange, and I will be sure to delete any of the injected scripts from the network extension.

#### In static-only mode

You can get the user agent, rather than through the header with navigator.userAgent
TODO: ...

Static only mode will also require the site's HTML to be injected after it is loaded, which may cause speed delay. Additionally, there would be no UV randomization and you would need a bare server that supports encoding.

#### In GAS

You can get the user agent through htmlOutput.getUserAgent()
You can't get the IP addr in GAS without an external request to be fullfilled

## Integration with Dispenser

You will be able to configure everything about Filter Lock through Dispenser, once your site is integrated. It will internally post to a Dispenser API endpoint with a token that Dispenser gives you (on the server of course).

Additionally, if you are really under attack, you can limit proxy site usage to your Discord members. This will be an additional step before the unlocking methods are tried.

It will work by sending links that have:

### HMAC hashes

The HMAC hashes will expire in 24 hours by default, but that can be changed in Dispenser. They will alo be a one-time use.

#### 1: Query URL based

`link`/?query=`A one time key`

> You will be able to change the url parameter through Dispenser

This will then respond with the unlock page, with the unlock methods

#### 2: Fragment / Header-based

`link`/#`A one time key based on the Discord User ID + UNIX Epoch + a nonce`

> These keys will expire after some time

When the user navigates to the site, they will be shown the decoy page at first, but then it will make a fetch request with a custom header containing the HMAC hash or a post body. The server will respond with the unlock page.

## Filter testing (default)

### 1: Image error checking

This solution is simple and effective with and can be done with HTML and inline JS

It involves setting an image URL to a favicon (which is almost always not restricted by cors) or another image on the site (maybe a CDN) and checking the onerror

### 2: CORS testing (not to be confused with aero's)

This involves sending a Network Request to any resource that is usually CORS denied, but it is rejected for another reason

## School student checking

This requires that you provide your own Google API key for [implicit flow OAuth V2](https://developers.google.com/identity/protocols/oauth2/javascript-implicit-flow) or if you use GCloud [Identity Platform](https://cloud.google.com/identity-platform/docs/web/google)

> Even if external sign-in is blocked by the workspace, you can actually detect that

This is the easiest to use on a GAS-based proxy site.

## New "wrapping" methods

> These also encompass and work as bare encoding methods, and those that have the same name, should be presumed to derive from the wrapping method

They will work by either redirecting to a new content type and extension or inject the HTML in a strange way
Wrapping means executing HTML in a weird way that the filters won't pick up on.

TLDR; these are methods for making bare endpoints nearly undetectable and also solve the problem of filters filtering based on what the HTML is to you (personalized blocking is common nowadays)

### srcdoc

Most filters probably already are aware of this vector. Its use should be obvious. Make sure that the iframe is granted all the permissions that it can have.

### data:html;base64

This involves wrapping all of the site's content in data:html;base64.

Caveats:

- Filters may already check the content of these, because this protocol is specifically made for HTML

### PDFs

This currently only works [in Firefox](https://blog.mozilla.org/attack-and-defense/2021/10/14/implementing-form-filling-and-accessibility-in-the-firefox-pdf-viewer/), but it can function in Chromium if you have this flag enabled: chrome://flags/#pdf-xfa-forms. This allows you to execute an XML-like language inside of PDFs and inside of that a HTML. This will function exactly like the [SVG method](######SVG-specific), but for PDF's!

## Some bare encoding methods that would be provided

With any of these methods, filters may start to catch-on. Some are harder than others to block without sacrificing unintentionally blocking a large percent of sites that use that feature. The unintended consequence to these are they might catch on to these, so I will release them one by one. When one method gets caught on by a certain filter, I will make it so that it can fallback on another method, allowing there to always be a loophole. This would work by giving the links with filter information in the url fragment Additionally, through the configuration on Dispenser, you will be able to chain multiple together and add your own fallbacks.

### HTML-based

#### [Origin Trials](https://github.com/GoogleChrome/OriginTrials/blob/gh-pages/explainer.md)

HTML with an origin trial with the normal bare response encoded in discreet Origin Trial tags. They wouldn't block this because youtube makes use of them and the Chrome browser itself, for example chrome://tracing. The HTML will randomly be fetched from an educational website of your choice. This will be able to be configured through the [Filter Lock](TODO: link to the Filter Lock HedgeDoc). TOML config and Dispenser.

##### [Chrome Origin trials](https://googlechrome.github.io/OriginTrials/developer-guide.html) ([How common](https://trends.builtwith.com/docinfo/Origin-Trials))

###### Example

```html
<!-- The content hides as a usual Base64-encoded token provided by browser developers -->
<meta http-equiv="origin-trial" content="{ENCRYPTED BARE RESPONSE ENCODED IN
BASE64}>
<!-- The bare response will be encoded with a encryption key from another origin-trial: -->
<meta http-equiv="origin-trial" content="ENCRYPTED KEY ENCODED IN BASE64" />
```

> A similar thing can be done with data:html;base64 URLs, but
> ..

#### [Edge Origin Trials](https://microsoftedge.github.io/MSEdgeExplainers/origin-trials)

TODO: ...

#### [Mozilla Origin Trials](...)

TODO: ...

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

## Why Masqr will fail

I don't mean to "expose" Masqr, but I think the solution is rushed, and probably for a good reason. Link leaking is a problem, but that's only because proper protections aren't in place. Masqr only aims to solve once specific part of it, manual filtering, which isn't remotely relevant anymore. It still have a lot of flaws, that they can fix. I am a proponent of having proxy devs learn the hard way. I have found out the hard way that you have to prove something, before anyone listens to you.

### Even with Masqr protection,

Most advanced filters will repeat the same requests that the user sends to the site. They are aware that some systems are locked behind log-ins. This means that the cookie that Masqr sets internally means little. The keys in filter lock can't be repeated.

#### You can bypass the protections as of now with a single cookie

### All the endpoints are still exposed

#### Masqr itself

I admit this is a small thing, but query urls are more scrutinized. Filter Lock uses hashes and fetches it, similarly to how aero uses hashes. It's more especially troubling when the endpoints for generation have identifiable and unencoded text.

#### bare

The bare endpoints and proxy config files are still exposed. In Filter Lock encryption and standard file encoding is applied which helps. This makes use of custom bare transports. Additionally, when requests are send for the main proxy SW file, the shimmed BareClient replaces what was there before.

#### proxy file

This isn't as bad as the bare endpoints being exposed, because it is behind Masqr, but they can still be repeated. Filter Lock applies proxy file encryption, and a simple path rewriter is injected into the index.html files that corresponds to the key that is used there.

### Flaws with key generation

#### The keys for generating the cookie are common

Interally, there set is list of PSK keys that encompass every domain that are used for every user

#### Masqr doesn't store the valid keys persistingly

They store them in an array. Aero doesn't even need to store keys

### Masqr doesn't allow metadata to pass through, which can help spread the links on Social Media or Search Engines

### Wouldn't Masqr help manual filtering?

Yes, but that assumes the sysadmins don't have alts in TN, and besides almost all proxy filtering nowadays is done manually with manual reviews being the only way to clear possible links.

### This discourages any users

..
