import { Button } from "~/components/ui/button";

export default function CreateOfferPage() {
  const sizes = ["sm", "default", "lg"] as const;
  const variants = [
    "default",
    "outline",
    "secondary",
    "destructive",
    "ghost",
    "link",
  ] as const;
  return (
    <div className="flex h-screen flex-col items-center gap-10 bg-neo-gray p-20 text-black">
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
    </div>
  );
}
