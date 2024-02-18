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

export default function filterLockExpressMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  proxyCodeRandomizationExpressMiddleware(req, res);

  const origSend = res.send;
  // TODO: also overwrite res.write and res.pipe
  res.send = body => {
    const ct = res.headers.get("content-type");
    if (ct !== null) {
      if (ct.startsWith("text/html")) {
        let bodyString: string | null = null;

        if (typeof body === "string") {
          bodyString = res.body;
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
            proxyCodeRandomizationHTMLHandler(doc, req, res);
          // TODO: Implement Bare randomization
          // TODO: Implement SEO Passthrough
          // TODO: Implement text escaping
          // TODO: Implement the rest of the modes
        }
      }
    }
    origSend.call(res, body);
  };
  next();
}
