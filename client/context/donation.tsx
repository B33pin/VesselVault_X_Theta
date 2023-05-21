"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ethers } from "ethers";
import { useStateContext } from "./state";

type ContextProps = {
  children: React.ReactNode;
};

type DefaultValue = {
  addGuardianAddress: (address: string) => Promise<void>;
  addUserBloodDetails: (bloodDetails: any) => Promise<any>;
  getSearchBloods: () => Promise<any>;
  getPouches: () => Promise<any>;
  isGuardian: boolean;
  isGuardianLoading: boolean;
  assignBloodReceiver: (pouchID: string, amount?: string) => Promise<any>;
};

const contextDefaultValue: DefaultValue = {
  addGuardianAddress: (string) => Promise.resolve(),
  addUserBloodDetails: (bloodDetails) => Promise.resolve(),
  getSearchBloods: () => Promise.resolve(),
  getPouches: () => Promise.resolve(),
  isGuardian: false,
  isGuardianLoading: true,
  assignBloodReceiver: (pouchID, amount) => Promise.resolve(),
};

const DonationContext = createContext(contextDefaultValue);

export const DonationContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const {connectToContract, signer, address} = useStateContext()
    const [isGuardian, setIsGuardian] = useState(false);
    const [isGuardianLoading, setIsGuardianLoading] = useState(true);

  const addGuardianAddress = async (address: string) => {
    try {
      const contract = await connectToContract();
      const response = await contract.addGuardian(address)
      await response.wait();

      console.log("guardian address added");
    } catch (error) {
      alert(JSON.stringify(error));
      console.error("guardian address failed", error);
    }
  };

  const addUserBloodDetails = async (bloodDetails: any) => {
    try {
      const contract = await connectToContract();
      const response = await contract.enterBloodDetails( 
        bloodDetails.pouchID,
        bloodDetails.donarID,
        bloodDetails.zipCode,
        bloodDetails.bloodReportStatus,
        bloodDetails.bloodGroup,)
      await response.wait();

      console.log("Blood Details Added");
    } catch (error: any) {
      alert(JSON.stringify(error));
      console.error("Blood Details failed", error.message);
    }
  };

  const getPouches = async () => {
    const contract = await connectToContract();
      const pouches = await contract.getPouches();

    const parsedPouches = pouches.map((blood: any) => {
      return {
        donarID: blood.donorID,
        pouchID: blood.pouchID.toNumber(),
        guardianID: blood.donorID,
        receiverID: blood.receiverID,
        bloodGroup: blood.bloodGroup,
        donorZipCode: blood.donorZipCode.toNumber(),
        bloodReportStatus: blood.bloodReportStatus,
      };
    });

    return parsedPouches;
  };

  const getSearchBloods = async () => {
    const contract = await connectToContract();
      const bloods = await contract.searchBlood();

    const parsedBloods = bloods.map((blood: any) => {
      return {
        donarID: blood.donorID,
        pouchID: blood.pouchID.toNumber(),
        bloodGroup: blood.bloodGroup,
        donorZipCode: blood.donorZipCode.toNumber(),
        bloodReportStatus: blood.bloodReportStatus,
        receiverID: blood.receiverID,
      };
    });
    return parsedBloods;
  };

  const assignBloodReceiver = async (
    pouchID: string,
    amount = "0.002"
  ): Promise<any> => {
    const contract = await connectToContract();
      const response = await contract.connect(signer).assignReceiver(pouchID, {
      value: ethers.utils.parseEther(amount),
    });

    await response.wait();

    console.log("Blood Assigned")
  };

  const fetchIsGuardian = useCallback(async (address: string) => {
    const contract = await connectToContract();
    const guardianStatus = await contract.isGuardian(address)
      setIsGuardian(guardianStatus);
    },[]);
  

  useEffect(() => {
    setIsGuardianLoading(true);
    if (address) {
      fetchIsGuardian(address);
    }
    setIsGuardianLoading(false);
  }, [address, fetchIsGuardian]);

  return (
    <DonationContext.Provider
      value={{
        addGuardianAddress,
        addUserBloodDetails,
        getSearchBloods,
        getPouches,
        isGuardian,
        isGuardianLoading,
        assignBloodReceiver,
      }}
    >
      {children}
    </DonationContext.Provider>
  );
};

export const useDonationContext = () => useContext(DonationContext);
