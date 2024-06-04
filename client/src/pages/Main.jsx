import React from "react";
import "../../public/main.css";

export const Menu = () => {
  const scrollToSection = (sectionId) => {
    document.getElementById(sectionId).scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="Menu">
      <div className="header-section">
        <img
          className="header-image"
          src="../../public/logoipf.png"
          alt="IPF Logo"
        />
        <div className="text-and-button">
          <h1>¿Qué es IPF - CONECTA?</h1>
          <p className="bienvenida">
            ¡Bienvenido a IPF-CONECTA! ¿Eres egresado del IPF?
            ¿Buscas conectar y explorar posibilidades laborales emocionantes?
            ¡Estás en el lugar correcto! ¡Tu próxima gran
            oportunidad te espera aquí!
          </p>
          <button className="explore-button" onClick={() => scrollToSection('services')}>
            Explorar más
          </button>
        </div>
      </div>

      <section id="services" className="services-section">
        <h2>Lo que te ofrecemos ✔️</h2>
        <div className="services">
          <div className="service">
            <img
              src="../../public/networking.png"
              alt="Networking"
              className="service-image"
            />
            <h3>Networking</h3>
            <p>
              Conéctate con otros egresados del IPF y expande tu red profesional.
            </p>
            <button className="service-button" onClick={() => scrollToSection('networking')}>
              Más información
            </button>
          </div>
          <div className="service">
            <img
              src="../../public/jobs.png"
              alt="Job Opportunities"
              className="service-image"
            />
            <h3>Oportunidades Laborales</h3>
            <p>
              Descubre oportunidades laborales emocionantes y da un salto en tu carrera.
            </p>
            <button className="service-button" onClick={() => scrollToSection('job-opportunities')}>
              Más información
            </button>
          </div>
          <div className="service">
            <img
              src="../../public/tutores.png"
              alt="Expert Guidance"
              className="service-image"
            />
            <h3>Asesoramiento de Expertos</h3>
            <p>
              Obtén asesoramiento de expertos en diversas áreas para avanzar en tu carrera.
            </p>
            <button className="service-button" onClick={() => scrollToSection('expert-guidance')}>
              Más información
            </button>
          </div>
        </div>
      </section>

      <section id="testimonials" className="testimonials-section">
        <h2>Reseñas✨</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"IPF-CONECTA me ayudó a encontrar mi trabajo soñado en una empresa increíble. ¡No podría estar más feliz!"</p>
            <p>- Juan Pérez</p>
          </div>
          <div className="testimonial">
            <p>"Gracias a IPF-CONECTA, he podido conectar con profesionales de mi industria y expandir mi red de contactos."</p>
            <p>- María Rodríguez</p>
          </div>
        </div>
      </section>

      <section id="faq" className="faq-section">
        <h2>Preguntas Frecuentes</h2>
        <div className="faqs">
          <div className="faq">
            <h3>¿Cómo puedo registrarme?</h3>
            <p>Puedes registrarte fácilmente haciendo clic en el botón de registro en la parte superior de la página y completando el formulario.</p>
          </div>
          <div className="faq">
            <h3>Prueba</h3>
            <p>Esto es una prueba</p>
          </div>
        </div>
      </section>

      <section id="about-us" className="about-section">
        <h2>Sobre Nosotros</h2>
        <div className="about-content">
          <div className="about-image">
            <img
              src="../../public/about-us.jpg"
              alt="About Us"
              className="about-us-image"
            />
          </div>
          <div className="about-text">
            <p>
              En IPF-CONECTA, estamos dedicados a ayudar a los egresados del IPF a encontrar
              oportunidades laborales emocionantes y a construir una red profesional sólida.
              Nuestro equipo está compuesto por expertos en diversas áreas que trabajan
              incansablemente para brindarte las mejores oportunidades.
            </p>
            <button className="service-button" onClick={() => scrollToSection('contact-us')}>
              Contáctanos
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};
