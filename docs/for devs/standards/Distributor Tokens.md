# Distributor Tokens - Developer Notes

_Unix Timestamp for the date of creation_ `DELIMITER` _The Discord Server ID_ `DELIMITER` _nonce_ `DELIMITER` _IP Addrs?_

> These have no special encrypted because they aren't meant to ever be used by any device with a filter, since they are used internally by the Discord bot only.

These tokens will allow you to bypass any authentication measures that Filter Lock uses. These are primarily for allowing other link bots to audit community links, so that they can be confirmed to be of the category they are advertised for.

## _The Discord Server ID_

The ID of the Discord server of whomever requested the token to be made.

## _IP Addrs_

This is a JS array of strings that are IP addresses. These are an extra layer of security configurable only in the Filter Lock middleware that is intended to tie Distributor Tokens to certain servers that host the Discord Bots.
