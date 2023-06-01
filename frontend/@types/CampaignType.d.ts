import { ethers } from "ethers";

type CampaignType = {
  id: string;
  owner: string;
  title: string;
  description: string;
  imageId: string;
  videoId: string;
  targetAmount: ethers.BigNumberType;
  collectedAmount?: ethers.BigNumberType;
  creationDate?: ethers.BigNumberType;
  deadlineDate: ethers.BigNumberType;
  donators: string[];
  donations: number[];
};
