// SPDX-License-Identifier: MIT
pragma solidity ^0.8.18;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

/**
 * @title BloodDonation
 * @dev Implements a decentralized application for blood donation campaigns and blood pouch management.
 */
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

    mapping(uint256 => Campaign) private _campaigns;
    mapping(uint256 => BloodPouch) private _pouches;
    uint256 private _campaignCount;
    uint256 private _pouchCount;
    address private _deployer;
    mapping(address => bool) private _guardians;

    modifier onlyGuardian() {
        require(_guardians[msg.sender], "Caller is not a guardian");
        _;
    }

    /**
     * @dev Constructor function
     */
    constructor() ERC20("SOCIAL TOKEN", "SOCIAL") {
        _deployer = msg.sender;
        _guardians[msg.sender] = true;
    }

    /**
     * @dev Function to check if an address is a guardian
     * @param _account The address to check
     * @return A boolean indicating if the address is a guardian
     */
    function isGuardian(address _account) public view returns (bool) {
        return _guardians[_account];
    }

    /**
     * @dev Function to check if an address is a deployer
     * @param _account The address to check
     * @return A boolean indicating if the address is a deployer
     */
    function isDeployer(address _account) public view returns (bool) {
        return _account == _deployer;
    }

    /**
     * @dev Function to add a new guardian
     * @param _guardian The address of the new guardian
     */
    function addGuardian(address _guardian) public {
        require(msg.sender == _deployer, "Only the deployer can add guardians");
        _guardians[_guardian] = true;
    }

    /**
     * @dev Function to enter new blood details
     * @param _pouchID Unique identifier for the blood pouch
     * @param _donorID The address of the donor
     * @param _donorZipCode The zip code of the donor
     * @param _bloodReportStatus The blood report status
     * @param _bloodGroup The blood group
     */
    function enterBloodDetails(
        uint256 _pouchID,
        address _donorID,
        uint256 _donorZipCode,
        string memory _bloodReportStatus,
        BloodGroup _bloodGroup
    ) public onlyGuardian {
        require(_pouches[_pouchID].donorID == address(0), "Pouch ID already used");

        BloodPouch memory newPouch = BloodPouch({
            pouchID: _pouchID,
            donorID: _donorID,
            donorZipCode: _donorZipCode,
            bloodReportStatus: _bloodReportStatus,
            bloodGroup: _bloodGroup,
            receiverID: address(0),
            guardianID: msg.sender
        });

        _pouches[_pouchID] = newPouch;
        _pouchCount++;

        // Mint governance tokens to the donor
        _mint(_donorID, 100 * 10 ** decimals());
    }

    /**
     * @dev Function to get the available blood pouches
     * @return An array of available blood pouches
    */
    function getAvailablePouches() public view returns (BloodPouch[] memory) {
        BloodPouch[] memory availablePouches = new BloodPouch[](_pouchCount);
        uint256 count = 0;

        for (uint256 i = 0; i < _pouchCount; i++) {
            if (_pouches[i].receiverID == address(0)) {
                availablePouches[count] = _pouches[i];
                count++;
            }
        }

        BloodPouch[] memory result = new BloodPouch[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = availablePouches[i];
        }

        return result;
    }

    /**
     * @dev Function to get the blood pouches owned by a specific address
     * @param _owner The address of the owner
     * @return An array of blood pouches owned by the address
    */
    function getMyPouches(address _owner) public view returns (BloodPouch[] memory) {
        BloodPouch[] memory myPouches = new BloodPouch[](_pouchCount);
        uint256 count = 0;

        for (uint256 i = 0; i < _pouchCount; i++) {
            if (_pouches[i].donorID == _owner) {
                myPouches[count] = _pouches[i];
                count++;
            }
        }

        BloodPouch[] memory result = new BloodPouch[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = myPouches[i];
        }

        return result;
    }

    /**
     * @dev Function to get the blood pouches received by a specific address
     * @param _receiver The address of the receiver
     * @return An array of blood pouches received by the address
    */
    function getMyReceivedPouches(address _receiver) public view returns (BloodPouch[] memory) {
        BloodPouch[] memory myReceivedPouches = new BloodPouch[](_pouchCount);
        uint256 count = 0;

        for (uint256 i = 0; i < _pouchCount; i++) {
            if (_pouches[i].receiverID == _receiver) {
                myReceivedPouches[count] = _pouches[i];
                count++;
            }
        }

        BloodPouch[] memory result = new BloodPouch[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = myReceivedPouches[i];
        }

        return result;
    }

    /**
     * @dev Function to assign a receiver to a blood pouch
     * @param _pouchID The ID of the blood pouch
     */
    function assignReceiver(uint256 _pouchID) public payable {
        require(_pouches[_pouchID].donorID != address(0), "Pouch ID does not exist");
        require(_pouches[_pouchID].receiverID == address(0), "Pouch already has a receiver");

        // Transfer the received Ether to the guardian's address
        payable(_pouches[_pouchID].guardianID).transfer(msg.value);
        _pouches[_pouchID].receiverID = msg.sender;
    }

    /**
     * @dev Function to create a new campaign
     * @param _owner The address of the campaign owner
     * @param _title The title of the campaign
     * @param _description The description of the campaign
     * @param _target The target amount of the campaign
     * @param _deadline The deadline of the campaign
     * @param _thumbnail The thumbnail of the campaign
     * @param _video The video of the campaign
     * @param _slug The slug of the campaign
     * @return The ID of the created campaign
     */
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
        require(_deadline > block.timestamp, "The deadline should be a date in the future.");

        bytes32 id = keccak256(abi.encodePacked(block.timestamp, msg.sender, _campaignCount));

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

        _campaigns[_campaignCount] = newCampaign;
        _campaignCount++;

        return id;
    }

    /**
    * @dev Function to get all active campaign details
    * @return An array of active campaign details
    */
    function getAllActiveCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory activeCampaigns = new Campaign[](_campaignCount);
        uint256 activeCampaignCount = 0;

        for (uint256 i = 0; i < _campaignCount; i++) {
            if (_campaigns[i].deadline > block.timestamp) {
                activeCampaigns[activeCampaignCount] = _campaigns[i];
                activeCampaignCount++;
            }
        }

        Campaign[] memory result = new Campaign[](activeCampaignCount);
        for (uint256 i = 0; i < activeCampaignCount; i++) {
            result[i] = activeCampaigns[i];
        }

        return result;
    }

    /**
     * @dev Function to get campaign details by ID
     * @param _id The ID of the campaign
     * @return id The unique identifier of the campaign
     * @return owner The owner of the campaign
     * @return title The title of the campaign
     * @return description The description of the campaign
     * @return target The target amount of the campaign
     * @return deadline The deadline of the campaign
     * @return amountCollected The amount collected by the campaign
     * @return thumbnail The thumbnail of the campaign
     * @return video The video of the campaign
     * @return slug The slug of the campaign
     * @dev Reverts if the specified campaign ID does not exist
    */
    function getCampaign(bytes32 _id) public view returns (
        bytes32 id,
        address owner,
        string memory title,
        string memory description,
        uint256 target,
        uint256 deadline,
        uint256 amountCollected,
        string memory thumbnail,
        string memory video,
        string memory slug,
        address[] memory donators,
        uint256[] memory donations
    ) {
        for (uint256 i = 0; i < _campaignCount; i++) {
            if (_campaigns[i].id == _id) {
                Campaign memory campaign = _campaigns[i];
                return (
                    campaign.id,
                    campaign.owner,
                    campaign.title,
                    campaign.description,
                    campaign.target,
                    campaign.deadline,
                    campaign.amountCollected,
                    campaign.thumbnail,
                    campaign.video,
                    campaign.slug,
                    campaign.donators,
                    campaign.donations
                );
            }
        }

        revert("The specified campaign ID does not exist.");
    }

    /**
     * @dev Function to donate to a campaign
     * @param _id The ID of the campaign
     */
    function donateToCampaign(bytes32 _id) public payable {
        for (uint256 i = 0; i < _campaignCount; i++) {
            if (_campaigns[i].id == _id) {
                Campaign storage campaign = _campaigns[i];

                campaign.amountCollected += msg.value;

                // Add donator and donation amount to the campaign
                campaign.donators.push(msg.sender);
                campaign.donations.push(msg.value);

                // Transfer the received Ether to the campaign owner's address
                payable(campaign.owner).transfer(msg.value);

                // Mint governance tokens to the donor
                _mint(msg.sender, msg.value);
            }
        }
    }

    /**
     * @dev Function to get the list of donators for a campaign donation
     * @param _id The ID of the campaign
     * @return donators An array of donators' addresses
     * @return donations An array of corresponding donation amounts
     * @dev Reverts if the specified campaign ID does not exist
    */
    function getCampaignDonators(bytes32 _id) public view returns (address[] memory, uint256[] memory) {
        for (uint256 i = 0; i < _campaignCount; i++) {
            if (_campaigns[i].id == _id) {
                return (_campaigns[i].donators, _campaigns[i].donations);
            }
        }

        revert("The specified campaign ID does not exist.");
    }
}
