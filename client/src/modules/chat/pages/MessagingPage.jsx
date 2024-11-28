import { useState } from "react";
import { HomeNav } from "../../ui/components";
import { SideBar } from "../../ui/components/SideBar";
import { Messaging } from "../components/Messaging";
import { Chat } from "../components/Chat";

export const MessagingPage = () => {
  return (
    <div className="d-flex">
      <SideBar />
      <Messaging />
      <Chat />
    </div>
  );
};
