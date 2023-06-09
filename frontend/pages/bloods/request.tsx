import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import Loader from "@/components/atomic/Loader";
import TransactionLoader from "@/components/atomic/TransactionLoader";
import ModalBloodPouch from "@/components/molecules/ModalBloodPouch";
import { useDonationContext } from "@/context/donation";
import { useStateContext } from "@/context/state";
import { BloodStatus, BloodType, shortAddress } from "@/utils";

type Props = {};

const BloodRequest = (props: Props) => {
  const router = useRouter();
  const { address } = useStateContext();
  const [isLoading, setIsLoading] = useState(false);
  const [bloods, setBloods] = useState([]);
  const [filteredPouches, setFilteredPouches] = useState([]);
  const { getAvailablePouches, assignBloodReceiver } = useDonationContext();
  const [requestLoading, setRequestLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedBloodPouch, setSelectedBloodPouch] = useState(null);

  const { bloodType, pouchId } = router.query;

  useEffect(() => {
    if (bloodType && pouchId) {
      const filtered = bloods.filter((pouch: any) => {
        return pouch.bloodGroup == bloodType || pouch.pouchID == pouchId;
      });

      setFilteredPouches(filtered);
    } else if (bloodType) {
      const filtered = bloods.filter((pouch: any) => {
        return pouch.bloodGroup == bloodType;
      });

      setFilteredPouches(filtered);
    } else if (pouchId) {
      const filtered = bloods.filter((pouch: any) => {
        return pouch.pouchID == pouchId;
      });

      setFilteredPouches(filtered);
    } else {
      setFilteredPouches(bloods);
    }
  }, [bloodType, pouchId, bloods]);

  const fetchBloods = useCallback(async () => {
    setIsLoading(true);
    const data = await getAvailablePouches();
    setBloods(data);
    setIsLoading(false);
  }, [getAvailablePouches]);

  useEffect(() => {
    fetchBloods();
  }, [fetchBloods]);

  const clearURLQueries = () => {
    const { protocol, host, pathname } = window.location;
    const newURL = `${protocol}//${host}${pathname}`;
    router.replace(newURL);
  };

  const handleRequestBlood = async (pouchID: number) => {
    setRequestLoading(true);
    try {
      const res = await assignBloodReceiver(pouchID);
      toast.success("Blood pouch request successful.");
      router.push("/bloods/history");
    } catch (error: any) {
      toast.error("Failed to request blood pouch.");
      console.error(error.message);
    }
    setRequestLoading(false);
  };

  return (
    <section className="pt-10 2xl:pt-20 pb-14 2xl:pb-24 relative">
      <Head>
        <title>Request Bloods | VesselVault</title>
        <meta
          name="description"
          content="A Trustworthy and Transparent Blood Bank Tracking System on Theta Metachain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="absolute -top-40 left-0 right-0 -z-10">
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

      <div className="container mx-auto relative z-20">
        <div className="section-title text-center">
          <h2 className="text-coolGray-900 leading-tight text-4xl lg:text-6xl font-bold mb-4">
            Request Bloods
          </h2>
          <div className="section-breadcrumb flex items-center justify-center">
            <Link
              className="text-center transition duration-500 hover:text-red-600 pl-4 pr-6"
              href="/"
            >
              Home
            </Link>{" "}
            <span>/</span>
            <Link
              className="text-center transition duration-500 hover:text-red-600 pl-4 pr-6"
              href="#"
            >
              Request
            </Link>
          </div>
        </div>
      </div>

      {isLoading && <Loader />}
      {requestLoading && <TransactionLoader />}
      {showModal && (
        <ModalBloodPouch
          onClose={() => {
            setSelectedBloodPouch(null);
            setShowModal(false);
          }}
          bloodPouch={selectedBloodPouch}
        />
      )}

      <div className="z-20 relative pt-10 2xl:pt-20">
        <div className="max-w-5xl mx-auto px-4">
          {Object.keys(router.query).length > 0 && (
            <div className="mb-5 md:mb-10 text-center">
              <button
                onClick={() => clearURLQueries()}
                className="underline text-blue-600 cursor-pointer"
              >
                Clear Filter
              </button>
            </div>
          )}

          {!isLoading && filteredPouches.length === 0 && (
            <p className="text-xl leading-[30px] text-gray-600 text-center w-full">
              We regret to inform you that at this time, we do not have any
              available blood units for request.
            </p>
          )}

          {filteredPouches.length > 0 && (
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
              <table className="w-full text-base text-left text-gray-500">
                <thead className="text-base text-gray-700 uppercase bg-red-50">
                  <tr>
                    <th scope="col" className="px-6 py-3">
                      Pouch ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Donor ID
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Blood Group
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3">
                      Published By
                    </th>
                    <th scope="col" className="px-6 py-3">
                      <span className="sr-only">Edit</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPouches.map((blood: any, index) => {
                    if (blood.donarID !== address) {
                      return (
                        <tr
                          key={index}
                          className="bg-white hover:bg-gray-50"
                        >
                          <th
                            scope="row"
                            className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                          >
                            {blood.pouchID}
                          </th>
                          <td className="px-6 py-4 hover:underline">
                            <Link href={`/profile/${blood.donarID}`}>
                              {shortAddress(blood.donarID)}
                            </Link>
                          </td>
                          <td className="px-6 py-4">
                            {BloodType[blood.bloodGroup as number]}
                          </td>
                          <td className="px-6 py-4">
                            {BloodStatus[blood.status as number]}
                          </td>
                          <td className="px-6 py-4">
                            <Link href={`/profile/${blood.guardianID}`}>
                              {shortAddress(blood.guardianID)}
                            </Link>
                          </td>
                          <td className="px-6 py-4 text-center flex items-center gap-2 lg:gap-3">
                            <button
                              className="font-medium text-green-600 hover:underline"
                              onClick={() => {
                                setSelectedBloodPouch(blood);
                                setShowModal(true);
                              }}
                            >
                              View
                            </button>
                            <button
                              className="font-medium text-blue-600 hover:underline"
                              onClick={() => handleRequestBlood(blood.pouchID)}
                            >
                              Request
                            </button>
                          </td>
                        </tr>
                      );
                    }
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default BloodRequest;
