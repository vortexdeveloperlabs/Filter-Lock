import type { HTMLDocument } from "linkedom";

import type { Request, Response } from "express";

declare module "FilterLockServerMiddlewareExpressTypes" {
  export type FilterLockModeHandler = (
    doc: HTMLDocument,
    req: Request,
    res: Response
  ) => void;
}

export {};
