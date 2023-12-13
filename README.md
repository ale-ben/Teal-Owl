# Teal Owl Project
The Teal Owl project is part of my master thesis in computer science at University of Bologna.
The goal of the project is to prototype a system that allows for tracking of textual media provenance, providing a way to verify the authenticity of the content and the authorship of the text.

## Teal Owl components
- [Teal Owl Reader - Chrome Extension](https://github.com/ale-ben/Teal-Owl_Reader)
- [Teal Owl Publisher - Google Workspace Add On](https://github.com/ale-ben/Teal-Owl_Publisher)
- [Teal Owl Contract - Smart Contract on Ethereum blockchain (this repository)](https://github.com/ale-ben/Teal-Owl_Contract)
- [Teal Owl Watermarking - Core Watermarking logic used by Publisher and Reader](https://github.com/ale-ben/Teal-Owl_Watermarking)

## Teal Owl Contract - Smart Contract on Ethereum blockchain

### Interact withg contract via console
1. `npx hardhat console --network sepolia`
2. `const TOC = await ethers.getContractFactory('TealOwl');`
3. `const to = await TOC.attach('0xA53d7EA22EBc1ed7c769bBc4D7D5089A6cc34440');`
3. `await to.name();;`