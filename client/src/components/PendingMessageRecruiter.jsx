import { Link, useLocation } from "react-router-dom";

export const PendingMessageRecruiter = () => {
  const location = useLocation();
  const companyName = location.state.companyName;
  console.log(companyName);

  return (
    <div className="w-50 mx-auto p-4 border rounded shadow-sm bg-light mt-5 mb-5 d-block">
      <h1 className=" text-center">Ten paciencia!</h1>
      <p className="text-justify">
        Los administradores están evaluando tu perfil asociado a la empresa
        {" " + companyName}. Recibirás un correo electrónico cuando se tome una
        decisión. Este proceso puede tomar unos días, así que te pedimos que
        estés pendiente de tu bandeja de entrada.
      </p>

      <img
        src="../public/recruiterPending.png"
        width={300}
        className="img-fluid"
      />
      <p className="text-muted">
        Mientras tanto puedes completar los datos de tu perfil.
      </p>
      <Link to="/" className="btn btn-outline-success d-flex w-25 text-center">
        Completar información
      </Link>
    </div>
  );
};
