import { CampaignType } from "@/@types/CampaignType";
import Link from "next/link";
import FundCard from "../molecules/FundCard";
import Loader from "../atomic/Loader";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Navigation } from "swiper";
import "swiper/css/bundle";
import "swiper/css";
import "swiper/css/navigation";

SwiperCore.use([Navigation]);

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
    <section className="campaign-list pt-6 pb-10 relative z-10">
      <div className="container">
        <div className="mt-[20px]">
          {isLoading && <Loader />}

          {!isLoading && campaigns.length === 0 && (
            <p className="text-xl leading-[30px] text-gray-600 text-center w-full">
              We apologize for the inconvenience, but currently, there are no
              ongoing campaigns available for blood donation.
            </p>
          )}

          <Swiper
            slidesPerView={1}
            spaceBetween={30}
            breakpoints={{
              568: {
                slidesPerView: 2,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 40,
              },
              1200: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
            }}
          >
            {!isLoading &&
              campaigns.length > 0 &&
              campaigns.map((campaign, index) => {
                return (
                  <>
                    <SwiperSlide key={campaign.id}>
                      <Link
                        href={{
                          pathname: `/campaigns/${campaign.id}`,
                        }}
                      >
                        <FundCard {...campaign} />
                      </Link>
                    </SwiperSlide>
                  </>
                );
              })}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default DisplayCampaigns;
