import React from "react";
import { Nav, Footer } from "../../ui/components";
import { IdeaProjects } from "../components/CreateIdea";
import { SideBar } from "../../ui/components/SideBar";

export const CreateIdeas = () => {
  return (
    <>
      <SideBar />
      <IdeaProjects />
    </>
  );
};
