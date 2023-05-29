import React, { useState } from "react";

interface FormFieldProps {
  labelText: string;
  placeholderText: string;
  inputType?: string;
  isTextArea?: boolean;
  inputValue?: string;
  isDisabled?: boolean;
  handleInputChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  acceptedInput?: string;
  error?: string; // New prop for error message
}

const FormField: React.FC<FormFieldProps> = ({
  labelText,
  placeholderText,
  inputType,
  isTextArea,
  inputValue = "",
  isDisabled = false,
  handleInputChange,
  acceptedInput,
  error, // Extract the error prop
  ...props
}): JSX.Element => {
  const [hasError, setHasError] = useState(false); // State to track error

  const handleBlur = () => {
    setHasError(!!error); // Check if there is an error message and set hasError accordingly
  };

  return (
    <label
      className={`flex-1 w-full flex flex-col ${
        hasError ? "border-red-400" : ""
      }`} // Add red border class when there is an error
    >
      {labelText && (
        <span className="font-epilogue font-medium text-[14px] leading-[22px] text-[#808191] mb-[10px]">
          {labelText}
        </span>
      )}
      {isTextArea ? (
        <textarea
          required
          disabled={isDisabled}
          value={inputValue}
          onChange={handleInputChange}
          onBlur={handleBlur} // Add onBlur event handler
          rows={10}
          placeholder={placeholderText}
          className={`border ${
            hasError ? "border-red-400" : "border-gray-300"
          } rounded w-full text-gray-600 transition duration-500 focus:shadow-lg focus:border-red-400 focus:outline-none px-4 py-3`}
        />
      ) : (
        <input
          required={inputType === "file" ? false : true}
          value={inputValue}
          disabled={isDisabled}
          onChange={handleInputChange}
          onBlur={handleBlur} // Add onBlur event handler
          type={inputType}
          step="0.1"
          placeholder={placeholderText}
          className={`border ${
            hasError ? "border-red-400" : "border-gray-300"
          } rounded w-full text-gray-600 transition duration-500 focus:shadow-lg focus:border-gray-400 focus:outline-none px-4 py-3`}
          accept={acceptedInput}
        />
      )}
      {hasError && (
        <span className="text-red-400 text-xs mt-1">{error}</span> // Show error message if there is an error
      )}
    </label>
  );
};

export default FormField;
