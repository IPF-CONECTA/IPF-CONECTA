import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JobDetails from "./components/JobsDetails";
import JobsSales from "./components/JobsSales";


function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <br />
          <Link to="/jobs-sales">Ofertas</Link>
        </nav>

        {}
        <Routes>
          <Route path="/jobs-sales" element={<JobsSales />} />
          <Route path="/get-job/:id" element={<JobDetails/>} /> 
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;