import { APIProvider } from "@vis.gl/react-google-maps";
import { env } from "~/env";

export default function APIProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <APIProvider
      apiKey={env.NEXT_PUBLIC_GOOGLE_MAPS_KEY}
      onLoad={() => console.log("Maps API has loaded.")}
    >
      {children}
    </APIProvider>
  );
}
