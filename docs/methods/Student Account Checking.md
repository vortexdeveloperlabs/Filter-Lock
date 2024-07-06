# Student Account Checking

For most people [Managed Google Account Detection](./Managed%20Google%20Account%20Detection.md)

You must set `config.methods.studentAccountChecking.enable = true;`

## Google

It sends Google Doc link and using the Google APIs checks to see if the account belongs to a school district and if the district is recognized, it checks to see if the email belongs to a student using the crowdsourced data I have collected so far. Every school email is tied to the nonce's of the valid keys the user has registered. This makes it so that someone can't verify links for someone else.

Ideally there should be one doc per student, so another student doesn't permit someone without a student account but making too many Google Docs in use at one time can make the account rate limited. To solve this, if there are any links that haven't been given out in a set amount of time (1 day by default; configurable) and there is nobody on the links, it would give the oldest doc of those choices.

API tokens must be provided for this purpose: `config.methods.studentAccountChecking.googleAPITokens = string[];`

### Teacher Account Verification Nodes

Intended for discord cohorts that don't have any way to differentiate between student and teacher emails. It involves adding a library in Google Apps Script, clicking deploy, and then giving the bot that URL. It uses the Google Classroom API to check the email and determine if it belongs to an "educator. On the link bot you would add something like `/node add <URL>`. Since it also contains the district domain in the URL bar, it would also automatically put you in the correct district cohort if you aren't already.

# Canvas

## OAuth2

This will use ideally OAuth2, but it possible for k12sysadmins to individually disable OAuth2 permissions.
