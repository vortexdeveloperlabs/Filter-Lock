import config from "../config.json" with { type: "json" };

// TODO: Search for the Dispenser-set configuration and use the properties with a higher priority than the local config 
export default () => config;