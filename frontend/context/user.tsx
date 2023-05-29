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
  isOrganization: boolean;
  bio: string;
  email: string;
  coverPhoto: string;
  profile: string;
  organizationName: string;
  organizationDetails: string;
  organizationPhoto: string;
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
  isOrganization: boolean;
  isAdmin: boolean;
  createUser: (address: string) => Promise<void>;
  addOrganizationProfile: (address: string, data: User) => Promise<void>;
  getUserData: (address: string) => Promise<User>;
  getUserByAddress: (address: string) => Promise<User>;
  updateProfile: (data: User) => Promise<User>;
  updateOrganizationProfile: (data: User) => Promise<User>;
};

const initialUserState: User = {
  id: "",
  username: "",
  isOrganization: false,
  bio: "",
  email: "",
  coverPhoto: "",
  profile: "",
  organizationName: "",
  organizationDetails: "",
  organizationPhoto: "",
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
  isOrganization: false,
  isAdmin: false,
  createUser: async () => {},
  addOrganizationProfile: async () => {},
  getUserData: async () => initialUserState,
  getUserByAddress: async () => initialUserState,
  updateProfile: async () => initialUserState,
  updateOrganizationProfile: async () => initialUserState,
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
  const [isOrganization, setIsOrganization] = useState(false);
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

  const addOrganizationProfile = async (address: string, data: User) => {
    const db = createPolybaseInstance();
    await db
      .collection("User")
      .record(address)
      .call("addOrganization", [
        data.organizationName,
        data.organizationDetails,
        data.organizationPhoto,
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

  const updateOrganizationProfile = async (data: User) => {
    const db = createPolybaseInstance();
    const res = await db
      .collection("User")
      .record(data.id)
      .call("addOrganization", [
        data.username,
        data.bio,
        data.coverPhoto,
        data.profile,
        data.organizationDetails,
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

  const checkIfOrganization = useCallback(async () => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    setIsOrganization(await contract.isOrganization(address));
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
      checkIfOrganization();
    }
  }, [address, checkIfOrganization]);

  useEffect(() => {
    if (address) {
      checkIfAdmin();
    }
  }, [address, checkIfAdmin]);

  return (
    <UserContext.Provider
      value={{
        user,
        isOrganization,
        isAdmin,
        createUser,
        addOrganizationProfile,
        getUserData,
        getUserByAddress,
        updateProfile,
        updateOrganizationProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => useContext(UserContext);
