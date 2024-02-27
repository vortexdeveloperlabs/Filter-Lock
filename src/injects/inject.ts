// Only inject when Browser Fingerprints are enabled

import config from ...;
import subDecrypter from ...;

// TODO: Import conditionally
import { CookieStore } from "cookie-observer";

// cookieKeys exists because the cookies may be randomized to prevent detection

// User scope
{
    if (CookieStore.has(config.cookieKeys.userToken)) {

    } else if (CookieStore.has(config.cookieKeys.oneTimeToken) {

    }
}