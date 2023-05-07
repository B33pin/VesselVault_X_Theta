// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BloodDonation is ERC20 {
    struct BloodPouch {
        uint256 pouchID;
        uint256 donorID;
        uint256 donorZipCode;
        bool bloodReportStatus;
        uint256 receiverID;
    }

    uint256 private _nextPouchID;
    mapping(uint256 => BloodPouch) private _pouches;

    constructor() ERC20("SOCIAL TOKEN", "SOCIAL") {
        _nextPouchID = 1;
    }

    function enterBloodDetails(
        uint256 donorID,
        uint256 donorZipCode,
        bool bloodReportStatus
    ) public {
        uint256 pouchID = _nextPouchID;
        _nextPouchID += 1;

        BloodPouch memory newPouch = BloodPouch({
            pouchID: pouchID,
            donorID: donorID,
            donorZipCode: donorZipCode,
            bloodReportStatus: bloodReportStatus,
            receiverID: 0
        });

        _pouches[pouchID] = newPouch;

        // Mint governance tokens to the donor
        _mint(msg.sender, 100 * 10**decimals());
    }

    function searchBlood(uint256 victimZipCode)
        public
        view
        returns (BloodPouch[] memory)
    {
        BloodPouch[] memory availablePouches = new BloodPouch[](
            _nextPouchID - 1
        );
        uint256 index = 0;

        for (uint256 i = 1; i < _nextPouchID; i++) {
            BloodPouch storage pouch = _pouches[i];
            if (
                pouch.donorZipCode == victimZipCode &&
                pouch.bloodReportStatus &&
                pouch.receiverID == 0
            ) {
                availablePouches[index] = pouch;
                index++;
            }
        }

        BloodPouch[] memory filteredPouches = new BloodPouch[](index);
        for (uint256 i = 0; i < index; i++) {
            filteredPouches[i] = availablePouches[i];
        }

        return filteredPouches;
    }

    function assignReceiver(uint256 pouchID, uint256 receiverID) public {
        BloodPouch storage pouch = _pouches[pouchID];
        require(pouch.receiverID == 0, "Pouch already has a receiver");

        pouch.receiverID = receiverID;
    }
}
