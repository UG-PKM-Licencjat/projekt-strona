"use client";

import ChoseAndSave from "~/components/LocationGoogle/ChoseAndSave";
import Distance from "~/components/LocationGoogle/Distance";
import APIProviderWrapper from "~/components/LocationGoogle/APIProviderWrapper";

const AddOffer = () => {
  // return <ChoseAndSave />;
  return (
    <APIProviderWrapper>
      <Distance />
    </APIProviderWrapper>
  );
};

export default AddOffer;
