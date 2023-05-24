import { createContext, useContext } from "react";
import { ethers } from "ethers";
import { useStateContext } from "./state";
import { useUserContext } from "./user";

type ContextProps = {
  children: React.ReactNode;
};

type BloodDetails = {
  donarID: string;
  bloodGroup: string;
  details: string;
};

function getBloodGroupValue(bloodGroup: string) {
  const bloodGroupMap: any = {
    A_positive: 0,
    A_negative: 1,
    B_positive: 2,
    B_negative: 3,
    AB_positive: 4,
    AB_negative: 5,
    O_positive: 6,
    O_negative: 7,
  };

  return bloodGroupMap[bloodGroup as any];
}

type DefaultValue = {
  addOrganization: (address: string, data: any) => Promise<void>;
  addUserBloodDetails: (bloodDetails: BloodDetails) => Promise<any>;
  getAvailablePouches: () => Promise<any>;
  getReceivedPouches: (address: string) => Promise<any>;
  getMyPouches: (address: string) => Promise<any>;
  assignBloodReceiver: (pouchID: number, amount?: string) => Promise<void>;
};

const contextDefaultValue: DefaultValue = {
  addOrganization: async () => {},
  addUserBloodDetails: async () => "",
  getAvailablePouches: async () => [],
  getReceivedPouches: async () => [],
  getMyPouches: async () => [],
  assignBloodReceiver: async () => {},
};

const DonationContext = createContext(contextDefaultValue);

export const DonationContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const { connectBloodDonationContract, address } = useStateContext();
  const { addOrganizationProfile } = useUserContext();

  const addOrganization = async (address: string, data: any) => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const response = await contract.addOrganization(address);

    addOrganizationProfile(address, data);

    await response.wait();
  };

  const addUserBloodDetails = async (bloodDetails: BloodDetails) => {
    try {
      const bloodGroupValue = getBloodGroupValue(bloodDetails.bloodGroup);
      const contract = await connectBloodDonationContract();
      if (!contract) throw new Error("Contract is not connected.");

      const response = await contract.enterBloodDetails(
        bloodDetails.donarID,
        bloodGroupValue,
        bloodDetails.details
      );
      const data = await response.wait();
      return data.events[1].args.pouchID;
    } catch (error) {
      console.error("Add Blood Error", error);
    }
  };

  const getAvailablePouches = async () => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const bloods = await contract.getAllAvailablePouches();
    return bloods.map((bloodData: any) => {
      return {
        pouchID: bloodData.pouchID.toNumber(),
        donarID: bloodData.donorID,
        organizationID: bloodData.organizationID,
        bloodGroup: bloodData.bloodGroup,
        status: bloodData.status,
        details: bloodData.details,
        receiverID: bloodData.receiverID,
        receivedDate: bloodData.receivedDate,
        publishDate: bloodData.publishDate,
      };
    });
  };

  const getReceivedPouches = async (address: string) => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const bloods = await contract.getReceivedPouches(address);
    return bloods.map((bloodData: any) => {
      return {
        pouchID: bloodData.pouchID.toNumber(),
        donarID: bloodData.donorID,
        organizationID: bloodData.organizationID,
        bloodGroup: bloodData.bloodGroup,
        status: bloodData.status,
        details: bloodData.details,
        receiverID: bloodData.receiverID,
        receivedDate: bloodData.receivedDate,
        publishDate: bloodData.publishDate,
      };
    });
  };

  const getMyPouches = async (address: string) => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");

    const bloods = await contract.getMyPouches(address);

    return bloods.map((bloodData: any) => {
      return {
        pouchID: bloodData.pouchID.toNumber(),
        donarID: bloodData.donorID,
        organizationID: bloodData.organizationID,
        bloodGroup: bloodData.bloodGroup,
        status: bloodData.status,
        details: bloodData.details,
        receiverID: bloodData.receiverID,
        receivedDate: bloodData.receivedDate,
        publishDate: bloodData.publishDate,
      };
    });
  };

  const assignBloodReceiver = async (pouchID: number, amount = "0.002") => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const response = await contract.assignReceiver(pouchID, {
      value: ethers.utils.parseEther(amount),
    });

    const data = await response.wait();
    return data;
  };

  return (
    <DonationContext.Provider
      value={{
        addOrganization,
        addUserBloodDetails,
        getAvailablePouches,
        getReceivedPouches,
        getMyPouches,
        assignBloodReceiver,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonationContext = () => useContext(DonationContext);
