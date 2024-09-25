import React from 'react';
import ProjectList from './VoteForm';
import RankingList from './RankingList';
import '../../public/conbinedView.css';

const CombinedView = () => {
  return (
    <div className="combined-view">
      <div className="innovative-ideas-section">
        <ProjectList />
      </div>
      <div className="ranking-section">
        <RankingList />
      </div>
    </div>
  );
};

export default CombinedView;
