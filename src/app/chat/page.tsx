import { Button } from "src/components/ui/Button/Button";
import { Input } from "src/components/ui/Input/Input";

export default function Chat() {
  return (
    <div>
      <h3>Chat</h3>
      <p>
        This is the chat placeholder page so you can choose your id as we have
        no proper auth for now
      </p>
      <Input placeholder="user_id" />
      <Button>Send</Button>
    </div>
  );
}
