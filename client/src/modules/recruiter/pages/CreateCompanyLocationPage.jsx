import { useParams } from "react-router-dom";

import { CreateCompanyLocationForm } from "../components/CreateCompanyLocationForm";
import { Footer, Nav } from "../../ui/components";

export const CreateCompanyLocationPage = () => {
  const { companyId } = useParams();

  return (
    <>
      <Nav />
      <CreateCompanyLocationForm companyId={companyId} />
      <Footer />
    </>
  );
};
