import { motion } from "framer-motion";
import { useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/Input/Input";
import { Label } from "~/components/ui/label";
import { Textarea } from "~/components/ui/textarea";
import { type ArtistFormData } from "~/lib/artistSchema";

export default function Step1() {
  const {
    register,
    formState: { errors },
  } = useFormContext<ArtistFormData>();
  return (
    <div className="flex flex-col gap-4">
      <Label className="flex flex-col justify-between gap-2">
        <span>Tytuł</span>
        <Input placeholder="Tytuł" {...register("name")} autoComplete="off" />
        <motion.div className="h-6 text-base tracking-normal text-neo-pink">
          {errors.name?.message}
        </motion.div>
      </Label>
      <Label className="flex flex-col gap-2">
        <span>Opis</span>
        <Textarea placeholder="Opis" {...register("shortDescription")} />
        <motion.div className="h-6 text-base tracking-normal text-neo-pink">
          {errors.shortDescription?.message}
        </motion.div>
      </Label>
    </div>
  );
}
