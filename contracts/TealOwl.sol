// SPDX-License-Identifier: GPL-V3
pragma solidity ^0.8.23;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract TealOwl is ERC721, ERC721Enumerable, ERC721URIStorage {
    uint256 private _nextTokenId = 0;

	// mapping for token IDs
    mapping(string toTokenID => uint256) private _tokenMapping;

    constructor(address defaultAdmin, address minter) ERC721("Teal-Owl", "TO") {}

    function safeMint(string memory toTokenID, string memory uri) public {
        uint256 tokenId = _nextTokenId++;
        _safeMint(msg.sender, tokenId);
        _setTokenURI(tokenId, uri);
		_tokenMapping[toTokenID] = tokenId;
    }

    // The following functions are overrides required by Solidity.

    function _update(address to, uint256 tokenId, address auth)
        internal
        override(ERC721, ERC721Enumerable)
        returns (address)
    {
        return super._update(to, tokenId, auth);
    }

    function _increaseBalance(address account, uint128 value)
        internal
        override(ERC721, ERC721Enumerable)
    {
        super._increaseBalance(account, value);
    }

    function tokenURI(uint256 tokenId)
        public
        view
        override(ERC721, ERC721URIStorage)
        returns (string memory)
    {
        return super.tokenURI(tokenId);
    }

	 function tokenURIS(string memory toTokenID)
        public
        view
        returns (string memory)
    {
        return tokenURI(_tokenMapping[toTokenID]);
    }

    function supportsInterface(bytes4 interfaceId)
        public
        view
        override(ERC721, ERC721Enumerable, ERC721URIStorage)
        returns (bool)
    {
        return super.supportsInterface(interfaceId);
    }
}
