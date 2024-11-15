import React from "react";
import { ListOfIdeas } from "../components/ListOfIdeas";
import { RankingList } from "../components/RankingList";
import styles from "../../../../public/css/ideas.module.css";
import { Nav, Footer } from "../../ui/components";

export const Ideas = () => {
  return (
    <>
      <Nav />
      <div className="d-flex justify-content-evenly pt-2">
        <div className={`${styles.innovativeIdeas} mx-3`}>
          <ListOfIdeas />
        </div>
        <div className={`${styles.rankingSection} p-4`}>
          <h2 className="text-center text-success mb-4">Proyectos favoritos</h2>

          <RankingList />
        </div>
      </div>
      <Footer />
    </>
  );
};
