import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "@/utils/abi";

declare let window: any;

type ContextProps = {
  children: React.ReactNode;
};

type ProviderValue = {
  address: string | null;
  balance: string | null;
  connectWallet: () => Promise<void>;
  connectBloodDonationContract: () => Promise<ethers.Contract | void>;
  disconnectWallet: () => void;
};

const StateContext = createContext<ProviderValue>({
  address: null,
  balance: null,
  connectWallet: async () => {},
  connectBloodDonationContract: async () => {},
  disconnectWallet: () => {},
});

export const StateContextProvider = ({ children }: ContextProps) => {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<string | null>(null);

  const connectBloodDonationContract = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract(
      process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string,
      abi,
      signer
    );

    return contract;
  };

  const connectWallet = async () => {
    if (address) {
      return;
    }

    try {
      if (!window.ethereum) {
        throw new Error("MetaMask extension not found.");
      }

      await window.ethereum.request({ method: "eth_requestAccounts" });

      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const address = await signer.getAddress();

      setAddress(address);

      // const network = await provider.getNetwork();

      // console.log(network)

      // if (network.name !== "privatenet") {
      //   alert(`This dApp only supports the Theta mainnet.`);
      //   return console.warn(`This dApp only supports the Theta mainnet.`);
      // }

      const balance = await provider.getBalance(address);
      const etherBalance = ethers.utils.formatEther(balance);
      setBalance(etherBalance);

      await connectBloodDonationContract();

      window.ethereum.on("accountsChanged", function (accounts: string[]) {
        setAddress(accounts[0]);
      });
    } catch (error) {
      console.error("Failed to connect to wallet:", error);
      alert(
        "Failed to connect to wallet. Please make sure MetaMask is installed and unlocked."
      );
    }
  };

  const disconnectWallet = () => {
    if (window.ethereum) {
      window.ethereum.removeAllListeners();
      setAddress(null);
    }
  };

  useEffect(() => {
    if (!window.ethereum) {
      alert("MetaMask extension not found. Please install MetaMask!");
      console.error("MetaMask extension not found. Please install MetaMask!");
    } else {
      connectWallet();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    connectWallet();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  return (
    <StateContext.Provider
      value={{
        address,
        balance,
        connectWallet,
        disconnectWallet,
        connectBloodDonationContract,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
