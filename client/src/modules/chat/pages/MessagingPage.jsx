import { useState } from "react";
import { HomeNav } from "../../ui/components";
import { SideBar } from "../../ui/components/SideBar";
import { Messaging } from "../components/Messaging";
import { Chat } from "../components/Chat";

export const MessagingPage = () => {
  return (
    <div className="d-flex gap-3 vh-100 p-3">
      <SideBar />
      <Messaging />
      <Chat />
    </div>
  );
};
