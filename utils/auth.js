const { ethers, providers } = require("ethers")
const axios = require("axios").default

async function verifyUserSign_0x9990(message, address, signature) {
  try {
    const signerAddr = await ethers.utils.verifyMessage(message, signature)
    if (signerAddr.toLowerCase() !== address) {
      return false
    }
    return true
  } catch (err) {
    return false
  }
}

async function getRawJsonData(url) {
  let rawJson = await GetJson(url)
  if (rawJson.status == 0) {
    return false
  } else {
    const contractABI = JSON.parse(rawJson.result)
    return contractABI
  }
}

async function GetJson(url) {
  let a = await axios.get(url)
  return a.data
}
const collectionValidation = async function GetABI(collectionAddress) {
  // test success collection address 0x7efeaf48c461084b96a71279de921f62c0c80c12
  // test fail collection address 0xB2B7Cd5e88ce1E0371D70Bb57c923fcC65bd3783
  let isValidAddress = ethers.utils.isAddress(collectionAddress.toLowerCase())
  let Network = "MATIC"
  if (isValidAddress) {
    let selectedNetwork = null
    let abiContractURI =
      "https://api-testnet.polygonscan.com/api?module=contract&action=getabi&address="
    if (Network === "MATIC") {
      selectedNetwork = abiContractURI
    }
    let url = selectedNetwork + collectionAddress
    let response = await getRawJsonData(url)
    return response
  }
}

async function getUserNfts(networkName, collectionAddress, walletAddress) {
  // MATIC, ETH,
  // collectionAddress  0xe9c339944b2aD9B7aA95F15f6CF0322D1CCB7d6A
  // let walletAddress =  '0x9E5451052a4E44C102E5292B77F130055C96C234' // for success
  // walletAddress 0xB2B7Cd5e88ce1E0371D70Bb57c923fcC65bd3783 // for fail
  const privateKey =
    "11aa78f2b32af7dc6c5933157e1144eca14306f9d18a7371eb4c24fef14d57d6"
  const signer = new ethers.Wallet(privateKey, providers.getDefaultProvider())

  let ABI = await collectionValidation(collectionAddress)
  const ERC721 = new ethers.Contract(
    "0x3c6e7846Fe99f1A1d4209b5118deC33504D61978",
    ABI,
    signer
  )
  console.log("ERC721", ERC721)
  console.log("walletAddress: ", walletAddress)

  let balance = await ERC721.balanceOf(
    "0x99E80F480Ce5587442A1305509be0F927196e29C"
  ).catch((error) => {
    console.log("Error: ", error)
  })
  console.log("Balance: ", balance.toString())
  if (balance > 0) {
    console.log("Success")
  } else {
    console.log("Fail")
  }
}

module.exports = {
  verifyUserSign_0x9990,
  collectionValidation,
  getUserNfts
}
