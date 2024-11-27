import React from "react";
import { ActiveJobs } from "./ActiveJobs";
import RecruitedUsers from "./RecruitedUsers";
import { PostsQ } from "./PostsQ";
import { PostsByMonth } from "./PostsByMonth";
import SkillsTrend from "./SkillsTrend";

export const Stats = () => {
  return (
    <>
      <div className="d-flex gap-2 justify-content-between">
        <ActiveJobs />
        <RecruitedUsers />
        <PostsQ />
      </div>
      <div className="d-flex flex-column">
        <PostsByMonth />
        <SkillsTrend />
      </div>
    </>
  );
};
