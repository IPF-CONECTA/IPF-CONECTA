import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../public/panel.css";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Button from "@mui/material/Button";
import { updateAssociationStatus } from "../services/adminServices";
import { useNoti } from "../hooks/useNoti";
import { useNavigate } from "react-router-dom";

export const RequestList = ({
  associations = [],
  acceptAssociation,
  rejectAssociation,
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAssociation, setSelectedAssociation] = useState(
    associations[0]
  );
  const [open, setOpen] = useState(false);
  const noti = useNoti();

  const navigate = useNavigate();

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleAssociationStatus = async (id, status, message) => {
    if (status === "rechazar" && !message) {
      noti("Por favor, justifica el motivo del rechazo", "warning");
      return;
    }
    await updateAssociationStatus(id, status, message);
  };

  return (
    <div className="AdminPanel">
      <div className="Header">
        <h1>Panel de Solicitudes</h1>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearchChange}
          className="form-control"
          placeholder="Buscar por nombre"
        />
      </div>
      <div className="Content">
        <div className="CompanyList">
          <h2>Solicitudes Pendientes</h2>
          <ul className="Companies">
            {associations.map((association, index) => (
              <li
                key={index}
                className="Company"
                onClick={() => {
                  setSelectedAssociation(association);
                }}
              >
                <div>
                  <img
                    src={
                      association.user.profilePic ||
                      "https://via.placeholder.com/40"
                    }
                    alt="Usuario"
                  />
                  <div>
                    <strong>{association.user.names}</strong>
                    <p>{association.user.email}</p>
                  </div>
                </div>
                <p>{association.company.name}</p>
                <img
                  src={
                    association.company.logoUrl ||
                    "https://via.placeholder.com/40"
                  }
                  alt="Empresa"
                />
              </li>
            ))}
          </ul>
        </div>
        {selectedAssociation && (
          <Dialog
            open={Boolean(selectedAssociation)}
            onClose={() => setSelectedAssociation(null)}
            fullWidth
            maxWidth="md"
          >
            <DialogContent className="DetailsModal">
              <div className="DetailSection d-flex">
                <div className="CompanyDetails">
                  <h4>Datos de la Empresa:</h4>
                  <img
                    height={"100px"}
                    src={
                      selectedAssociation.company.logoUrl ||
                      "https://via.placeholder.com/100"
                    }
                    alt={`${selectedAssociation.company.name} Logo`}
                    className="CompanyLogo"
                  />
                  <p>
                    <strong>Nombre:</strong> {selectedAssociation.company.name}
                  </p>
                  <p>
                    <strong>Justificación:</strong>{" "}
                    {selectedAssociation.message}
                  </p>
                </div>
                <div className="UserDetails">
                  <h4>Solicitante:</h4>
                  <p>
                    <strong>Nombre:</strong>{" "}
                    {`${selectedAssociation.user.names} ${selectedAssociation.user.surnames}`}
                  </p>
                  <p>
                    <strong>Email:</strong> {selectedAssociation.user.email}
                  </p>
                  <p>
                    <strong>Foto de Perfil:</strong>
                    <img
                      height={"100px"}
                      src={
                        selectedAssociation.user.profilePic ||
                        "https://via.placeholder.com/100"
                      }
                      alt="Foto de perfil"
                      className="ProfilePic"
                    />
                  </p>
                </div>
              </div>
            </DialogContent>
            <DialogActions>
              <Button
                color="secondary"
                onClick={() => handleAssociationStatus(selectedAssociation.id)}
              >
                Rechazar
              </Button>
              <Button
                color="primary"
                onClick={() => {
                  handleAssociationStatus(selectedAssociation.id, "Aprobada");
                  noti("Solicitud aprobada", "success");
                  navigate("/panelñ");
                }}
              >
                Aprobar
              </Button>
            </DialogActions>
          </Dialog>
        )}
      </div>
    </div>
  );
};
// export default function RequestLists({
//   associations = [],
//   acceptAssociation,
//   rejectAssociation,
// }) {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [selectedAssociation, setSelectedAssociation] = useState(
//     associations[0]
//   );
//   const [open, setOpen] = useState(false);
//   const noti = useNoti();
//   const handleSearchChange = (e) => {
//     setSearchTerm(e.target.value);
//   };

