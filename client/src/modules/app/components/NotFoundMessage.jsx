import { Link } from "react-router-dom";

export const NotFoundMessage = () => {
  return (
    <div className="d-flex align-items-center justify-content-evenly">
      <div className="logo-container">
        <img
          src="./img/404-not-found-page.png"
          alt="Logo"
          className="logo"
          height={600}
        />
      </div>
      <div className="d-flex flex-column">
        <h1 className="fw-semibold">Oops...</h1>
        <span className="fs-4">La pagina solicitada no existe</span>
        <Link to="/" className="mt-2 btn btn-outline-primary fw-semibold fs-5">
          Volver al Inicio
        </Link>
      </div>
    </div>
  );
};
