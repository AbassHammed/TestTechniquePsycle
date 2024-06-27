'use client';

import React from 'react';

const Loading = () => (
  <div className="flex flex-row h-screen animate-pulse">
    <div className="flex-none h-full w-[42px] bg-gray-300" />
    <div className="flex-auto space-y-4">
      <div className="flex justify-between">
        <div className="h-6 bg-gray-300 rounded m-4 w-32" />
        <div className="h-6 bg-gray-300 rounded m-4 w-24" />
      </div>

      <div className="h-[1px] w-full bg-gray-200" />

      <div>
        <div className="flex justify-between">
          <div className="h-4 bg-gray-300 rounded m-4 w-32" />
          <div className="h-4 bg-gray-300 rounded m-4 w-8" />
        </div>
        <div className="h-4 bg-gray-300 rounded-full mx-4" />
        <div className="relative">
          <div className="absolute right-0 h-8 bg-gray-300 w-32 rounded m-4" />
        </div>
      </div>

      <div className="">
        <div className="h-8 bg-gray-300 rounded m-4" />
      </div>
    </div>
    <div className="flex-none h-full w-[265px] bg-gray-300" />
  </div>
);
export default Loading;
