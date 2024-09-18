import { ErrorMessage } from "@hookform/error-message";

export default function CustomError(
  props: React.ComponentProps<typeof ErrorMessage>,
) {
  return (
    <ErrorMessage
      render={({ message }) => (
        <div className="h-6 text-base tracking-normal text-neo-pink">
          {message}
        </div>
      )}
      {...props}
    />
  );
}
