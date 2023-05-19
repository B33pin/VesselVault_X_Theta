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
