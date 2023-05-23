import { useUserContext } from "@/context/user";
import Image from "next/image";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import ImageUploading from "react-images-uploading";
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
import FormField from "@/components/atomic/FormField";
import { useRouter } from "next/router";

type HandleFormFieldChange = (
  fieldName: string,
  e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
) => void;

const EditProfile = () => {
  const router = useRouter();
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, getUserData, updateProfile } = useUserContext();
  const storage = new ThirdwebStorage();
  const { address, balance } = useStateContext();
  const [isFormLoading, setIsFormLoading] = useState(false);
  const [form, setForm] = useState<any>({
    username: "",
    bio: "",
    email: "",
    country: "",
    profile: null,
    coverPhoto: null,
    phoneNumber: "",
    zipCode: "",
    facebookLink: "",
    twitterLink: "",
    instagramLink: "",
  });

  useEffect(() => {
    setLoading(true);
    getUserData(address as string);
    setLoading(false);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [address]);

  useEffect(() => {
    setForm((prev: any) => ({
      ...prev,
      ...user,
      profile: null,
      coverPhoto: null,
    }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleFormFieldChange: HandleFormFieldChange = (fieldName, e) => {
    setForm((prev: any) => ({
      ...prev,
      [fieldName]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsFormLoading(true);

    let profilePhotoIPfs = "";
    let coverPhotoIPfs = "";

    try {
      if (form.profile) {
        profilePhotoIPfs = await storage.upload(form.profile[0]);
      }
      if (form.coverPhoto) {
        coverPhotoIPfs = await storage.upload(form.coverPhoto[0]);
      }

      updateProfile({
        id: address as string,
        username: form.username,
        bio: form.bio,
        email: form.email,
        coverPhoto: coverPhotoIPfs ? coverPhotoIPfs : user.coverPhoto,
        profile: profilePhotoIPfs ? profilePhotoIPfs : user.profile,
        phoneNumber: form.phoneNumber,
        country: form.country,
        zipCode: form.zipCode,
        facebookLink: form.facebookLink,
        instagramLink: form.instagramLink,
        twitterLink: form.twitterLink,
        isOrganization: false,
        organizationName: "",
        organizationDetails: "",
        organizationPhoto: "",
        website: "",
      });
      router.push("/profile/view");
    } catch (error: any) {
      console.error(error.message);
    }

    setIsFormLoading(false);
  };

  return (
    <div>
      <Head>
        <title>{user?.username && `${user?.username} | `} VesselVault</title>
        <meta name="description" content={user.bio} />
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
        {loading && !user.profile && <Loader />}
        {isFormLoading && <Loader />}
        <div className="px-4 2xl:px-28">
          {!loading && address && user.coverPhoto && (
            <Image
              width={1920}
              height={400}
              className="max-h-60 lg:max-h-96 h-full w-full object-cover rounded"
              src={storage.resolveScheme(user.coverPhoto)}
              alt={user.username}
            />
          )}
          {!loading && address && !user.coverPhoto && (
            <Image
              alt={user.username}
              width={1920}
              height={400}
              className="max-h-60 lg:max-h-96 h-full w-full object-cover rounded"
              src={CoverImg}
            />
          )}
          <div className="max-w-6xl mx-auto">
            {!loading && address && (
              <div className="flex lg:flex-nowrap items-start -mt-20">
                <div className="hidden sm:block shadow rounded p-5 lg:p-10 bg-white transition hover:shadow-lg">
                  <div className="card-creator-author flex w-20 lg:w-32 ml-auto mr-auto relative mb-5">
                    {user.isOrganization && (
                      <Image
                        width={100}
                        height={100}
                        className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                        src={storage.resolveScheme(user.organizationPhoto)}
                        alt={user.organizationName}
                      />
                    )}
                    {!user.isOrganization && user.profile && (
                      <Image
                        width={100}
                        height={100}
                        className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                        src={storage.resolveScheme(user.profile)}
                        alt={user.username}
                      />
                    )}
                    {!user.isOrganization && !user.profile && (
                      <Image
                        src={"/logo-large.png"}
                        alt={user.username}
                        width={100}
                        height={100}
                        className="w-20 h-20 lg:w-32 lg:h-32 object-cover rounded-full border-2 border-white"
                      />
                    )}
                    <span className="flex justify-center items-center bg-red-500 text-white w-6 h-6 rounded-full absolute bottom-2 -right-1 lg:right-2">
                      <FaCheck size={12} />
                    </span>
                  </div>
                  <h4 className="text-gray-900 text-2xl font-bold text-center transition duration-500 hover:text-red-400">
                    {user.username.split(" ")[0].length <= 5
                      ? user.username.split(" ")[0]
                      : user.username.split(" ")[0].slice(0, 5) + "..."}
                  </h4>

                  <p className="text-gray-600 font-normal my-2">
                    <CopyToClipboard
                      text={address as string}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 1000);
                      }}
                    >
                      <span className="font-medium uppercase text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                        {shortAddress(address as string)}{" "}
                        {!copied && <FiCopy size={16} className="ml-3" />}
                        {copied && <MdDone size={16} className="ml-3" />}
                      </span>
                    </CopyToClipboard>
                  </p>
                  {balance && (
                    <p className="hidden sm:block text-red-600 text-center my-2 font-bold">
                      {parseFloat(balance).toFixed(4)} TFUEL
                    </p>
                  )}
                </div>
                <div className="sm:pl-10 pt-28">
                  <h4 className="text-gray-900 text-xl font-medium mb-2">
                    Follow Me
                  </h4>
                  <div className="social-share2 flex flex-wrap items-center mb-6">
                    <a
                      className="flex items-center justify-center mt-2 mr-6"
                      href={user.facebookLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 duration-200 shadow-md text-red-600 mr-2 p-1">
                        <FaFacebookF size={20} />
                      </span>
                    </a>
                    <a
                      className="flex items-center justify-center mt-2 mr-6"
                      href={user.instagramLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 duration-200 shadow-md text-red-600 mr-2 p-1">
                        <FaInstagram size={20} />
                      </span>
                    </a>
                    <a
                      className="flex items-center justify-center mt-2 mr-6"
                      href={user.twitterLink}
                      target="_blank"
                      referrerPolicy="no-referrer"
                    >
                      <span className="w-10 h-10 flex items-center justify-center rounded-full bg-red-100 hover:bg-red-200 duration-200 shadow-md text-red-600 mr-2 p-1">
                        <FaTwitter size={20} />
                      </span>
                    </a>
                  </div>
                  <p className="text-gray-600 leading-7 font-normal">
                    {user.bio}
                  </p>
                </div>
              </div>
            )}
            <div className="my-5 lg:my-10">
              <h2 className="text-2xl font-bold mb-4">Update Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="flex flex-wrap lg:gap-4">
                  <div className="mb-4 w-full lg:flex-1">
                    <FormField
                      labelName="Username *"
                      placeholder="John Doe"
                      inputType="text"
                      value={form.username}
                      handleChange={(e) => handleFormFieldChange("username", e)}
                    />
                  </div>
                  <div className="mb-4 w-full lg:flex-1">
                    <FormField
                      labelName="Email *"
                      placeholder="john@vesselvault.com"
                      inputType="email"
                      value={form.email}
                      handleChange={(e) => handleFormFieldChange("email", e)}
                    />
                  </div>
                </div>
                <div className="mb-4">
                  <FormField
                    labelName="Bio *"
                    placeholder="Write your bio"
                    isTextArea
                    value={form.bio}
                    handleChange={(e) => handleFormFieldChange("bio", e)}
                  />
                </div>
                <div className="flex flex-wrap lg:gap-4">
                  <div className="mb-4 w-full lg:flex-1">
                    <ImageUploading
                      value={form.profile}
                      onChange={(imageList: any) => {
                        setForm((prev: any) => ({
                          ...prev,
                          profile: imageList,
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
                            Profile *
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
                  <div className="mb-4 w-full lg:flex-1">
                    <ImageUploading
                      value={form.coverPhoto}
                      onChange={(imageList: any) => {
                        setForm((prev: any) => ({
                          ...prev,
                          coverPhoto: imageList,
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
                            Cover Image *
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
                    labelName="Phone Number *"
                    placeholder="+977 98......"
                    inputType="text"
                    value={form.phoneNumber}
                    handleChange={(e) =>
                      handleFormFieldChange("phoneNumber", e)
                    }
                  />
                </div>
                <div className="flex flex-wrap lg:gap-4">
                  <div className="mb-4 w-full lg:flex-1">
                    <FormField
                      labelName="Country *"
                      placeholder="Nepal"
                      inputType="text"
                      value={form.country}
                      handleChange={(e) => handleFormFieldChange("country", e)}
                    />
                  </div>
                  <div className="mb-4 w-full lg:flex-1">
                    <FormField
                      labelName="Zip Code *"
                      placeholder="44700"
                      inputType="number"
                      value={form.zipCode}
                      handleChange={(e) => handleFormFieldChange("zipCode", e)}
                    />
                  </div>
                </div>
                <div className="flex flex-wrap lg:gap-4">
                  <div className="mb-4 w-full lg:flex-1">
                    <FormField
                      labelName="Facebook Link *"
                      placeholder="https://www.facebook.com"
                      inputType="text"
                      value={form.facebookLink}
                      handleChange={(e) =>
                        handleFormFieldChange("facebookLink", e)
                      }
                    />
                  </div>
                  <div className="mb-4 w-full lg:flex-1">
                    <FormField
                      labelName="Instagram Link *"
                      placeholder="https://www.instagram.com"
                      inputType="text"
                      value={form.instagramLink}
                      handleChange={(e) =>
                        handleFormFieldChange("instagramLink", e)
                      }
                    />
                  </div>
                  <div className="mb-4 w-full lg:flex-1">
                    <FormField
                      labelName="Twitter Link *"
                      placeholder="https://www.twitter.com"
                      inputType="text"
                      value={form.twitterLink}
                      handleChange={(e) =>
                        handleFormFieldChange("twitterLink", e)
                      }
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  className={`inline-flex justify-center items-center border border-red-600 text-white rounded-full transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-400 hover:via-red-500 hover:to-red-600 bg-left px-8 py-3 mt-5 uppercase ${
                    isFormLoading ? "cursor-not-allowed" : `cursor-pointer`
                  }`}
                >
                  {isFormLoading ? "Loading" : `Update Profile`}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default EditProfile;
