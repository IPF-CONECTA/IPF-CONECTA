import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JobDetails from "./components/JobsDetails";
import JobsSales from "./components/JobsSales";
import StudentProfile from "./components/StudentProfile";
import { RecruiterPanel } from "./components/RecruiterPanel";
import CompanyRegister from "./components/CompanyRegister";

function App() {
  return (
    <BrowserRouter>
      <div>
        <nav>
          <br />
          <Link to="/jobs-sales">Ofertas</Link>
          <br />
          <Link to="/profiles">perfil estudiante</Link>
          <br />
          <Link to="/recruiter/panel">Panel</Link>
          <br />
          <Link to="company/register">Registro Compañia</Link>
        </nav>

        {}
        <Routes>
          <Route path="/jobs-sales" element={<JobsSales />} />
          <Route path="/get-job/:id" element={<JobDetails />} />
          <Route path="/profiles" element={<StudentProfile />} />
          <Route path="/recruiter/panel" element={<RecruiterPanel />} />
          <Route path="/company/register" element={<CompanyRegister />} />
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
