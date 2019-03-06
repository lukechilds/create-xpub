# create-xpub

> Create a BIP32 extended public key

[![Build Status](https://travis-ci.com/lukechilds/create-xpub.svg?branch=master)](https://travis-ci.com/lukechilds/create-xpub)
[![Coverage Status](https://coveralls.io/repos/github/lukechilds/create-xpub/badge.svg?branch=master)](https://coveralls.io/github/lukechilds/create-xpub?branch=master)
[![npm](https://img.shields.io/npm/v/create-xpub.svg)](https://www.npmjs.com/package/create-xpub)
[![tippin.me](https://badgen.net/badge/%E2%9A%A1%EF%B8%8Ftippin.me/@lukechilds/F0918E)](https://tippin.me/@lukechilds)


Creates a Base58 encoded extended public key (xpub) for use in a [BIP32 hierarchical deterministic wallet](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki).

## Install

```shell
npm install create-xpub
```

## Usage

You should familiarise yourself with [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) to understand what these arguments represent.

```js
const createXpub = require('create-xpub');

const xpub = createXpub({
  depth: 3,
  childNumber: 2147483648,
  chainCode: '84cf7d9029cdd9fcadbb3717fd92ec0db7d7d9787c57c13c08fc887c389b566b',
  publicKey: '048bcdcf59f046b13f1eb35b608d1211265fde8cc44fc7a5a7f7107c5cf238095328a0e0d7be17c7d3e48490e8c6433af6d2c3dacc687f3fecaa98a3d05f17de97'
});
// => 'xpub6CgMcBZk66ayM9ESh7QtBmRKJbsa6rBeBH2k4aQZQJGossryP5r2N2nQS4hBMG1wb8igPoH53bxtzTBaeMqJkbu8bxsih1gGkoAn23Nr8VP'
```

Pass in version bytes for a different network:

```js
const createXpub = require('create-xpub');

const tpub = createXpub({
  networkVersion: createXpub.testnet,
  depth: 3,
  childNumber: 2147483648,
  chainCode: '84cf7d9029cdd9fcadbb3717fd92ec0db7d7d9787c57c13c08fc887c389b566b',
  publicKey: '048bcdcf59f046b13f1eb35b608d1211265fde8cc44fc7a5a7f7107c5cf238095328a0e0d7be17c7d3e48490e8c6433af6d2c3dacc687f3fecaa98a3d05f17de97'
});
// => 'tpubDD3z8RPRoNYRcwRJ9JPyPgkgdiyE6Eghiud3R8ThkD2hdAXgTJh7WUTEg6mxskyBP3Fb1NnwahnwgdgC3DgYe3MRfZd2NYLWLkmBn7UWZXk'
```

### Tip

If you're working with ledgerjs you can pass the output of [`getWalletPublicKey()`](http://ledgerhq.github.io/ledgerjs/docs/#btcgetwalletpublickey) almost directly in.

## API

### createXpub(options)

Returns a Base58 encoded extended public key.

#### options

Type: `Object`

An object containing the following properties of the derivation path.

Consult [BIP32](https://github.com/bitcoin/bips/blob/master/bip-0032.mediawiki) for an in-depth explanation on these properties.

##### networkVersion

Type: `number`<br>
Default: `0x0488B21E` (mainnet)

Network version bytes.

##### depth

Type: `number`<br>
Default: `undefined`

The depth of the derived key.

##### childNumber

Type: `number`<br>
Default: `undefined`

The child number.

##### chainCode

Type: `string`<br>
Default: `undefined`

The chain code.

##### publicKey

Type: `string`<br>
Default: `undefined`

The public key in compressed or uncompressed form.

### createXpub.mainnet

Mainnet (xpub) version bytes: `0x0488B21E`

### createXpub.testnet

Testnet (tpub) version bytes: `0x043587CF`

## License

MIT © Luke Childs
