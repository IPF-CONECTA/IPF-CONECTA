import React from "react";
import "../../public/main.css";

export const Menu = () => {
  return (
    <main className="Menu">
      <div className="Padre">
        <div>
          <h1>¿Qué es IPF - CONECTA?</h1>
          <p className="bienvenida">
            ¡Bienvenido a IPF-CONECTA! Somos tu puente hacia nuevas
            oportunidades profesionales. ¿Eres egresado de la TSDSM del IPF?
            ¿Buscas conectar con tu alma mater y explorar posibilidades
            laborales emocionantes? ¡Estás en el lugar correcto! IPF-CONECTA es
            mucho más que una plataforma de vinculación. Somos un espacio
            dinámico donde la interacción entre egresados, el IPF y empleadores
            se convierte en una experiencia enriquecedora y gratificante. Aquí,
            encontrarás un ambiente acogedor y lleno de oportunidades. ¿Qué te
            ofrecemos? Conexiones directas con empresas líderes, herramientas
            para potenciar tu perfil profesional y análisis de datos que te
            ayudarán a tomar decisiones informadas sobre tu futuro laboral.
            Únete a nosotros y descubre cómo IPF-CONECTA puede impulsar tu
            carrera hacia nuevos horizontes. ¡Tu próxima gran oportunidad te
            espera aquí!
          </p>
        </div>
        <div className="Hijo">
          <img
            className="ipf"
            src="../../public/ipf conecta.jpg"
            width="500px"
            height="350px"
          />
        </div>
      </div>
    </main>
  );
};
