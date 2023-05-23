import { useUserContext } from "@/context/user";
import Image from "next/image";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { FaCheck, FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";
import { FiCopy } from "react-icons/fi";
import Head from "next/head";
import { useStateContext } from "@/context/state";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { MdDone } from "react-icons/md";
import { shortAddress } from "@/utils";
import Loader from "@/components/atomic/Loader";
import CoverImg from "@/assets/cover.webp";
import Link from "next/link";
import FormField from "@/components/atomic/FormField";
import { useRouter } from "next/router";

type Props = {};

const Profile = (props: Props) => {
  const router = useRouter();
  const userId = router.query.id || "";
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const [guestUser, setGuestUser] = useState<any>(null);
  const { getUserByAddress } = useUserContext();
  const storage = new ThirdwebStorage();
  const [form, setForm] = useState({
    username: "",
    bio: "",
    email: "",
    country: "",
    profile: "",
    coverPhoto: "",
    phoneNumber: "",
    zipCode: "",
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
  });

  useEffect(() => {
    const fetchUserData = async () => {
      setLoading(true);
      const response = await getUserByAddress(userId as string);
      setGuestUser(response);
      setLoading(false);
    };
    fetchUserData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      ...guestUser,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [guestUser]);

  return (
    <div>
      <Head>
        <title>
          {guestUser?.username && `${guestUser?.username} | `} VesselVault
        </title>
        <meta name="description" content={guestUser?.bio} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <section className="pt-5 2xl:pt-10 pb-8 2xl:pb-10 relative">
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

        {!guestUser ? (
          <Loader />
        ) : (
          <div className="px-4 2xl:px-28">
            {!loading && userId && guestUser.coverPhoto && (
              <Image
                width={1920}
                height={400}
                className="max-h-60 lg:max-h-96 h-full w-full object-cover rounded"
                src={storage.resolveScheme(guestUser.coverPhoto)}
                alt={guestUser.username}
              />
            )}
            {!loading && userId && !guestUser.coverPhoto && (
              <Image
                alt={guestUser.username}
                width={1920}
                height={400}
                className="max-h-60 lg:max-h-96 h-full w-full object-cover rounded"
                src={CoverImg}
              />
            )}
            {!loading && userId && (
              <div className="max-w-6xl mx-auto">
                <div className="flex lg:flex-nowrap items-start -mt-20">
                  <div className="hidden sm:block relative shadow rounded p-5 lg:p-10 bg-white transition hover:shadow-lg">
                    <div className="relative flex w-20 lg:w-32 ml-auto mr-auto mb-5">
                      {guestUser.isOrganization && (
                        <Image
                          width={100}
                          height={100}
                          className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                          src={storage.resolveScheme(
                            "ipfs://QmQSXDz9sgMkRSRobKCj8dB66t85HuQJYW1J9h3cghtTp8/0"
                          )}
                          alt={guestUser.organizationName}
                        />
                      )}
                      {!guestUser.isOrganization && guestUser.profile && (
                        <Image
                          width={100}
                          height={100}
                          className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                          src={storage.resolveScheme(guestUser.profile)}
                          alt={guestUser.username}
                        />
                      )}
                      {!guestUser.isOrganization && !guestUser.profile && (
                        <Image
                          src={"/logo-large.png"}
                          alt={guestUser.username}
                          width={100}
                          height={100}
                          className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                        />
                      )}
                      <span className="flex justify-center items-center bg-red-500 text-white w-6 h-6 rounded-full absolute bottom-2 -right-1 lg:right-2">
                        <FaCheck size={12} />
                      </span>
                    </div>
                    <h4 className="hidden sm:block text-gray-900 text-2xl font-bold text-center transition duration-500 hover:text-red-400">
                      {guestUser.username.split(" ")[0].length <= 5
                        ? guestUser.username.split(" ")[0]
                        : guestUser.username.split(" ")[0].slice(0, 5) + "..."}
                    </h4>

                    <p className="hidden sm:block text-gray-600 font-normal my-2">
                      <CopyToClipboard
                        text={userId as string}
                        onCopy={() => {
                          setCopied(true);
                          setTimeout(() => {
                            setCopied(false);
                          }, 1000);
                        }}
                      >
                        <span className="font-medium uppercase text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                          {shortAddress(userId as string)}{" "}
                          {!copied && <FiCopy size={16} className="ml-3" />}
                          {copied && <MdDone size={16} className="ml-3" />}
                        </span>
                      </CopyToClipboard>
                    </p>
                  </div>
                  <div className="sm:pl-10 pt-28">
                    <h4 className="text-gray-900 text-xl font-medium mb-2">
                      Follow Me
                    </h4>
                    <div className="social-share2 flex flex-wrap items-center mb-6">
                      <a
                        className="flex items-center justify-center mt-2 mr-6"
                        href={guestUser.facebookLink}
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 duration-200 shadow-md text-red-600 mr-2 p-1">
                          <FaFacebookF size={20} />
                        </span>
                      </a>
                      <a
                        className="flex items-center justify-center mt-2 mr-6"
                        href={guestUser.instagramLink}
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 duration-200 shadow-md text-red-600 mr-2 p-1">
                          <FaInstagram size={20} />
                        </span>
                      </a>
                      <a
                        className="flex items-center justify-center mt-2 mr-6"
                        href={guestUser.twitterLink}
                        target="_blank"
                        referrerPolicy="no-referrer"
                      >
                        <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 duration-200 shadow-md text-red-600 mr-2 p-1">
                          <FaTwitter size={20} />
                        </span>
                      </a>
                    </div>

                    {guestUser.isOrganization && (
                      <p className="text-gray-600 leading-7 font-normal">
                        {guestUser.organizationDetails}
                      </p>
                    )}
                    {!guestUser.isOrganization && guestUser.bio && (
                      <p className="text-gray-600 leading-7 font-normal">
                        {guestUser.bio}
                      </p>
                    )}
                  </div>
                </div>
                <div className="my-5 lg:my-10">
                  <h2 className="text-2xl font-bold mb-4">Profile</h2>
                  <div>
                    <div className="flex flex-wrap lg:gap-4">
                      <div className="mb-4 w-full lg:flex-1">
                        <FormField
                          disabled
                          labelName="Username *"
                          placeholder="John Doe"
                          inputType="text"
                          value={form.username}
                          handleChange={(e) => {}}
                        />
                      </div>
                      <div className="mb-4 w-full lg:flex-1">
                        <FormField
                          disabled
                          labelName="Email *"
                          placeholder="john@vesselvault.com"
                          inputType="email"
                          value={form.email}
                          handleChange={(e) => {}}
                        />
                      </div>
                    </div>
                    <div className="flex flex-wrap lg:gap-4">
                      <div className="mb-4 w-full lg:flex-1">
                        <FormField
                          disabled
                          labelName="Phone Number *"
                          placeholder="Phone Number"
                          inputType="text"
                          value={form.phoneNumber}
                          handleChange={(e) => {}}
                        />
                      </div>
                      <div className="mb-4 w-full lg:flex-1">
                        <FormField
                          disabled
                          labelName="Country *"
                          placeholder="Nepal"
                          inputType="text"
                          value={form.country}
                          handleChange={(e) => {}}
                        />
                      </div>
                      <div className="mb-4 w-full lg:flex-1">
                        <FormField
                          disabled
                          labelName="Zip Code *"
                          placeholder="44700"
                          inputType="number"
                          value={form.zipCode}
                          handleChange={(e) => {}}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </section>
    </div>
  );
};

export default Profile;
