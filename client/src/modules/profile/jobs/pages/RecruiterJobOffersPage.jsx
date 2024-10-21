import { useParams } from "react-router-dom";
import RecruiterJobOffers from "../components/RecruiterJobOffers";

export const RecruiterJobOffersPage = () => {
  const { username } = useParams();
  return (
    <>
      <RecruiterJobOffers username={username} />
    </>
  );
};
