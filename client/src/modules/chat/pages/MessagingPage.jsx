import { HomeNav } from "../../ui/components";
import { SideBar } from "../../ui/components/SideBar";
import { Messaging } from "../components/Messaging";
import { ChatPage } from "./ChatPage";
export const MessagingPage = () => {
  return (
    <div>
      <SideBar />
      <Messaging />
    </div>
  );
};
