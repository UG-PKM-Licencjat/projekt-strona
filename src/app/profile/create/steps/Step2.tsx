import { useController, useFormContext } from "react-hook-form";
import TipTap from "~/components/RichTextEditor/Tiptap";
import type { ArtistFormData } from "~/lib/artistSchema";

export default function Step2() {
  const { control } = useFormContext<ArtistFormData>();
  const {
    field: { onChange, onBlur },
    formState: { errors },
  } = useController({
    name: "longDescription",
    control,
    defaultValue: "",
  });

  const {
    field: { onChange: onChangeHTML, onBlur: onBlurHTML, value },
  } = useController({
    name: "longDescriptionHTML",
    control,
    defaultValue: "",
  });

  const handleBlur = () => {
    onBlur();
    onBlurHTML();
  };
  return (
    <div>
      <TipTap
        placeholder="Opis"
        onChange={onChange}
        onChangeHTML={onChangeHTML}
        onBlur={handleBlur}
        charLimit={1000}
        value={value}
      />
      <div className="h-6 text-base tracking-normal text-neo-pink">
        {errors.longDescription?.message}
      </div>
    </div>
  );
}
