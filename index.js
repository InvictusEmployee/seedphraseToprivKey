const HDKey = require("hdkey");
const bip39 = require("bip39");
const ethUtil = require("ethereumjs-util");

const seedPhrase = "your seed phrase"; // seed phrase is case sensitive
const desiredAddress = "0x..."; // replace with the desired address

// Generate the seed from the seed phrase
const seed = bip39.mnemonicToSeedSync(seedPhrase);

// Create a new HDKey instance
const hdkey = HDKey.fromMasterSeed(seed);

// Define the account path pattern
const accountPathPattern = `m/44'/60'/0'/0/`;

// Loop through account indices and check their addresses
for (let i = 0; i < 10000; i++) {
  const accountPath = accountPathPattern + i;
  const accountPrivateKey = hdkey.derive(accountPath).privateKey;
  const accountAddress = ethUtil
    .privateToAddress(accountPrivateKey)
    .toString("hex");
  const accountAddress0x = "0x" + accountAddress;
  //   if (i % 10 === 0) console.log("accountAddress0x", accountAddress0x);
  //   console.log("accountAddress0x", accountAddress0x);

  if (accountAddress0x.toLowerCase().startsWith(desiredAddress.toLowerCase())) {
    console.log("Match found:");
    console.log("Account Index:", i);
    console.log("accountAddress0x", accountAddress0x);
    console.log("Account Private Key:", accountPrivateKey.toString("hex"));
    break;
  }
}
