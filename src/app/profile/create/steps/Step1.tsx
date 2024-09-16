import { useFormContext } from "react-hook-form";
import { type ArtistFormData } from "~/lib/artistSchema";
import { Input } from "~/components/ui/Input/Input";
import { Textarea } from "~/components/ui/textarea";
import { Label } from "~/components/ui/label";
import { motion } from "framer-motion";

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
        <Textarea placeholder="Opis" {...register("description")} />
        <motion.div className="h-6 text-base tracking-normal text-neo-pink">
          {errors.description?.message}
        </motion.div>
      </Label>
    </div>
  );
}
