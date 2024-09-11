// multiform component
// 3 steps
"use client";
import { useEffect, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3e from "./step3";

export interface Data {
  firstName: string;
  lastName: string;
  isArtist: boolean;
  activeTab: number;
}

const MainForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<Data>({
    firstName: "",
    lastName: "",
    isArtist: false,
    activeTab: 0,
  });
  const handleChange = (event) => {
    const { name, value } = event;
    setData({
      ...data,
      ...event,
    });

    setActiveTab(event.activeTab);
  };

  // useEffect(() => {
  //   console.log("Data has changed:", data);
  // }, [data]);

  const formElements = [
    <Step1 data={data} handleChange={handleChange} />,
    <Step2 data={data} handleChange={handleChange} />,
    <Step3e data={data} setData={setData} />,
  ];

  return (
    // without styles
    <>{formElements[activeTab]}</>
  );
};

export default MainForm;
