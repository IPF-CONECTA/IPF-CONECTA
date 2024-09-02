import styles from "../../public/main.module.css";
import { Link } from "react-router-dom";

export const Home = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className={`${styles.Menu} mt-5`}>
      <div className={`pe-3 ${styles.headerSection}`}>
        <div className={`mx-5 ${styles.textAndButton}`}>
          <center>
            <h1 className="fw-bold text-info-emphasis">
              ¡Bienvenido a IPF-CONECTA!
            </h1>
          </center>
          <div className={"bg-info-subtle p-2 rounded mb-2 text-center"}>
            <h3>
              La plataforma donde egresados del IPF, empleadores,
              inversionistas, reclutadores y tutores se encuentran para conectar
              y descubrir nuevas oportunidades. <br /> ¡Tu próxima gran
              oportunidad comienza aquí!
            </h3>
          </div>

          <center>
            <button
              className={"btn border rounded text-info-emphasis fw-bold"}
              onClick={() => scrollToSection("services")}
            >
              Explorar más
            </button>
          </center>
        </div>
        <img
          src="/img/homeImage.gif"
          className="img-fluid mx-5"
          alt="/img/homeImage.gif"
        />
      </div>

      <section id="services" className={`mb-4 ${styles["services-section"]}`}>
        <center>
          <h2 className="fw-bold text-info-emphasis">
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
              className={"btn border rounded text-info-emphasis fw-bold"}
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
              className={"btn border rounded text-info-emphasis fw-bold"}
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
              className={"btn border rounded text-info-emphasis fw-bold"}
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
              className={"btn border rounded text-info-emphasis fw-bold"}
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
        <h2 className=" fw-bold text-info-emphasis">Testimonios</h2>
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
        <span className=" fs-3 pb-2 fw-bold text-info-emphasis">
          Preguntas frecuentes
        </span>
        <div className="w-75 ">
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
                  Accordion Item #1
                </button>
              </h2>
              <div
                id="collapseOne"
                className="accordion-collapse collapse show"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the first item's accordion body.</strong> It
                  is shown by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
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
                  Accordion Item #2
                </button>
              </h2>
              <div
                id="collapseTwo"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the second item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classNamees that we use to style each element.
                  These classNamees control the overall appearance, as well as
                  the showing and hiding via CSS transitions. You can modify any
                  of this with custom CSS or overriding our default variables.
                  It's also worth noting that just about any HTML can go within
                  the <code>.accordion-body</code>, though the transition does
                  limit overflow.
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
                  Accordion Item #3
                </button>
              </h2>
              <div
                id="collapseThree"
                className="accordion-collapse collapse"
                data-bs-parent="#accordionExample"
              >
                <div className="accordion-body">
                  <strong>This is the third item's accordion body.</strong> It
                  is hidden by default, until the collapse plugin adds the
                  appropriate classes that we use to style each element. These
                  classes control the overall appearance, as well as the showing
                  and hiding via CSS transitions. You can modify any of this
                  with custom CSS or overriding our default variables. It's also
                  worth noting that just about any HTML can go within the{" "}
                  <code>.accordion-body</code>, though the transition does limit
                  overflow.
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
                <button className={"btn border rounded text-info-emphasis"}>
                  <Link to="/contacto" className={"nav-link fw-bold"}>
                    Contáctanos
                  </Link>
                </button>
              </center>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};
