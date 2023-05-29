import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import ImageUploading from "react-images-uploading";
import FormField from "@/components/atomic/FormField";
import { useDonationContext } from "@/context/donation";
import { useUserContext } from "@/context/user";
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";
import TransactionLoader from "@/components/atomic/TransactionLoader";
import {
  isValidAddress,
  isValidEmail,
  isValidPhoneNumber,
  isValidURL,
  isValidZipCode,
} from "@/utils";

type HandleFormFieldChange = (
  fieldName: string,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

const AddOrganization = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState<any>({
    address: "",
    organizationName: "",
    organizationDetails: "",
    organizationPhoto: null,
    email: "",
    website: "",
    phoneNumber: "",
    country: "",
    zipCode: "",
  });
  const storage = new ThirdwebStorage();
  const { isAdmin } = useUserContext();
  const { addOrganization } = useDonationContext();

  const handleFormFieldChange: HandleFormFieldChange = (fieldName, e) => {
    setForm((prev: any) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const {
      address,
      organizationName,
      organizationDetails,
      organizationPhoto,
      email,
      website,
      phoneNumber,
      country,
      zipCode,
    } = form;

    const isFormValid =
      address &&
      organizationName &&
      organizationDetails &&
      organizationPhoto &&
      organizationPhoto.length > 0 &&
      email &&
      website &&
      phoneNumber &&
      country &&
      zipCode;

    if (!isFormValid) {
      return toast.error("Please fill all the forms.");
    }

    if (
      !isValidAddress(address) ||
      !isValidEmail(email) ||
      !isValidPhoneNumber(phoneNumber) ||
      !isValidZipCode(zipCode)
    ) {
      return toast.error("Please fill valid data.");
    }

    try {
      const campaignImageIPfs = await storage.upload(organizationPhoto[0]);

      await addOrganization(address, {
        organizationName,
        organizationDetails,
        organizationPhoto: campaignImageIPfs,
        email,
        website,
        phoneNumber,
        country,
        zipCode,
      });

      toast.success("Organization added successfully.");
      router.push(`/profile/${address}`);
    } catch (error) {
      toast.error("Failed to add organization.");
      console.error("Error", error);
    }

    setIsLoading(false);
  };

  useEffect(() => {
    if (!isAdmin) {
      router.push("/bloods/request");
    }
  }, [isAdmin, router]);

  return (
    <div>
      <Head>
        <title>Add Organization | VesselVault</title>
        <meta
          name="description"
          content="A Trustworthy and Transparent Blood Bank Tracking System on Theta Metachain"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="pt-10 2xl:pt-20 pb-14 2xl:pb-24 relative">
        {isLoading && <TransactionLoader />}
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
              Add Organization
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
                Organization
              </Link>
            </div>
          </div>
        </div>
        <div className="z-20 relative pt-10 2xl:pt-20">
          <div className="max-w-4xl mx-auto px-4">
            <div className="bg-white shadow-md rounded p-6 lg:p-10">
              <h2 className="text-xl font-bold mb-4">Add Organization</h2>

              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap lg:gap-4">
                  <div className="mb-4 w-full">
                    <ImageUploading
                      value={form.organizationPhoto}
                      onChange={(imageList: any) => {
                        setForm((prev: any) => ({
                          ...prev,
                          organizationPhoto: imageList,
                        }));
                      }}
                      maxNumber={1}
                      dataURLKey="data_url"
                    >
                      {({
                        imageList,
                        onImageUpload,
                        onImageUpdate,
                        onImageRemove,
                        isDragging,
                        dragProps,
                      }) => (
                        <div className="image-upload">
                          <span className="font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
                            Image *
                          </span>
                          <div className="w-full mt-[10px]">
                            {imageList.length <= 0 && (
                              <button
                                type="button"
                                onClick={onImageUpload}
                                className={`flex justify-center items-baseline w-full h-32 px-4 transition bg-white border-2 border-gray-300 border-dashed rounded-md appearance-none cursor-pointer hover:border-gray-400 focus:outline-none ${
                                  isDragging ? "bg-red-200" : "bg-gray-200"
                                }`}
                                {...dragProps}
                              >
                                <div className="flex items-center justify-center w-full h-full space-x-2">
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-6 h-6 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                                    />
                                  </svg>
                                  <span className="font-medium text-gray-600">
                                    Drop image or
                                    <span className="text-blue-600 underline ml-2">
                                      browse
                                    </span>
                                  </span>
                                </div>
                              </button>
                            )}
                            {imageList.map((image, index) => (
                              <div key={index} className="image-item">
                                <Image
                                  src={image["data_url"]}
                                  alt="Campaign Image"
                                  width={200}
                                  height={200}
                                  className="border rounded-md"
                                />
                                <div className="image-item__btn-wrapper">
                                  <button
                                    type="button"
                                    onClick={() => onImageUpdate(index)}
                                    className="text-blue-500 underline mr-2"
                                  >
                                    Update
                                  </button>
                                  <button
                                    type="button"
                                    onClick={() => onImageRemove(index)}
                                    className="text-red-500 underline mr-2"
                                  >
                                    Remove
                                  </button>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </ImageUploading>
                  </div>
                </div>

                <div className="mb-4">
                  <FormField
                    labelText="Organization Address *"
                    placeholderText="0xfe....."
                    inputType="text"
                    inputValue={form.address}
                    handleInputChange={(e) =>
                      handleFormFieldChange("address", e)
                    }
                    error={
                      isValidAddress(form.address)
                        ? ""
                        : "Please enter valid address."
                    }
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    labelText="Organization Name *"
                    placeholderText="Your Organization Name"
                    inputType="text"
                    inputValue={form.organizationName}
                    handleInputChange={(e) =>
                      handleFormFieldChange("organizationName", e)
                    }
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    labelText="Organization Description *"
                    placeholderText="Write about organization"
                    isTextArea
                    inputValue={form.organizationDetails}
                    handleInputChange={(e) =>
                      handleFormFieldChange("organizationDetails", e)
                    }
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    labelText="Organization Email *"
                    placeholderText="admin@red-cross.com"
                    inputType="email"
                    inputValue={form.email}
                    handleInputChange={(e) => handleFormFieldChange("email", e)}
                    error={
                      isValidEmail(form.email)
                        ? ""
                        : "Please enter valid email."
                    }
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    labelText="Organization Website Url *"
                    placeholderText="Organization Url"
                    inputType="url"
                    inputValue={form.website}
                    handleInputChange={(e) =>
                      handleFormFieldChange("website", e)
                    }
                    error={
                      isValidURL(form.website) ? "" : "Please enter valid url."
                    }
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    labelText="Organization Phone Number *"
                    placeholderText="Organization Phone Number"
                    inputType="number"
                    inputValue={form.phoneNumber}
                    handleInputChange={(e) =>
                      handleFormFieldChange("phoneNumber", e)
                    }
                    error={
                      isValidPhoneNumber(form.phoneNumber)
                        ? ""
                        : "Please enter valid number."
                    }
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    labelText="Country *"
                    placeholderText="Country"
                    inputType="text"
                    inputValue={form.country}
                    handleInputChange={(e) =>
                      handleFormFieldChange("country", e)
                    }
                  />
                </div>
                <div className="mb-4">
                  <FormField
                    labelText="Zip Code *"
                    placeholderText="Zip Code"
                    inputType="number"
                    inputValue={form.zipCode}
                    handleInputChange={(e) =>
                      handleFormFieldChange("zipCode", e)
                    }
                    error={
                      isValidZipCode(form.zipCode)
                        ? ""
                        : "Please enter valid code."
                    }
                  />
                </div>
                <button
                  type="submit"
                  className={`w-full inline-flex justify-center items-center border border-red-600 text-white rounded-full transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-400 hover:via-red-500 hover:to-red-600 bg-left px-8 py-3 ${
                    isLoading ? "cursor-not-allowed" : "cursor-pointer"
                  }`}
                >
                  {isLoading ? "Loading" : "Add Organization"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AddOrganization;
