import React, { useRef, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FiCopy } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import { useQRCode } from "next-qrcode";
import { MdDone } from "react-icons/md";

type ModalType = {
  text: number;
  onClose: () => void;
};

const ModalBloodQRCode = ({ text, onClose }: ModalType) => {
  const { Canvas } = useQRCode();
  const canvasRef = useRef<any>();
  const [copied, setCopied] = useState(false);

  return (
    <div>
      <div
        className="flex justify-center items-center overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
        style={{ background: "rgba(0, 0, 0, 0.4)" }}
      >
        <div className="relative w-auto my-6 mx-6 max-w-3xl md:min-w-[360px]">
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none h-full">
            <div className="flex items-center justify-between p-5 border-b border-solid border-gray-300 rounded-t">
              <h3 className="text-xl font-semibold">Blood Pouch Created</h3>
              <button
                onClick={onClose}
                className="bg-transparent border-0 text-black float-right"
              >
                <IoClose size={24} />
              </button>
            </div>
            <div className="relative p-6 flex-auto max-h-[60vh] overflow-auto flex justify-center items-center">
              <div className={`max-w-[280px] text-center`}>
                <span ref={canvasRef}>
                  <Canvas
                    text={`${window.location.host}/bloods/request?pouchId=${text}`}
                    options={{
                      level: "H",
                      margin: 2,
                      scale: 8,
                      width: 280,
                      color: {
                        dark: "#DF2A2A",
                        light: "#FEF0EE",
                      },
                    }}
                    logo={{
                      src: "/logo-large-white.jpg",
                      options: {
                        width: 60,
                        x: undefined,
                        y: undefined,
                      },
                    }}
                  />
                </span>
                <p className="my-3 text-red-600 font-semibold">
                  Pouch Id: {text}
                </p>
                <div className="flex items-center justify-center gap-4 mt-3">
                  <button
                    className={`cursor-pointer text-sm underline text-center`}
                    type="button"
                  >
                    Download QR
                  </button>
                  <button
                    className={`cursor-pointer text-sm underline text-center`}
                    type="button"
                  >
                    <CopyToClipboard
                      text={text.toString()}
                      onCopy={() => {
                        setCopied(true);
                        setTimeout(() => {
                          setCopied(false);
                        }, 1000);
                      }}
                    >
                      <span className="text-base transition duration-200 hover:text-red-600 flex items-center cursor-pointer">
                        Copy Id{" "}
                        {!copied && <FiCopy size={16} className="ml-2" />}
                        {copied && <MdDone size={16} className="ml-2" />}
                      </span>
                    </CopyToClipboard>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBloodQRCode;
