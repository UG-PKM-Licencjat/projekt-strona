import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { RadioGroup, RadioGroupLabelItem } from "~/components/ui/radio-group";
import { Checkbox } from "~/components/ui/checkbox";
import { Icon } from "~/components/ui/Icon/Icon";

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
    <div className="flex flex-col items-center gap-10 p-20 text-black">
      <div className="font-header text-2xl font-semibold ">Test page</div>
      <div>
        <Label>Select</Label>
        <Select>
          <SelectTrigger className="w-[250px]">
            <SelectValue placeholder="Lokalizacja" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              {[...Array(10).keys()].map((number) => (
                <SelectItem key={number} value={`${number}`}>
                  Item {number}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col items-center gap-4">
        <Label>Buttons</Label>
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
      </div>
      <div>
        <Label htmlFor="test">Input</Label>
        <Input type="text" placeholder="Test" id="test" />
      </div>
      <div>
        <Label>Radio Group</Label>
        <RadioGroup defaultValue="tak">
          <RadioGroupLabelItem value="tak" id="r1">
            Tak, chcę się reklamować na Bebop
          </RadioGroupLabelItem>
          <RadioGroupLabelItem value="nie" id="r2">
            Nie, chcę tylko przeglądać oferty
          </RadioGroupLabelItem>
        </RadioGroup>
      </div>
      <div className="grid gap-2">
        <Label>Checkbox</Label>
        <Checkbox id="c1">Tak, chcę się reklamować na Bebop</Checkbox>
        <Checkbox id="c2">Nie, chcę tylko przeglądać oferty</Checkbox>
      </div>
      <Icon name="trash" className="size-10" />
    </div>
  );
}
