import React from "react";

type CountBoxProps = {
  title: string;
  value: string;
};

const CountBox: React.FC<CountBoxProps> = ({
  title,
  value,
}: CountBoxProps): JSX.Element => {
  return (
    <div className="flex flex-col items-center w-[200px]">
      <h4 className="font-bold text-[30px] text-white p-3 bg-white shadow-md rounded-t-[10px] w-full text-center truncate">
        {value}
      </h4>
      <p className="font-normal text-[16px] px-3 py-2 w-full rounded-b-[10px] text-center">
        {title}
      </p>
    </div>
  );
};

export default CountBox;
