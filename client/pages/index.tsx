import React, { useCallback, useEffect, useState } from "react";
import { useStateContext } from "@/context/state";
import Head from "next/head";
import Button from "@/components/atomic/Button";
import Image from "next/image";
import HeroImage from "@/assets/hero.png";
import HowItWorks from "@/components/molecules/HowItWorks";
import { useCampaignContext } from "@/context/campaign";
import DisplayCampaigns from "@/components/organism/DisplayCampaigns";
import Link from "next/link";
import CreatorsList from "@/components/organism/CreatorsList";
import RequestBloods from "@/components/organism/RequestBloods";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { address } = useStateContext();
  const [campaigns, setCampaigns] = useState([]);

  const { contract, getCampaigns } = useCampaignContext();

  const fetchCampaigns = useCallback(async () => {
    setIsLoading(true);
    const data = await getCampaigns();
    setCampaigns(data);
    setIsLoading(false);
  }, [getCampaigns]);

  useEffect(() => {
    if (address && contract) {
      fetchCampaigns();
    }
  }, [address, contract, fetchCampaigns]);

  return (
    <>
      <Head>
        <title>
          VesselVault | A Trustworthy and Transparent Blood Bank Tracking System
        </title>
        <meta
          name="description"
          content="A Trustworthy and Transparent Blood Bank Tracking System on Theta Metachain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <div>
        <section className="hero-area pb-20 2xl:pb-28 pt-10 2xl:pt-20 relative">
          <div className="absolute -bottom-52 left-0 -z-10">
            <svg
              className="w-full"
              width="301"
              height="691"
              viewBox="0 0 301 691"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g filter="url(#filter0_f_1423_12670)">
                <path
                  d="M-70 634.739L-261.912 378.673L-19.4497 196.956C51.2609 143.961 151.544 158.322 204.539 229.033C257.534 299.744 243.173 400.027 172.462 453.022L-70 634.739Z"
                  fill="#F0FDFA"
                />
              </g>
              <g filter="url(#filter1_f_1423_12670)">
                <path
                  d="M-154 255.221L-51.9803 105L90.2602 201.6C131.743 229.772 142.533 286.238 114.361 327.72C86.1887 369.203 29.7227 379.993 -11.7596 351.821L-154 255.221Z"
                  fill="#FEFCE8"
                />
              </g>
              <defs>
                <filter
                  id="filter0_f_1423_12670"
                  x="-317.912"
                  y="108.979"
                  width="610.428"
                  height="581.759"
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
                    stdDeviation="28"
                    result="effect1_foregroundBlur_1423_12670"
                  />
                </filter>
                <filter
                  id="filter1_f_1423_12670"
                  x="-259"
                  y="0"
                  width="494.053"
                  height="472.514"
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
                    stdDeviation="52.5"
                    result="effect1_foregroundBlur_1423_12670"
                  />
                </filter>
              </defs>
            </svg>
          </div>
          <div className="absolute -top-40 right-0 -z-10">
            <svg
              width="1262"
              height="1356"
              viewBox="0 0 1262 1356"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <g clipPath="url(#clip0_507_143)">
                <g filter="url(#filter0_f_507_143)">
                  <path
                    d="M973.353 568.752C810.234 568.752 678 437.403 678 275.376C678 113.349 810.234 -18 973.353 -18C1136.47 -18 1268.71 113.349 1268.71 275.376C1268.71 437.403 1136.47 568.752 973.353 568.752Z"
                    fill="#F7BBBB"
                  />
                </g>
                <path
                  d="M795.5 694C935.504 694 1049 580.504 1049 440.5C1049 300.496 935.504 187 795.5 187C655.496 187 542 300.496 542 440.5C542 580.504 655.496 694 795.5 694Z"
                  stroke="white"
                  strokeWidth="50"
                />
                <g filter="url(#filter1_f_507_143)">
                  <path
                    d="M785.5 856C943.177 856 1071 729.073 1071 572.5C1071 415.927 943.177 289 785.5 289C627.823 289 500 415.927 500 572.5C500 729.073 627.823 856 785.5 856Z"
                    fill="#FEC3C3"
                  />
                </g>
                <g filter="url(#filter2_f_507_143)">
                  <path
                    d="M1008 511C1187.49 511 1333 365.493 1333 186C1333 6.50746 1187.49 -139 1008 -139C828.507 -139 683 6.50746 683 186C683 365.493 828.507 511 1008 511Z"
                    fill="#FDF3F0"
                  />
                </g>
              </g>
              <defs>
                <filter
                  id="filter0_f_507_143"
                  x="178"
                  y="-518"
                  width="1590.71"
                  height="1586.75"
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
                    result="effect1_foregroundBlur_507_143"
                  />
                </filter>
                <filter
                  id="filter1_f_507_143"
                  x="0"
                  y="-211"
                  width="1571"
                  height="1567"
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
                    result="effect1_foregroundBlur_507_143"
                  />
                </filter>
                <filter
                  id="filter2_f_507_143"
                  x="560"
                  y="-262"
                  width="896"
                  height="896"
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
                    stdDeviation="61.5"
                    result="effect1_foregroundBlur_507_143"
                  />
                </filter>
                <clipPath id="clip0_507_143">
                  <rect width="1262" height="1356" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>
          <div className="absolute z-10 hidden xl:block opacity-25 2xl:opacity-100 top-0 bottom-0 right-0 left-0">
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
            <span className="animate-2 absolute left-1/4 top-10">
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
            <span className="animate-3 absolute right-96 top-20">
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
                  fill="#D21E1E"
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
          <div className="container relative z-20">
            <div className="grid items-center grid-cols-1 lg:grid-cols-5 gap-8">
              <div className="hero-content xl:pr-20 lg:col-span-3">
                <span className="btn-style-2 inline-flex items-center justify-center bg-red-50 text-red-700 text-sm lg:text-base font-medium rounded px-4 py-2 mb-2">
                  TRUSTED BLOOD TRACKING
                </span>
                <h2 className="leading-normal text-[1.875rem] lg:text-[2.25rem] 2xl:text-[3.25rem] font-bold ">
                  A Trustworthy and Transparent{" "}
                  <span className="text-red-500">Blood Bank</span> Tracking
                  System
                </h2>
                <p className="text-lg md:text-xl leading-tight font-medium my-6 2xl:my-12">
                  VesselVault is an innovative solution to create a transparent
                  and reliable blood bank tracking system that fosters human
                  connections and ensures fair blood distribution.
                </p>
                <div className="flex flex-wrap items-center">
                  <Link href="/campaigns/explore">
                    <Button
                      btnType="button"
                      title={"Donate Campaigns"}
                      styles={
                        "transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-400 hover:via-red-500 hover:to-red-600 bg-left rounded-full px-6 md:px-8 py-2 lg:py-3 text-lg md:text-xl uppercase"
                      }
                      handleClick={() => {}}
                    />
                  </Link>
                </div>
              </div>
              <div className="lg:col-span-2" data-aos="fade-up">
                <Image
                  className="w-full max-w-xl hidden lg:block"
                  src={HeroImage}
                  alt="hero"
                  width={800}
                  height={800}
                />
              </div>
            </div>
          </div>
        </section>

        <RequestBloods />

        {campaigns.length > 0 && (
          <section className="relative">
            <div className="container">
              <div className="flex flex-wrap items-end justify-between">
                <div>
                  <span className="label-before inline-block relative px-12 text-red-600 text-base mb-2">
                    TOP CAMPAIGNS
                  </span>
                  <h2 className="leading-10 text-3xl lg:text-4xl font-bold">
                    Campaigns of the Week
                  </h2>
                </div>
                <Link
                  href="/campaigns/explore"
                  className="readmore-btn relative mt-2 pr-4"
                >
                  <span>VIEW ALL</span>
                </Link>
              </div>
              <DisplayCampaigns
                title="All Campaigns"
                isLoading={isLoading}
                campaigns={campaigns}
              />
            </div>
          </section>
        )}

        <HowItWorks />

        <CreatorsList />
      </div>
    </>
  );
};

export default Home;
