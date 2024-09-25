import { useParams } from "react-router-dom";

import { CreateCompanyUbicationForm } from "../components/CreateCompanyUbicationForm";
import { Footer, Nav } from "../../ui/components";

export const CreateCompanyUbicationPage = () => {
  const { companyId } = useParams();

  return (
    <>
      <Nav />
      <br />
      <CreateCompanyUbicationForm companyId={companyId} />
      <br />
      <Footer />
    </>
  );
};
