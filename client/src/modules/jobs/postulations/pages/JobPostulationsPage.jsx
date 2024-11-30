import { RecommendedAccounts } from "../../../feed/components/RecommendedAccounts";
import { Nav, SideBar } from "../../../ui/components";
import { JobPostulations } from "../components/JobPostulations";

export const JobPostulationsPage = () => {
  return (
    <div className="d-flex justify-content-evenly px-5  my-4">
      <SideBar />
      <JobPostulations />
      <RecommendedAccounts />
    </div>
  );
};
