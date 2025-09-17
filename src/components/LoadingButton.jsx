import React from "react";

export default function LoadingButton({
  isLoading,
  children,
  className = "",
  ...props
}) {
  return (
    <button
      disabled={isLoading}
      className={`relative flex items-center justify-center px-4 py-2 rounded-md transition duration-200 ease-in-out
                  ${isLoading ? "opacity-70 cursor-not-allowed" : ""}
                  ${className}`}
      {...props}
    >
      {isLoading && (
        <svg
          className="animate-spin absolute left-2 h-5 w-5 text-white"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
        >
          <circle
            className="opacity-25"
            cx="12"
            cy="12"
            r="10"
            stroke="currentColor"
            strokeWidth="4"
          ></circle>
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
          ></path>
        </svg>
      )}
      <span className={`${isLoading ? "ml-3" : ""}`}>{children}</span>
    </button>
  );
}
