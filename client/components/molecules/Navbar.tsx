import React, { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useStateContext } from "@/context/state";
import { FiMenu, FiX } from "react-icons/fi";
import Image from "next/image";
import Button from "../atomic/Button";
import { useUserContext } from "@/context/user";
import { FaUser } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { shortAddress } from "@/utils";
import { FiCopy } from "react-icons/fi";
import { MdDone } from "react-icons/md";
import { useDonationContext } from "@/context/donation";
import { ThirdwebStorage } from "@thirdweb-dev/storage";

const Navbar = () => {
  const { connect, address, disconnect } = useStateContext();
  const { createUser } = useUserContext();
  const [isVisible, setIsVisible] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [copied, setCopied] = useState(false);
  const { user } = useUserContext();
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { isGuardian } = useDonationContext();
  const profileRef = useRef<HTMLUListElement | null | any>();
  const menuRef = useRef<HTMLUListElement | null | any>();
  const storage = new ThirdwebStorage();

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        showProfileMenu &&
        profileRef.current &&
        !profileRef.current.contains(e.target)
      ) {
        setShowProfileMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [showProfileMenu]);

  useEffect(() => {
    const checkIfClickedOutside = (e: any) => {
      if (
        isMenuActive &&
        menuRef.current &&
        !menuRef.current.contains(e.target)
      ) {
        setIsMenuActive(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [isMenuActive]);

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
      className={`header-area z-50 w-full py-4 lg:py-5 fixed top-0 left-0 ${
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
              ref={menuRef}
              className={`bg-white lg:bg-transparent shadow lg:shadow-none absolute lg:relative right-0 items-center top-14 lg:top-0 lg:flex lg:flex-grow lg:mt-0 p-2 ${
                isMenuActive ? "w-full max-w-[250px]" : "hidden lg:block"
              }`}
            >
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/campaigns/explore"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-200 hover:text-red-600"
                >
                  Campaigns
                </Link>
              </li>
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/bloods/request"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-200 hover:text-red-600"
                >
                  Request Blood
                </Link>
              </li>
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/contact"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-200 hover:text-red-600"
                >
                  Contact
                </Link>
              </li>
              <li className="relative lg:mr-4 py-2 lg:py-0">
                <Link
                  href="/about-us"
                  className="px-3 py-3 lg:py-5 font-bold uppercase transition duration-200 hover:text-red-600"
                >
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-row justify-end gap-5">
            {!address && (
              <Button
                btnType="button"
                title={"Connect Wallet"}
                styles={
                  "hidden sm:block rounded-full px-4 py-2 text-base mr-4 transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-400 hover:via-red-500 hover:to-red-600 bg-left"
                }
                handleClick={() => connect()}
              />
            )}

            {!address && (
              <Button
                btnType="button"
                title={"Connect"}
                styles={
                  "block sm:hidden rounded-full px-4 py-2 text-base mr-4 transition-all duration-500 bg-gradient-to-r from-red-600 via-red-500 to-red-400 hover:from-red-400 hover:via-red-500 hover:to-red-600 bg-left"
                }
                handleClick={() => connect()}
              />
            )}

            {address && (
              <>
                <div className="w-[40px] h-[40px] hidden lg:flex justify-center items-center cursor-pointer rounded-full border-2 border-red-600 bg-red-50 relative">
                  <span className="text-white bg-red-600 absolute -top-2 -right-2 rounded-full text-sm py-0.5 px-1">
                    9+
                  </span>
                  <IoNotificationsSharp size={20} />
                </div>
                <div className="flex w-[40px] h-[40px] justify-center items-center cursor-pointer">
                  <div onClick={() => setShowProfileMenu(!showProfileMenu)}>
                    {user.profile && (
                      <Image  
                      width={40}
                      height={40}
                      className="rounded-full object-contain border-2 border-red-600"
                      src={storage.resolveScheme(user.profile)}
                      alt={user.username}
                      />
                    )}
                    {!user.profile && (
                      <div className="w-[40px] h-[40px] flex justify-center items-center cursor-pointer rounded-full border-2 border-red-600 bg-red-50">
                        <FaUser size={20} />
                      </div>
                    )}
                  </div>
                  {showProfileMenu && (
                    <ul
                      ref={profileRef}
                      className={`bg-white shadow-md absolute right-0 items-center top-14 p-2 w-full max-w-[180px] rounded-md`}
                    >
                      <li className="relative p-2">
                        <CopyToClipboard
                          text={address}
                          onCopy={() => {
                            setCopied(true);
                            setTimeout(() => {
                              setCopied(false);
                            }, 1000);
                          }}
                        >
                          <span className="font-medium uppercase text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                            {shortAddress(address)}{" "}
                            {!copied && <FiCopy size={16} className="ml-3" />}
                            {copied && <MdDone size={16} className="ml-3" />}
                          </span>
                        </CopyToClipboard>
                      </li>
                      <hr className="border-gray-400" />
                      <li className="relative p-2">
                        <Link
                          href={`/profile/view`}
                          onClick={() => setShowProfileMenu(false)}
                          className="font-medium uppercase transition duration-200 hover:text-red-600"
                        >
                          View Profile
                        </Link>
                      </li>
                      <hr className="border-gray-200" />
                      <li className="relative p-2">
                        <Link
                          href={`/profile/edit`}
                          onClick={() => setShowProfileMenu(false)}
                          className="font-medium uppercase transition duration-200 hover:text-red-600"
                        >
                          Edit Profile
                        </Link>
                      </li>
                      <hr className="border-gray-400" />
                      {isGuardian && (
                        <>
                          <li className="relative p-2">
                            <Link
                              href={`/bloods/add`}
                              onClick={() => setShowProfileMenu(false)}
                              className="font-medium uppercase transition duration-200 hover:text-red-600"
                            >
                              Post Blood
                            </Link>
                          </li>
                          <hr className="border-gray-200" />
                          <li className="relative p-2">
                            <Link
                              href={`/admin/add-guardian`}
                              onClick={() => setShowProfileMenu(false)}
                              className="font-medium uppercase transition duration-200 hover:text-red-600"
                            >
                              Add Guardian
                            </Link>
                          </li>
                          <hr className="border-gray-400" />
                        </>
                      )}

                      <li className="relative p-2">
                        <Link
                          href={`/bloods/history`}
                          onClick={() => setShowProfileMenu(false)}
                          className="font-medium uppercase transition duration-200 hover:text-red-600"
                        >
                          My History
                        </Link>
                      </li>

                      <hr className="border-gray-200" />
                      <li className="relative p-2">
                        <Link
                          href={`/chats/${address}`}
                          onClick={() => setShowProfileMenu(false)}
                          className="font-medium uppercase transition duration-200 hover:text-red-600"
                        >
                          My Chats
                        </Link>
                      </li>

                      <hr className="border-gray-400" />
                      <li className="relative p-2">
                        <div
                          className="font-medium uppercase transition duration-200 hover:text-red-600"
                          onClick={() => disconnect()}
                        >
                          Disconnect
                        </div>
                      </li>
                    </ul>
                  )}
                </div>
              </>
            )}
            <button
              className="p-2 bg-white shadow-md rounded block lg:hidden"
              onClick={() => setIsMenuActive(!isMenuActive)}
            >
              {isMenuActive && <FiX size={24} />}
              {!isMenuActive && <FiMenu size={24} />}
            </button>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
