import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { Polybase } from "@polybase/client";
import { Wallet } from "ethers";
import { useStateContext } from "./state";

type User = {
  id: string;
  username: string;
  isGuardian: boolean;
  bio: string;
  email: string;
  coverPhoto: string;
  profile: string;
  guardianName: string;
  guardianDetails: string;
  guardianPhoto: string;
  website: string;
  phoneNumber: string;
  country: string;
  zipCode: string;
  facebookLink: string;
  instagramLink: string;
  twitterLink: string;
};

type ContextProps = {
  children: React.ReactNode;
};

type UserContextValue = {
  user: User;
  isGuardian: boolean;
  isAdmin: boolean;
  createUser: (address: string) => Promise<void>;
  addGuardianProfile: (address: string, data: User) => Promise<void>;
  getUserData: (address: string) => Promise<User>;
  getUserByAddress: (address: string) => Promise<User>;
  updateProfile: (data: User) => Promise<User>;
  updateGuardianProfile: (data: User) => Promise<User>;
};

const initialUserState: User = {
  id: "",
  username: "",
  isGuardian: false,
  bio: "",
  email: "",
  coverPhoto: "",
  profile: "",
  guardianName: "",
  guardianDetails: "",
  guardianPhoto: "",
  website: "",
  phoneNumber: "",
  country: "",
  zipCode: "",
  facebookLink: "",
  instagramLink: "",
  twitterLink: "",
};

const UserContext = createContext<UserContextValue>({
  user: initialUserState,
  isGuardian: false,
  isAdmin: false,
  createUser: async () => {},
  addGuardianProfile: async () => {},
  getUserData: async () => initialUserState,
  getUserByAddress: async () => initialUserState,
  updateProfile: async () => initialUserState,
  updateGuardianProfile: async () => initialUserState,
});

const createPolybaseInstance = () =>
  new Polybase({
    defaultNamespace: process.env.NEXT_PUBLIC_NAMESPACE,
    signer: async (data) => {
      const wallet = new Wallet(process.env.NEXT_PUBLIC_PRIVATE_KEY || "");
      return {
        h: "eth-personal-sign",
        sig: await wallet.signMessage(data),
      };
    },
  });

export const UserContextProvider = ({ children }: ContextProps) => {
  const { address, connectBloodDonationContract } = useStateContext();
  const [user, setUser] = useState<User>(initialUserState);
  const [isGuardian, setIsGuardian] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  const createUser = async (address: string) => {
    const db = createPolybaseInstance();
    const checkUser = await db
      .collection("User")
      .where("id", "==", address)
      .get();

    if (checkUser.data.length === 0) {
      await db.collection("User").create([address, "", isAdmin]);
    }
  };

  const addGuardianProfile = async (address: string, data: User) => {
    const db = createPolybaseInstance();
    await db
      .collection("User")
      .record(address)
      .call("addGuardian", [
        data.guardianName,
        data.guardianDetails,
        data.guardianPhoto,
        data.email,
        data.website,
        data.phoneNumber,
        data.country,
        data.zipCode,
      ]);
  };

  const updateProfile = async (data: User) => {
    const db = createPolybaseInstance();
    const res = await db
      .collection("User")
      .record(data.id)
      .call("updateProfile", [
        data.username,
        data.bio,
        data.email,
        data.coverPhoto,
        data.profile,
        data.phoneNumber,
        data.country,
        data.zipCode,
        data.facebookLink,
        data.instagramLink,
        data.twitterLink,
      ]);

    setUser(res.data);
    return res.data;
  };

  const updateGuardianProfile = async (data: User) => {
    const db = createPolybaseInstance();
    const res = await db
      .collection("User")
      .record(data.id)
      .call("addOrganization", [
        data.username,
        data.bio,
        data.coverPhoto,
        data.profile,
        data.guardianDetails,
        data.email,
        data.website,
        data.phoneNumber,
        data.country,
        data.zipCode,
        data.facebookLink,
        data.instagramLink,
        data.twitterLink,
      ]);
    return res.data;
  };

  const getUserData = async (address: string) => {
    const db = createPolybaseInstance();
    const res = await db.collection("User").record(address).get();

    setUser(res.data);
    return res.data;
  };

  const getUserByAddress = async (address: string) => {
    const db = createPolybaseInstance();
    const res = await db.collection("User").record(address).get();

    return res.data;
  };

  useEffect(() => {
    if (address) {
      getUserData(address);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const checkIfGuardian = useCallback(async () => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    setIsGuardian(await contract.isGuardian(address));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  const checkIfAdmin = useCallback(async () => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    setIsAdmin(await contract.isAdmin(address));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    if (address) {
      checkIfGuardian();
    }
  }, [address, checkIfGuardian]);

  useEffect(() => {
    if (address) {
      checkIfAdmin();
    }
  }, [address, checkIfAdmin]);

  return (
    <UserContext.Provider
      value={{
        user,
        isGuardian,
        isAdmin,
        createUser,
        addGuardianProfile,
        getUserData,
        getUserByAddress,
        updateProfile,
        updateGuardianProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
