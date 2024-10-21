// import { CreateJobForm } from "../components/JobCreateForm";
import { CreateJobForm } from "../../../profile/jobs/components/CreateJobForm";
import { Nav, Footer } from "../../../ui/components";

export const JobCreatePage = () => {
  return (
    <div>
      <Nav />
      <CreateJobForm />
      <Footer />
    </div>
  );
};
