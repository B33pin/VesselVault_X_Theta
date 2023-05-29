import { BloodStatus, BloodType, shortAddress } from "@/utils";
import Link from "next/link";
import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";

type ModalType = {
  bloodPouch: any;
  onClose: () => void;
};

const ModalBloodPouch = ({ bloodPouch, onClose }: ModalType) => {
  const date = new Date(bloodPouch.publishDate.toNumber());
  const date2 = new Date(bloodPouch.receivedDate.toNumber());
  return (
    <div>
      <div
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="relative w-auto my-6 mx-6 max-w-3xl md:min-w-[568px]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-xl font-semibold">
                Pouch Id: {bloodPouch.pouchID}
              </h3>
              <button
                onClick={onClose}
                className="bg-transparent border-0 text-black float-right"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="relative p-6 flex-auto max-h-[60vh] overflow-auto">
              <div>
                <ul className="text-xl text-gray-700">
                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Pouch Id:</strong>
                    <p>{bloodPouch.pouchID}</p>
                  </li>
                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Blood Group:</strong>
                    <p> {BloodType[bloodPouch.bloodGroup as number]}</p>
                  </li>
                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Donor Id:</strong>{" "}
                    <CopyToClipboard text={bloodPouch.donarID}>
                      <Link href={`/profile/${bloodPouch.donarID}`}>
                        <span className="text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                          {shortAddress(bloodPouch.donarID)}
                          {<FiCopy size={16} className="ml-3" />}
                        </span>
                      </Link>
                    </CopyToClipboard>
                  </li>
                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Guardian Id:</strong>{" "}
                    <CopyToClipboard text={bloodPouch.donarID}>
                      <Link href={`/profile/${bloodPouch.organizationID}`}>
                        <span className="text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                          {shortAddress(bloodPouch.organizationID)}{" "}
                          {<FiCopy size={16} className="ml-3" />}
                        </span>
                      </Link>
                    </CopyToClipboard>
                  </li>
                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Published Date:</strong>{" "}
                    <p>{`${date.getFullYear()}-${
                      date.getMonth() + 1
                    }-${date.getDate()}`}</p>
                  </li>
                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Blood Status:</strong>
                    <p>{BloodStatus[bloodPouch.status as number]}</p>
                  </li>

                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Receiver Id:</strong>{" "}
                    {bloodPouch.receiverID !==
                    "0x0000000000000000000000000000000000000000" ? (
                      <CopyToClipboard text={bloodPouch.receiverID}>
                        <Link href={`/profile/${bloodPouch.receiverID}`}>
                          <span className="text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                            {shortAddress(bloodPouch.receiverID)}{" "}
                            {<FiCopy size={16} className="ml-3" />}
                          </span>
                        </Link>
                      </CopyToClipboard>
                    ) : (
                      "Pending Receiver"
                    )}
                  </li>

                  <li className="mb-1 flex items-center">
                    <strong className="mr-2">Received Date:</strong>{" "}
                    {bloodPouch.receiverID !==
                    "0x0000000000000000000000000000000000000000" ? (
                      <p>{`${date2.getFullYear()}-${
                        date2.getMonth() + 1
                      }-${date2.getDate()}`}</p>
                    ) : (
                      "Pending Receiver"
                    )}
                  </li>
                  <li className="mb-1 flex flex-col">
                    <strong className="mr-2">Details:</strong>
                    <p>{bloodPouch.details}</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBloodPouch;
