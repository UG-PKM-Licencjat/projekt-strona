import { useFormContext } from "react-hook-form";
import { Input } from "~/components/ui/Input/Input";

export default function Step1() {
  const { register } = useFormContext();
  return (
    <div>
      <Input {...register("name")} placeholder="Imię i nazwisko" />
    </div>
  );
}
