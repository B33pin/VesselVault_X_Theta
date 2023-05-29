import React from "react";

type ButtonProps = {
  type: "button" | "reset" | "submit";
  isDisabled?: boolean;
  text: string;
  handleClick?: () => void;
  styleClass: string;
};

const Button: React.FC<ButtonProps> = ({
  type,
  isDisabled = false,
  text,
  handleClick,
  styleClass,
}) => {
  return (
    <button
      type={type}
      disabled={isDisabled}
      className={`font-semibold leading-[26px] text-white ${styleClass} ${
        isDisabled ? "cursor-not-allowed" : "cursor-pointer"
      }`}
      onClick={handleClick}
    >
      {text}
    </button>
  );
};

export default Button;
