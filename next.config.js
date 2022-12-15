/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  env: {
    CONTRACT_ADDRESS:"0x3705218BC1Ee772B484a2a429EdeDFE29d9c7788",
    ABI:[
      {
        "inputs": [
          {
            "internalType": "uint256",
            "name": "_num",
            "type": "uint256"
          }
        ],
        "name": "writeNum",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
      },
      {
        "inputs": [],
        "name": "readNum",
        "outputs": [
          {
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
          }
        ],
        "stateMutability": "view",
        "type": "function"
      }
    ]
  }
}

module.exports = nextConfig
