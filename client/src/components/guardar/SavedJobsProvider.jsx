import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { SavedJobsProvider } from './SavedJobContext';

ReactDOM.render(
  <SavedJobsProvider>
    <App />
  </SavedJobsProvider>,
  document.getElementById('root')
);
