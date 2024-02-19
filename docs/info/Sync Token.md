# Sync Token

This isn't actually for the users, but for the per-server staff and proxy site hosters to securely link the Filter Lock Middleware to a link bot.

## The token

> Unlike the [Link Bot Tokens](../For%20devs/methods/Link%20Bot%20Tokens.md), this doesn't need to be hidden from anyone, because it isn't used by filtered users.

`Unix Timestamp for the date of creation` + `Discord Snowflake ID of the member whom last requested it (the per-server staff whom ran onboarding or regenKey)` + `nonce`

> Other than the nonce, the purpose of this is to keep track of who is responsible for any trolling
