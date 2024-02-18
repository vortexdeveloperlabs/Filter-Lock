import defaultProxyFileRandomizer from "./src/server-middleware/util/defaultProxyFileRandomizer";

interface Config {}

const config = {
  proxyFileRandomization: {
    enabled: true,
    handler: defaultProxyFileRandomizer(5, 15),
  },
};

export default config;
