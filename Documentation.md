# Storage Smart Contract

This is a simple Ethereum smart contract written in Solidity which basically lets you store and retrieve values.

## Getting Started

To interact with this smart contract, you'll need 
* Ethereum wallet provider such as Metamask. 
* Ensure you have Metamask installed in your browser and connected to the Ethereum network.

### Installation

* Clone this repository to your local machine:
* Install dependencies:

```bash
npm install
```

### Usage

1. Run the React frontend:

```bash
npm start
```

2. Connect your Ethereum wallet (e.g., Metamask).

3. Interact with the smart contract through the provided user interface:
   - Read the currently stored number.
   - Write a new number to be stored.
   - Delete the currently stored number.

## Smart Contract Functions

### `writeNum(uint _num)`

Allows you to store a new unsigned integer value.

### `readNum()`

Returns the currently stored unsigned integer value.

### `deleteNum()`

Deletes the currently stored unsigned integer value.


## License

This project is licensed under the MIT License.

---

Feel free to customize this README according to your project's specific requirements and features.