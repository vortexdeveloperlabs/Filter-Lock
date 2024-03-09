# Proxy Resource Randomization - Developer notes - Proposal

Whenever a file for a proxy is used, the file name will be rewritten in the Filter Lock middleware to be a nonce. The randomized file names are different for each proxy site origin. It will require you to setup a randomizer handle in the Filter Lock config to do this.
