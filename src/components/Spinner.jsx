import React from 'react';

export default function Spinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="w-12 h-12 border-4 border-green-900 border-t-transparent rounded-full animate-spin"></div>
    </div>
  );
}
