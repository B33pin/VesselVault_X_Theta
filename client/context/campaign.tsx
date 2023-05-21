import { createContext, useContext } from "react";
import { useAddress, useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { CampaignType } from "@/@types/CampaignType";

type ContextProps = {
  children: React.ReactNode;
};

type DefaultValue = {
  contract: any;
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
  contract: "",
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
  const { contract }: any = useContract(
    process.env.NEXT_PUBLIC_CONTRACT_ADDRESS
  );
  const { mutateAsync, isLoading } = useContractWrite(
    contract,
    "createCampaign"
  );

  const address = useAddress();

  const publishCampaign = async (form: CampaignType) => {
    try {
      const data = await mutateAsync({
        args: [
          address,
          form.title, // title
          form.description, // description
          form.target, // target
          new Date(form.deadline).getTime(), // deadline,
          form.thumbnail, // image
          form.video, // video
          form.slug, // slug
        ],
      });

      console.log("contract call success", data);
    } catch (error) {
      alert(JSON.stringify(error));
      console.error("contract call failure", error);
    }
  };

  const getCampaigns = async () => {
    const campaigns = await contract.call("getAllCampaigns");

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
    const data = await contract.call("getCampaign", [id]);
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
    const data = await contract.call("donateToCampaign", [id], {
      value: ethers.utils.parseEther(amount),
    });

    return data;
  };

  const getDonations = async (
    id: string
  ): Promise<{ donator: string; donation: string }[]> => {
    const donations = await contract.call("getCampaignDonators", [id]);
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
        contract,
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
