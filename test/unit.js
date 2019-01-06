import test from 'ava';
import createXpub from '..';

const TPUB = 0x043587CF;
const xpubTestParams = {
	depth: 3,
	childNumber: 2147483648,
	chainCode: '84cf7d9029cdd9fcadbb3717fd92ec0db7d7d9787c57c13c08fc887c389b566b',
	publicKey: '048bcdcf59f046b13f1eb35b608d1211265fde8cc44fc7a5a7f7107c5cf238095328a0e0d7be17c7d3e48490e8c6433af6d2c3dacc687f3fecaa98a3d05f17de97'
};
const expectedXpub = 'xpub6CgMcBZk66ayM9ESh7QtBmRKJbsa6rBeBH2k4aQZQJGossryP5r2N2nQS4hBMG1wb8igPoH53bxtzTBaeMqJkbu8bxsih1gGkoAn23Nr8VP';
const expectedTpub = 'tpubDD3z8RPRoNYRcwRJ9JPyPgkgdiyE6Eghiud3R8ThkD2hdAXgTJh7WUTEg6mxskyBP3Fb1NnwahnwgdgC3DgYe3MRfZd2NYLWLkmBn7UWZXk';

test('createXpub is exported', t => {
	t.not(createXpub, undefined);
});

test('createXpub is serialised correctly', t => {
	const xpub = createXpub(xpubTestParams);
	t.is(xpub, expectedXpub);
});

test('Different network version bytes can be passed in', t => {
	const tpub = createXpub({
		...xpubTestParams,
		networkVersion: TPUB
	});
	t.is(tpub, expectedTpub);
});

test('Handles compressed or uncompressed public key', t => {
	const xpubUncompressedKey = createXpub(xpubTestParams);
	const xpubCompressedKey = createXpub({
		...xpubTestParams,
		publicKey: '038bcdcf59f046b13f1eb35b608d1211265fde8cc44fc7a5a7f7107c5cf2380953'
	});
	t.is(xpubUncompressedKey, xpubCompressedKey);
});
