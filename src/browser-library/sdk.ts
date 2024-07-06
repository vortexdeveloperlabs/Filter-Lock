import { errAsync, okAsync, ResultAsync } from "neverthrow";
// TODO: Import the Filter type in index.d.ts for the function isSiteBlocked

/*
The official SDK for interacting with the Filter Lock APIs
*/
export default class FilterLockBrowserIntegrationSDK {
	apiEndpoint: string;

	constructor(apiEndpoint: string) {
		this.apiEndpoint = apiEndpoint;
	}

	/**
	 *
	 * @param syncToken
	 * @returns A boolean indicating whether the sync token is valid
	 */
	async tradeforUT(
		accessToken: string,
		publicKeyForKA?: string
	): ResultAsync<boolean> {
		try {
			const body = {
				publicKeyForKA,
				accessToken,
			};
			if (publicKeyForKA) body.publicKeyForKA = publicKeyForKA;

			const resp = await fetch(this.apiEndpoint + "/trade", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			if (resp.status === 403) {
				return errAsync(
					"Failed to trade the One-time Token for the User Token"
				);
			} else return okAsync(false);
		} catch (err) {
			return errAsync(
				"Error while trading the One-time Token for the User Token: " +
					err
			);
		}
	}
	async isSiteBlocked(link: string, filters: Filter[]): ResultAsync<boolean> {
		try {
			const body = {
				link,
				filters,
			};
			const resp = await fetch(this.apiEndpoint + "/isSiteBlocked", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(body),
			});
			if (resp.status === 200) {
				return okAsync(true);
			} else return okAsync(false);
		} catch (err) {
			return errAsync(
				"Error while checking if a site is blocked: " + err
			);
		}
	}
}
