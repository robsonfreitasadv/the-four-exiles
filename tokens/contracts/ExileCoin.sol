// SPDX-License-Identifier: MIT
pragma solidity 0.8.28;

import {ERC20} from "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/// @title ExileCoin — fan meme coin of THE FOUR EXILES
/// @notice Plain ERC-20 with a fixed supply minted once, in the constructor.
/// There is no owner, no mint after deployment, no fees, no pause and no
/// blocklist: after deployment nobody (including the deployer) can change
/// anything. This is a fan collectible with no promise of value.
contract ExileCoin is ERC20 {
    /// @notice Off-chain metadata (name, symbol, description, image), fixed forever.
    string public metadataURI;

    error ZeroRecipient();
    error ZeroSupply();

    /// @param name_ Token name, e.g. "Grays"
    /// @param symbol_ Ticker, e.g. "GRAYS"
    /// @param wholeSupply Total supply in whole tokens (18 decimals are added here)
    /// @param recipient Wallet that receives the entire supply
    /// @param metadataURI_ URL of the metadata JSON
    constructor(
        string memory name_,
        string memory symbol_,
        uint256 wholeSupply,
        address recipient,
        string memory metadataURI_
    ) ERC20(name_, symbol_) {
        if (recipient == address(0)) revert ZeroRecipient();
        if (wholeSupply == 0) revert ZeroSupply();
        metadataURI = metadataURI_;
        _mint(recipient, wholeSupply * 10 ** decimals());
    }
}
