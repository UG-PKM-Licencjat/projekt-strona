"use client";

import { DefaultCreateOfferPage } from "./default-create";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "src/components/ui/tabs";
import { useForm, FormProvider } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { offerSchema, type FormData } from "~/lib/offerSchema";

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
      </FormProvider>
    </>
  );
}
