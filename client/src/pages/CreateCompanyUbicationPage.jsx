import React from "react";
import { Nav, CreateCompanyUbicationForm, Footer } from "../components";
import { useParams } from "react-router-dom";

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
