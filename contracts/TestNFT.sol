// SPDX-License-Identifier: MIT
pragma solidity ^0.8.13;

import "../node_modules/@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "../node_modules/@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "../node_modules/@openzeppelin/contracts/access/Ownable.sol";

contract TestNFT is ERC721, ERC721URIStorage, Ownable {
    uint256 private _tokenId;

    constructor() ERC721("TestNFT", "TNFT") {}

    function totalSupply() public view returns (uint256) {
        return _tokenId;
    }

    function _burn(
        uint256 tokenId
    ) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
    }

    function tokenURI(
        uint256 tokenId
    ) public view override(ERC721, ERC721URIStorage) returns (string memory) {
        return super.tokenURI(tokenId);
    }

    function supportsInterface(
        bytes4 interfaceId
    ) public view override(ERC721, ERC721URIStorage) returns (bool) {
        return super.supportsInterface(interfaceId);
    }

    function safeMint(address to, string memory uri) public onlyOwner {
        _tokenId++;
        _safeMint(to, _tokenId);
        _setTokenURI(_tokenId, uri);
    }
}
