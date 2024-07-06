declare module "FilterLockBrowserLibrary" {
	enum DistrictsAffected {
		/* https://www.palmbeachschools.org/ */
		SDPBC,
		/* https://bsd405.org */
		BSD405 = 1 << 1,
		LAUSD = 1 << 2,
	}

	interface UserSubmittedProperty {
		/* This is the Discord username of whoever uploaded the file from going through the process of crowdsourcing through the bot. */
		submitter?: string;
		/* This is if the user uploads their policies after being to asked to participate in the type of the crowdsourcing process through the school account checking. This special process is initiated if the domain email of the account is unique and has not yet been supported by Filter Lock.  */
		selfIdentifiedSubmitter?: string;
		anonSubmitter?: true /* This is if the user chooses to have their Discord username masked or to not self-identify themselves when going through the special process. */;
		selfReportedDeviceInfo?: {
			brand: string;
			model: string;
		};
		/* The fields policyValues.status.user.<clientId, gaiaId, profileId, username (your email)>, will be omitted by default when being retrieved from the private DB and if the user provides it that data will be seperated and stored in the private DB, but never uploaded to this repo. The user may also opt out of the policyValues.status.device object from being recorded, but it won't by default. */
		json?: object;
		/* The full JSON represented as a JS object from Fingermark.js */
		fingerprint?: object;
	}

	type DistrictPolicyMap = Map<DistrictsAffected, UserSubmittedProperty[]>;

	type ExtList = {
		[key: string]: {
			name: string;
			url: string;
			districtsAffected: DistrictsAffected;
		};
	}[];
}
