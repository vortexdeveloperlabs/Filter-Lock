# Resource tunneling

Once you pass the Network Fingerprint Hash Checks, you are given the same decoy site, but with the Browser Fingerprint Hash Checks. In Filter Lock, faliure only results in the HTML being cleared. Of course, if the extension imitates the request they will be given the full site content to pass to the filter. This is my proposed mitigation to this problem: include the HTML through WT/WRTC Data Channels and cache it through the SW later on after the pass. Extensions wouldn't be able to imitate it, because they can't imitate.
