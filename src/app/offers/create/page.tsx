"use client";

import React from "react";
import { DefaultCreateOfferPage } from "./default-create";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "~/components/ui/tabs";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { DevTool } from "@hookform/devtools";
import { offerSchema, type FormData } from "./schema";

export default function CreateOfferPage() {
  const methods = useForm<FormData>({
    resolver: zodResolver(offerSchema),
  });
  return (
    <>
      <FormProvider {...methods}>
        <Tabs defaultValue="default">
          <TabsList className="flex justify-center">
            <TabsTrigger value="default">Default</TabsTrigger>
            <TabsTrigger value="form">Form</TabsTrigger>
          </TabsList>
          <TabsContent value="default">
            <DefaultCreateOfferPage />
          </TabsContent>
          <TabsContent value="form">
            <div>Form</div>
          </TabsContent>
        </Tabs>
        {/* <DevTool control={methods.control} /> */}
      </FormProvider>
    </>
  );
}
