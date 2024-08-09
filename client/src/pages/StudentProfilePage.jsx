import "../styles/Profile.css";

const experencies = [
  {
    id: 1,
    position: "AUXILIAR CONTABLE",
    company: "DATA FILE",
    date: "Enero de 2022 - Actualmente",
    description:
      "Analizar, validar y consolidar la información de los estados de resultados, balance general, P y G, estado de flujo de efectivo, estado de cambio en el patrimonio, estado de flujo proyectado en Creditlens y generación de informes, además de manejar aplicativos como Bizagi, Sisdoc y Oracle.",
  },
  {
    id: 2,
    position: "PRACTICANTE",
    company: "ONE LINK",
    date: "Marzo de 2021 - Septiembre de 2021",
    description:
      "Manejo de bases de datos y actualización de información básica, nómina, asistencia y demás. Se logro desarrollar un programa de automatización de bases de datos en compañía de una administradora y una especialista en gestión empresarial y unos gestores.",
  },
];

const educations = [
  {
    id: 1,
    title: "ESPECIALISTA EN FINANZAS",
    institution: "Instituto Tecnológico Metropolitano",
    date: "Agosto de 2023 - Actualmente",
  },
  {
    id: 2,
    title: "ADMINISTRADOR TECNOLÓGICO",
    institution: "Instituto Tecnológico Metropolitano",
    date: "Febrero de 2018 - Noviembre de 2022",
  },
];

const socialMedias = [
  {
    id: 1,
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/facundo-r%C3%ADos-709759298/",
  },
  {
    id: 2,
    name: "GitHub",
    url: "https://github.com/Facundorios",
  },
];

const languages = [
  {
    id: 1,
    name: "Español",
    level: "Nativo",
  },
  {
    id: 2,
    name: "Inglés",
    level: "Básico",
  },
];

export default function StudentProfilePage() {
  return (
    <div className="profile-container">
      <div className="profile-sidebar">
        <div className="profile-photo">
          <img
            src="https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/132.png"
            alt="profile"
            className="profile-image"
          />
        </div>
        <h2>Milton Leandro</h2>
        <p>---</p>
        <button className="position-button">AUXILIAR CONTABLE</button>
        <div className="about-me">
          <h3>
            <i className="icon"></i>SOBRE MI
          </h3>
          <p>
            Soy una persona que me gusta asumir nuevos retos y conocer nuevas
            personas, entornos y experiencias; mis capacidades blandas son:
            trabajo en equipo, proactividad enfocado a los resultados,
            responsabilidad y compromiso, trabajar bajo presión, aprendizaje
            continuo.
          </p>
        </div>
        <section className="languages">
          <h3>
            IDIOMAS:
          </h3>
          {languages.map((idiom) => (
            <div key={idiom.id} className="languages-item">
              <h4>{idiom.name}</h4>
              <p>{idiom.level}</p>
            </div>
          ))}
        </section>
        <div className="Social-medias">
          <h3>
           REDES SOCIALES:
          </h3>
          {socialMedias.map((social) => (
            <a key={social.id} href={social.url} className="social-media">
              {social.name}
            </a>
          ))}
        </div>
      </div>
      <div className="profile-main">
        <section className="experience">
          <h3>
            <i className="icon"></i>EXPERIENCIAS LABORALES:
          </h3>
          {experencies.map((exp) => (
            <div key={exp.id} className="experience-item">
              <h4>{exp.position}</h4>
              <p>
                <span>{exp.company}</span> | <span>{exp.date}</span>
              </p>
              <p>{exp.description}</p>
            </div>
          ))}
        </section>
        <section className="education">
          <h3>
            EDUCACIÓN:
          </h3>
          {educations.map((edu) => (
            <div key={edu.id} className="education-item">
              <h4>{edu.title}</h4>
              <p>
                <span>{edu.institution}</span> | <span>{edu.date}</span>
              </p>
            </div>
          ))}
        </section>

      </div>
    </div>
  );
}