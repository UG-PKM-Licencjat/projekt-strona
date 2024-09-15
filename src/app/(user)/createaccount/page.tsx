"use client";
import { useEffect, useState } from "react";
import Step1 from "./step1";
import Step2 from "./step2";
import Step3 from "./step3";
import { cons } from "effect/List";

export interface Data {
  firstName: string;
  lastName: string;
  isArtist: boolean;
  activeTab: number;
  registrationStatus: number;
}

const MainForm = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [data, setData] = useState<Data>({
    firstName: "",
    lastName: "",
    isArtist: false,
    activeTab: 0,
    registrationStatus: 0,
  });
  const handleChange = (change: Data) => {
    console.log("change", change);
    setData({
      ...data,
      ...change,
    });
    setActiveTab(change.activeTab);
  };

  useEffect(() => {
    console.log("Data has changed:", data);
  }, [data, activeTab, setData]);

  const formElements = [
    <Step1 data={data} handleChange={handleChange} />,
    <Step2 data={data} handleChange={handleChange} />,
    <Step3 />,
  ];

  return <>{formElements[activeTab]}</>;
};

export default MainForm;
