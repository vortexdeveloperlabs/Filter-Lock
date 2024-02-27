/**
 * Represents a filter object containing details about a specific filter.
 */
interface Filter {
  /**
   * The shorthand name of the filter.
   */
  filter: string;
  /**
   * The type of filter. Can be "NetworkLowLevel", "DNS", or "Extension". This distinction is important because filtering companies often use different types of filtering methods.
   */
  filterType: "NetworkLowLevel" | "DNS" | "Extension";
}

interface BaseIdentification {
  /**
   * This is the email of the user's account on a managed Chromebook. This is useful because school districts, school k12sysadmins, and teachers, may opt in to configuring site blocks and block category their way.
   */
  UserSelfReportedEmail: string;
  /**
   * User self-reported filters usually collected as soon as the user first uses the link bot.
   */
  UserSelfReportedFilters: Filter[];
}

declare module "PrivateTokens" {
  /**
   * Filter Identification Typescript types that mirror the JSON schema for Private Tokens Tokens
   */
  export interface Identification extends BaseIdentification {
    /**
     * Filters detected by Filter Lock's Browser-side Integration Library
     */
    DetectedFilters: Filter[];
  }
}

declare module "OneTimeTokens" {
  /**
   * Filter Identification Typescript types that mirror the JSON schema for One-time Tokens
   */
  export interface Identification extends BaseIdentification {}
}
