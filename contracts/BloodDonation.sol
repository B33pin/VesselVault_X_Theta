// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BloodDonation is ERC20 {
    enum BloodGroup {
        A,
        B,
        AB,
        O
    }

    struct BloodPouch {
        uint256 pouchID;
        address donorID;
        uint256 donorZipCode;
        string bloodReportStatus;
        BloodGroup bloodGroup;
        address receiverID;
        address gurdainID;
    }

    BloodPouch[] private _pouches;
    mapping(uint256 => bool) private _pouchIDs;
    address private _deployer;
    mapping(address => bool) private _guardians;

    modifier onlyGuardian() {
        require(_guardians[msg.sender] == true, "Caller is not a guardian");
        _;
    }

    constructor() ERC20("SOCIAL TOKEN", "SOCIAL") {
        _deployer = msg.sender;
        _guardians[msg.sender] = true; // By default, the deployer is also a guardian
    }

    function addGuardian(address guardian) public {
        require(msg.sender == _deployer, "Only the deployer can add guardians");
        _guardians[guardian] = true;
    }

    function enterBloodDetails(
        uint256 pouchID,
        address donorID,
        uint256 donorZipCode,
        string memory bloodReportStatus,
        BloodGroup bloodGroup
    ) public onlyGuardian {
        require(!_pouchIDs[pouchID], "Pouch ID already used");

        BloodPouch memory newPouch = BloodPouch({
            pouchID: pouchID,
            donorID: donorID,
            donorZipCode: donorZipCode,
            bloodReportStatus: bloodReportStatus,
            bloodGroup: bloodGroup,
            receiverID: address(0),
            gurdainID: msg.sender
        });

        _pouches.push(newPouch);
        _pouchIDs[pouchID] = true;

        // Mint governance tokens to the donor
        _mint(donorID, 100 * 10 ** decimals());
    }

    function searchBlood() public view returns (BloodPouch[] memory) {
        uint256 count = 0;
        for (uint256 i = 0; i < _pouches.length; i++) {
            if (_pouches[i].receiverID == address(0)) {
                count++;
            }
        }

        BloodPouch[] memory availablePouches = new BloodPouch[](count);
        uint256 index = 0;

        for (uint256 i = 0; i < _pouches.length; i++) {
            if (_pouches[i].receiverID == address(0)) {
                availablePouches[index] = _pouches[i];
                index++;
            }
        }

        return availablePouches;
    }
uint256 constant SERVICE_FEE = 100 * 10 ** 18; 

function assignReceiver(uint256 pouchID) public {
    require(_pouchIDs[pouchID], "Pouch ID does not exist");
    uint256 index;
    bool found = false;

    for(uint256 i = 0; i < _pouches.length; i++) {
        if (_pouches[i].pouchID == pouchID) {
            index = i;
            found = true;
            break;
        }
    }

    require(found, "Pouch ID does not exist");

    // Check if the sender has enough tokens
    require(balanceOf(msg.sender) >= SERVICE_FEE, "Insufficient funds for assigning receiver");

    BloodPouch storage pouch = _pouches[index];
    require(pouch.receiverID == address(0), "Pouch already has a receiver");

    pouch.receiverID = msg.sender;

    // Transfer the service fee in tokens to the guardian who assigned the blood pouch
    transfer(_pouches[index].gurdainID, SERVICE_FEE);
}




    function isGuardian(address account) public view returns (bool) {
        return _guardians[account];
    }

    function deployer() public view returns (address) {
        return _deployer;
    }
}
