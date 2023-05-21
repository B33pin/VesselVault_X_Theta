import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "@/utils/abi";

type ContextProps = {
  children: React.ReactNode;
};

type DefaultValue = {
  address: string | undefined;
  connect: () => void;
  disconnect: () => void;
  signer: any;
  bloodDonationContract: any;
  connectToContract: () => any;
};

const contextDefaultValue: DefaultValue = {
  address: undefined,
  connect: () => {},
  signer: null,
  disconnect: () => {},
  connectToContract: () => {},
  bloodDonationContract: null
};

const StateContext = createContext(contextDefaultValue);

export const StateContextProvider = ({
  children,
}: ContextProps): JSX.Element => {

  const [address, setAddress] = useState("");
  const [provider, setProvider] = useState<any>(null);
  const [signer, setSigner] = useState<any>(null);
  const [bloodDonationContract, setBloodDonationContract] = useState<any>(null);

  const connect = async (): Promise<ethers.providers.Web3Provider | null> => {
    // Check if the Ethereum provider is available
    if (typeof window.ethereum === "undefined" || window.ethereum === null) {
      console.error("No Ethereum provider found");
      return null;
    }

    try {
      await (window.ethereum as any).enable();

      // Create a Web3 provider using the current provider
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      // Return the connected provider
      const signer = provider.getSigner();
      setSigner(signer)

      // Retrieve the user's Ethereum address
      const address = await signer.getAddress();

      setAddress(address);

      setBloodDonationContract(new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS  as string, abi, signer));

      return provider;
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      return null;
    }
  };

  const connectToContract = async () => {
    if (typeof window.ethereum !== "undefined" || window.ethereum !== null) {
      await (window.ethereum as any).request({method: 'eth_requestAccounts'});
      const provider = new ethers.providers.Web3Provider(window.ethereum as any);
      const signer = provider.getSigner();
      const contract = new ethers.Contract(process.env.NEXT_PUBLIC_CONTRACT_ADDRESS  as string, abi, signer)
      return contract;
    }
  }

  const disconnect = async () => {
    if (provider && provider.provider && provider.provider._isProvider) {
      provider.provider.removeAllListeners();
    }
    setProvider(null);
    setAddress("");
  };

  const getUserAddress = async () => {
    try {
      // Get the signer from the provider
      const signer = provider.getSigner();

      // Retrieve the user's Ethereum address
      const address = await signer.getAddress();

      return address;
    } catch (error) {
      console.error("Failed to retrieve user address:", error);
      return null;
    }
  };

  useEffect(() => {
    if (!address && !provider) {
      connect();
    }

    if (!address && provider) {
      getUserAddress();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        signer,
        disconnect,
        bloodDonationContract,
        connectToContract
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
