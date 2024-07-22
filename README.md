# SimpleStorage Frontend

This is a minimalist frontend for interacting with the SimpleStorage smart contract deployed on the Sepolia network. The frontend is built with plain HTML and JavaScript, without any styling.

## Project Structure

- `index.html` - The main HTML file containing the structure of the frontend.
- `app.js` - The JavaScript file for handling interactions with the smart contract.
- `constants.js` - Contains constants like contract address and ABI.
- `ethers-5.6.esm.min.js` - The Ethers.js library for interacting with the Ethereum blockchain.

## Features

- Connect to a Web3 wallet.
- Store a number in the smart contract.
- Retrieve the stored number from the smart contract.

## Getting Started

### Prerequisites

Ensure you have the following installed:

- A Web3 wallet browser extension like [MetaMask](https://metamask.io/).

### Installation

1. Clone the repository:

```sh
git clone https://github.com/your-repo/simplestorage-frontend.git
cd simplestorage-frontend
```

2. Open the `index.html` file in your preferred web browser.

### Configuration

The `constants.js` file should contain the contract address and ABI. Ensure these are correctly set to match your deployed contract on the Sepolia network.

Example `constants.js`:

```js
export const contractAddress = "YOUR_CONTRACT_ADDRESS";
export const abi = [
  // Your contract ABI here
];
```

### Usage

1. Open the `index.html` file in a web browser.
2. Click the "Connect" button to connect your Web3 wallet.
3. Use the input fields and buttons to interact with the smart contract:
   - Enter a number and click "Set Number" to store a number in the contract.
   - Click "Get Number" to retrieve the stored number.

## Dependencies

- `ethers-5.6.esm.min.js` - Ethers.js library for blockchain interactions.
