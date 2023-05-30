import React, { useState, useEffect } from "react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import CopyToClipboard from "react-copy-to-clipboard";
import {
  FacebookShareButton,
  TwitterShareButton,
  InstapaperShareButton,
} from "react-share";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { FcClock } from "react-icons/fc";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { calculateBarPercentage, shortAddress } from "@/utils";
import { useCampaignContext } from "@/context/campaign";
import Loader from "@/components/atomic/Loader";
import TransactionLoader from "@/components/atomic/TransactionLoader";
import { CampaignType } from "@/@types/CampaignType";
import FormField from "@/components/atomic/FormField";
import User from "@/assets/user.jpg";
import { useUserContext } from "@/context/user";
import useCountdown from "@/hooks/useTimer";
import { toast } from "react-hot-toast";

const CampaignDetails = () => {
  const router = useRouter();
  const id: any = router.query.id || "";
  const [copied, setCopied] = useState(false);
  const { donate, getDonatorsList, getCampaign } = useCampaignContext();
  const { getUserByAddress } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [loadingTransaction, setLoadingTransaction] = useState(false);
  const [amount, setAmount] = useState("");
  const [checked, setChecked] = useState(false);
  const [donators, setDonators] = useState<
    { donator: string; donation: string }[]
  >([]);
  const [campaign, setCampaign] = useState<CampaignType | null>(null);
  const [guardianData, setGuardianData] = useState<any>(null);
  const storage = new ThirdwebStorage();
  const [days, hours, minutes, seconds] = useCountdown(
    campaign?.deadlineDate.toNumber()
  );

  const leftDays = `${days}:${("0" + hours).slice(-2)}:${("0" + minutes).slice(
    -2
  )}:${("0" + seconds).slice(-2)}`;

  const handleDonate = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoadingTransaction(true);
    if (campaign) {
      if (!amount || parseFloat(amount) <= 0) {
        toast.error("Enter a valid fund.");
      } else {
        try {
          await donate(campaign.id, amount);
          toast.success("Fund donated successful.");
          setAmount("");
          router.reload();
        } catch (error) {
          console.error(error);
          toast.error("Failed to donate fund.");
        }
      }
    }

    setLoadingTransaction(false);
  };

  useEffect(() => {
    const fetchData = async (campaignAddress: string) => {
      setIsLoading(true);
      const campaignData = await getCampaign(campaignAddress);
      const donatorsData = await getDonatorsList(campaignAddress);
      const organizerData = await getUserByAddress(campaignData.owner);

      setCampaign(campaignData);
      setDonators(donatorsData);
      setGuardianData(organizerData);
      setIsLoading(false);
    };

    if (id) {
      fetchData(id as string);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  return (
    <div>
      <Head>
        <title>
          {campaign?.title ? `${campaign?.title} | VesselVault` : "VesselVault"}
        </title>
        <meta
          name="description"
          content="A Trustworthy and Transparent Blood Bank Tracking System on Theta Metachain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="py-4">
        <div className="relative">
          <section className="absolute -top-40 left-0 right-0 -z-10">
            <svg
              width="1920"
              height="706"
              viewBox="0 0 1920 706"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_514_153)">
                <g filter="url(#filter0_f_514_153)">
                  <path
                    d="M449.786 206C580.316 206 686.131 97.429 686.131 -36.5C686.131 -170.429 580.316 -279 449.786 -279C319.256 -279 213.441 -170.429 213.441 -36.5C213.441 97.429 319.256 206 449.786 206Z"
                    fill="#FFDEDE"
                  />
                </g>
                <g filter="url(#filter1_f_514_153)">
                  <path
                    d="M963.711 186C1107.7 186 1224.42 66.2362 1224.42 -81.5C1224.42 -229.236 1107.7 -349 963.711 -349C819.724 -349 703 -229.236 703 -81.5C703 66.2362 819.724 186 963.711 186Z"
                    fill="#FBD4CC"
                  />
                </g>
                <g filter="url(#filter2_f_514_153)">
                  <path
                    d="M1683.65 206C1814.18 206 1920 97.429 1920 -36.5C1920 -170.429 1814.18 -279 1683.65 -279C1553.12 -279 1447.31 -170.429 1447.31 -36.5C1447.31 97.429 1553.12 206 1683.65 206Z"
                    fill="#FFD5D5"
                  />
                </g>
                <g filter="url(#filter3_f_514_153)">
                  <path
                    d="M0 -15H213.442V195.279C213.442 254.219 165.661 302 106.721 302C47.7805 302 0 254.219 0 195.279V-15Z"
                    fill="#FDF0F0"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_f_514_153"
                  x="-286.559"
                  y="-779"
                  width="1472.69"
                  height="1485"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="250"
                    result="effect1_foregroundBlur_514_153"
                  />
                </filter>
                <filter
                  id="filter1_f_514_153"
                  x="303"
                  y="-749"
                  width="1321.42"
                  height="1335"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="200"
                    result="effect1_foregroundBlur_514_153"
                  />
                </filter>
                <filter
                  id="filter2_f_514_153"
                  x="947.305"
                  y="-779"
                  width="1472.69"
                  height="1485"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="250"
                    result="effect1_foregroundBlur_514_153"
                  />
                </filter>
                <filter
                  id="filter3_f_514_153"
                  x="-89"
                  y="-104"
                  width="391.442"
                  height="495"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend
                    mode="normal"
                    in="SourceGraphic"
                    in2="BackgroundImageFix"
                    result="shape"
                  />
                  <feGaussianBlur
                    stdDeviation="44.5"
                    result="effect1_foregroundBlur_514_153"
                  />
                </filter>
                <clipPath id="clip0_514_153">
                  <rect width="1920" height="706" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </section>

          <div className="absolute -z-10 hidden xl:block opacity-25 2xl:opacity-100 top-0 bottom-0 right-0 left-0">
            <span className="animate-1 absolute left-20 bottom-0">
              <svg
                width="101"
                height="75"
                viewBox="0 0 101 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 0)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 0)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 0)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 0)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 0)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 0)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 17.5488)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 35.0986)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 52.6475)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 2.2146 70.1963)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 17.5488)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 35.0986)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 52.6475)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 21.4348 70.1963)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 17.5488)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 35.0986)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 52.6475)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 40.6553 70.1963)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 17.5488)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 35.0986)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 52.6475)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 59.8757 70.1963)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 17.5488)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 35.0986)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 52.6475)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 79.0962 70.1963)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 17.5488)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 35.0986)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 52.6475)"
                  fill="#D21E1E"
                ></rect>
                <rect
                  width="3.1317"
                  height="3.13172"
                  transform="matrix(0.707116 0.707097 -0.707116 0.707097 98.3164 70.1963)"
                  fill="#D21E1E"
                ></rect>
              </svg>
            </span>
            <span className="animate-2 absolute left-20 top-20">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="18.706"
                  cy="18.5808"
                  rx="18.706"
                  ry="18.5808"
                  fill="#FBCCCC"
                ></ellipse>
              </svg>
            </span>
            <span className="animate-3 absolute left-52 top-16">
              <svg
                width="21"
                height="20"
                viewBox="0 0 21 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="10.0674"
                  cy="10"
                  rx="10.0674"
                  ry="10"
                  fill="#FEDFC3"
                ></ellipse>
              </svg>
            </span>
            <span className="animate-2 absolute right-1/3 top-10">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <ellipse
                  cx="18.706"
                  cy="18.5808"
                  rx="18.706"
                  ry="18.5808"
                  fill="#FEC3C3"
                ></ellipse>
              </svg>
            </span>
            <span className="animate-2 absolute left-1/3 xl:w-1/4 top-10">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.651129 19.1367C10.928 19.0878 19.2461 10.8072 19.2657 0.592236C19.2849 10.6462 27.3431 18.8262 37.3956 19.1283L37.3951 19.1451C27.5222 19.442 19.5732 27.3379 19.2744 37.1447C19.2686 37.1449 19.2628 37.1451 19.257 37.1453C18.9536 27.1781 10.7477 19.1847 0.651129 19.1367ZM0.46822 19.1367C0.311684 19.1359 0.155604 19.1333 0 19.1288C0.000156532 19.134 0.00031529 19.1393 0.000476273 19.1446C0.155922 19.1401 0.311844 19.1374 0.46822 19.1367ZM19.2738 0.000481984C19.2687 0.172956 19.266 0.34602 19.2657 0.519642C19.2653 0.345857 19.2626 0.172632 19.2575 0L19.2738 0.000481984Z"
                  fill="#FEDFC3"
                ></path>
              </svg>
            </span>
            <span className="animate-2 absolute right-96 top-20">
              <svg
                width="38"
                height="38"
                viewBox="0 0 38 38"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M0.651129 19.1367C10.928 19.0878 19.2461 10.8072 19.2657 0.592236C19.2849 10.6462 27.3431 18.8262 37.3956 19.1283L37.3951 19.1451C27.5222 19.442 19.5732 27.3379 19.2744 37.1447C19.2686 37.1449 19.2628 37.1451 19.257 37.1453C18.9536 27.1781 10.7477 19.1847 0.651129 19.1367ZM0.46822 19.1367C0.311684 19.1359 0.155604 19.1333 0 19.1288C0.000156532 19.134 0.00031529 19.1393 0.000476273 19.1446C0.155922 19.1401 0.311844 19.1374 0.46822 19.1367ZM19.2738 0.000481984C19.2687 0.172956 19.266 0.34602 19.2657 0.519642C19.2653 0.345857 19.2626 0.172632 19.2575 0L19.2738 0.000481984Z"
                  fill="#FBCCCC"
                ></path>
              </svg>
            </span>
            <span className="animate-1 absolute right-8 bottom-0">
              <svg
                width="93"
                height="75"
                viewBox="0 0 93 75"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 0)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 0)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 0)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 0)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 0)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 0)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 17.5488)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 35.0986)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 52.6475)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 2.03162 70.1963)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 17.5488)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 35.0986)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 52.6475)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 19.6641 70.1963)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 17.5488)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 35.0986)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 52.6475)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 37.2966 70.1963)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 17.5488)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 35.0986)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 52.6475)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 54.9293 70.1963)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 17.5488)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 35.0986)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 52.6475)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 72.5621 70.1963)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 17.5488)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 35.0986)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 52.6475)"
                  fill="#FA1515"
                ></rect>
                <rect
                  width="3.00513"
                  height="3.00514"
                  transform="matrix(0.676024 0.736879 -0.676024 0.736879 90.1945 70.1963)"
                  fill="#FA1515"
                ></rect>
              </svg>
            </span>
            <span className="animate-2 absolute right-32 top-32">
              <svg
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect width="18" height="18" fill="#FBCCCC"></rect>
              </svg>
            </span>
          </div>
          <div className="container">
            {isLoading && !campaign && <Loader />}
            {loadingTransaction && <TransactionLoader />}

            {campaign && (
              <>
                <h1 className="text-gray-700 leading-tight text-4xl lg:text-5xl font-bold mb-4">
                  {campaign?.title}
                </h1>

                <div className="flex items-center my-5">
                  <span className="text-gray-600 font-bold text-sm mr-3">
                    SHARE :
                  </span>

                  <div className="flex items-center justify-center w-8 h-8 bg-blue-500 rounded-full transition-all duration-500 hover:bg-red-500 mr-2 text-white">
                    <FacebookShareButton
                      url={`${window.location.origin}/${window.location.pathname}`}
                    >
                      <FaFacebookF size={16} />
                    </FacebookShareButton>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8 bg-orange-500 rounded-full transition-all duration-500 hover:bg-red-500 mr-2 text-white">
                    <InstapaperShareButton
                      url={`${window.location.origin}/${window.location.pathname}`}
                    >
                      <FaInstagram size={16} />
                    </InstapaperShareButton>
                  </div>

                  <div className="flex items-center justify-center w-8 h-8  bg-sky-500 rounded-full transition-all duration-500 hover:bg-red-500 mr-2 text-white">
                    <TwitterShareButton
                      url={`${window.location.origin}/${window.location.pathname}`}
                    >
                      <FaTwitter size={16} />
                    </TwitterShareButton>
                  </div>
                </div>
              </>
            )}

            {campaign && (
              <div className="w-full flex lg:flex-row flex-col my-4 gap-[30px]">
                <div className="flex-1 flex-col">
                  <div className="w-full h-full relative">
                    {campaign.videoId ? (
                      <iframe
                        src={`https://player.thetavideoapi.com/video/${campaign.videoId}`}
                        width="100%"
                        height="100%"
                        style={{ maxHeight: "60vh", minHeight: "300px" }}
                        allowFullScreen
                        className="h-[auto] sm:h-[400px] md:h-[600px] lg:h-[800px] w-[100%] rounded-md overflow-hidden"
                      />
                    ) : (
                      <Image
                        width={1400}
                        height={800}
                        className="h-[auto] sm:h-[400px] md:h-[600px] lg:h-[800px] w-[100%] rounded-md overflow-hidden"
                        src={"/logo.png"}
                        alt={campaign?.title}
                      />
                    )}
                    {campaign.deadlineDate.toNumber() && (
                      <div className="bg-white rounded-md absolute bottom-5 md:bottom-10 right-5 px-2 py-0.5 text-red-600 flex items-center justify-center text-lg md:text-2xl">
                        <FcClock size={20} />{" "}
                        <span className="ml-2">{leftDays}</span>
                      </div>
                    )}
                  </div>

                  <div className="relative w-full h-2 bg-[#3a3a43] mt-2 rounded-md overflow-hidden">
                    <div
                      className="absolute h-full bg-[#4acd8d] rounded-md"
                      style={{
                        width: `${calculateBarPercentage(
                          campaign.targetAmount,
                          campaign.collectedAmount
                        )}%`,
                        maxWidth: "100%",
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="container">
          {campaign && (
            <div className="mt-10 flex lg:flex-row flex-col-reverse gap-8 md:gap-10">
              <div className="flex-[2] flex flex-col gap-[40px]">
                <div>
                  <h4 className="font-semibold text-[18px] uppercase">
                    Creator
                  </h4>

                  <div className="mt-[20px] flex flex-row items-center flex-wrap gap-[14px]">
                    <div className="w-[80px] h-[80px] flex items-center justify-center rounded-full bg-[#2c2f32] cursor-pointer">
                      <Link
                        href={`/profile/${guardianData.id}`}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        {guardianData ? (
                          <Image
                            src={storage.resolveScheme(
                              guardianData.profile
                            )}
                            alt="user"
                            width={120}
                            height={120}
                            className="rounded-full object-contain"
                          />
                        ) : (
                          <Image
                            src={User}
                            alt="user"
                            className="rounded-full object-contain"
                          />
                        )}
                      </Link>
                    </div>
                    <div>
                      <h4 className="font-semibold text-[14px] break-all">
                        <CopyToClipboard
                          text={campaign.owner}
                          onCopy={() => {
                            setCopied(true);
                            setTimeout(() => {
                              setCopied(false);
                            }, 1000);
                          }}
                        >
                          <span className="font-bold uppercase text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                            {shortAddress(campaign.owner, 8, 5)}{" "}
                            {!copied && <FiCopy size={16} className="ml-3" />}
                            {copied && <MdDone size={16} className="ml-3" />}
                          </span>
                        </CopyToClipboard>
                      </h4>
                      <Link
                        href={`/profile/${guardianData.id}`}
                        className="text-blue-600 text-sm hover:underline"
                      >
                        View Profile
                      </Link>
                    </div>
                  </div>
                </div>

                <div className="">
                  <h4 className="font-semibold text-[18px] uppercase">Story</h4>

                  <div className="mt-[20px]">
                    <p className="font-normal text-[16px] text-[#808191] leading-[26px] text-justify">
                      {campaign.description}
                    </p>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-[18px] uppercase">
                    Donators ({donators.length})
                  </h4>

                  <div className="mt-[20px] flex flex-col gap-4">
                    {donators.length > 0 ? (
                      donators.map((item: any, index) => (
                        <div
                          key={`${item.donator}-${index}`}
                          className="flex justify-between items-center gap-4"
                        >
                          <p className="font-bold text-[16px] text-gray-600 leading-[26px] break-ll">
                            <Link href={`/profile/${item.donator}`}>
                              {index + 1}. {shortAddress(item.donator, 8, 5)}
                            </Link>
                          </p>
                          <p className="font-bold text-[16px] text-red-600 leading-[26px] break-ll">
                            {parseFloat(item.donation).toFixed(3)} TFUEL
                          </p>
                        </div>
                      ))
                    ) : (
                      <p className="font-bold text-[18px] text-[#808191] leading-[26px] text-justify">
                        No donators yet. Be the first one!
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div className="flex-1">
                <div className="bg-white shadow-md rounded p-6 lg:p-10">
                  <h2 className="text-xl font-bold mb-4 text-gray-600">
                    Fund the donation and change lives today!
                  </h2>
                  <p className="my-3 text-gray-500">
                    Your donation can be the catalyst for positive change. Join
                    us in making a difference and give hope to those in need.
                  </p>

                  <div className="flex flex-wrap gap-2 my-5">
                    <p className="mt-[3px] font-normal text-base leading-[18px]  sm:max-w-[120px] truncate">
                      Raised:
                    </p>
                    <h4 className="font-semibold text-xl leading-[22px] text-red-600">
                      {parseFloat(
                        ethers.utils.formatEther(
                          campaign.collectedAmount.toString()
                        )
                      ).toFixed(3)}

                      <span className="text-base">
                        {" "}
                        /{" "}
                        {parseFloat(
                          ethers.utils.formatEther(
                            campaign.targetAmount.toString()
                          )
                        ).toFixed(3)}
                      </span>
                    </h4>
                  </div>

                  <form onSubmit={handleDonate}>
                    <div className="mb-4 select-none">
                      <FormField
                        labelText=""
                        placeholderText={`Donate 100 TFUEL`}
                        inputType="number"
                        inputValue={amount}
                        handleInputChange={(e) => setAmount(e.target.value)}
                      />
                      <div
                        className="my-4 cursor-pointer"
                        onClick={() => setChecked(!checked)}
                      >
                        <input
                          type="checkbox"
                          className="checkbox"
                          checked={checked}
                          onChange={() => setChecked(!checked)}
                        />
                        <span className="ml-2">
                          Accepts Terms and Conditions
                        </span>
                      </div>
                    </div>

                    <button
                      disabled={!checked}
                      type="submit"
                      className={`w-full inline-flex justify-center items-center border border-red-600 text-white rounded-full transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-400 hover:via-red-500 hover:to-red-600 bg-left px-8 py-3 ${
                        checked ? "cursor-pointer" : "cursor-not-allowed"
                      }`}
                    >
                      {loadingTransaction ? "Loading" : "Fund Campaign"}
                    </button>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CampaignDetails;
