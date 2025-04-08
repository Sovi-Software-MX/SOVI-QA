import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Landing = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="font-mulish text-brand-gray bg-brand-white">

      {/* 🟢 Header */}
      <header
        className={`fixed top-0 left-0 w-full z-50 flex justify-between items-center transition-all duration-300 shadow-md px-6 ${scrolled ? 'py-3' : 'py-6'} bg-white`}
      >
        <img src="/images/SOVI_fondo_blanco.png" alt="SOVI Logo" className="h-10" />
        <nav className="hidden md:flex gap-8 text-subtitle font-semibold">
          <a href="#aplicativos" className="hover:text-brand-green">Aplicativos</a>
          <a href="#contacto" className="hover:text-brand-green">Cuéntanos tu proyecto</a>
          <a href="#footer" className="hover:text-brand-green">Contáctanos</a>
          <a href="/login" className="text-brand-green font-bold">Inicia Sesión</a>
        </nav>
        <button className="md:hidden text-3xl text-brand-green relative z-50" onClick={() => setIsOpen(!isOpen)}>☰</button>
      </header>

      {/* Mobile Nav */}
      {isOpen && (
        <nav className="md:hidden fixed top-[60px] left-0 w-full bg-white shadow-md flex flex-col gap-4 p-8 text-subtitle font-semibold z-40">
          <a href="#aplicativos" onClick={() => setIsOpen(false)}>Aplicativos</a>
          <a href="#contacto" onClick={() => setIsOpen(false)}>Cuéntanos tu proyecto</a>
          <a href="#footer" onClick={() => setIsOpen(false)}>Contáctanos</a>
          <a href="/login" className="text-brand-green font-bold" onClick={() => setIsOpen(false)}>Inicia Sesión</a>
        </nav>
      )}

