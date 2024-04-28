# Decentralized Google Drive (Dgdrive)

This project is a blockchain-based storage solution that allows users to store and share images securely and transparently. This project leverages Ethereum smart contracts to manage access permissions and data integrity. It enables users to securely upload images to IPFS (InterPlanetary File System) and share access with specified user addresses thought the smart contract functionality.

## Features

- **Secure Storage**: Utilize blockchain technology for decentralized file storage.
- **Controlled Access**: Manage file access through Ethereum smart contracts, ensuring that only authorized users can see or retrieve files.
- **User-friendly Interface**: Easy-to-use web interface built with React for interacting with the blockchain.
- **Privacy and Security**: Enhanced security measures to protect user data and ensure privacy.

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Node.js](https://nodejs.org/en/download/)
- [Metamask](https://metamask.io/download.html) - A crypto wallet & gateway to blockchain apps.
- An IDE like [Visual Studio Code](https://code.visualstudio.com/Download)

### Installing

A step-by-step series of examples that tell you how to get a development environment running:

1. **Clone the repository**

   ```bash
   git clone https://github.com/realsahabia/dgdrive.git
   cd dgdrive
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Compile and deploy the smart contract**

   ```bash
   npx hardhat compile
   npx hardhat ignition deploy ./ignition/modules/Dgdrive.js --network localhost

   ```

4. **Start the application**

   ```bash
   npm start
   ```

## Deployment

This project is deployed on the Arbitrum Sepolia network. You can interact with the smart contract through the live application hosted on Vercel:

- Live Demo: [View Demo](https://full-stack-g-drive-d-app.vercel.app/)

### Deploying with Remix

To deploy using Remix:

1. Go to [Remix Ethereum IDE](https://remix.ethereum.org)
2. Load and compile the smart contract.
3. Connect Remix to the Arbitrum Sepolia network through Metamask.
4. Deploy the contract from Remix.

## Built With

- [React](https://reactjs.org/) - The web framework used.
- [Ethers.js](https://docs.ethers.io/v5/) - Ethereum wallet implementation and utilities.
- [Hardhat](https://hardhat.org/) - Ethereum development environment.
- [Arbitrum](https://arbitrum.io/) - Ethereum scaling solution used for deployments.

## Authors

- **Name** - *Initial work* - [Sahabia](https://github.com/realsahabia)

## Acknowledgments

- [Code Eater Web3](https://www.codeeater.in/)