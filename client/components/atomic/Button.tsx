import React from "react";

type ButtonType = {
  btnType: "button" | "reset" | "submit";
  title: string;
  handleClick?: () => void;
  styles: string;
};

const Button = ({ btnType, title, handleClick, styles }: ButtonType) => {
  return (
    <button
      type={btnType}
      className={`font-semibold leading-[26px] text-white ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
