import HowItWorksImg from "@/assets/how-it-work-image.png";
import Image from "next/image";

type Props = {};

const HowItWorks = (props: Props) => {
  return (
    <section className="how-it-works pt-10 2xl:pt-20 pb-14 2xl:pb-24 relative">
      <div className="container">
        <div className="grid items-center grid-cols-1 lg:grid-cols-9 gap-6">
          <div className="col-span-4 lg:order-12 xl:pl-10">
            <div className="mb-8 lg:mb-0">
              <div className="section-title mb-10">
                <span className="label-before-2 inline-block relative pl-10 text-red-400 text-sm font-medium mb-2">
                  PROCESS
                </span>
                <h2 className="text-coolGray-900 leading-10 text-3xl lg:text-4xl font-bold">
                  Create and sell your NFTs
                </h2>
              </div>
              <div className="how-it-style flex items-center mb-10">
                <div className="how-it-logo w-24	h-24 flex flex-shrink-0	justify-center items-center shadow-xl rounded-full transition duration-500 hover:shadow-lg p-2">
                  <svg
                    version="1.1"
                    width="44"
                    height="37"
                    viewBox="0 0 44 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M42.9713 6.64934C42.7715 6.45509 42.5336 6.30105 42.2715 6.19618C42.0094 6.09131 41.7282 6.0377 41.4444 6.03846H39.92V2.57692C39.9194 2.02628 39.692 1.49836 39.2879 1.109C38.8838 0.719635 38.3359 0.500618 37.7644 0.5H6.74356C5.06114 0.500023 3.44763 1.14397 2.25799 2.29017C1.06834 3.43638 0.399987 4.99097 0.399963 6.61195V30.388C0.399987 32.009 1.06834 33.5636 2.25799 34.7098C3.44763 35.856 5.06114 36.5 6.74356 36.5H41.3595C41.9297 36.4989 42.4763 36.2807 42.8801 35.8929C43.2839 35.505 43.5122 34.9791 43.5152 34.4297L43.5999 8.12248C43.6017 7.84904 43.5471 7.57799 43.4391 7.32509C43.3312 7.07219 43.1722 6.84249 42.9713 6.64934ZM40.6433 33.7308H6.74356C5.82341 33.7308 4.94096 33.3786 4.29031 32.7517C3.63967 32.1248 3.27415 31.2746 3.27415 30.388V6.61195C3.27415 5.72541 3.63967 4.87517 4.29031 4.24829C4.94096 3.62141 5.82341 3.26923 6.74356 3.26923H37.0458V6.03846H6.86688V8.80769H40.7236L40.6433 33.7308Z"
                      fill="#EF4444"
                    />
                    <path
                      d="M34.1716 19.1923H37.0458V21.9615H34.1716V19.1923Z"
                      fill="#EF4444"
                    />
                    <defs>
                      <linearGradient
                        id="paint24_linear_990:14160"
                        x1="0.399963"
                        y1="18.5"
                        x2="43.6"
                        y2="18.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="100%" stopColor="#02AAB0" />
                        <stop offset="1" stopColor="#00CDAC" />
                      </linearGradient>
                      <linearGradient
                        id="paint25_linear_990:14160"
                        x1="0.399963"
                        y1="18.5"
                        x2="43.6"
                        y2="18.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="100%" stopColor="#02AAB0" />
                        <stop offset="1" stopColor="#00CDAC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="how-it-work-content pl-6">
                  <h4 className="how-it-work-title text-xl text-coolGray-900 font-medium mb-4">
                    Set up Your Wallet
                  </h4>
                  <p className="how-it-work-excerpt text-coolGray-600 font-normal">
                    Once you’ve set up your wallet of choice, connect it by
                    clicking the wallet icon in the top right corner.{" "}
                  </p>
                </div>
              </div>
              <div className="how-it-style flex items-center mb-10">
                <div className="how-it-logo w-24	h-24 flex flex-shrink-0	justify-center items-center shadow-xl rounded-full transition duration-500 hover:shadow-lg p-2">
                  <svg
                    width="36"
                    height="37"
                    viewBox="0 0 36 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M30.3752 11.7504C31.8028 11.7508 33.177 12.294 34.219 13.27C35.261 14.246 35.8928 15.5817 35.9865 17.0063L36 17.3753V30.8751C35.9996 32.3028 35.4564 33.6769 34.4804 34.719C33.5045 35.761 32.1688 36.3928 30.7441 36.4865L30.3752 36.5H16.8755C15.4475 36.5002 14.0728 35.9572 13.0303 34.9812C11.9878 34.0051 11.3556 32.6691 11.2619 31.2441L11.2507 30.8751V17.3753C11.2505 15.9472 11.7934 14.5725 12.7695 13.53C13.7455 12.4875 15.0815 11.8553 16.5065 11.7617L16.8755 11.7504H30.3752ZM30.3752 14.0004H16.8755C16.0366 14.0004 15.2277 14.3129 14.6067 14.877C13.9856 15.4411 13.5969 16.2162 13.5164 17.0513L13.5006 17.3753V30.8751C13.5007 31.7141 13.8132 32.5229 14.3772 33.144C14.9413 33.765 15.7165 34.1537 16.5515 34.2343L16.8755 34.25H30.3752C31.2141 34.25 32.023 33.9375 32.644 33.3734C33.2651 32.8093 33.6538 32.0342 33.7343 31.1991L33.7501 30.8751V17.3753C33.75 16.5363 33.4375 15.7275 32.8734 15.1064C32.3094 14.4854 31.5342 14.0967 30.6992 14.0161L30.3752 14.0004ZM23.6253 16.2503C23.8886 16.2502 24.1436 16.3425 24.3459 16.5111C24.5482 16.6796 24.6849 16.9138 24.7323 17.1728L24.7503 17.3753L24.7481 23.0002H30.3752C30.6563 22.9997 30.9274 23.1045 31.1351 23.2939C31.3429 23.4833 31.4722 23.7436 31.4976 24.0236C31.523 24.3035 31.4427 24.5829 31.2724 24.8066C31.1021 25.0303 30.8543 25.1821 30.5777 25.2322L30.3752 25.2502H24.7503V30.8751C24.7508 31.1562 24.6461 31.4273 24.4567 31.6351C24.2673 31.8428 24.007 31.9721 23.727 31.9975C23.447 32.0229 23.1677 31.9426 22.944 31.7723C22.7203 31.6021 22.5685 31.3542 22.5184 31.0776L22.5004 30.8751L22.4981 25.2502H16.8755C16.5944 25.2507 16.3233 25.1459 16.1155 24.9565C15.9078 24.7671 15.7785 24.5068 15.7531 24.2269C15.7277 23.9469 15.808 23.6675 15.9783 23.4438C16.1486 23.2201 16.3964 23.0683 16.673 23.0182L16.8755 23.0002H22.5004V17.3753C22.5004 17.0769 22.6189 16.7908 22.8299 16.5798C23.0408 16.3689 23.327 16.2503 23.6253 16.2503ZM23.9898 4.31427L24.0978 4.66977L25.3915 9.50044H23.0606L21.9244 5.25026C21.7071 4.44005 21.196 3.73978 20.4905 3.28597C19.785 2.83215 18.9359 2.65732 18.1085 2.79555L17.7913 2.86305L4.74837 6.36174C3.93949 6.5794 3.24045 7.09011 2.78719 7.79454C2.33393 8.49898 2.15883 9.34681 2.29594 10.1732L2.36344 10.4927L5.85984 23.5312C6.04679 24.2292 6.45284 24.8488 7.01826 25.2988C7.58367 25.7488 8.27858 26.0054 9.00075 26.0309V28.2809C7.85171 28.2561 6.73779 27.8801 5.80868 27.2036C4.87957 26.5271 4.1798 25.5824 3.8034 24.4964L3.6864 24.114L0.192247 11.0754C-0.177919 9.6961 -0.00957804 8.22762 0.663123 6.96786C1.33582 5.70809 2.46251 4.75138 3.81465 4.29177L4.17014 4.18602L17.2085 0.691832C18.5267 0.338464 19.9284 0.476398 21.1524 1.07993C22.3765 1.68346 23.3393 2.71143 23.8616 3.97228L23.9898 4.31427Z"
                      fill="#EF4444"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_990:14166"
                        x1="0"
                        y1="18.5"
                        x2="36"
                        y2="18.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="100%" stopColor="#02AAB0" />
                        <stop offset="1" stopColor="#00CDAC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="how-it-work-content pl-6">
                  <h4 className="how-it-work-title text-xl text-coolGray-900 font-medium mb-4">
                    Create Your Collection
                  </h4>
                  <p className="how-it-work-excerpt text-coolGray-600 font-normal">
                    Upload your work (image, video, audio, or 3D art), add a
                    title and description{" "}
                  </p>
                </div>
              </div>
              <div className="how-it-style flex items-center">
                <div className="how-it-logo w-24	h-24 flex flex-shrink-0	justify-center items-center shadow-xl rounded-full transition duration-500 hover:shadow-lg p-2">
                  <svg
                    width="34"
                    height="37"
                    viewBox="0 0 34 37"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M23.6049 18.8285C23.7127 18.933 23.7982 19.0571 23.8565 19.1938C23.9149 19.3305 23.9449 19.477 23.9449 19.625C23.9449 19.773 23.9149 19.9195 23.8565 20.0562C23.7982 20.1929 23.7127 20.317 23.6049 20.4215L16.6621 27.1715C16.5546 27.2763 16.4269 27.3594 16.2863 27.4161C16.1458 27.4728 15.995 27.502 15.8428 27.502C15.6906 27.502 15.5399 27.4728 15.3993 27.4161C15.2588 27.3594 15.1311 27.2763 15.0236 27.1715L11.5522 23.7965C11.4446 23.6919 11.3592 23.5677 11.301 23.4311C11.2428 23.2944 11.2128 23.1479 11.2128 23C11.2128 22.8521 11.2428 22.7056 11.301 22.5689C11.3592 22.4323 11.4446 22.3081 11.5522 22.2035C11.7694 21.9923 12.0641 21.8736 12.3714 21.8736C12.5236 21.8736 12.6742 21.9027 12.8148 21.9593C12.9554 22.0159 13.0831 22.0989 13.1907 22.2035L15.8428 24.7843L21.9664 18.8285C22.0739 18.7237 22.2016 18.6406 22.3422 18.5839C22.4828 18.5272 22.6335 18.498 22.7857 18.498C22.9379 18.498 23.0886 18.5272 23.2292 18.5839C23.3698 18.6406 23.4975 18.7237 23.6049 18.8285Z"
                      fill="#EF4444"
                    />
                    <path
                      d="M17 2.75C18.5344 2.75 20.0061 3.34263 21.0911 4.39752C22.1761 5.45242 22.7857 6.88316 22.7857 8.375V9.5H11.2143V8.375C11.2143 6.88316 11.8238 5.45242 12.9089 4.39752C13.9939 3.34263 15.4655 2.75 17 2.75ZM25.1 9.5V8.375C25.1 6.28642 24.2466 4.28338 22.7275 2.80653C21.2085 1.32968 19.1482 0.5 17 0.5C14.8517 0.5 12.7915 1.32968 11.2724 2.80653C9.75338 4.28338 8.89998 6.28642 8.89998 8.375V9.5H0.799988V32C0.799988 33.1935 1.28764 34.3381 2.15566 35.182C3.02369 36.0259 4.20098 36.5 5.42856 36.5H28.5714C29.799 36.5 30.9763 36.0259 31.8443 35.182C32.7123 34.3381 33.2 33.1935 33.2 32V9.5H25.1ZM3.11427 11.75H30.8857V32C30.8857 32.5967 30.6419 33.169 30.2079 33.591C29.7738 34.0129 29.1852 34.25 28.5714 34.25H5.42856C4.81477 34.25 4.22612 34.0129 3.79211 33.591C3.3581 33.169 3.11427 32.5967 3.11427 32V11.75Z"
                      fill="#EF4444"
                    />
                    <defs>
                      <linearGradient
                        id="paint0_linear_990:14172"
                        x1="0.799988"
                        y1="18.5"
                        x2="33.2"
                        y2="18.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="100%" stopColor="#02AAB0" />
                        <stop offset="1" stopColor="#00CDAC" />
                      </linearGradient>
                      <linearGradient
                        id="paint1_linear_990:14172"
                        x1="0.799988"
                        y1="18.5"
                        x2="33.2"
                        y2="18.5"
                        gradientUnits="userSpaceOnUse"
                      >
                        <stop offset="100%" stopColor="#02AAB0" />
                        <stop offset="1" stopColor="#00CDAC" />
                      </linearGradient>
                    </defs>
                  </svg>
                </div>
                <div className="how-it-work-content pl-6">
                  <h4 className="how-it-work-title text-xl text-coolGray-900 font-medium mb-4">
                    List them for sale
                  </h4>
                  <p className="how-it-work-excerpt text-coolGray-600 font-normal">
                    You choose how you want to sell your NFTs, and we help you
                    sell them!{" "}
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-span-5 lg:order-1 xl:pr-10">
            <Image
              className="lg:max-w-full sm:max-w-xl"
              src={HowItWorksImg}
              alt="title"
              width={800}
              height={800}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