//   // const associations = associations.filter((association) =>
//   //   association.name.toLowerCase().includes(searchTerm.toLowerCase())
//   // );

//   const handleAssociationStatus = async (id, status, message) => {
//     if (status === "rechazar" && !message) {
//       {
//         noti("Por favor, justifica el motivo del rechazo", "warning");
//       }
//       const status = await updateAssociationStatus(id, status, message);
//     }

//     return (
//       <div className="AdminPanel">
//         <div className="Header">
//           <h1>Panel de Solicitudes</h1>
//           <input
//             type="text"
//             value={searchTerm}
//             onChange={handleSearchChange}
//             className="form-control"
//             placeholder="Buscar por nombre"
//           />
//         </div>
//         <div className="Content">
//           <div className="CompanyList">
//             <h2>Solicitudes Pendientes</h2>
//             <ul className="Companies">
//               {associations.map((association, index) => (
//                 <li
//                   key={index}
//                   className="Company"
//                   onClick={() => setSelectedAssociation(association)}
//                 >
//                   <div>
//                     <img
//                       src={
//                         association.user.profilePic ||
//                         "https://via.placeholder.com/40"
//                       }
//                       alt="Usuario"
//                     />
//                     <div>
//                       <strong>{association.user.names}</strong>
//                       <p>{association.user.email}</p>
//                     </div>
//                   </div>
//                   <img
//                     src={
//                       association.company.logoUrl ||
//                       "https://via.placeholder.com/40"
//                     }
//                     alt="Empresa"
//                   />
//                 </li>
//               ))}
//             </ul>
//           </div>
//           {selectedAssociation && (
//             <Dialog
//               open={Boolean(selectedAssociation)}
//               onClose={() => setSelectedAssociation(null)}
//               fullWidth
//               maxWidth="md"
//             >
//               <DialogContent className="DetailsModal">
//                 <div className="DetailSection">
//                   <div className="CompanyDetails">
//                     <h4>Datos de la Empresa:</h4>
//                     <img
//                       src={
//                         selectedAssociation.company.logoUrl ||
//                         "https://via.placeholder.com/100"
//                       }
//                       alt={`${selectedAssociation.company.name} Logo`}
//                       className="CompanyLogo"
//                     />
//                     <p>
//                       <strong>Nombre:</strong>{" "}
//                       {selectedAssociation.company.name}
//                     </p>
//                     <p>
//                       <strong>Justificación:</strong>{" "}
//                       {selectedAssociation.message}
//                     </p>
//                   </div>
//                   <div className="UserDetails">
//                     <h4>Solicitante:</h4>
//                     <p>
//                       <strong>Nombre:</strong>{" "}
//                       {`${selectedAssociation.user.names} ${selectedAssociation.user.surnames}`}
//                     </p>
//                     <p>
//                       <strong>Email:</strong> {selectedAssociation.user.email}
//                     </p>
//                     <p>
//                       <strong>Foto de Perfil:</strong>
//                       <img
//                         src={
//                           selectedAssociation.user.profilePic ||
//                           "https://via.placeholder.com/100"
//                         }
//                         alt="Foto de perfil"
//                         className="ProfilePic"
//                       />
//                     </p>
//                   </div>
//                 </div>
//               </DialogContent>
//               <DialogActions>
//                 <Button
//                   color="secondary"
//                   onClick={() =>
//                     handleRejectAssociation(selectedAssociation.id)
//                   }
//                 >
//                   Rechazar
//                 </Button>
//                 <Button
//                   color="primary"
//                   onClick={() =>
//                     handleApproveAssociation(selectedAssociation.id)
//                   }
//                 >
//                   Aprobar
//                 </Button>
//               </DialogActions>
//             </Dialog>
//           )}
//         </div>
//       </div>
//     );
//   };
// }
