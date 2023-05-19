import React, { useState, useEffect, useCallback } from "react";

import User from "@/assets/user.jpg";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/state";
import { calculateBarPercentage, daysLeft } from "@/utils";
import Image from "next/image";
import { useCampaignContext } from "@/context/campaign";
import Button from "@/components/atomic/Button";
import CountBox from "@/components/atomic/CountBox";
import Loader from "@/components/atomic/Loader";
import { MediaRenderer } from "@thirdweb-dev/react";
import Head from "next/head";

const CampaignDetails = () => {
  const router = useRouter();
  const slug: any = router.query.slug || "";

  const { address } = useStateContext();
  const { donate, getDonations, getCampaign, contract } = useCampaignContext();

  const [isLoading, setIsLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [donators, setDonators] = useState<
    { donator: string; donation: string }[]
  >([]);
  const [campaign, setCampaign] = useState<any>(null);

  const handleDonate = async () => {
    setIsLoading(true);
    if (!amount || parseFloat(amount) <= 0) {
      alert("Enter a valid fund.");
    } else {
      await donate(campaign.id, amount);
      router.push("/");
    }

    setIsLoading(false);
  };

  const fetchData = useCallback(
    async (id: string) => {
      const campaignData = await getCampaign(id);
      const donationsData = await getDonations(id);

      setCampaign(campaignData);
      setDonators(donationsData);
    },
    [getCampaign, getDonations]
  );

  useEffect(() => {
    if (contract) {
      fetchData(slug as string);
    }
  }, [fetchData, contract, slug]);

  return (
    <div className="container">
      <Head>
        <title>{campaign?.title} | VesselVault</title>
        <meta
          name="description"
          content="A Trustworthy and Transparent Blood Bank Tracking System on Theta Metachain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {!campaign && <Loader />}

      {campaign && (
        <div className="w-full flex md:flex-row flex-col pt-10 gap-[30px]">
          <div className="flex-1 flex-col">
            <div className="w-full h-full">
              {campaign.video ? (
                <iframe
                  src={`https://player.thetavideoapi.com/video/${campaign.video}`}
                  width="100%"
                  height="100%"
                  allowFullScreen
                  className="h-[400px] w-[100%]"
                />
              ) : (
                <MediaRenderer
                  className="w-full rounded"
                  src={campaign.thumbnail}
                  alt="title"
                />
              )}
            </div>

            <div className="relative w-full h-[5px] bg-[#3a3a43] mt-2">
              <div
                className="absolute h-full bg-[#4acd8d]"
                style={{
                  width: `${calculateBarPercentage(
                    campaign.target.toNumber(),
                    campaign.amountCollected.toNumber()
                  )}%`,
                  maxWidth: "100%",
                }}
              ></div>
            </div>
          </div>

          <div className="flex md:w-[150px] w-full flex-wrap justify-between gap-[30px]">
            <CountBox
              title="Days Left"
              value={daysLeft(campaign.deadline.toNumber())}
            />
            <CountBox
              title={`Raised of ${campaign.target.toNumber()}`}
              value={campaign.amountCollected.toNumber()}
            />
            <CountBox
              title="Total Backers"
              value={donators.length.toString()}
            />
          </div>
        </div>
      )}

      {campaign && (
        <div className="mt-[60px] flex lg:flex-row flex-col gap-5">
          <div className="flex-[2] flex flex-col gap-[40px]">
            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Creator
              </h4>

              <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                <div className="w-[52px] h-[52px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                  <Image
                    src={User}
                    alt="user"
                    className="w-[60%] h-[60%] object-contain"
                  />
                </div>
                <div>
                  <h4 className="font-epilogue font-semibold text-[14px] text-white break-all">
                    {campaign.owner}
                  </h4>
                  <p className="mt-[4px] font-epilogue font-normal text-[12px] text-[#808191]">
                    10 Campaigns
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Story
              </h4>

              <div className="mt-[20px]">
                <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                  {campaign.description}
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
                Donators
              </h4>

              <div className="mt-[20px] flex flex-col gap-4">
                {donators.length > 0 ? (
                  donators.map((item: any, index) => (
                    <div
                      key={`${item.donator}-${index}`}
                      className="flex justify-between items-center gap-4"
                    >
                      <p className="font-epilogue font-normal text-[16px] text-[#b2b3bd] leading-[26px] break-ll">
                        {index + 1}. {item.donator}
                      </p>
                      <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] break-ll">
                        {item.donation}
                      </p>
                    </div>
                  ))
                ) : (
                  <p className="font-epilogue font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                    No donators yet. Be the first one!
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="flex-1">
            <h4 className="font-epilogue font-semibold text-[18px] text-white uppercase">
              Fund
            </h4>

            <div className="mt-[20px] flex flex-col p-4 shadow-md rounded-[10px]">
              <p className="font-epilogue fount-medium text-[20px] leading-[30px] text-center text-[#808191]">
                Fund the campaign
              </p>
              <div className="mt-[30px]">
                <input
                  type="number"
                  placeholder="ETH 0.1"
                  step="0.01"
                  className="w-full py-[10px] sm:px-[20px] px-[15px] outline-none border-[1px] border-[#3a3a43] bg-transparent font-epilogue text-white text-[18px] leading-[30px] placeholder:text-[#4b5264] rounded-[10px]"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                />

                <div className="my-[20px] p-4 bg-[#13131a] rounded-[10px]">
                  <h4 className="font-epilogue font-semibold text-[14px] leading-[22px] text-white">
                    Back it because you believe in it.
                  </h4>
                  <p className="mt-[20px] font-epilogue font-normal leading-[22px] text-[#808191]">
                    Support the project for no reward, just because it speaks to
                    you.
                  </p>
                </div>

                <Button
                  btnType="button"
                  title="Fund Campaign"
                  styles="bg-[#43ACAB] hover:bg-red-500 px-5 py-2 rounded-[6px] w-full"
                  handleClick={handleDonate}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CampaignDetails;
