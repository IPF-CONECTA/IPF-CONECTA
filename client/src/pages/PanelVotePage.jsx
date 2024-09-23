import VoteForm from "../components/VoteForm";
import RankingList from "../components/RankingList";
import { Nav, Footer } from "../components";

export const PanelVotePage = () => {
  return (
    <>
      <Nav />
      <VoteForm />
      <RankingList />
      <Footer />
    </>
  );
};
