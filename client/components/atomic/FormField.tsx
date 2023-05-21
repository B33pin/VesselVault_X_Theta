import React from "react";

interface FormFieldProps {
  labelName: string;
  placeholder: string;
  inputType?: string;
  isTextArea?: boolean;
  value?: string;
  disabled?: boolean;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  accept?: string;
}

const FormField: React.FC<FormFieldProps> = ({
  labelName,
  placeholder,
  inputType,
  isTextArea,
  value = "",
  disabled = false,
  handleChange,
  accept,
  ...props
}): JSX.Element => {
  return (
    <label className="flex-1 w-full flex flex-col">
      {labelName && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelName}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          disabled={disabled}
          value={value}
          onChange={handleChange}
          rows={10}
          placeholder={placeholder}
          className="border border-gray-300 rounded w-full text-gray-600 transition duration-500 focus:shadow-lg focus:border-red-400 focus:outline-none px-4 py-3"
        />
      ) : (
        <input
          required={inputType === "file" ? false : true}
          value={value}
          disabled={disabled}
          onChange={handleChange}
          type={inputType}
          step="0.1"
          placeholder={placeholder}
          className="border border-gray-300 rounded w-full text-gray-600 transition duration-500 focus:shadow-lg focus:border-red-400 focus:outline-none px-4 py-3"
          accept={accept}
        />
      )}
    </label>
  );
};

export default FormField;
