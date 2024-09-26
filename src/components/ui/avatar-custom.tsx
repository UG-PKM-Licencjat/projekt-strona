import Image, { type ImageProps } from "next/image";
import { cn } from "~/lib/utils";

interface AvatarProps extends ImageProps {
  fallback?: React.ReactNode;
}

export const Avatar = ({
  fallback,
  src,
  alt,
  className,
  ...props
}: AvatarProps) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 overflow-hidden rounded-full",
        className,
      )}
    >
      <Image
        src={src}
        alt={alt}
        width={100}
        height={100}
        referrerPolicy="no-referrer"
        {...props}
        className="absolute z-50 aspect-square h-full w-full"
      />
      {fallback ? (
        <div className="absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-full bg-neo-sage text-black">
          {fallback}
        </div>
      ) : (
        <div className="absolute inset-0 z-10 flex h-full w-full animate-pulse items-center justify-center rounded-full bg-neo-sage"></div>
      )}
    </div>
  );
};
