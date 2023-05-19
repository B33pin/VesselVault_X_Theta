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

const Navbar = () => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const { connect, address, disconnect } = useStateContext();
  const { createUser } = useUserContext();
  const [isVisible, setIsVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const { user } = useUserContext();

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 20) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  const createUserData = useCallback(
    async (address: string) => {
      address && createUser(address);
    },
    [createUser]
  );

  useEffect(() => {
    if (address) {
      createUserData(address);
    }
  }, [address, createUserData]);

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
              title={address ? "Create Campaign" : "Connect Wallet"}
              styles={
                "hidden sm:block bg-red-600 hover:bg-red-500 rounded-full px-6 md:px-8 py-2 text-base"
              }
              handleClick={() => {
                if (address) router.push("/campaigns/create");
                else connect();
              }}
            />

            {address && (
              <div className="flex w-[50px] h-[50px] justify-center items-center cursor-pointer">
                <div onClick={() => setShowProfileMenu(!showProfileMenu)}>
                  {user.profile && (
                    <MediaRenderer
                      src={user.profile}
                      alt={user.username}
                      width={"48px"}
                      height={"48px"}
                      className="rounded-full object-contain border-2 border-red-600"
                    />
                  )}
                  {!user.profile && (
                    <div className="rounded-full object-contain border-2 border-red-600 p-1 bg-red-50">
                      <HiUser size={26} />
                    </div>
                  )}
                </div>
                {showProfileMenu && (
                  <ul
                    className={`bg-white shadow absolute right-0 items-center top-14 p-2 w-full max-w-[200px]`}
                  >
                    <li className="relative p-2">
                      <Link
                        href={`/profile/view`}
                        onClick={() => setShowProfileMenu(false)}
                        className="font-bold uppercase transition duration-500 hover:text-red-600"
                      >
                        View Profile
                      </Link>
                    </li>
                    <li className="relative p-2">
                      <Link
                        href={`/profile/edit`}
                        onClick={() => setShowProfileMenu(false)}
                        className="font-bold uppercase transition duration-500 hover:text-red-600"
                      >
                        Edit Profile
                      </Link>
                    </li>
                    <li className="relative p-2">
                      <div
                        className="font-bold uppercase transition duration-500 hover:text-red-600"
                        onClick={() => disconnect()}
                      >
                        Logout
                      </div>
                    </li>
                  </ul>
                )}
              </div>
            )}
          </div>
          <button
            className="p-2 bg-white shadow-md rounded block lg:hidden"
            onClick={() => setIsActive(!isActive)}
          >
            {isActive && <FiX size={24} />}
            {!isActive && <FiMenu size={24} />}
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
