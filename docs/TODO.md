# TODO's

- [ ] Finish creating the tsconfig.json files

### Documentation

- [ ] Fix MD links
- [ ] Create docs for docs.vyper.group
- [ ] Make a TS typedef and generate schemas automatically

### Configure editor integrations

- [ ] VSCode setup default formatters and enable format on save

### Filter Lock Server Implementations

The databases used for storing the tokens will be

- SQLite - The column name would be the proxy link
- RxJS - (abstracted NoSQL)

```ts
interface Collection {
  host: string;
  tokenType: "Access" | "User" | "Sync";
  token: string;
}
```

#### Express/JS

- [ ] Implement the Token Util classes
  - [ ] [Link Locking Tokens](./for%20devs/standards/Link%20Locking%20Tokens.md)
    - [ ] Access Tokens
    - [ ] User Tokens
  - [ ] [Sync Tokens](./for%20devs/standards/Sync%20Tokens.md) - For Dispenser
- [ ] Implement [the APIs](./for%20devs/standards/API%20Endpoints%20for%20Link%20Bot%20Locking.md)
- [ ] Authentication APIs
  - [ ] Link Locking Tokens
    - [ ] Access Tokens
    - [ ] User Tokens
  - [ ] Sync Tokens - For Dispenser
- [ ] Trading API

#### Fastify/JS

#### Hono/JS

#### STD/Go

#### Tower middleware/Rust

### Filter Lock Browser Implementation

- Writes test cases for the Browser SDK that expect to fail

```

```
