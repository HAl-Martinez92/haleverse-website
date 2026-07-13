import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BarChart3,
  BriefcaseBusiness,
  CheckCircle2,
  Database,
  FileText,
  GitBranch,
  Layers3,
  Mail,
  Network,
  PackageCheck,
  Download,
  ShieldCheck,
  Target,
  Workflow,
} from "lucide-react";
import "./styles.css";

const CONTACT_EMAIL = "contacto@haleverse.com";

function NetworkBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let width = 0;
    let height = 0;
    let points = [];
    let frame = 0;

    const resize = () => {
      const rect = canvas.parentElement.getBoundingClientRect();
      const ratio = window.devicePixelRatio || 1;
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const count = Math.max(44, Math.floor(width / 26));
      points = Array.from({ length: count }, (_, index) => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.24,
        vy: (Math.random() - 0.5) * 0.18,
        r: index % 4 === 0 ? 2.8 : 1.8,
        accent: index % 4 === 0,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const point of points) {
        point.x += point.vx;
        point.y += point.vy;
        if (point.x < -20) point.x = width + 20;
        if (point.x > width + 20) point.x = -20;
        if (point.y < -20) point.y = height + 20;
        if (point.y > height + 20) point.y = -20;
      }

      for (let i = 0; i < points.length; i += 1) {
        for (let j = i + 1; j < points.length; j += 1) {
          const a = points[i];
          const b = points[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 145) {
            const opacity = (1 - distance / 145) * 0.23;
            ctx.strokeStyle = `rgba(103, 232, 249, ${opacity})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      for (const point of points) {
        ctx.fillStyle = point.accent ? "rgba(16, 185, 129, 0.92)" : "rgba(103, 232, 249, 0.74)";
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r, 0, Math.PI * 2);
        ctx.fill();
      }

      frame = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="network-canvas" aria-hidden="true" />;
}

function Header() {
  return (
    <header className="site-header">
      <a className="brand-link" href="#inicio" aria-label="HALEVERSE inicio">
        <img src="/assets/logo-horizontal-dark.svg" alt="HALEVERSE" className="brand-logo" />
      </a>
      <nav className="main-nav" aria-label="Navegación principal">
        <a href="#servicios">Servicios</a>
        <a href="#fortalezas">Fortalezas</a>
        <a href="#portafolio">Portafolio</a>
        <a href="#ofertas">Ofertas</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}

const services = [
  {
    icon: Workflow,
    title: "Automatización empresarial",
    text: "Tomamos tareas que hoy consumen horas y las convertimos en procesos simples, controlados y fáciles de repetir.",
  },
  {
    icon: GitBranch,
    title: "Datos e integraciones",
    text: "Unimos archivos, bases de datos, APIs y plataformas para que la información llegue donde debe llegar.",
  },
  {
    icon: Layers3,
    title: "Desarrollo de software",
    text: "Creamos herramientas web e internas pensadas para resolver necesidades concretas del negocio.",
  },
  {
    icon: Database,
    title: "Oracle y SQL",
    text: "Mejoramos consultas, procedimientos y reportes para que los datos trabajen con más velocidad y estabilidad.",
  },
  {
    icon: FileText,
    title: "Reportes y documentos",
    text: "Convertimos datos en documentos, reportes y tableros claros para tomar decisiones sin rehacer trabajo manual.",
  },
  {
    icon: Network,
    title: "Innovación aplicada",
    text: "Elegimos la tecnología adecuada para cada caso, incluyendo IA solo cuando realmente mejora el resultado.",
  },
];

const strengths = [
  ["Entendemos antes de construir", "Escuchamos el proceso, revisamos los datos y proponemos una solución que tenga sentido para el equipo."],
  ["Conectamos tecnología con operación", "Diseñamos herramientas que encajan con la forma real de trabajar, no piezas aisladas difíciles de sostener."],
  ["Nos enfocamos en resultados visibles", "Buscamos menos reprocesos, menos errores, más control y tiempo recuperado para tareas de mayor valor."],
  ["Construimos para crecer", "Entregamos soluciones documentadas, mantenibles y listas para evolucionar por fases cuando el negocio lo necesite."],
];

const cases = [
  ["Excel y PDF", "Automatización de archivos, documentos y validaciones que normalmente se hacen a mano."],
  ["Oracle y SQL", "Mejoras en consultas, procedimientos y reportes para trabajar con datos de forma más confiable."],
  ["APIs y sistemas", "Conexión entre aplicaciones, archivos, servicios web y bases de datos existentes."],
  ["Reportes automáticos", "Informes y tableros que se generan desde datos reales, sin depender de copiar y pegar."],
];

const portfolio = [
  {
    title: "Automatización documental",
    tag: "PDF · Word · Excel",
    text: "Automatizamos tareas de documentos que suelen repetirse una y otra vez: generar, unir, separar, nombrar y organizar archivos.",
    result: "Entregas más rápidas, menos errores y mejor control sobre cada archivo procesado.",
  },
  {
    title: "Validación y limpieza de datos",
    tag: "Excel · Python · Reglas",
    text: "Creamos validadores que revisan archivos antes de usarlos, detectando duplicados, campos incompletos y formatos incorrectos.",
    result: "Datos más confiables antes de cargar, analizar o migrar información.",
  },
  {
    title: "Optimización Oracle y SQL",
    tag: "Oracle · PL/SQL · Reportes",
    text: "Revisamos consultas, procedimientos y reportes para encontrar cuellos de botella y mejorar la forma en que fluye la información.",
    result: "Procesos más ágiles, estables y fáciles de mantener.",
  },
  {
    title: "Integración entre sistemas",
    tag: "APIs · Bases de datos · Archivos",
    text: "Conectamos sistemas que hoy trabajan separados para evitar dobles registros, reprocesos y pérdida de información.",
    result: "Equipos con datos más alineados y flujos de trabajo más claros.",
  },
  {
    title: "Reportes automáticos",
    tag: "Dashboards · PDF · Excel",
    text: "Diseñamos reportes que se alimentan de fuentes existentes y entregan información lista para revisar, compartir o presentar.",
    result: "Información oportuna, ordenada y útil para decidir mejor.",
  },
  {
    title: "Forward Rush",
    tag: "Producto digital · Juego · Experiencia",
    text: "Construcción de un videojuego como producto digital propio, combinando lógica, diseño de interacción y experiencia web.",
    result: "Una base para crear nuevas experiencias digitales bajo HALEVERSE Studio.",
  },
  {
    title: "Proyecto Atlas",
    tag: "Spring Boot · Angular · Oracle",
    text: "Modernización por fases de una plataforma administrativa, separando capas técnicas y mejorando la experiencia de trabajo sobre procesos complejos.",
    result: "Una base más ordenada, mantenible y preparada para evolucionar con nuevas consultas, reportes e integraciones.",
  },
];

const proofCases = [
  {
    title: "Documentos organizados sin reprocesos",
    context: "Un equipo necesitaba procesar y organizar documentos de forma repetitiva, dedicando horas a clasificar, generar y validar archivos.",
    action: "Diseñamos una solución para automatizar el manejo de documentos, aplicar reglas de validación y entregar archivos organizados de forma consistente.",
    outcome: "El proceso quedó más claro, rápido y controlado, con menos errores en cada entrega.",
  },
  {
    title: "Modernización de plataforma administrativa",
    context: "Una plataforma requería evolucionar su arquitectura para mejorar la experiencia de usuario, facilitar el mantenimiento y preparar nuevos flujos de trabajo.",
    action: "Propusimos una modernización por fases, separando responsabilidades técnicas e integrando frontend, backend y datos existentes.",
    outcome: "La solución quedó mejor organizada y preparada para incorporar nuevas consultas, reportes e integraciones.",
  },
  {
    title: "Reportes listos para decidir",
    context: "Un proceso dependía de reportes armados manualmente desde diferentes fuentes, con demoras, reprocesos y riesgo de errores.",
    action: "Creamos una ruta para consolidar datos y generar informes listos para revisar, compartir o presentar.",
    outcome: "La información quedó más ordenada, disponible a tiempo y útil para tomar mejores decisiones.",
  },
];

const offers = [
  {
    icon: Workflow,
    title: "Diagnóstico de automatización",
    text: "Revisamos un proceso que hoy toma demasiado tiempo y definimos una ruta práctica para automatizarlo.",
    deliverables: ["Mapa del proceso", "Ruta de mejora", "Estimación por fases"],
  },
  {
    icon: BriefcaseBusiness,
    title: "Solución empresarial a medida",
    text: "Construimos una herramienta concreta para resolver una necesidad real con archivos, datos, documentos, reportes o sistemas.",
    deliverables: ["Herramienta funcional", "Documentación clara", "Acompañamiento de entrega"],
  },
  {
    icon: Database,
    title: "Consultoría Oracle, datos e integración",
    text: "Acompañamos equipos que necesitan ordenar información, mejorar consultas o conectar plataformas existentes.",
    deliverables: ["Diagnóstico técnico", "Mejoras priorizadas", "Recomendaciones accionables"],
  },
];

const salesMaterials = [
  ["Brochure corporativo", "Una presentación breve para explicar qué hacemos, cómo trabajamos y qué problemas resolvemos."],
  ["Plantilla de propuesta", "Un formato claro para presentar alcance, entregables, tiempos y próximos pasos sin improvisar."],
  ["Perfil de fundador", "Un mensaje profesional para comunicar experiencia, criterio técnico y enfoque en resultados."],
  ["Firma de correo", "Una firma simple y consistente para que cada contacto se sienta formal desde el primer mensaje."],
];

function ContactForm() {
  const nextUrl = "https://haleverse.com/gracias.html";

  return (
    <form
      className="contact-form"
      action={`https://formsubmit.co/${CONTACT_EMAIL}`}
      method="POST"
    >
      <input type="hidden" name="_subject" value="Nueva solicitud desde haleverse.com" />
      <input type="hidden" name="_template" value="table" />
      <input type="hidden" name="_next" value={nextUrl} />
      <input type="text" name="_honey" className="hidden-field" tabIndex="-1" autoComplete="off" />

      <label>
        Nombre
        <input name="Nombre" type="text" placeholder="Su nombre" required />
      </label>
      <label>
        Correo
        <input name="email" type="email" placeholder="correo@empresa.com" required />
      </label>
      <label>
        Necesidad
        <textarea name="Necesidad" rows="5" placeholder="Describa brevemente el proceso, problema o idea que quiere mejorar." required />
      </label>
      <button type="submit">
        Enviar solicitud
        <ArrowRight size={18} aria-hidden="true" />
      </button>
      <p className="form-note">
        Recibiremos su mensaje en {CONTACT_EMAIL} y responderemos con una primera orientación sobre el caso.
      </p>
    </form>
  );
}

function App() {
  return (
    <>
      <Header />
      <main>
        <section id="inicio" className="hero">
          <NetworkBackground />
          <div className="hero-content">
            <p className="eyebrow">Datos · Integración · Automatización · Software</p>
            <h1>Soluciones tecnológicas para trabajar mejor.</h1>
            <p className="hero-copy">
              Ayudamos a equipos y empresas a ordenar información, automatizar tareas repetitivas
              y construir herramientas que hacen más simple la operación diaria.
            </p>
            <div className="hero-actions">
              <a className="btn primary" href="#contacto">
                Solicitar una reunión
                <ArrowRight size={18} aria-hidden="true" />
              </a>
              <a className="btn secondary" href="#servicios">Ver servicios</a>
            </div>
          </div>
          <div className="hero-metrics" aria-label="Áreas principales">
            <div><strong>01</strong><span>Procesos más claros</span></div>
            <div><strong>02</strong><span>Datos conectados</span></div>
            <div><strong>03</strong><span>Resultados medibles</span></div>
          </div>
        </section>

        <section className="section intro">
          <div className="section-kicker">Qué resolvemos</div>
          <div className="split">
            <h2>Cuando el trabajo manual se acumula, la operación pierde ritmo.</h2>
            <p>
              HALEVERSE acompaña a equipos que trabajan con archivos dispersos, reportes repetitivos,
              datos desconectados o tareas que consumen horas cada semana y necesitan una forma más clara de avanzar.
            </p>
          </div>
        </section>

        <section id="servicios" className="section services">
          <div className="section-heading">
            <span className="section-kicker">Servicios</span>
            <h2>Tecnología práctica para procesos reales.</h2>
          </div>
          <div className="service-grid">
            {services.map(({ icon: Icon, title, text }, index) => (
              <article key={title}>
                <div className="service-top">
                  <span className="service-index">{String(index + 1).padStart(2, "0")}</span>
                  <Icon size={22} aria-hidden="true" />
                </div>
                <h3>{title}</h3>
                <p>{text}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="fortalezas" className="section strengths">
          <div className="section-heading">
            <span className="section-kicker">Fortalezas</span>
            <h2>Criterio técnico, cercanía y compromiso con el resultado.</h2>
          </div>
          <div className="strength-list">
            {strengths.map(([title, text]) => (
              <div key={title}>
                <CheckCircle2 size={22} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
              </div>
            ))}
          </div>
        </section>

        <section id="casos" className="section use-cases">
          <div className="section-heading">
            <span className="section-kicker">Casos de uso</span>
            <h2>Problemas comunes que podemos ordenar.</h2>
          </div>
          <div className="case-row">
            {cases.map(([title, text]) => (
              <div key={title}>
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section id="portafolio" className="section portfolio">
          <div className="section-heading">
            <span className="section-kicker">Portafolio inicial</span>
            <h2>Experiencia aplicada a retos reales.</h2>
            <p>
              Reunimos aprendizajes de proyectos y productos construidos para mostrar cómo trabajamos:
              entender el problema, ordenar la solución y entregar algo útil para el equipo.
            </p>
          </div>
          <div className="portfolio-grid">
            {portfolio.map((item) => (
              <article key={item.title}>
                <span>{item.tag}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <strong>{item.result}</strong>
              </article>
            ))}
          </div>
        </section>

        <section className="section proof">
          <div className="section-heading">
            <span className="section-kicker">Casos destacados</span>
            <h2>Resultados que podemos construir.</h2>
            <p>
              Algunos retos se repiten en muchas organizaciones. Estos ejemplos muestran cómo abordamos
              problemas frecuentes con soluciones prácticas, ordenadas y medibles.
            </p>
          </div>
          <div className="proof-grid">
            {proofCases.map((item) => (
              <article key={item.title}>
                <h3>{item.title}</h3>
                <p><strong>Situación inicial:</strong> {item.context}</p>
                <p><strong>Qué hicimos:</strong> {item.action}</p>
                <p><strong>Resultado:</strong> {item.outcome}</p>
              </article>
            ))}
          </div>
        </section>

        <section id="ofertas" className="section offers">
          <div className="section-heading">
            <span className="section-kicker">Ofertas comerciales</span>
            <h2>Formas simples de iniciar una conversación.</h2>
            <p>
              Podemos empezar con un diagnóstico pequeño, una solución puntual o una consultoría técnica.
              La idea es avanzar con claridad, sin comprometer más alcance del necesario.
            </p>
          </div>
          <div className="offer-grid">
            {offers.map(({ icon: Icon, title, text, deliverables }) => (
              <article key={title}>
                <Icon size={24} aria-hidden="true" />
                <h3>{title}</h3>
                <p>{text}</p>
                <ul>
                  {deliverables.map((deliverable) => (
                    <li key={deliverable}><PackageCheck size={16} aria-hidden="true" />{deliverable}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        <section className="section sales-kit">
          <div className="section-heading">
            <span className="section-kicker">Material comercial</span>
            <h2>Comunicación clara para cada oportunidad.</h2>
            <p>
              Si desea compartir una presentación breve de HALEVERSE, puede descargar nuestro brochure corporativo
              y usarlo como material de apoyo en una primera conversación.
            </p>
            <a className="download-link" href="/brochure.pdf" target="_blank" rel="noreferrer">
              <Download size={18} aria-hidden="true" />
              Descargar brochure
            </a>
          </div>
          <div className="sales-list">
            {salesMaterials.map(([title, text]) => (
              <div key={title}>
                <Target size={21} aria-hidden="true" />
                <strong>{title}</strong>
                <span>{text}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="section process">
          <div className="section-heading">
            <span className="section-kicker">Método</span>
            <h2>Una forma ordenada de pasar del problema a la solución.</h2>
          </div>
          <ol className="steps">
            <li><strong>Diagnosticar</strong><span>Entender cómo trabaja el equipo, qué duele hoy y qué resultado espera lograr.</span></li>
            <li><strong>Diseñar</strong><span>Definir una solución posible, con alcance claro y entregables fáciles de validar.</span></li>
            <li><strong>Construir</strong><span>Avanzar por iteraciones, mostrando progreso visible y ajustando cuando haga falta.</span></li>
            <li><strong>Entregar</strong><span>Dejar la solución documentada, usable y preparada para una siguiente fase.</span></li>
          </ol>
        </section>

        <section id="contacto" className="contact">
          <div>
            <span className="section-kicker">Contacto</span>
            <h2>Cuéntenos qué proceso quiere mejorar.</h2>
            <p>
              Compártanos el caso y revisaremos una primera ruta para abordarlo con una solución práctica, medible y sostenible.
            </p>
            <div className="contact-direct">
              <Mail size={19} aria-hidden="true" />
              <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>
            </div>
            <div className="contact-assurance">
              <ShieldCheck size={20} aria-hidden="true" />
              <span>Formulario seguro por HTTPS, conectado a correo corporativo.</span>
            </div>
          </div>
          <ContactForm />
        </section>
      </main>

      <footer className="site-footer">
        <img src="/assets/isotipo-dark.svg" alt="" aria-hidden="true" />
        <span>HALEVERSE · Tecnología práctica para ordenar procesos, conectar datos y construir soluciones que generan valor.</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
