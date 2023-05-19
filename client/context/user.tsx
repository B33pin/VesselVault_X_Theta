import { createContext, useContext, useState } from "react";
import { Polybase } from "@polybase/client";
import { Wallet } from "ethers";

type ContextProps = {
  children: React.ReactNode;
};

type DefaultValue = {
  user: {
    id: string;
    bio: string;
    country: string;
    coverPhoto: string;
    email: string;
    occupation: string;
    profile: string;
    username: string;
    zipCode: string;
  };
  createUser: (address: string) => void;
  getUserData: (address: string) => void;
  updateProfile: (data: User) => void;
};

const contextDefaultValue: DefaultValue = {
  user: {
    id: "",
    bio: "",
    country: "",
    coverPhoto: "",
    email: "",
    occupation: "",
    profile: "",
    username: "",
    zipCode: "",
  },
  createUser: (address) => {},
  getUserData: (address) => {},
  updateProfile: (data) => {},
};

const UserContext = createContext(contextDefaultValue);

export const UserContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const [user, setUser] = useState<User>({
    id: "",
    bio: "",
    country: "",
    coverPhoto: "",
    email: "",
    occupation: "",
    profile: "",
    username: "",
    zipCode: "",
  });

  const wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY || "");

  const polybase = () => {
    const db = new Polybase({
      defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
      signer: async (data) => {
        return {
          h: "eth-personal-sign",
          sig: await wallet.signMessage(data),
        };
      },
    });

    return db;
  };

  const createUser = async (address: string) => {
    const db = polybase();

    try {
      const check_user = await db
        .collection("User")
        .where("id", "==", address)
        .get();
      if (check_user.data.length == 0) {
        await db
          .collection("User")
          .create([address, "", "", "", "", "", "", "", ""]);
      }
      getUserData(address);
    } catch (error) {
      console.log(error);
    }
  };

  const updateProfile = async (data: User) => {
    const db = polybase();

    const res = await db
      .collection("User")
      .record(data.id)
      .call("updateProfile", [
        data.username,
        data.bio,
        data.email,
        data.coverPhoto,
        data.profile,
        data.occupation,
        data.country,
        data.zipCode,
      ]);
    return res.data;
  };

  const getUserData = async (address: string) => {
    const db = polybase();
    const res = await db.collection("User").record(address).get();
    setUser(res.data);
    return res.data;
  };

  return (
    <UserContext.Provider
      value={{
        user,
        createUser,
        getUserData,
        updateProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
