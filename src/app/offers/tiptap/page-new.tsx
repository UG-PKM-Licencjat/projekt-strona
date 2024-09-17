"use client";

import { useState } from "react";
import { OverflowButton, ResponsiveToolbar } from "./ResponsiveToolbar";
import { Portal } from "./Portal";

const OverflowButtonComponent: OverflowButton = (props) => {
  const { children } = props;
  const [active, setActive] = useState<boolean>(true);

  return (
    <>
      <button onClick={() => setActive((oldActive) => !oldActive)}>More</button>
      {active && (
        // <Portal>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            marginTop: "10px",
            marginRight: "30px",
          }}
        >
          {children}
        </div>
        // </Portal>
      )}
    </>
  );
};

export default function TipTapPage() {
  const [activeIndex, setActiveIndex] = useState<number | undefined>(0);
  const [spaceBefore, setSpaceBefore] = useState<number>(0);

  return (
    <div>
      <button onClick={() => setActiveIndex(undefined)}>
        clear active index
      </button>
      <button
        onClick={() => setSpaceBefore((oldSpaceBefore) => oldSpaceBefore + 20)}
      >
        increase space before
      </button>
      <button
        onClick={() =>
          setSpaceBefore((oldSpaceBefore) => Math.max(0, oldSpaceBefore - 20))
        }
      >
        decrease space before
      </button>

      <br />
      <br />

      <ResponsiveToolbar
        activeIndex={activeIndex}
        overflowButton={OverflowButtonComponent}
      >
        <button
          style={{ marginLeft: spaceBefore, width: "70px" }}
          onClick={() => setActiveIndex(0)}
        >
          Button 1
        </button>
        <button style={{ width: "110px" }} onClick={() => setActiveIndex(1)}>
          Button 2
        </button>
        <button style={{ width: "90px" }} onClick={() => setActiveIndex(2)}>
          Button 3
        </button>
        <button style={{ width: "130px" }} onClick={() => setActiveIndex(3)}>
          Button 4
        </button>
        <button style={{ width: "70px" }} onClick={() => setActiveIndex(4)}>
          Button 5
        </button>
        <button style={{ width: "110px" }} onClick={() => setActiveIndex(5)}>
          Button 6
        </button>
        <button style={{ width: "150px" }} onClick={() => setActiveIndex(6)}>
          Button 7
        </button>
        <button style={{ width: "90px" }} onClick={() => setActiveIndex(7)}>
          Button 8
        </button>
        <button style={{ width: "130px" }} onClick={() => setActiveIndex(8)}>
          Button 9
        </button>
      </ResponsiveToolbar>
    </div>
  );
}