<div className="pt-24">
      {/* 🟣 Hero */}
      <section className="text-center py-8 px-4" data-aos="fade-up">
        <h1 className="text-display font-extrabold leading-tight">Transformamos ideas en <br /> <span className='text-brand-green'>realidades digitales</span> </h1>
      </section>

      {/* 🔵 Introducción */}
      <section id="cuerpo" className="flex flex-wrap justify-between items-center px-8 gap-10 " data-aos="fade-up">
        <div className="w-full md:w-1/2">
          <img src="/images/hero-ilustracion.png" alt="Intro" className="w-full max-w-lg mx-auto" />
        </div>
        <div className="w-full md:w-1/2 max-w-xl mx-auto text-left">
          <p className="text-body">
            En <strong>SOVI</strong>, creamos <span className="font-bold">soluciones web prácticas, ligeras y 100% escalables</span> para optimizar y digitalizar los procesos de tu empresa.
          </p>
          <p className="text-body mt-4">
            Nos especializamos en automatización, desarrollo web a medida y herramientas digitales que te ayudarán a ahorrar tiempo, reducir costos y mejorar tu productividad.
          </p>
        </div>
      </section>

      {/* 🟡 Beneficios SOVI */}
      <div className="text-center py-5 px-4 " data-aos="fade-up">
      <h2 className="text-headline font-extrabold">
            Si buscas un aliado estratégico para llevar tu negocio al siguiente nivel,<br />
            <span className="text-brand-green">en SOVI estamos listos para hacerlo posible.</span>
      </h2>
      </div>
      <section className="flex flex-col md:flex-row items-center justify-center gap-12 py-8 px-8 text-left " data-aos="fade-up">
        <div className="w-full md:w-1/2 max-w-md">
          <img src="/images/eficiencia-ilustracion.png" alt="Beneficios SOVI" className="w-full max-w-sm mx-auto" />
        </div>

        <div className="w-full md:w-1/2 max-w-xl space-y-6 ">

          <ul className="mt-6 space-y-4">
            {[
              {
                title: 'Soluciones hechas a la medida',
                desc: 'Nos adaptamos a las necesidades de tu negocio.',
              },
              {
                title: 'Tecnología escalable',
                desc: 'Nos adaptamos a las necesidades de tu negocio.',
              },
              {
                title: 'Automatización inteligente',
                desc: 'Más eficiencia, menos esfuerzo manual.',
              },
              {
                title: 'Soporte experto',
                desc: 'Te acompañamos en cada paso del proceso.',
              },
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <img src="/images/check-verde.png" alt="ícono" className="mt-1" />
                <div>
                  <p className="font-bold text-body">{item.title}</p>
                  <p className="text-body">{item.desc}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>


      {/* 🟠 Aplicativos */}
      <section id="aplicativos" className=" text-center py-8 px-4 " data-aos="fade-up">
        <h2 className="text-headline font-bold mb-8">Nuestros Aplicativos</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 max-w-6xl mx-auto px-4">
          <div className="bg-white p-6 rounded shadow-md w-full">
            <img src="/images/NODI.png" alt="NODI" className="h-20 mx-auto mb-4" />
            <p className="text-body">NODI es nuestra soluciòn digital que centraliza y simplifica el control de las Normas Oficiales Mexicanas (NOMs).  <br /> Permite acceder a la información actualizada de las regulaciones, gestionar registros de cada proceso y realizar seguimientos en tiempo real. <br /> Con NODI, la supervisión y el cumplimiento de normativas se vuelven más ágiles, organizados y eficientes. 🚀</p>
          </div>
          <div className="bg-white p-6 rounded shadow-md w-full">
            <img src="/images/BIDI.png" alt="BIDI" className="h-20 mx-auto mb-4" />
            <p className="text-body">BIDI: Bitácora Digital para Inspecciones en Tiempo Real <br /> BIDI es la herramienta ideal para gestionar inspecciones y cumplimiento normativo de manera ágil y organizada. Con este aplicativo, los encargados pueden subir información en tiempo real, registrar el estatus de establecimientos, adjuntar evidencias fotográficas y dar un seguimiento detallado a cada inspección. <br /> Todo en un solo lugar, optimizando tiempos y mejorando la trazabilidad de cada proceso. 🚀 </p>
          </div>
        </div>
      </section>

      {/* 🟢 CTA: Prueba sin costo */}
      <section className="text-center py-8 px-6 bg-brand-white " data-aos="fade-up">
        <h3 className="text-caption tracking-widest uppercase font-bold mb-2">
          PRUEBA NUESTRAS SOLUCIONES <span className="font-extrabold">SIN COSTO</span>
        </h3>

        <p className="text-body max-w-2xl mx-auto mb-6">
          En SOVI, creemos en la eficiencia y el poder de la digitalización. Por eso, te invitamos a probar <strong>NODI</strong> y <strong>BIDI</strong>, nuestras aplicaciones diseñadas para optimizar el cumplimiento normativo y la gestión de inspecciones.
        </p>

        <a className="bg-brand-green hover:bg-brand-dark text-brand-black font-bold px-6 py-3 rounded shadow-md mb-6 block max-w-xs	mx-auto" href='/login'>
          Crear una cuenta
        </a>

        <ul className="text-sm text-left max-w-md mx-auto text-brand-gray space-y-2">
          {[
            'Accede sin costo',
            'Explora todas sus funciones',
            'Optimiza tus procesos desde el primer día',
          ].map((item, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-red-500 font-bold mt-0.5">✦</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </section>


      {/* 🔴 Contacto */}
      <section id="contacto" className="text-center py-8 px-4 bg-white " data-aos="fade-up"> 
  <h2 className="text-headline font-bold mb-4">Digitaliza tu Empresa Hoy</h2>

  <p className="text-body mx-auto mb-12 max-w-4xl">
    Si buscas un aliado estratégico para llevar tu negocio al siguiente nivel, en
    <span className="font-bold text-brand-green"> SOVI</span> estamos listos para hacerlo posible.
    <br />
    <span className="font-bold">Contáctanos y obtén tu primera versión a un precio accesible</span>
    <br />
    Describe brevemente tu necesidad y nosotros te planteamos una <b>SO</b>lución <b>VI</b>able ¡Sin compromiso!
  </p>

  <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-6xl mx-auto items-start">
    {/* Formulario */}
    <form className="md:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-4">
      <input type="text" placeholder="Nombre Completo*" className="input" />
      <input type="email" placeholder="Correo*" className="input" />
      <input type="tel" placeholder="Teléfono*" className="input" />
      <input type="text" placeholder="Nombre de la empresa" className="input" />
      <textarea placeholder="Cuéntanos tu idea*" className="input md:col-span-2 h-32 resize-y"></textarea>
      <button className="md:col-span-2 bg-brand-green hover:bg-brand-dark text-brand-black font-bold py-3 px-6 rounded max-w-xs">
        ENVIAR
      </button>
    </form>

    {/* Contacto directo */}
    <div className="flex flex-col gap-8">

{/* Agenda */}
<div className="flex items-start gap-4 transition hover:scale-105">
  <img src="/images/Agenda.png" alt="Agenda" className="h-16" />
  <div>
    <p className="text-body font-bold">¡Agenda tu llamada!</p>
    <p className="text-body text-brand-gray">Nosotros te contactamos</p>
  </div>
</div>

{/* WhatsApp */}
<div className="flex items-start gap-4 transition hover:scale-105">
  <img src="/images/whats.png" alt="WhatsApp" className='h-16' />
  <div>
    <p className="text-body">O si lo prefieres escríbenos al</p>
    <p className="text-body font-bold text-brand-black">5516812458</p>
  </div>
</div>

</div>

  </div>
</section>

      {/* ⚫ Footer */}
      <footer id="footer" className="bg-brand-black text-brand-white py-12 px-6" >
  <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 items-start gap-8">

    {/* Columna 1: Logo */}
    <div className="flex justify-center md:justify-start">
      <img src="/images/logo-sovi-fondo-negro.png" alt="SOVI Logo" />
    </div>

    {/* Columna 2: Descripción */}
    <div className="text-caption text-center">
      <p>
        Somos una consultoría especializada en desarrollo web que entiende que la tecnología no solo debe ser innovadora, sino también eficiente y adaptable a las necesidades de cada negocio.
      </p>
      <br />
      <p>
        Tu aliado estratégico con un equipo experto y comprometido, enfocado en diseñar soluciones tecnológicas que no solo resuelven problemas, sino que también impulsan el crecimiento y la rentabilidad de nuestros clientes.
      </p>
    </div>

    {/* Columna 3: Contacto */}
    <div className="flex flex-col gap-4 items-center md:items-end text-center md:text-right">
      <h4 className="text-title font-bold">Contáctanos</h4>
      <div className="flex items-center gap-2">
      <p>📩 hola@sovi.com.mx</p>
      </div>
      <div className="flex items-center gap-2">
        <p>📞 55 1681 2458</p>
        </div>
    </div>

  </div>
</footer>

</div>




    </div>
  );
};

export default Landing;