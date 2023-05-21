import React from "react";
import { ThirdwebStorage } from "@thirdweb-dev/storage";
import { shortAddress } from "@/utils";
import useCountdown from "@/hooks/useTimer";
import Image from "next/image";
import { FcClock } from "react-icons/fc";

interface FundCardProps {
  owner: string;
  title: string;
  description: string;
  target: number;
  deadline: Date;
  amountCollected: number;
  thumbnail: string;
  wrapperClass?: string;
}

const FundCard: React.FC<FundCardProps> = ({
  owner,
  title,
  target,
  description,
  amountCollected,
  deadline,
  thumbnail,
  wrapperClass = "w-full max-w-sm",
}: FundCardProps): JSX.Element => {
  const [days, hours, minutes, seconds] = useCountdown(deadline);
  const storage = new ThirdwebStorage();

  const leftDays = `${days}:${("0" + hours).slice(-2)}:${("0" + minutes).slice(
    -2
  )}:${("0" + seconds).slice(-2)}`;

  return (
    <div
      className={`bg-white rounded-md transition duration-200 border hover:shadow-lg ${wrapperClass}`}
    >
      <div className="relative bg-red group overflow-hidden m-3 bg-red-50 rounded-md">
        <Image
          style={{ width: "100%", minWidth: 300, maxHeight: 280 }}
          className="w-full rounded group-hover:scale-105 duration-200"
          src={storage.resolveScheme(thumbnail)}
          alt="title"
          width={300}
          height={300}
        />
        <div className="bg-white rounded-md absolute bottom-2 right-2 px-2 py-0.5 text-red-600 flex items-center justify-center text-sm">
          <FcClock size={20} /> <span className="ml-2">{leftDays}</span>
        </div>
      </div>
      <div className="px-4 py-6">
        <h2 className="text-gray-900 text-lg font-bold transition duration-500 hover:text-teal-400 mb-2">
          {title}
        </h2>
        <p className="py-3 text-gray-500">{description.slice(0, 50) + "..."}</p>
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div className="flex flex-wrap gap-2">
            <p className="mt-[3px] font-normal text-base leading-[18px]  sm:max-w-[120px] truncate">
              Raised:
            </p>
            <h4 className="font-semibold text-xl leading-[22px] text-red-600">
              {amountCollected} <span className="text-base">/ {target}</span>
            </h4>
          </div>

          <div className="flex items-center gap-[12px]">
            <div>
              <Image
                src="/icons/android-icon-96x96.png"
                alt={"Donar"}
                width={40}
                height={40}
                className="w-8 h-8 bg-red-100 p-1 rounded-full"
              />
            </div>
            <p className="flex-1 font-normal text-sm truncate">
              <span className="">{shortAddress(owner, 5, 3)}</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FundCard;
