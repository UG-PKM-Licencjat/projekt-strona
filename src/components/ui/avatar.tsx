import Image, { type ImageProps } from "next/image";
import { cn } from "~/lib/utils";

type AvatarProps = React.ComponentPropsWithRef<"div">;

const Avatar = ({ children, className, ...props }: AvatarProps) => {
  return (
    <div
      className={cn(
        "relative h-10 w-10 overflow-hidden rounded-full",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

interface AvatarImageProps extends ImageProps {
  fallback?: React.ReactNode;
}

const AvatarImage = ({ src, alt, ...props }: AvatarImageProps) => {
  return !src ? null : (
    <Image
      src={src}
      alt={alt}
      width={64}
      height={64}
      referrerPolicy="no-referrer"
      {...props}
      className="absolute z-50 aspect-square h-full w-full text-[0]"
    />
  );
};

const AvatarFallback = ({ children, className, ...props }: AvatarProps) => {
  return (
    <div
      className={cn(
        "absolute inset-0 z-10 flex h-full w-full items-center justify-center rounded-full bg-neo-sage text-black",
        children ? "" : "animate-pulse",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
};

export { Avatar, AvatarImage, AvatarFallback };
