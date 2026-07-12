import React, { useEffect, useRef } from "react";
import { createRoot } from "react-dom/client";
import {
  ArrowRight,
  BarChart3,
  CheckCircle2,
  Database,
  FileText,
  GitBranch,
  Layers3,
  Mail,
  Network,
  ShieldCheck,
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
        <a href="#casos">Casos de uso</a>
        <a href="#contacto">Contacto</a>
      </nav>
    </header>
  );
}

const services = [
  {
    icon: Workflow,
    title: "Automatización empresarial",
    text: "Convertimos tareas repetitivas en flujos confiables para reducir tiempos, errores y reprocesos.",
  },
  {
    icon: GitBranch,
    title: "Datos e integraciones",
    text: "Conectamos bases de datos, archivos, APIs y plataformas para que la información fluya con orden.",
  },
  {
    icon: Layers3,
    title: "Desarrollo de software",
    text: "Creamos aplicaciones web, herramientas internas y soluciones a medida para necesidades concretas.",
  },
  {
    icon: Database,
    title: "Oracle y SQL",
    text: "Optimizamos consultas, procedimientos, reportes y procesos apoyados en bases de datos empresariales.",
  },
  {
    icon: FileText,
    title: "Reportes y documentos",
    text: "Generamos salidas profesionales en Excel, Word, PDF o dashboards a partir de datos estructurados.",
  },
  {
    icon: Network,
    title: "Innovación aplicada",
    text: "Usamos herramientas modernas, incluida IA cuando aporta valor, para acelerar soluciones prácticas.",
  },
];

const strengths = [
  ["Entendemos antes de construir", "Analizamos el proceso, los datos y el contexto del equipo para proponer una solución realista."],
  ["Integramos tecnología con operación", "Buscamos que cada solución encaje con la forma de trabajo del cliente, no que sea una pieza aislada."],
  ["Priorizamos resultados medibles", "Tiempo ahorrado, errores reducidos, reportes automatizados y mejor control operativo."],
  ["Construimos para evolucionar", "Diseñamos herramientas mantenibles, documentadas y preparadas para crecer por fases."],
];

const cases = [
  ["Excel y PDF", "Generación masiva de documentos, validaciones, consolidaciones y extracción de datos."],
  ["Oracle y SQL", "Optimización de consultas, reportes, procedimientos y análisis de información."],
  ["APIs y sistemas", "Integración entre aplicaciones, archivos, servicios web y bases de datos."],
  ["Reportes automáticos", "Informes periódicos, tableros de control y documentos generados desde datos reales."],
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
        El mensaje se enviará de forma segura a {CONTACT_EMAIL}. La primera vez FormSubmit puede pedirnos confirmar el correo de destino.
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
            <h1>Transformamos desafíos en soluciones tecnológicas.</h1>
            <p className="hero-copy">
              Conectamos datos, automatizamos procesos e integramos sistemas para ayudar a las organizaciones
              a ahorrar tiempo, reducir errores y tomar mejores decisiones.
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
            <h2>Cuando la operación depende demasiado del trabajo manual, el crecimiento se vuelve más lento.</h2>
            <p>
              HALEVERSE ayuda a equipos que trabajan con archivos dispersos, reportes repetitivos, bases de datos,
              documentos, correos, sistemas desconectados o tareas que consumen horas cada semana.
            </p>
          </div>
        </section>

        <section id="servicios" className="section services">
          <div className="section-heading">
            <span className="section-kicker">Servicios</span>
            <h2>Soluciones tecnológicas para operar mejor.</h2>
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
            <h2>Equipo, criterio técnico y compromiso con resultados.</h2>
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
            <h2>De información dispersa a procesos conectados.</h2>
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

        <section className="section process">
          <div className="section-heading">
            <span className="section-kicker">Método</span>
            <h2>Una ruta clara desde el problema hasta la solución.</h2>
          </div>
          <ol className="steps">
            <li><strong>Diagnosticar</strong><span>Entender el proceso, las fuentes de datos y el resultado esperado.</span></li>
            <li><strong>Diseñar</strong><span>Definir alcance, arquitectura, entregables y criterios de éxito.</span></li>
            <li><strong>Construir</strong><span>Desarrollar la solución por iteraciones y validar avances visibles.</span></li>
            <li><strong>Entregar</strong><span>Documentar, capacitar y dejar una base lista para evolucionar.</span></li>
          </ol>
        </section>

        <section id="contacto" className="contact">
          <div>
            <span className="section-kicker">Contacto</span>
            <h2>Cuéntenos qué proceso quiere mejorar.</h2>
            <p>
              Recibimos su necesidad, la analizamos y proponemos una ruta clara para resolverla con tecnología práctica.
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
        <span>HALEVERSE · Soluciones tecnológicas para conectar datos, automatizar procesos y generar resultados.</span>
      </footer>
    </>
  );
}

createRoot(document.getElementById("root")).render(<App />);
