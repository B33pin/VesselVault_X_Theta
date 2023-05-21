// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract BloodDonation is ERC20 {
    enum BloodGroup { 
        A_positive,
        A_negative,
        B_positive,
        B_negative,
        AB_positive,
        AB_negative,
        O_positive,
        O_negative
    }

    struct Campaign {
        bytes32 id;
        address owner;
        string title;
        string description;
        uint256 target;
        uint256 deadline;
        uint256 amountCollected;
        string thumbnail;
        string video;
        string slug;
        address[] donators;
        uint256[] donations;
    }

    struct BloodPouch {
        uint256 pouchID;
        address donorID;
        uint256 donorZipCode;
        string bloodReportStatus;
        BloodGroup bloodGroup;
        address receiverID;
        address guardianID;
    }

    Campaign[] private _campaigns;
    BloodPouch[] private _pouches;
    mapping(uint256 => bool) private _pouchIDs;
    address private _deployer;
    mapping(address => bool) private _guardians;

    modifier onlyGuardian() {
        require(_guardians[msg.sender], "Caller is not a guardian");
        _;
    }

    constructor() ERC20("SOCIAL TOKEN", "SOCIAL") {
        _deployer = msg.sender;
        _guardians[msg.sender] = true; // By default, the deployer is also a guardian
    }

    function addGuardian(address _guardian) public {
        require(msg.sender == _deployer, "Only the deployer can add guardians");
        _guardians[_guardian] = true;
    }

    function enterBloodDetails(
        uint256 _pouchID,
        address _donorID,
        uint256 _donorZipCode,
        string memory _bloodReportStatus,
        BloodGroup _bloodGroup
    ) public onlyGuardian {
        require(!_pouchIDs[_pouchID], "Pouch ID already used");

        BloodPouch memory newPouch = BloodPouch({
            pouchID: _pouchID,
            donorID: _donorID,
            donorZipCode: _donorZipCode,
            bloodReportStatus: _bloodReportStatus,
            bloodGroup: _bloodGroup,
            receiverID: address(0),
            guardianID: msg.sender
        });

        _pouches.push(newPouch);
        _pouchIDs[_pouchID] = true;

        // Mint governance tokens to the donor
        _mint(_donorID, 100 * 10 ** decimals());
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

    function getPouches() public view returns (BloodPouch[] memory) {
        return _pouches;
    }

    uint256 constant private SERVICE_FEE = 100 * 10 ** 18;

    function assignReceiver(uint256 _pouchID) public payable {
        require(_pouchIDs[_pouchID], "Pouch ID does not exist");
        uint256 index;
        bool found = false;

        for (uint256 i = 0; i < _pouches.length; i++) {
            if (_pouches[i].pouchID == _pouchID) {
                index = i;
                found = true;
                break;
            }
        }

        require(found, "Pouch ID does not exist");
        BloodPouch storage pouch = _pouches[index];
        require(pouch.receiverID == address(0), "Pouch already has a receiver");

        // Transfer the received Ether to the guardian's address
        payable(pouch.guardianID).transfer(msg.value);
        pouch.receiverID = msg.sender;
    }

    function isGuardian(address _account) public view returns (bool) {
        return _guardians[_account];
    }

    function getDeployer() public view returns (address) {
        return _deployer;
    }

    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        uint256 _target,
        uint256 _deadline,
        string memory _thumbnail,
        string memory _video,
        string memory _slug
    ) public onlyGuardian returns (bytes32) {
        require(
            _deadline > block.timestamp,
            "The deadline should be a date in the future."
        );

        bytes32 id = keccak256(
            abi.encodePacked(block.timestamp, msg.sender, _campaigns.length)
        );

        Campaign memory newCampaign = Campaign({
            id: id,
            owner: _owner,
            title: _title,
            description: _description,
            target: _target,
            deadline: _deadline,
            amountCollected: 0,
            thumbnail: _thumbnail,
            video: _video,
            slug: _slug,
            donators: new address[](0),
            donations: new uint256[](0)
        });

        _campaigns.push(newCampaign);

        return id;
    }

    function donateToCampaign(uint256 _id) public payable {
        require(
            _id < _campaigns.length,
            "The specified campaign ID does not exist."
        );

        Campaign storage campaign = _campaigns[_id];

        campaign.donators.push(msg.sender);
        campaign.donations.push(msg.value);

        // Transfer the received Ether to the campaign owner's address
        payable(campaign.owner).transfer(msg.value);

        // Mint governance tokens to the donor
        _mint(msg.sender, msg.value);

        campaign.amountCollected += msg.value;
    }

    function getCampaignDonators(
        bytes32 _id
    ) public view returns (address[] memory, uint256[] memory) {
        for (uint256 i = 0; i < _campaigns.length; i++) {
            if (_campaigns[i].id == _id) {
                return (_campaigns[i].donators, _campaigns[i].donations);
            }
        }

        revert("The specified campaign ID does not exist.");
    }

    function getAllCampaigns() public view returns (Campaign[] memory) {
        return _campaigns;
    }

    function getCampaign(bytes32 _id) public view returns (Campaign memory) {
        for (uint256 i = 0; i < _campaigns.length; i++) {
            if (_campaigns[i].id == _id) {
                return _campaigns[i];
            }
        }

        revert("The specified campaign ID does not exist.");
    }
}
