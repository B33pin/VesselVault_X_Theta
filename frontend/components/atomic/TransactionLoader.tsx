import React from "react";
import { FiLoader } from "react-icons/fi";

const TransactionLoader = () => {
  return (
    <div className="fixed inset-0 z-[10000] h-screen bg-[rgba(0,0,0,0.8)] flex items-center justify-center flex-col select-none">
      <FiLoader className="w-[100px] h-[100px] animate-spin text-red-600" />
      <p className="mt-[20px] font-epilogue font-bold text-[20px] text-white text-center">
        Transaction is in progress <br /> Please wait...
      </p>
    </div>
  );
};

export default TransactionLoader;
