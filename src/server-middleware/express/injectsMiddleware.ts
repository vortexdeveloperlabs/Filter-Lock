import getConfig from "../";

import { Express, Request, Response, NextFunction } from "express";
// hi who are you
import { DOMParser } from "linkedom";

import genNonceForCookies from "../util/tokens/genNonce";

// Mode handlers
import {
  htmlHandler as proxyCodeRandomizationHTMLHandler,
  expressMiddleware as proxyCodeRandomizationExpressMiddleware,
} from "./modes/proxy-file-randomization";

// For link bot locking and v arious modes
export default function filterLockInjectsMiddleware(
  req: Request,
  resp: Response,
  next: NextFunction
) {
  proxyCodeRandomizationExpressMiddleware(req, resp);

  const origSend = resp.send;
  // TODO: also overwrite res.write and res.pipe
  resp.send = body => {
    const ct = resp.headers.get("content-type");
    if (ct !== null) {
      if (ct.startsWith("text/html")) {
        let bodyString: string | null = null;

        if (typeof body === "string") {
          bodyString = resp.body;
        }
        // TODO: Convert the other possible types into a string

        if (bodyString !== null) {
          const domParser = new DOMParser();
          const doc = domParser.parseFromString(bodyString, ct);

          // TODO: Inject the bundle of injects/inject.js
          if (getConfig().linkBotIntegration.enabled) {
            const injectScript = doc.createElement("script");
            injectScript.src = "/inject.js";
            doc.head.appendChild(injectScript);
          }

          if (getConfig().proxyFileRandomization.enabled)
            proxyCodeRandomizationHTMLHandler(doc, req, resp);
          // TODO: Implement Bare randomization if enabled
          // TODO: Implement SEO Passthrough if enabled
          // TODO: Implement text escaping if enabled
          // TODO: Implement the rest of the modes if enabled
        }
      }
    }
    origSend.call(resp, body);
  };
  next();
}
