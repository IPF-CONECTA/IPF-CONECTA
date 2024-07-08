import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import JobsSales from "./components/JobsSales";
import Profile from "./components/Profile";
import JobDetails from "./components/JobDetails";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <nav>
          <Link to="/profile">Perfil</Link>
          <br />
          <Link to="/jobs-sales">Ofertas</Link>
        </nav>

        {}
        <Routes>
          <Route path="/profile" element={<Profile />} />
          <Route path="/jobs-sales" element={<JobsSales />} />
          <Route path="/get-job/:id" element={<JobDetails/>} /> 
          <Route path="*" element={<h1>404</h1>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
