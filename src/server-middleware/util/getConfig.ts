import config from "../../../config.ts";

// TODO: Search for the Dispenser-set configuration and use the properties with a higher priority than the local config
export default (): GlobalConfig.Config => config;
