import { Link, useLocation } from "react-router-dom";

export const MessageRecruiter = () => {
  const location = useLocation();

  const companyName = location.state.companyName;
  const recruiterStatus = location.state.status;

  return (
    <div className="w-50 mx-auto p-4 border rounded shadow-sm bg-light mt-5 mb-5 d-block">
      {recruiterStatus === "Pendiente" ? (
        <>
          <h3 className=" text-center">Ten paciencia!</h3>
          <p className="text-center">
            Tu solicitud está pendiente de aprobación
          </p>

          <p className="text-justify">
            Los administradores están evaluando tu perfil asociado a la empresa
            {" " + companyName}. Recibirás un correo electrónico cuando se tome
            una decisión. Este proceso puede tomar unos días, así que te pedimos
            que estés pendiente de tu bandeja de entrada.
          </p>

          <img
            src="../public/recruiter2.png"
            width={450}
            className="img-fluid d-block mx-auto mb-3"
          />
          <p className="text-muted">
            Mientras tanto puedes completar los datos de tu perfil.
          </p>
          <Link
            to="/"
            className="btn btn-outline-success d-flex w-25 text-center"
          >
            Completar información
          </Link>
        </>
      ) : (
        <>
          <h3 className="text-center">¡Lo sentimos mucho!</h3>
          <p className="text-center">Tu solicitud ha sido rechazada</p>
          <p className="text-justify">
            Los administradores han evaluado tu perfil asociado a la empresa{" "}
            {companyName}, la cual has solicitado. y lamentablemente no cumple
            con los requisitos necesarios. Si tienes alguna duda, por favor
            contáctanos.
          </p>
          <img
            src="../public/recruiter3.png"
            width={300}
            className="img-fluid d-block mx-auto mb-3"
          />
        </>
      )}
    </div>
  );
};
