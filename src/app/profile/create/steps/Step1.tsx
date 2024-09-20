import { useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/Input/Input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { type ArtistFormData } from "~/lib/artistSchema";
import CustomError from "~/components/Form/CustomError";

export default function Step1() {
  const { register } = useFormContext<ArtistFormData>();
  return (
    <div className="flex flex-col gap-4">
      <Label className="flex flex-col justify-between gap-2">
        <span>Tytuł</span>
        <Input placeholder="Tytuł" {...register("name")} autoComplete="off" />
        <CustomError name="name" />
      </Label>
      <Label className="flex flex-col gap-2">
        <span>Opis</span>
        <Textarea placeholder="Opis" {...register("shortDescription")} />
        <CustomError name="shortDescription" />
      </Label>
    </div>
  );
}
