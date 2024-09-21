import { useFormContext } from "react-hook-form";
import type { ArtistFormData } from "~/lib/artistSchema";

export default function Result() {
  const { getValues } = useFormContext<ArtistFormData>();
  const data = getValues();
  return (
    <div>
      <pre className="mt-2 whitespace-pre-wrap rounded-md p-4">
        <code className="text-black">{JSON.stringify(data, null, 2)}</code>
      </pre>
    </div>
  );
}
