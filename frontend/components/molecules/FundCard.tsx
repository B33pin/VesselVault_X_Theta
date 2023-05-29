import React from "react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import useCountdown from "@/hooks/useTimer";
import Image from "next/image";
import { FcClock } from "react-icons/fc";
import { CampaignType } from "@/@types/CampaignType";

interface FundCardProps extends CampaignType {
  wrapperClass?: string;
}

const FundCard: React.FC<FundCardProps> = ({
  title,
  targetAmount,
  description,
  collectedAmount,
  deadlineDate,
  imageId,
  wrapperClass = "w-full max-w-sm",
}: FundCardProps): JSX.Element => {
  const [days, hours, minutes, seconds] = useCountdown(deadlineDate);
  const storage = new ThirdwebStorage();

  const leftDays = `${days}:${("0" + hours).slice(-2)}:${("0" + minutes).slice(
    -2
  )}:${("0" + seconds).slice(-2)}`;

  return (
    <div
      className={`bg-white rounded-md transition duration-200 border hover:shadow-lg ${wrapperClass}`}
    >
      <div className="relative bg-red group overflow-hidden m-3 bg-red-50 rounded-md">
        {imageId ? (
          <Image
            width={400}
            height={400}
            className="w-full rounded group-hover:scale-105 duration-200"
            src={storage.resolveScheme(imageId)}
            alt="title"
          />
        ) : (
          <Image
            width={400}
            height={400}
            className="w-full rounded group-hover:scale-105 duration-200"
            src={"/logo.png"}
            alt="title"
          />
        )}
        <div className="bg-white rounded-md absolute bottom-2 right-2 px-2 py-0.5 text-red-600 flex items-center justify-center text-sm">
          <FcClock size={20} /> <span className="ml-2">{leftDays}</span>
        </div>
      </div>
      <div className="px-4 py-6">
        <h2 className="text-gray-900 text-lg font-bold transition duration-500 hover:text-teal-400 mb-2">
          {title}
        </h2>
        <p className="py-3 text-gray-500">{description.slice(0, 50) + "..."}</p>

        <div className="flex flex-wrap gap-2">
          <p className="mt-[3px] font-normal text-base leading-[18px]  sm:max-w-[120px] truncate">
            Raised:
          </p>
          <h4 className="font-semibold text-xl leading-[22px] text-red-600">
            {parseFloat(collectedAmount).toFixed(3)}{" "}
            <span className="text-sm">
              / {parseFloat(targetAmount).toFixed(1)} TFUEL
            </span>
          </h4>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
