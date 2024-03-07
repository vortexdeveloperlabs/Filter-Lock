declare module "FilterLockMiddleware" {
  export interface Options {
    /** Required to blacklist or whitelist links */
    exclusionMode?: "blacklist" | "whitelist";
    whitelistedURLs: RegExp[];
    whitelistedHosts: string[];
    blacklistedURLs: RegExp[];
    blacklistedHosts: string[];
    /** This is the DB that is used to store the tokens  */
    RxDb: any; // TODO: Set the type properly
    SQLiteDb: any; // TODO: Set the type properly
  }
}
