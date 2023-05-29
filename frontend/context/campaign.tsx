import { createContext, useContext } from "react";
import { ethers } from "ethers";
import { CampaignType } from "@/@types/CampaignType";
import { useStateContext } from "./state";

type ContextProps = {
  children: React.ReactNode;
};

type CampaignContextValue = {
  createCampaign: (form: CampaignType) => Promise<void>;
  getCampaigns: () => Promise<any>;
  getCampaign: (id: string) => Promise<any>;
  getUserCampaigns: () => Promise<any>;
  donate: (id: string, amount: string) => Promise<any>;
  getDonatorsList: (
    id: string
  ) => Promise<{ donator: string; donation: string }[]>;
};

const CampaignContext = createContext<CampaignContextValue>({
  createCampaign: async () => {},
  getCampaigns: async () => [],
  getCampaign: async () => null,
  getUserCampaigns: async () => [],
  donate: async () => {},
  getDonatorsList: async () => [],
});

export const CampaignContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const { address, connectBloodDonationContract } = useStateContext();

  const createCampaign = async (form: CampaignType) => {
    try {
      const contract = await connectBloodDonationContract();
      if (!contract) throw new Error("Contract is not connected.");
      const response = await contract.createCampaign(
        address,
        form.title,
        form.description,
        form.imageId,
        form.videoId,
        form.targetAmount,
        new Date(form.deadlineDate).getTime()
      );

      await response.wait();
    } catch (error) {
      console.error("Error creating campaign", error);
    }
  };

  const getCampaigns = async () => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const campaigns = await contract.getAllActiveCampaigns();

    return campaigns.map((campaign: CampaignType) => ({
      id: campaign.id,
      owner: campaign.owner,
      title: campaign.title,
      description: campaign.description,
      image: campaign.imageId,
      video: campaign.videoId,
      targetAmount: ethers.utils.formatEther(campaign.targetAmount.toString()),
      collectedAmount: ethers.utils.formatEther(
        campaign.collectedAmount.toString()
      ),
      creationDate: campaign.creationDate.toNumber(),
      deadlineDate: campaign.deadlineDate.toNumber(),
      donators: campaign.donators,
      donations: campaign.donations,
    }));
  };

  const getCampaign = async (id: string): Promise<any> => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const data = await contract.getCampaign(id);

    return data;
  };

  const getUserCampaigns = async () => {
    const campaigns = await getCampaigns();

    // return campaigns.filter(
    //   (campaign: CampaignType) => campaign.owner === address
    // );
  };

  const donate = async (id: string, amount: string): Promise<any> => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.enable();
    const signer = provider.getSigner();
    const amountToSend = ethers.utils.parseEther(amount);

    try {
      const contract = await connectBloodDonationContract();
      if (!contract) throw new Error("Contract is not connected.");
      const data = await contract.connect(signer).donateToCampaign(id, {
        value: amountToSend,
      });

      await data.wait();
      return data;
    } catch (error) {
      console.error("Error donating to campaign", error);
    }
  };

  const getDonatorsList = async (
    id: string
  ): Promise<{ donator: string; donation: string }[]> => {
    const contract = await connectBloodDonationContract();
    if (!contract) throw new Error("Contract is not connected.");
    const donations = await contract.getCampaignDonators(id);
    const numberOfDonations = donations[0].length;

    return Array.from({ length: numberOfDonations }, (_, i) => ({
      donator: donations[0][i],
      donation: ethers.utils.formatEther(donations[1][i].toString()),
    }));
  };

  return (
    <CampaignContext.Provider
      value={{
        createCampaign,
        getCampaigns,
        getCampaign,
        getUserCampaigns,
        donate,
        getDonatorsList,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => useContext(CampaignContext);
