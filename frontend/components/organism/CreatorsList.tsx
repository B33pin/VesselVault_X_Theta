import Image from "next/image";
import React from "react";
import Creator1 from "@/assets/creator-1.jpg";
import Creator2 from "@/assets/creator-2.jpg";
import Creator3 from "@/assets/creator-3.jpg";
import { FaFacebookF, FaInstagram, FaTwitter } from "react-icons/fa";

type Props = {};

const CreatorsList = (props: Props) => {
  return (
    <section className="relative">
      <div className="container">
        <div className="text-center">
          <h2 className="leading-10 text-3xl lg:text-4xl font-bold">
            Behind the VesselVault
          </h2>

          <div className="flex flex-wrap mt-10 gap-8 justify-evenly max-w-5xl mx-auto">
            <div className="bg-white rounded transition duration-200 border hover:shadow-lg group">
              <div className="relative p-5 rounded overflow-hidden">
                <Image
                  className="rounded object-cover w-60 h-60 group-hover:scale-105 duration-200"
                  src={Creator1}
                  alt="Creator 1"
                  width={300}
                  height={300}
                />
              </div>
              <div className="px-4 pb-6 pt-0 text-center">
                <h2 className="text-gray-900 text-lg font-bold transition duration-500 mb-2">
                  Bipin Bhandari
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-5 pt-3">
                  <a className="flex items-center justify-center" href="#">
                    <FaFacebookF size={20} />
                  </a>
                  <a className="flex items-center justify-center" href="#">
                    <FaInstagram size={20} />
                  </a>
                  <a className="flex items-center justify-center" href="#">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-white rounded transition duration-200 border hover:shadow-lg group">
              <div className="relative p-5 rounded overflow-hidden">
                <Image
                  className="rounded object-cover w-60 h-60 group-hover:scale-105 duration-200"
                  src={Creator2}
                  alt="Creator 2"
                  width={300}
                  height={300}
                />
              </div>
              <div className="px-4 pb-6 pt-0 text-center">
                <h2 className="text-gray-900 text-lg font-bold transition duration-500 mb-2">
                  Rohan Shakya
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-5 pt-3">
                  <a className="flex items-center justify-center" href="#">
                    <FaFacebookF size={20} />
                  </a>
                  <a className="flex items-center justify-center" href="#">
                    <FaInstagram size={20} />
                  </a>
                  <a className="flex items-center justify-center" href="#">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </div>
            <div className="bg-white rounded transition duration-200 border hover:shadow-lg group">
              <div className="relative p-5 rounded overflow-hidden">
                <Image
                  className="rounded object-cover w-60 h-60 group-hover:scale-105 duration-200"
                  src={Creator3}
                  alt="Creator 3"
                  width={300}
                  height={300}
                />
              </div>
              <div className="px-4 pb-6 pt-0 text-center">
                <h2 className="text-gray-900 text-lg font-bold transition duration-500 mb-2">
                  Aashika Dhakal
                </h2>
                <div className="flex flex-wrap items-center justify-center gap-5 pt-3">
                  <a className="flex items-center justify-center" href="#">
                    <FaFacebookF size={20} />
                  </a>
                  <a className="flex items-center justify-center" href="#">
                    <FaInstagram size={20} />
                  </a>
                  <a className="flex items-center justify-center" href="#">
                    <FaTwitter size={20} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CreatorsList;
