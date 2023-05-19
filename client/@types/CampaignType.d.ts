import { ethers } from "ethers";

type CampaignType = {
  id: string;
  owner: string;
  address: string;
  title: string;
  slug: string;
  description: string;
  target: ethers.BigNumberType;
  deadline: ethers.BigNumberType;
  amountCollected: ethers.BigNumberType;
  thumbnail: string;
  video: string;
  donators: string[];
  donations: number[];
};
