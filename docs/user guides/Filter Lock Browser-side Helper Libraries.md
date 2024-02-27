# Filter Lock Browser-side Helper Libraries

> ⚠️ Unless you know what you're doing, please don't read this document; it may confuse you. This is only for those interested in modifying the code for Filter Lock's middleware or making their own implementation.

This is where the actual unlocking happens

## Main

```ts
const fl = new FilterLockBrowserIntegration({
  // TODO: ...
});
```

> The SDK methods: tradeForPT() use [neverthrow](https://github.com/supermacro/neverthrow) internally. SDK Methods are methods that internally call the Filter Lock middleware's [APIs endpoints](../for%20devs/standards/API%20Endpoints%20for%20Link%20Bot%20Locking.md).

## Trading

```ts
const ott = fl.tradeForPT(OTT); // This will trade the One Time key for the User Token

if (ott.isOk()) {
} else {
  // TODO: Handle API errors
}
```

`TODO: ...`

## Methods

`TODO: ...`

## Modes

`TODO: ...`
