import React from "react";

type ButtonType = {
  btnType: "button" | "reset" | "submit";
  disabled?: boolean;
  title: string;
  handleClick?: () => void;
  styles: string;
};

const Button = ({
  btnType,
  disabled = false,
  title,
  handleClick,
  styles,
}: ButtonType) => {
  return (
    <button
      type={btnType}
      disabled={disabled}
      className={`font-semibold leading-[26px] text-white ${styles} ${
        disabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
