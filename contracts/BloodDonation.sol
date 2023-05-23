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

    enum BloodStatus {
        Available,
        Expired,
        Received
    }

    struct Campaign {
        uint256 id;
        address owner;
        string title;
        string description;
        string imageId;
        string videoId;
        uint256 targetAmount;
        uint256 collectedAmount;
        uint256 creationDate;
        uint256 deadlineDate;
        address[] donators;
        uint256[] donations;
    }

    struct BloodPouch {
        uint256 pouchID;
        BloodGroup bloodGroup;
        address donorID;
        address organizationID;
        address receiverID;
        string details;
        uint256 publishDate;
        uint256 receivedDate;
        BloodStatus status;
    }

    mapping(uint256 => Campaign) private _campaigns;
    mapping(uint256 => BloodPouch) private _pouches;
    uint256 private _campaignCount;
    uint256 private _pouchCount;
    address private _isAdmin;
    mapping(address => bool) private _isOrganization;

    /**
     * @dev Modifier to only allow organization access
     */
    modifier onlyOrganization() {
        require(_isOrganization[msg.sender], "Caller is not an organization");
        _;
    }

    /**
     * @dev Constructor function
     */
    constructor() ERC20("SOCIAL TOKEN", "SOCIAL") {
        _isAdmin = msg.sender;
        _isOrganization[msg.sender] = true;
    }

    /**
     * @dev Function to check if an address is an organization
     * @param _account The address to check
     * @return A boolean indicating if the address is an organization
     */
    function isOrganization(address _account) public view returns (bool) {
        return _isOrganization[_account];
    }

    /**
     * @dev Function to check if an address is an admin
     * @param _account The address to check
     * @return A boolean indicating if the address is an admin
     */
    function isAdmin(address _account) public view returns (bool) {
        return _account == _isAdmin;
    }

    /**
     * @dev Function to add a new organization
     * @param _adminAddress The address of an admin
     */
    function addOrganization(address _adminAddress) public {
        require(msg.sender == _isAdmin, "Only admin can add organization");
        _isOrganization[_adminAddress] = true;
    }

    /**
     * @dev Function to enter new blood details
     * @param _pouchID Unique identifier for the blood pouch
     * @param _donorID The address of the donor
     * @param _bloodGroup The blood group
     * @param _details Additional details about the blood pouch
     */
    function enterBloodDetails(
        uint256 _pouchID,
        address _donorID,
        BloodGroup _bloodGroup,
        string memory _details
    ) public onlyOrganization {
        require(_pouches[_pouchID].donorID == address(0), "Pouch ID already used");

        BloodPouch memory newPouch = BloodPouch({
            pouchID: _pouchID,
            donorID: _donorID,
            bloodGroup: BloodGroup(uint256(_bloodGroup)),
            receiverID: address(0),
            organizationID: msg.sender,
            details: _details,
            publishDate: block.timestamp,
            receivedDate: 0,
            status: BloodStatus.Available
        });

        _pouches[_pouchID] = newPouch;
        _pouchCount++;

        // Mint governance tokens to the donor
        _mint(_donorID, 100 * 10 ** decimals());
    }

    /**
     * @dev Function to get the list of available blood pouches
     * @return An array of available blood pouches
     */
    function getAvailablePouches() public view returns (BloodPouch[] memory) {
        // BloodPouch[] memory availablePouches = new BloodPouch[](_pouchCount);
        // uint256 count = 0;

        // for (uint256 i = 0; i < _pouchCount; i++) {
        //     if (_pouches[i].status == BloodStatus.Available) {
        //         availablePouches[count] = _pouches[i];
        //         count++;
        //     }
        // }

        // BloodPouch[] memory result = new BloodPouch[](count);
        // for (uint256 i = 0; i < count; i++) {
        //     result[i] = availablePouches[i];
        // }

        // return result;
        BloodPouch[] memory allPouches = new BloodPouch[](_pouchCount);

        for (uint256 i = 0; i < _pouchCount; i++) {
            allPouches[i] = _pouches[i];
        }

        return allPouches;
    }

    /**
     * @dev Function to get the list of blood pouches received by the caller
     * @param _receiver The address of the receiver
     * @return An array of blood pouches received by the address
     */
    function getReceivedPouches(address _receiver) public view returns (BloodPouch[] memory) {
        BloodPouch[] memory receivedPouches = new BloodPouch[](_pouchCount);
        uint256 count = 0;

        for (uint256 i = 0; i < _pouchCount; i++) {
            if (_pouches[i].receiverID == _receiver) {
                receivedPouches[count] = _pouches[i];
                count++;
            }
        }

        BloodPouch[] memory result = new BloodPouch[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = receivedPouches[i];
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
     * @dev Function to assign a receiver to a blood pouch
     * @param _pouchID The ID of the blood pouch
     */
    function assignReceiver(uint256 _pouchID) public payable {
        require(_pouches[_pouchID].donorID != address(0), "Pouch ID does not exist");
        require(_pouches[_pouchID].receiverID == address(0), "Pouch already has a receiver");

        // Transfer the received Ether to the receiver's address
        payable(_pouches[_pouchID].receiverID).transfer(msg.value);

        _pouches[_pouchID].receiverID = msg.sender;
        _pouches[_pouchID].status = BloodStatus.Received;
    }

    /**
     * @dev Function to create a new campaign
     * @param _owner The address of the campaign owner
     * @param _title The title of the campaign
     * @param _description The description of the campaign
     * @param _imageId The ID of the campaign's image
     * @param _videoId The ID of the campaign's video
     * @param _targetAmount The target amount of the campaign
     * @param _deadlineDate The deadline date of the campaign
     * @return The ID of the created campaign
     */
    function createCampaign(
        address _owner,
        string memory _title,
        string memory _description,
        string memory _imageId,
        string memory _videoId,
        uint256 _targetAmount,
        uint256 _deadlineDate
    ) public onlyOrganization returns (uint256) {
        uint256 id = uint256(keccak256(abi.encodePacked(blockhash(block.number), block.timestamp, _campaignCount)));

        Campaign memory newCampaign = Campaign({
            id: id,
            owner: _owner,
            title: _title,
            description: _description,
            imageId: _imageId,
            videoId: _videoId,
            targetAmount: _targetAmount,
            collectedAmount: 0,
            creationDate: block.timestamp,
            deadlineDate: _deadlineDate,
            donators: new address[](0),
            donations: new uint256[](0)
        });

        _campaigns[id] = newCampaign;
        _campaignCount++;

        return id;
    }

    /**
     * @dev Function to donate to a campaign
     * @param _id The ID of the campaign
     */
    function donateToCampaign(uint256 _id) public payable {
        require(_campaigns[_id].owner != address(0), "The specified campaign ID does not exist");

        // Transfer the received Ether to the campaign owner's address
        payable(_campaigns[_id].owner).transfer(msg.value);

        // Mint governance tokens to the donor
        _mint(msg.sender, msg.value);

        // Add the donation to the campaign
        _campaigns[_id].donators.push(msg.sender);
        _campaigns[_id].donations.push(msg.value);
        _campaigns[_id].collectedAmount += msg.value;
    }

    /**
    * @dev Function to get all active campaign details
    * @return An array of active campaign details
    */
    function getAllActiveCampaigns() public view returns (Campaign[] memory) {
        Campaign[] memory activeCampaigns = new Campaign[](_campaignCount);
        uint256 activeCampaignCount = 0;

        for (uint256 i = 0; i < _campaignCount; i++) {
            if (_campaigns[i].deadlineDate > block.timestamp) {
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
     * @dev Function to get all campaigns created by the caller (organization)
     * @return An array of campaign IDs
     */
    function getMyCampaigns() public view onlyOrganization returns (uint256[] memory) {
        uint256[] memory myCampaigns = new uint256[](_campaignCount);
        uint256 myCampaignCount = 0;

        for (uint256 i = 0; i < _campaignCount; i++) {
            if (_campaigns[i].owner == msg.sender) {
                myCampaigns[myCampaignCount] = _campaigns[i].id;
                myCampaignCount++;
            }
        }

        uint256[] memory result = new uint256[](myCampaignCount);
        for (uint256 i = 0; i < myCampaignCount; i++) {
            result[i] = myCampaigns[i];
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
     * @return imageId The imageId of the campaign
     * @return videoId The videoId of the campaign
     * @return targetAmount The targetAmount of the campaign
     * @return collectedAmount The amount collected by the campaign
     * @return creationDate The creation date of the campaign
     * @return deadlineDate The deadline date of the campaign
     * @return donators The donators of the campaign
     * @return donations The donations of the campaign
     * @dev Reverts if the specified campaign ID does not exist
    */
    function getCampaign(uint256 _id) public view returns (
        uint256 id,
        address owner,
        string memory title,
        string memory description,
        string memory imageId,
        string memory videoId,
        uint256 targetAmount,
        uint256 collectedAmount,
        uint256 creationDate,
        uint256 deadlineDate,
        address[] memory donators,
        uint256[] memory donations
    ) {
        require(_campaigns[_id].owner != address(0), "The specified campaign ID does not exist");

        Campaign memory campaign = _campaigns[_id];

        return (
            campaign.id,
            campaign.owner,
            campaign.title,
            campaign.description,
            campaign.imageId,
            campaign.videoId,
            campaign.targetAmount,
            campaign.collectedAmount,
            campaign.creationDate,
            campaign.deadlineDate,
            campaign.donators,
            campaign.donations
        );
    }

    /**
     * @dev Function to get the list of donators for a campaign donation
     * @param _id The ID of the campaign
     * @return donators An array of donators' addresses
     * @return donations An array of corresponding donation amounts
     * @dev Reverts if the specified campaign ID does not exist
    */
    function getCampaignDonators(uint256 _id) public view returns (address[] memory, uint256[] memory) {
        require(_campaigns[_id].owner != address(0), "The specified campaign ID does not exist");

        Campaign memory campaign = _campaigns[_id];

        return (campaign.donators, campaign.donations);
    }
}