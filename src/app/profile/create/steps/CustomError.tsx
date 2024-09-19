import { ErrorMessage } from "@hookform/error-message";

export default function CustomError(
  props: React.ComponentProps<typeof ErrorMessage>,
) {
  return (
    <div className="h-6 text-base tracking-normal text-neo-pink">
      <ErrorMessage
        className="h-6"
        render={({ message }) => <>{message}</>}
        {...props}
      />
    </div>
  );
}
