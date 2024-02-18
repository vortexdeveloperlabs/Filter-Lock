import genNonceInRandRange from "../../Middleware-common/tokens/genNonce";

/**
 * This is recommended because it ensures that the proxy filter can't easily detect the Proxy File Randomization by simply checking the unique and length of the file names of the scripts
 * @param min
 * @param max
 * @returns
 */
export default function defaultProxyFileRandomizer(min: number, max: number) {
  return fileName => genNonceInRandRange(min, max);
}
