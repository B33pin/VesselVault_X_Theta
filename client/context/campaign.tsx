import { createContext, useContext } from "react";
import { ethers } from "ethers";
import { CampaignType } from "@/@types/CampaignType";
import { useStateContext } from "./state";

type ContextProps = {
  children: React.ReactNode;
};

type DefaultValue = {
  createCampaign: (form: CampaignType) => Promise<void>;
  getCampaigns: () => Promise<any>;
  getCampaign: (id: string) => Promise<any>;
  getUserCampaigns: () => Promise<any>;
  donate: (id: string, amount: string) => Promise<any>;
  getDonations: (
    id: string
  ) => Promise<{ donator: string; donation: string }[]>;
};

const contextDefaultValue: DefaultValue = {
  createCampaign: (form) => Promise.resolve(),
  getCampaigns: () => Promise.resolve(),
  getCampaign: () => Promise.resolve(),
  getUserCampaigns: () => Promise.resolve(),
  donate: () => Promise.resolve(),
  getDonations: () => Promise.resolve([{ donator: "", donation: "" }]),
};

const CampaignContext = createContext(contextDefaultValue);

export const CampaignContextProvider = ({
  children,
}: ContextProps): JSX.Element => {
  const { connectToContract, bloodDonationContract, address } =
    useStateContext();

    const publishCampaign = async (form: CampaignType) => {
      try {
        const contract = await connectToContract();
        // generate a random number between 1 and 100000
        const randomId = Math.floor(Math.random() * 100000) + 1;
        const response = await contract.createCampaign(
         
          form.title, // title
          randomId, // use randomId here instead of new Date().getTime()
          form.description, // description
          form.target, // target
          new Date(form.deadline).getTime(), // deadline
          form.thumbnail, // image
          form.video, // video
          form.slug // slug
        );
        await response.wait();
        console.log("contract call success");
      } catch (error) {
        alert(JSON.stringify(error));
        console.error("contract call failure", error);
      }
    };
  

  const getCampaigns = async () => {
    const contract = await connectToContract();
    const campaigns = await contract.getAllCampaigns();

    const parsedCampaigns = campaigns.map((campaign: CampaignType) => ({
      id: campaign.id,
      owner: campaign.owner,
      title: campaign.title,
      slug: campaign.slug,
      description: campaign.description,
      target: ethers.utils.formatEther(campaign.target.toString()),
      deadline: campaign.deadline.toNumber(),
      amountCollected: ethers.utils.formatEther(
        campaign.amountCollected.toString()
      ),
      thumbnail: campaign.thumbnail,
      video: campaign.video,
    }));

    return parsedCampaigns;
  };

  const getCampaign = async (id: string): Promise<any> => {
    const data = await bloodDonationContract.getCampaign(id);
    return data;
  };

  const getUserCampaigns = async () => {
    const allCampaigns = await getCampaigns();

    const filteredCampaigns = allCampaigns.filter(
      (campaign: CampaignType) => campaign.owner === address
    );

    return filteredCampaigns;
  };

  const donate = async (id: string, amount: string): Promise<any> => {
    // Check if the Ethereum provider is available
    console.log("window.ethereum", window.ethereum);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await window.ethereum.enable();
    const signer = provider.getSigner();
    const amountToSend = ethers.utils.parseEther(amount);
    const data = await bloodDonationContract.connect(signer).donateToCampaign(id, {
      value: amountToSend,
    });
    data.wait();
    return data;
  };

  const getDonations = async (
    id: string
  ): Promise<{ donator: string; donation: string }[]> => {
    const donations = await bloodDonationContract.getCampaignDonators(id);
    const numberOfDonations = donations[0].length;

    const parsedDonations: { donator: string; donation: string }[] = [];

    for (let i = 0; i < numberOfDonations; i++) {
      parsedDonations.push({
        donator: donations[0][i],
        donation: ethers.utils.formatEther(donations[1][i].toString()),
      });
    }

    return parsedDonations;
  };

  return (
    <CampaignContext.Provider
      value={{
        createCampaign: publishCampaign,
        getCampaigns,
        getCampaign,
        getUserCampaigns,
        donate,
        getDonations,
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaignContext = () => useContext(CampaignContext);
