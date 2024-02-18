# Proxy Resource Randomization - Developer notes - Proposal

Whenver a file for a proxy is used, the path is rewritten in the Filter Lock middleware to be a nonce followed by the ".js". The randomized paths are different for each proxy site origin. You may setup a randomizer handle in the Filter Lock config to do this.

Right now this only changes the actual file names, but soon I will mangle the JS APIs (exported things) and sub encrypt and eval (excluding strict scripts) with JS rewriters and caching
