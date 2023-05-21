import { createContext, useContext } from "react";
import { useAddress, useMetamask } from "@thirdweb-dev/react";
import { useDisconnect } from "@thirdweb-dev/react";

type ContextProps = {
  children: React.ReactNode;
};

type DefaultValue = {
  address: string | undefined;
  connect: () => void;
  disconnect: () => void;
};

const contextDefaultValue: DefaultValue = {
  address: undefined,
  connect: () => {},
  disconnect: () => {},
};

const StateContext = createContext(contextDefaultValue);

export const StateContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const address = useAddress();
  const connect = useMetamask();
  const disconnect = useDisconnect();

  // const [address, setAddress] = useState("");
  // const [provider, setProvider] = useState<any>(null);

  // const connect = async (): Promise<ethers.providers.Web3Provider | null> => {
  //   // Check if the Ethereum provider is available
  //   if (typeof window.ethereum === "undefined" || window.ethereum === null) {
  //     console.error("No Ethereum provider found");
  //     return null;
  //   }

  //   try {
  //     // Request access to the user's Ethereum wallet
  //     await (window.ethereum as any).request({ method: "eth_requestAccounts" });

  //     // Create a Web3 provider using the current provider
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);
  //     setProvider(provider);

  //     // Return the connected provider
  //     const signer = provider.getSigner();

  //     // Retrieve the user's Ethereum address
  //     const address = await signer.getAddress();

  //     setAddress(address);

  //     return provider;
  //   } catch (error) {
  //     console.error("Failed to connect to wallet:", error);
  //     return null;
  //   }
  // };

  // const disconnect = async () => {
  //   if (provider && provider.provider && provider.provider._isProvider) {
  //     provider.provider.removeAllListeners();
  //   }
  //   setProvider(null);
  //   setAddress("");
  // };

  // const getUserAddress = async () => {
  //   try {
  //     // Get the signer from the provider
  //     const signer = provider.getSigner();

  //     // Retrieve the user's Ethereum address
  //     const address = await signer.getAddress();

  //     return address;
  //   } catch (error) {
  //     console.error("Failed to retrieve user address:", error);
  //     return null;
  //   }
  // };

  // useEffect(() => {
  //   if (!address && !provider) {
  //     connect();
  //   }

  //   if (!address && provider) {
  //     getUserAddress();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  return (
    <StateContext.Provider
      value={{
        address,
        connect,
        disconnect,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);
