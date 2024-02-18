import type { HTMLDocument } from "linkedom/types/html/document";
import type { Request, Response } from "express";

import getConfig from "../../util/getConfig";

import kfs from "key-file-storage";

const toBeConcealedFileNames: string[] = [
  "uv.config.js",
  "uv.bundle.js",
  "uv.sw.js",
];

function createRandFilename(store, key) {
  if (!(key in store))
    store[key] = getConfig().proxyFileRandomization.handler();
}

function expressMiddleware(req: Request, res: Response) {
  const url = new URL(req.pathname);
  const fileName = url.pathname.split("/").at(-1).split("?")[0];

  const store = kfs(req.hostname + "_RANDOMIZED_FILES");

  for (const toBeConcealedFileName of toBeConcealedFileNames)
    if (fileName === toBeConcealedFileName) {
      const key = toBeConcealedFileName;

      createRandFilename(store, key);

      const concealedFileName = store[key];

      url.pathname = url.pathname.replace(
        new RegExp(toBeConcealedFileName),
        concealedFileName
      );

      req.url = url.toString();
    }
}

// TODO: Set as the proper type from index.d.ts
function htmlHandler(doc: HTMLDocument, req: Request, res: Response) {
  const scripts = doc.getElementsByTagName("script");

  const store = kfs(req.hostname + "_RANDOMIZED_FILES");

  for (const script of scripts) {
    if (script.type === "text/javascript" && !script.async && !script.defer) {
      const srcURL = new URL(script.src);
      const fileName = srcURL.pathname.split("/").at(-1).split("?")[0];
      // Ultraviolet
      for (const toBeConcealedFileName of toBeConcealedFileNames)
        if (fileName === toBeConcealedFileName) {
          const key = toBeConcealedFileName;

          createRandFilename(store, key);

          const concealedFileName = store[key];

          script.pathname = srcURL.pathname.replace(
            new RegExp(toBeConcealedFileName),
            concealedFileName
          );

          script.src = srcURL.toString();
        }
    }
  }
}

export { expressMiddleware, htmlHandler };
