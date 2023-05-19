import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useStateContext } from "@/context/state";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Button from "../atomic/Button";
import { useUserContext } from "@/context/user";
import { HiUser } from "react-icons/hi";
import { MediaRenderer } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { abi } from "@/utils";

const Navbar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);



  return (
    <header
      className={`header-area z-50 w-full py-3 lg:py-4 fixed top-0 left-0 ${
        isVisible && "bg-white border-b"
      }`}
    >
      <div className="container mx-auto relative px-4 z-20">
        <nav className="header-nav flex items-center justify-between relative">
          <div className="header-logo">
            <Link href="/" className="flex items-center flex-shrink-0 mr-6">
              <Image
                src={"/VesselVault.svg"}
                width={200}
                height={45}
                alt="VesselVault"
              />
            </Link>
          </div>
          <div className="flex">
            <ul
              className={`bg-white lg:bg-transparent shadow lg:shadow-none absolute lg:relative right-0 items-center top-14 lg:top-0 lg:flex lg:flex-grow lg:mt-0 p-2 ${
                isActive ? "w-full max-w-[250px]" : "hidden"
              }`}
            >
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/campaigns/explore"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-500 hover:text-red-600"
                >
                  Campaigns
                </Link>
              </li>
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/donations"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-500 hover:text-red-600"
                >
                  Donations
                </Link>
              </li>
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/contact"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-500 hover:text-red-600"
                >
                  Contact
                </Link>
              </li>
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/blogs"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-500 hover:text-red-600"
                >
                  Blogs
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-row justify-end gap-5">
            <Button
              btnType="button"
              title={"Connect Wallet"}
              styles={
                "hidden sm:block bg-red-600 hover:bg-red-500 rounded-full px-6 md:px-8 py-2 text-base"
              }
              handleClick={async () => {
                console.log("HEllo")             
              }}
            />

           
          
          </div>
         
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
