// TODO: Import the config - import config from ...; - Whimsy

import getConfig from "../../util/getConfig";
const config = getConfig();

/**
 * This should only be used by the Filter Lock API (server-only). This isn't made for anything else.
 */
class AccessTokenUtils {
	accessToken; /*: AccessTokenTypes.AccessToken*/

	constructor(accessToken) {
		this.accessToken = this.deconstruct(accessToken);
	}

	/**
	 * All of the parameters inside of the construct is what is posted, in the request, to the API `Filter Lock API`/genAccessToken.
	 * The only reason why we are having our Filter Lock Middleware (server) generate the things like the timestamps in the Access Token is because we don't trust the user.
	 * TODO: Document the parameters - Ryan
	 * @returns The raw Access Token. This is meant to be sent as a response to the said API.
	 */
	construct(
		userDiscordSnowflakeId: bigint,
		userFilterIdentificationObject: object
	): string {
		// TODO: Generate and return the Access Token as per the spec - Whimsy
		return this.accessToken;
	}

	/**
	 * This allows the Filter Lock middleware (server) can read the Access Token. It's actually never called by the middleware by itself, but it is intented to be called by this.verify(), which is called by the middleware to validate the token.
	 * @param accessToken The raw access token
	 * @returns The parsed Access Token
	 */
	deconstruct(accessToken: string): object {
		const parts = accessToken.split(config.delimiterChar);

		// TODO: Deconstruct and return the Access Token as per the spec - Whimsy
		return { parts };
	}

	/**
	 * Validate means to determine the user to pass through and get to the real site, rather than the decoy.
	 * @param userToken TODO: Properly document this param... - Ryan
	 * Note: Unlike User Token utils, there is no verify passthrough data because there are no fingerprints or hashes that pin the user. Remember the entire purpose of a User Token is to allow the user to get a User Token, which then they can finally proceed to the real site, rather than the decoy site.
	 * @returns A response that indicates if the token is valid. This isn't a boolean, because it is specifically made to tell the problems with the token, so then the API has an appropriate error to give through the API response.
	 */
	validate(
		accessToken /*: AccessTokenTypes.AccessToken*/
	) /*: AccessTokenTypes.NetworkVerifyRet*/ {
		// TODO: If expired return EXPIRED and the corresponding violations

		// Default
		return {
			status: UserTokenTypes.TokenValidityStatus.PASS,
			violations: [],
		};
	}
}

export default UserTokenUtils;
