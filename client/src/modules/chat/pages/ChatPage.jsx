import { HomeNav } from "../../ui/components";
import { Chat } from "../components/Chat";

export const ChatPage = () => {
  return (
    <div className="container-fluid w-50">
      <div className="row">
        <div className="col-12 col-md-8 col-lg-9">
          <Chat />
        </div>
        <div className="col-12 col-md-4 col-lg-3">
          <HomeNav />
        </div>
      </div>
    </div>
  );
};
