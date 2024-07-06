import { errAsync, okAsync, ResultAsync } from "neverthrow";

/*
The official SDK for interacting with the Filter Lock APIs on link bots
*/
export default class FilterLockLinkBotIntegrationSDK {
	apiEndpoint: string;

	constructor(apiEndpoint: string) {
		this.apiEndpoint = apiEndpoint;
	}

	/**
	 *
	 * @param syncToken
	 * @returns A boolean indicating whether the sync token is valid
	 */
	async checkSyncTokenValidity(syncToken: string): ResultAsync<boolean> {
		try {
			const resp = await fetch(
				this.apiEndpoint + "/onboarding/checkSyncTokenValidity",
				{
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({ syncToken }),
				}
			);
			if (resp.status === 200) {
				return okAsync(true);
			} else return okAsync(false);
		} catch (err) {
			return errAsync("Error while checking sync token validity: " + err);
		}
	}
	// TODO: Finish the implementation of the SDK
}
