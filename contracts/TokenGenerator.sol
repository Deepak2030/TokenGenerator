// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract TokenGenerator {

    mapping(address => uint256) private _balances;
    mapping(address => mapping(address => uint256)) private _allowances;

    string private i_name;
    string private i_symbol;
    uint8 private immutable i_decimals;
    uint256 private immutable i_totalSupply;

    event Transfer(address indexed from, address indexed to, uint256 value);
    event Approval(address indexed owner, address indexed spender, uint256 value);

    /**
     * @dev Sets the values for {name}, {symbol} and {decimals}
     */
    constructor(string memory name_, string memory symbol_, uint8 decimals_, uint256 totalSupply_) {
        i_name = name_;
        i_symbol = symbol_;
        i_decimals = decimals_;
        i_totalSupply = totalSupply_;
    }

    /**
     * @dev returns totalsupply of the token.
     */
    function totalSupply() external view returns (uint256) {
        return i_totalSupply;
    }

    /**
     * @dev returns balance of given address.
     */
    function balanceOf(address account) external view returns (uint256) {
        return _balances[account];
    }

    /**
     * @dev Moves tokens on behalf of given address.
     */
    function transferFrom(address from, address to, uint256 amount) external returns (bool) {
        _transfer(from, to, amount);
        return true;
    }

    /**
     * @dev Moves `amount` of tokens from `from` to `to`.
     */
    function _transfer(address from, address to, uint256 amount) internal {
        require(from != address(0), "ERC20: transfer from the zero address");
        require(to != address(0), "ERC20: transfer to the zero address");

        uint256 fromBalance = _balances[from];
        require(fromBalance >= amount, "ERC20: transfer amount exceeds balance");
        unchecked {
            _balances[from] = fromBalance - amount;
            _balances[to] += amount;
        }

        emit Transfer(from, to, amount);
    }

    /**
     * @dev Sets `amount` as the allowance of `spender` over the `owner` s tokens.
     */
    function _approve(address owner, address spender, uint256 amount) external {
        require(owner != address(0), "ERC20: approve from the zero address");
        require(spender != address(0), "ERC20: approve to the zero address");

        _allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
    }
}