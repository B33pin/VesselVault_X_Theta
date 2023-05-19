import React from "react";
import { MediaRenderer } from "@thirdweb-dev/react";

interface FundCardProps {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: Date;
  amountCollected: number;
  thumbnail: string;
}

const FundCard: React.FC<FundCardProps> = ({
  owner,
  title,
  description,
  target,
  deadline,
  amountCollected,
  thumbnail,
}: FundCardProps): JSX.Element => {
  // const remainingDays = daysLeft(deadline);

  return (
    <div className="card-product-style bg-white rounded transition duration-200 border hover:shadow-lg">
      <div className="card-product-image relative">
        <MediaRenderer className="w-full rounded" src={thumbnail} alt="title" />
      </div>
      <div className="card-product-content px-4 py-6">
        <h2 className="text-coolGray-900 text-lg font-bold transition duration-500 hover:text-teal-400 mb-2">
          {title}
        </h2>
        <div className="flex justify-between flex-wrap mt-[15px] gap-2">
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px] leading-[22px]">
              {amountCollected}
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px]  sm:max-w-[120px] truncate">
              Raised of {target}
            </p>
          </div>
          <div className="flex flex-col">
            <h4 className="font-epilogue font-semibold text-[14px]  leading-[22px]">
              2
            </h4>
            <p className="mt-[3px] font-epilogue font-normal text-[12px] leading-[18px]  sm:max-w-[120px] truncate">
              Days Left
            </p>
          </div>
        </div>

        <div className="flex items-center my-2 gap-[12px]">
          <p className="flex-1 font-epilogue font-normal text-[12px] truncate">
            by <span className="">{owner}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
