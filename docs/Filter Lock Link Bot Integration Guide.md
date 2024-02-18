# Filter Lock Link Bot Integration Guide

[parent](../README.md)

## Recommendations

- Revoke keys for banned users
- At all times there only assign one key to each Discord member, unless they have a special role that grants them more. For example, premium.
- Keep your official links unaffected by Filter Lock. Also, add commands to manage which links are unaffected, so your server staff can modify them on the fly.

## Configuration Options

TODO: ...

## Link Bot

> Link bot is only one message

I provide a single method that you can import into your bot through various languages that will wrap whatever code you use to return the link

For example:

```ts
const fl = new FilterLockIntegration({
  // API Endpoint
  licensingServer: "...",
  token: "...",
})

// This is used to wrap
fl.appendKey(link, memberID);

...
```

Additionally for commands:

```ts
fl.revokeKey(memberID);
// Remove all keys
fl.clearKeys();
```

### If you want to make your own implementation from scratch, [see the API](./For%20devs/API%20Endpoints.md)

The Link Bot's niche is to provide the user links with One-time Tokens and possibly manage Private Tokens

#### Commands

You should provide commands similar to:

#### Staff commands

- /revokeKey `user`
- /blocklistUser `user` - This should do the same as revokeKey, but also prevent the user from using the bot
- /viewKeys `user?` - By default it will display all of the One-time Keys and Private Tokens with "`user` `key` `expiry`" with them being sorted alphanumberically. If the user argument is provided, it will show all of the keys registered with the user

#### User commands

- /viewKeys - View your own keys
- /resetKey - Revoke a key and regenerate and a new One-time Key to replace it. This will resend all of the links ever assigned to you, but with the One-time key attached to them.
