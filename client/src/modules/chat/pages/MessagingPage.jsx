import { HomeNav } from "../../ui/components";
import { Messaging } from "../components/Messaging";
import { ChatPage } from "./ChatPage";
export const MessagingPage = () => {
  return (
    <div className="d-flex  ">
      <HomeNav />
      <Messaging />
    </div>
  );
};
