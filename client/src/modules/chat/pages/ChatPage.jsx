import { HomeNav } from "../../ui/components";
import { Chat } from "../components/Chat";

export const ChatPage = () => {
  return (
    <div className="d-flex justify-content-around">
      <Chat />
      <HomeNav />
    </div>
  );
};
