import { CampaignType } from "@/@types/CampaignType";
import Link from "next/link";
import FundCard from "../molecules/FundCard";
import Loader from "../atomic/Loader";

interface DisplayCampaignsProps {
  title: string;
  isLoading: boolean;
  campaigns: CampaignType[];
}

const DisplayCampaigns: React.FC<DisplayCampaignsProps> = ({
  title,
  isLoading,
  campaigns,
}: DisplayCampaignsProps): JSX.Element => {
  return (
    <section className="campaign-list pt-6 pb-10 relative">
      <div className="container">
        <h1 className=" font-semibold text-[18px] text-white text-left">
          {title} ({campaigns.length})
        </h1>

        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          {isLoading && <Loader />}

          {!isLoading && campaigns.length === 0 && (
            <p className="text-xl leading-[30px] text-gray-600 text-center w-full">
              You have not created any campaigns yet
            </p>
          )}

          {!isLoading &&
            campaigns.length > 0 &&
            campaigns.map((campaign, index) => {
              return (
                <Link
                  href={{
                    pathname: `/campaigns/${campaign.id}`,
                  }}
                  key={index}
                >
                  <FundCard {...campaign} />
                </Link>
              );
            })}
        </div>
      </div>
    </section>
  );
};

export default DisplayCampaigns;
