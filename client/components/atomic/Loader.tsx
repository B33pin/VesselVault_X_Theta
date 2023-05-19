import React from "react";
import { FiLoader } from "react-icons/fi";

type Props = {};

const Loader = (props: Props) => {
  return (
    <div className="w-full h-80 text-center flex justify-center items-center">
      <FiLoader className="w-[100px] h-[100px] animate-spin text-red-600 mx-auto" />
    </div>
  );
};

export default Loader;
