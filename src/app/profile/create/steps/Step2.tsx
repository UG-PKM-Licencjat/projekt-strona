import TipTap from "~/components/RichTextEditor/Tiptap";
import { useFormContext, useController } from "react-hook-form";
import type { ArtistFormData } from "~/lib/artistSchema";

export default function Step2() {
  const { control } = useFormContext<ArtistFormData>();
  const {
    field: { onChange, value, onBlur },
    formState: { errors },
  } = useController({
    name: "longDescription",
    control,
    defaultValue: "",
  });
  return (
    <div>
      <TipTap
        placeholder="Opis"
        onChange={onChange}
        onBlur={onBlur}
        charLimit={1000}
        value={value}
      />
      <div className="h-6 text-base tracking-normal text-neo-pink">
        {errors.longDescription?.message}
      </div>
    </div>
  );
}
