# VesselVault

VesselVault is an innovative solution to create a transparent and reliable blood bank tracking system that fosters human connections and ensures fair blood distribution.


## How VesselVault Works:

VesselVault operates through a well-defined flowchart and utilizes a social token system to facilitate efficient blood bank management.

### The VesselVault Flowchart:
The VesselVault flowchart outlines the key steps involved in the system's operation, including blood donation, verification, storage, distribution, and utilization. This comprehensive process ensures that every donated unit of blood is accurately tracked and efficiently allocated to meet the needs of patients.

![FlowChart](https://raw.githubusercontent.com/B33pin/VesselVault_X_Theta/frontend-code/assets/flow-diagram.png)


### The Social Token Flow:
VesselVault employs a social token flow to incentivize blood donation and encourage community participation. Users who donate blood receive social tokens as a recognition of their contribution. These tokens can be redeemed for various benefits, such as priority access to blood units or exclusive rewards. This innovative approach motivates individuals to actively participate in the blood donation process and strengthens community engagement.

![SocailToken](https://raw.githubusercontent.com/B33pin/VesselVault_X_Theta/frontend-code/assets/social-token-flow.png)

---

## Starting the VesselVault Project:

To initiate the VesselVault project, follow these steps:

1. Set Up Private Net:
   - Before anything else, you need to establish your private net. This network will serve as the testing environment for your VesselVault instance.

2. Change RPC URL and Chain ID:
   - Once your private net is up and running, modify the RPC URL and Chain ID in your configuration to match the details of your private net.

3. Compile the Smart Contract:
   - The next step is to compile the bloodDonation.sol smart contract. This contract will govern the interactions within VesselVault.

4. Update Environment Variables:
   - After compiling the smart contract, you'll have access to its ABI (Application Binary Interface) and the address at which it's deployed. Copy these details and replace the corresponding entries in your frontend directory's `.env.local` file. Update `BloodDonation.json` with the compiled smart contract.

Now, your VesselVault test build is ready for demoing!

To start the project, go to the frontend directory and run `npm run dev`.

By implementing VesselVault, you can contribute to a more transparent and equitable blood bank system, ensuring that every donation has a direct impact on saving lives.
