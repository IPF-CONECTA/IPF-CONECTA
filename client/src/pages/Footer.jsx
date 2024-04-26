import "../../public/footer.css";
import logoImage from "../../public/logoImage.png";

export const FinPag = () => {
  return (
    <div className="FinPag">
      <div class="container">
        <footer class="d-flex flex-wrap justify-content-between align-items-center py-3 my-4">
          <div class="col-md-4 d-flex align-items-center">
            <a href="#">
              <img src={logoImage} alt="Logo" className="logoImage" />
            </a>
            <span class="mb-3 mb-md-0 text-body-secondary">
              IPF-CONECTA © 2024
            </span>
          </div>

          <ul class="nav col-md-4 justify-content-end list-unstyled d-flex">
            <li class="ms-3">
              <a class="text-body-secondary" href="#">
                <span class="material-symbols-outlined">home</span>
              </a>
            </li>
            <li class="ms-3">
              <a class="text-body-secondary" href="#">
                <span class="material-symbols-outlined">group</span>
              </a>
            </li>
            <li class="ms-3">
              <a class="text-body-secondary" href="#">
                <span class="material-symbols-outlined">info</span>
              </a>
            </li>
          </ul>
        </footer>
      </div>
    </div>
  );
};
