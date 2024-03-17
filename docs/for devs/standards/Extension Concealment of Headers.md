# Extension Concealment of Headers

- This is formally known as "Election-based ordered encapsulation for unobservable headers"

- This is not the concealment you want if you want to cover up network filters in addition to extension filters use [Double-layer TLS](./Double-layer%20TLS.md) instead, which overs both scenarios well. You can still use Extension Concealement along with Double-layer TLS; I actually recommend this, because even though it can't understand the headers when they are encypted, they still don't even notice the headers leading to less suspicions.

- This only works on Chromium browsers

When I say "unobserverable headers" I mean [these headers](https://developer.chrome.com/docs/extensions/reference/api/webRequest#:~:text=are%20currently%20not%20provided%20to%20the%20onBeforeSendHeaders%20event&text=Authorization,Transfer%2DEncoding)

When I say "observable headers" I mean headers that aren't reserved.

When I say "available concealed headers" I mean reserved headers that are not being used

## How the headers will work

Essentially, all of the non-reserved headers will be put inside of available concealed headers.

The unused (to be used) reserved headers will be formatted as such: _Magic Keyword_ `DELIMITER` _Index_ `DELIMITER` _A fragmented part of the headers JSON_

### Magic Keyword

The headers unused reserved headers will have a magic keyword in the front. This will be used to denote that the value in those headers shouldn't matter. The magic keyword will be different per site, just like how the sub key is different per site. In fact it should be stored in the same DB as the sub key on the same collection.

### Index

This is a number used to determine which keys come first, so they can be sorted.

### A fragmented part of the headers JSON

The headers that are not a part of the

## This works by:

### In the SW

The SW's job is to take all the request headers and conceal the headers from the extension, by formatting the headers as explained above.

### In the Filter Lock Middleware

The Filter Lock Will deconstruct the headers into their original form and set it as the request headers for the other handlers before all of them.
