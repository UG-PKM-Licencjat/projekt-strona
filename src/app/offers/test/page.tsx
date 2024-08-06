import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

export default function CreateOfferPage() {
  const sizes = ["sm", "md", "lg"] as const;
  const variants = [
    "default",
    "outline",
    "secondary",
    "destructive",
    "ghost",
    "link",
  ] as const;
  return (
    <div className="flex h-screen flex-col items-center gap-10 p-20 text-black">
      <div className="font-header text-2xl font-semibold ">Test page</div>
      <div className="grid grid-cols-6 items-center gap-20">
        {variants.map((variant) => (
          <div key={variant} className="flex flex-col items-center gap-4">
            {sizes.map((size) => (
              <Button
                key={variant}
                size={size}
                variant={variant}
                className="capitalize"
              >
                {variant}
              </Button>
            ))}
          </div>
        ))}
      </div>
      <Select>
        <SelectTrigger className="w-[250px]">
          <SelectValue placeholder="Lokalizacja" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="apple">Apple</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="blueberry">Blueberry</SelectItem>
            <SelectItem value="grapes">Grapes</SelectItem>
            <SelectItem value="pineapple">Pineapple</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
