# How to use the Link bot Integration Libraries

> [parent](../../README.md)

[Dispenser V3](https://github.com/VyperGroup/Dispenser) will be my flagship implementation of Filter Bot locking when it releases

For many Discord bot frameworks, I provide helper libraries that can get you quickly get setup with the bot. I call these "Link bot Integration Libraries. It really is shrimple to setup a Filter Lock integration in your link bot.

If you want to make your own implementation from scratch, [see the API for Filter Lock](../For%20devs/standards/API%20Endpoints%20for%20Link%20Bot%20Locking.md)

## How to setup link distribution

I provide a single method that you can import into your bot through various languages that will wrap whatever code you use to return the link:

```ts
{ // Somewhere in the scope of your handler function
  ...
  message.reply(fl.getLink(serverId, member));
}
```

It's as shrimple as that

###

## Functionality (behind the scenes)

- Revokes keys for banned users
- At all times there is only one key assigned to each Discord member, unless they have a special role that grants them more. For example, premium.

## Commands

If you want the generic slash command system, without the headache of making your own, I provide my own solutions!

For example:

```ts
const fl = new FilterLockIntegration({
  defaultPermissionLevel: ..., // A Discord bit from an enumeration for the default permission level (this will inherit the types from Discord.js) in every server. By default, if omitted, this would be admin perms. Whatever is set here can be overriden by the per-server staff
});

fl.setupSlashCmds(client.commands);
```

It's as shrimple as that

The commands provided are (you don't need to implement these it already does the hard work for you):

#### per-server staff commands

- /fl config ... - documented [here](https://github.com/VyperGroup/Dispenser?tab=readme-ov-file#how-the-config-system-works)
- /fl onboarding ... (look at the subheading 2x below)
- /fl regenKey - This is used to reset and remake a Sync Token. It will send you the Sync Token through an emperal message.

##### User management commands

- /fl revokeUserKey `user`
- /fl blocklistUser `user` - This should do the same as revokeKey, but also prevent the user from using the bot
- /fl viewUserKeys `user?` - By default it will display all of the One-time Keys and Private Tokens with "`user` `key` `expiry`" with them being sorted alphanumberically. If the user argument is provided, it will show all of the keys registered with the user

##### the Onboarding process

To link the bot to your Filter Lock Middleware instance through its APIs, the per-server staff must first run `/fl onboarding`. If it is already linked to another instance it will warn first and specify the instance details

Then it will DM that member asking for the Sync Token. It will have an embed with a textbox and a submit button. All you have to do is type in the Sync Token and then press the submit button. It's as shrimple as that. It will tell you if it was successfully linked or not.

#### How to setup per-server staff roles

If you are a per-server staff with at least the permission level as set by the link bot hoster, you can change whoever can modify how the Filter Bot integration functions. You do this by changing a config: /fl config set permittedRoles ...[`user`]

#### User commands

- /fl viewKeys - View your own keys
- /fl resetKey - Revoke a key and regenerate and a new One-time Key to replace it. This will resend all of the links ever assigned to you, but with the One-time key attached to them.

## Low level API

This would only be used if you want to make your own custom commands rather than Dispenser providing them for you.

> If you want to get even more low level, you could interact with the [low level APIs](../For%20devs/standards/API%20Endpoints%20for%20Link%20Bot%20Locking.md)

For example:

```ts
const fl = new FilterLockIntegration({
  // API Endpoint
  licensingServer: "...",
  token: "...",
});

// This is used to wrap TODO: ...
fl.appendKey(link, memberID);
// TODO: ...
```
