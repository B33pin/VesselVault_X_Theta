"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import {
  useAddress,
  useContract,
  useContractWrite,
  useMetamask,
} from "@thirdweb-dev/react";
import { ethers } from "ethers";

type ContextProps = {
  children: React.ReactNode;
};

type DefaultValue = {
  contract: any;
  addGuardianAddress: (address: string) => Promise<void>;
  loadingAddGuardian: boolean;
  addUserBloodDetails: (bloodDetails: any) => Promise<any>;
  loadingEnterBloodDetails: boolean;
  getSearchBloods: () => Promise<any>;
  getPouches: () => Promise<any>;
  isGuardian: boolean;
  isGuardianLoading: boolean;
  assignBloodReceiver: (pouchID: string, amount?: string) => Promise<any>;
};

const contextDefaultValue: DefaultValue = {
  contract: "",
  addGuardianAddress: (string) => Promise.resolve(),
  loadingAddGuardian: false,
  addUserBloodDetails: (bloodDetails) => Promise.resolve(),
  loadingEnterBloodDetails: false,
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
  const { contract }: any = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
  const { mutateAsync: addGuardian, isLoading: loadingAddGuardian } =
    useContractWrite(contract, "addGuardian");
  const { mutateAsync: addBloodDetails, isLoading: loadingEnterBloodDetails } =
    useContractWrite(contract, "enterBloodDetails");
  const address = useAddress();
  const connect = useMetamask();
  const [isGuardian, setIsGuardian] = useState(false);
  const [isGuardianLoading, setIsGuardianLoading] = useState(true);

  const addGuardianAddress = async (address: string) => {
    try {
      const data = await addGuardian({
        args: [address],
      });

      console.log("guardian address added", data);
    } catch (error) {
      alert(JSON.stringify(error));
      console.error("guardian address failed", error);
    }
  };

  const addUserBloodDetails = async (bloodDetails: any) => {
    try {
      const data = await addBloodDetails({
        args: [
          bloodDetails.pouchID,
          bloodDetails.donarID,
          bloodDetails.zipCode,
          bloodDetails.bloodReportStatus,
          bloodDetails.bloodGroup,
        ],
      });

      console.log("Blood Details Added", data);
    } catch (error: any) {
      alert(JSON.stringify(error));
      console.error("Blood Details failed", error.message);
    }
  };

  const getPouches = async () => {
    const pouches = await contract.call("getPouches");

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
    const bloods = await contract.call("searchBlood");

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
    const data = await contract.call("assignReceiver", [pouchID], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const fetchIsGuardian = useCallback(
    async (address: string) => {
      const guardianStatus = await contract.call("isGuardian", [address]);
      setIsGuardian(guardianStatus);
    },
    [contract]
  );

  useEffect(() => {
    setIsGuardianLoading(true);
    if (address && contract) {
      fetchIsGuardian(address);
    }
    setIsGuardianLoading(false);
  }, [address, contract, fetchIsGuardian, connect]);

  return (
    <DonationContext.Provider
      value={{
        contract,
        addGuardianAddress,
        loadingAddGuardian,
        addUserBloodDetails,
        loadingEnterBloodDetails,
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
