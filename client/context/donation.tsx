import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import { ethers } from "ethers";
import { useStateContext } from "./state";
import { useUserContext } from "./user";

type ContextProps = {
  children: React.ReactNode;
};

type BloodDetails = {
  pouchID: number;
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
  addUserBloodDetails: (bloodDetails: BloodDetails) => Promise<void>;
  getPouches: () => Promise<any>;
  getSearchBloods: () => Promise<any>;
  assignBloodReceiver: (pouchID: string, amount?: string) => Promise<void>;
};

const contextDefaultValue: DefaultValue = {
  addOrganization: async () => {},
  addUserBloodDetails: async () => {},
  getPouches: async () => [],
  getSearchBloods: async () => [],
  assignBloodReceiver: async () => {},
};

const DonationContext = createContext(contextDefaultValue);

export const DonationContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const { connectBloodDonationContract } = useStateContext();
  const { addOrganizationProfile } = useUserContext();

  const handleTransaction = useCallback(
    async (transactionPromise: Promise<ethers.ContractTransaction>) => {
      console.log(transactionPromise);
      // try {

      //   const transactionResponse = await transactionPromise;
      //   await transactionResponse.wait();
      // } catch (error: any) {
      //   console.error(error.message);
      // }
    },
    []
  );

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

      console.log(
        bloodDetails.pouchID,
        bloodDetails.donarID,
        bloodGroupValue,
        bloodDetails.details
      );
      const response = await contract.enterBloodDetails(
        bloodDetails.pouchID,
        bloodDetails.donarID,
        bloodGroupValue,
        bloodDetails.details
      );

      await response.wait();
    } catch (error) {
      console.log("Add Blood Error", error);
    }
  };

  const parseBloodData = (bloodData: any) => ({
    donarID: bloodData.donorID,
    pouchID: bloodData.pouchID.toNumber(),
    organizationID: bloodData.organizationID,
    receiverID: bloodData.receiverID,
    bloodGroup: bloodData.bloodGroup,
    status: bloodData.status,
  });

  const getPouches = async () => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const pouches = await contract.getPouches();
    return pouches.map(parseBloodData);
  };

  const getSearchBloods = async () => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const bloods = await contract.getAvailablePouches();
    return bloods.map((bloodData: any) => {
      return {
        donarID: bloodData.donorID,
        pouchID: bloodData.pouchID.toNumber(),
        organizationID: bloodData.organizationID,
        bloodGroup: bloodData.bloodGroup,
        status: bloodData.status,
        details: bloodData.details,
        receivedDate: bloodData.receivedDate,
        publishDate: bloodData.publishDate,
      };
    });
  };

  const assignBloodReceiver = async (pouchID: string, amount = "0.002") => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    handleTransaction(
      contract.assignReceiver(pouchID, {
        value: ethers.utils.parseEther(amount),
      })
    );
  };

  return (
    <DonationContext.Provider
      value={{
        addOrganization,
        addUserBloodDetails,
        getSearchBloods,
        getPouches,
        assignBloodReceiver,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonationContext = () => useContext(DonationContext);
