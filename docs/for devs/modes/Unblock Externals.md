# Unblock Externals

This will allow you to use cross origin resources without having to worry

## Resources

Inside of the site's SW, code will be injected, wherein whenever there is a cross-origin request a fetch request if it fails it will be tried again under a proxy and if it doesn't work the second time it will return the same error as the original request,

## Redirects

Redirects will be intercepted using \[AeroSandbox](`TODO: ...`). A request will be posted to `Filter Lock API`/isSiteBlocked?link=`...` to determine if the site is blocked on the filters the user has. Remember, the filters that the user is detailed in the user's token.
