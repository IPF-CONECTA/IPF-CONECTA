import { Link } from "react-router-dom";
import styles from "../../../../public/main.module.css";
import "../../../../public/css/fonts.css";
import { useContext } from "react";
import { authContext } from "../../../context/auth/Context";
export const Home = () => {
  const { authState } = useContext(authContext);
  return (
    <main>
      <div className={`ubuntu-thin ${styles.headerSection}`}>
        <div className={`d-flex `}>
          <div className="d-flex flex-column justify-content-center align-items-start ms-5">
            <div className={`ubuntu-bold ${styles.movingGradientText}`}>
              IPF-CONECTA
            </div>
            <div className={"rounded mb-2 d-flex flex-column"}>
              <h3 className="mb-3 fw-light w-75 fs-2">
                Encuentra tu próximo empleo, expande tu red profesional y obtén
                asesoramiento de expertos.
              </h3>
              <div>
                <Link
                  to={
                    authState.isLogged
                      ? authState.role !== "admin"
                        ? "/inicio"
                        : "/admin/dash"
                      : "/iniciar-sesion"
                  }
                  className={`px-3 py-2 text-decoration-none rounded-3 fw-semibold montserrat-bold fs-5 ${styles.startBtn}`}
                >
                  <span> Comenzar</span>
                </Link>
              </div>
            </div>
          </div>
          <img src="/img/landingImage2.png" style={{ height: "100vh" }} />
        </div>
      </div>
      {/* <section id="services" className={`mb-4 ${styles["services-section"]}`}>
        <center>
          <h2 className="fw-bold">
            Lo que ofrecemos{" "}
            <span className="material-symbols-outlined fw-bold">check</span>
          </h2>
        </center>
        <div className={styles.services}>
          <div
            className={`${styles.service} d-flex flex-column justify-content-between align-items-center`}
          >
            <div>
              <img
                src="./img/network.jpg"
                alt="Networking"
                className={`pb-0 ${styles["service-image"]}`}
              />
              <div className="d-flex flex-column justify-content-between">
                <h3>Networking</h3>
                <p>
                  Conéctate con otros egresados del IPF y expande tu red
                  profesional.
                </p>
              </div>
            </div>
            <button
              className={"btn border rounded fw-bold"}
              onClick={() => scrollToSection("networking")}
            >
              Más información
            </button>
          </div>
          <div
            className={`d-flex flex-column justify-content-between align-items-center ${styles.service}`}
          >
            <img
              src="./img/job-offer.png"
              alt="Job Opportunities"
              className={styles["service-image"]}
            />
            <div className="d-flex flex-column">
              <h3>Oportunidades Laborales</h3>
              <p>
                Descubre oportunidades laborales emocionantes y da un salto en
                tu carrera.
              </p>
            </div>
            <button
              className={"btn border rounded fw-bold"}
              onClick={() => scrollToSection("job-opportunities")}
            >
              Más información
            </button>
          </div>
          <div
            className={`d-flex flex-column justify-content-between align-items-center ${styles.service}`}
          >
            <img
              src="./img/tutores.png"
              alt="Expert Guidance"
              className={styles["service-image"]}
            />
            <div className="d-flex flex-column">
              <h3>Asesoramiento de Expertos</h3>
              <p>
                Obtén asesoramiento de expertos en diversas áreas para avanzar
                en tu carrera.
              </p>
            </div>
            <button
              className={"btn border rounded fw-bold"}
              onClick={() => scrollToSection("expert-guidance")}
            >
              Más información
            </button>
          </div>
          <div
            className={`d-flex flex-column justify-content-between align-items-center ${styles.service}`}
          >
            <img
              src="./img/ideas.jpg"
              alt="Expert Guidance"
              className={styles["service-image"]}
            />
            <div className="d-flex flex-column">
              <h3>Ideas de Proyectos</h3>
              <p>
                Encuentra inspiración con nuestra selección de ideas de
                proyectos innovadores y relevantes para desarrollar.
              </p>
            </div>
            <button
              className={"btn border rounded fw-bold"}
              onClick={() => scrollToSection("project-ideas")}
            >
              Más información
            </button>
          </div>
        </div>
      </section>

      <section
        id="testimonials"
        className={"w-100 d-flex flex-column align-items-center mb-5"}
      >
        <h2 className=" fw-bold">Testimonios</h2>
        <div className={`${styles.wrapper} d-flex  w-75`}>
          <div className={`${styles.reviewCard} me-5 p-3 border rounded`}>
            <div className={`${styles.headerContent}`}>
              <div className={`${styles.imgArea}`}>
                <img alt="customer1" src="./img/lucas.jpg" />
              </div>
              <div className={`${styles.info}`}>
                <h4>Lucas B.</h4>
                <p>UX/UI Designer</p>
              </div>
            </div>
            <div className={`${styles.singleReview}`}>
              <p>
                La mejor herramienta para encontrar oportunidades laborales.
              </p>
            </div>
            <div className={`${styles.reviewFooter}`}>
              <div className={`${styles.rating}`}>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
              </div>
              <p className="mb-0">Reviewed on 01/01/2023</p>
            </div>
          </div>
          <div className={`${styles.reviewCard} me-5 p-3 border rounded`}>
            <div className={`${styles.headerContent}`}>
              <div className={`${styles.imgArea}`}>
                <img alt="customer1" src="./img/fabian.jpg" />
              </div>
              <div className={`${styles.info}`}>
                <h4>Fabián V.</h4>
                <p>Full Stack Dev.</p>
              </div>
            </div>
            <div className={`${styles.singleReview}`}>
              <p>¡Me conecté con mi primer empleo gracias a IPF-Conecta!</p>
            </div>
            <div className={`${styles.reviewFooter}`}>
              <div className={`${styles.rating}`}>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
              </div>
              <p className="mb-0">Reviewed on 01/01/2023</p>
            </div>
          </div>
          <div className={`${styles.reviewCard} border p-3 rounded`}>
            <div className={`${styles.headerContent}`}>
              <div className={`${styles.imgArea}`}>
                <img alt="customer1" src="./img/piazza.jpg" />
              </div>
              <div className={`${styles.info}`}>
                <h4>Carla Malena</h4>
                <p>Frontend Dev.</p>
              </div>
            </div>
            <div className={`${styles.singleReview}`}>
              <p> Recomendado para todos los egresados que buscan crecer.</p>
            </div>
            <div className={`${styles.reviewFooter}`}>
              <div className={`${styles.rating}`}>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
                <span className={`${styles.active}`}>★</span>
              </div>
              <p className="mb-0">Reviewed on 01/01/2023</p>
            </div>
          </div>
        </div>
      </section>

      <section
        id="faq"
        className="w-100 d-flex flex-column align-items-center mb-5"
      >
        <span className="fs-3 pb-2 fw-bold">Preguntas frecuentes</span>
        <div className="w-75">
          <div className="accordion" id="accordionExample">
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseOne"
                  aria-expanded="true"
                  aria-controls="collapseOne"
                >
                  ¿Cómo puedo registrarme en la plataforma?
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Para registrarte en la plataforma, sigue estos pasos:
                  <ol>
                    <li>
                      Haz clic en el botón "Iniciar Sesión" en la esquina
                      superior derecha, luego presionar en "Registrate".
                    </li>
                    <li>
                      Completa el formulario de registro con tu información
                      personal.
                    </li>
                    <li>
                      Verifica tu correo electrónico para activar tu cuenta.
                    </li>
                  </ol>
                  Si tienes algún problema durante el proceso, no dudes en
                  contactarnos a través de nuestro formulario de soporte.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseTwo"
                  aria-expanded="false"
                  aria-controls="collapseTwo"
                >
                  ¿Cómo puedo recuperar mi contraseña?
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Si has olvidado tu contraseña, puedes recuperarla siguiendo
                  estos pasos:
                  <ol>
                    <li>
                      Haz clic en "¿Olvidaste tu contraseña?" en la página de
                      inicio de sesión.
                    </li>
                    <li>
                      Introduce tu dirección de correo electrónico y haz clic en
                      "Enviar".
                    </li>
                    <li>
                      Recibirás un enlace para restablecer tu contraseña en tu
                      correo electrónico.
                    </li>
                    <li>
                      Haz clic en el enlace y sigue las instrucciones para crear
                      una nueva contraseña.
                    </li>
                  </ol>
                  Si no recibes el correo, revisa tu carpeta de spam o contacta
                  con nuestro soporte.
                </div>
              </div>
            </div>
            <div className="accordion-item">
              <h2 className="accordion-header">
                <button
                  className="accordion-button collapsed"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#collapseThree"
                  aria-expanded="false"
                  aria-controls="collapseThree"
                >
                  ¿Dónde puedo actualizar mi perfil?
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  Para actualizar tu perfil:
                  <ol>
                    <li>Inicia sesión en tu cuenta.</li>
                    <li>
                      Haz clic en tu nombre en la esquina superior derecha y
                      selecciona "Mi Perfil".
                    </li>
                    <li>
                      En la página de perfil, haz clic en "Editar perfil".
                    </li>
                    <li>
                      Realiza los cambios necesarios y guarda la información.
                    </li>
                  </ol>
                  Si encuentras algún problema con la actualización, por favor,
                  contacta con nuestro equipo de soporte.
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="about-us" className={"mb-5"}>
        <div className="w-100 d-flex  justify-content-center">
          <div className={"d-flex w-75"}>
            <div>
              <img
                src="./img/about-us-concept-illustration.png"
                alt="About Us"
                height={250}
                className={"img-fluid"}
              />
            </div>
            <div className={"d-flex flex-column justify-content-center"}>
              <p className="pb-3">
                En IPF-CONECTA, estamos dedicados a ayudar a los egresados del
                IPF a encontrar oportunidades laborales emocionantes y a
                construir una red profesional sólida. Nuestro equipo está
                compuesto por expertos en diversas áreas que trabajan
                incansablemente para brindarte las mejores oportunidades.
              </p>
              <center>
                <button className={"btn border rounded"}>
                  <Link to="/contacto" className={"nav-link fw-bold"}>
                    Contáctanos
                  </Link>
                </button>
              </center>
            </div>
          </div>
        </div>
      </section> */}
    </main>
  );
};
