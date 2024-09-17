"use client";

import React, { type RefObject, useEffect, useState } from "react";

type CharacterCountProps = {
  inputRef: RefObject<HTMLInputElement>;
};

export const CharactersCount = ({ inputRef }: CharacterCountProps) => {
  const [count, setCount] = useState<number>(0);
  const [limit, setLimit] = useState<number>(0);

  useEffect(() => {
    if (inputRef.current) {
      setLimit(inputRef.current.maxLength);

      const updateCount = () => {
        setCount(inputRef.current?.value.length ?? 0);
      };

      inputRef.current.addEventListener("input", updateCount);

      updateCount();

      const cleanupVar = inputRef;
      return () => {
        cleanupVar.current?.removeEventListener("input", updateCount);
      };
    }
  }, [inputRef]);

  return (
    <div
      className={`m-6 flex items-center gap-2 text-xs text-gray-500 ${count >= limit ? "text-red-500" : "text-gray-500"}`}
    >
      <svg
        height="20"
        width="20"
        viewBox="0 0 20 20"
        className={`${count === limit ? "text-red-500" : count > limit / 2 ? "text-yellow-500" : "text-green-500"}`}
      >
        <circle r="10" cx="10" cy="10" fill="#e9ecef" />
        <circle
          r="5"
          cx="10"
          cy="10"
          fill="transparent"
          stroke="currentColor"
          strokeWidth="10"
          strokeDasharray={`calc(${(count / limit) * 100} * 31.4 / 100) 31.4`}
          transform="rotate(-90) translate(-20)"
        />
        <circle r="6" cx="10" cy="10" fill="white" />
      </svg>
      {count} / {limit} znaków
    </div>
  );
};
