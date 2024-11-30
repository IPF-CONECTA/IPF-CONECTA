import React from "react";
import { ActiveJobs } from "./ActiveJobs";
import RecruitedUsers from "./RecruitedUsers";
import { PostsQ } from "./PostsQ";
import { PostsByMonth } from "./PostsByMonth";
import SkillsTrend from "./SkillsTrend";

export const Stats = () => {
  return (
    <>
      <div className="d-flex justify-content-between w-50">
        <ActiveJobs />
        <RecruitedUsers />
        <PostsQ />
      </div>
      <div className="d-flex mt-2 justify-content-between me-3">
        <PostsByMonth />
        <SkillsTrend />
      </div>
    </>
  );
};
