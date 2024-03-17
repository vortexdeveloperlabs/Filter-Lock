# Sync Tokens - Developer Notes

This isn't actually for the users, but for the per-server staff and proxy site hosters to securely link the Filter Lock middleware to a link bot.

## The token

> Unlike the [Link Bot Tokens](./Link%20Locking%20Tokens.md), this doesn't need to be hidden from anyone, because it isn't used by filtered users.

`Unix Timestamp for the date of creation` `DELIMITER` `Discord Snowflake ID` `DELIMITER` `nonce`

> Other than the nonce, the purpose of this is to keep track of who is responsible for any trolling

### `Discord Snowflake ID`

of the member whom last requested it (the per-server staff whom ran onboarding or regenKey)
