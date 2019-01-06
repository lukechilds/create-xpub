const ow = require('ow');
const bs58check = require('bs58check');
const {sha256, ripemd160} = require('hash.js');

const XPUB = 0x0488B21E;

const compressPublicKey = publicKey => {
	if (publicKey.startsWith('02') || publicKey.startsWith('03')) {
		return publicKey;
	}

	const yIsEven = (parseInt(publicKey.slice(-2), 16) % 2 === 0);

	return (yIsEven ? '02' : '03') + publicKey.slice(2, 66);
};

const hash160 = buf => ripemd160().update(
	sha256().update(buf).digest()
).digest();

const getPublicKeyFingerprint = publicKey => {
	publicKey = Buffer.from(publicKey, 'hex');

	const publicKeyHash = hash160(publicKey);

	return (
		((publicKeyHash[0] << 24) |
      (publicKeyHash[1] << 16) |
      (publicKeyHash[2] << 8) |
      publicKeyHash[3]) >>>
    0
	);
};

const createXpub = ({networkVersion = XPUB, depth, childNumber, chainCode, publicKey}) => {
	ow(networkVersion, ow.number.label('networkVersion'));
	ow(depth, ow.number.label('depth'));
	ow(childNumber, ow.number.label('childNumber'));
	ow(chainCode, ow.string.label('chainCode'));
	ow(publicKey, ow.string.label('publicKey'));

	publicKey = compressPublicKey(publicKey);
	const fingerprint = getPublicKeyFingerprint(publicKey);

	const xpub = Buffer.from([
		networkVersion.toString(16).padStart(8, '0'),
		depth.toString(16).padStart(2, '0'),
		fingerprint.toString(16).padStart(8, '0'),
		childNumber.toString(16).padStart(8, '0'),
		chainCode,
		publicKey
	].join(''), 'hex');

	return bs58check.encode(xpub);
};

module.exports = createXpub;
