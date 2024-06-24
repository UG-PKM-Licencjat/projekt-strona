export default function Message({ text, isFromMe }: MessageProps) {
  const classes = isFromMe
    ? "bg-blue-200 self-end text-right text-black"
    : "bg-gray-200 self-start text-left text-black";
  return (
    <div
      className={`m-2 max-w-xs rounded-lg p-3 shadow-md md:max-w-sm lg:max-w-md xl:max-w-lg ${classes}`}
    >
      <p>{text}</p>
    </div>
  );
}

interface MessageProps {
  text: string;
  isFromMe: boolean;
}
