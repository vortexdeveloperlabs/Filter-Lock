# How [Masqr](https://github.com/titaniumnetwork-dev/MasqrProject) compares to Filter Lock

> This is a working document

Masqr is a solution to link leaking inspired by Filter Lock by Titanium Network. I don't mean to "expose" Masqr, but I think the solution is rushed, and probably for a good reason. Link leaking is a problem, but that's only because proper protections aren't in place. Masqr only aims to solve once specific part of it, manual filtering, which isn't remotely relevant anymore. It still has a lot of flaws, that they can fix.

You could also use Masqr and Filter Lock together, but with using Filter Lock only for certain features besides locking

### Request Repeating

Due to [Request Repeating](For devs/Index.md#Terms), the Masqr sets internally means little. Additionally as a user, you can bypass the protections with a single cookie. The token in filter lock can't be repeated.

### All the endpoints are still exposed

#### Exposed Query URLs

I admit this is a minor thing, but query urls are more scrutinized by Filters.

Filter Lock uses fragment URL and communicates with the licensing server on a modified decoy page, similarly to how aero uses hashes. It's more especially troubling when the endpoints for generation have identifiable and unencoded text.

#### bare

The bare endpoints and proxy config files are still exposed in Masqr

In Filter Lock encryption and standard file encoding is applied which helps. This makes use of custom bare transports. Additionally, when requests are send for the main proxy SW file, the shimmed BareClient replaces what was there before.

#### Proxy files

This isn't as bad as the bare endpoints being exposed, because it is behind Masqr, but they can still be repeated. Filter Lock "wraps" the html.

### Flaws with key generation

#### The keys for generating the cookie are common

Interally, there set is list of PSK keys that encompass every domain that are used for every user

### Masqr doesn't allow metadata to pass through, which can help spread the links on Social Media or Search Engines

### Wouldn't Masqr help manual filtering?

Yes, but that assumes the sysadmins don't have alts in TN, and besides almost all proxy filtering nowadays is done manually with manual reviews being the only way to clear possible links.
