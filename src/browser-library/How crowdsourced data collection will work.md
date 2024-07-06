# How crowdsourced data collection will work

The data collected will be stored in `UserSubmittedData`, which will be a collection on an SQLite database stored on the servers of Dispenser with the information that the user specified they want to be public put inside of the source code automatically through a GitHub action which uses the private DB, but only for options where the user has given consent during the process. It's important to note that either the Policies JSON, Fingerprint, or both can be given; they don't have to give both. There is never a guarentee that all of the data identifiying your rather than your entire district will be scrubbed properly. For example, the format of the Chrome Policies may be changed and are not up to us, but rather by Google themselves. I will try my best to keep up.

`TODO: ...`
