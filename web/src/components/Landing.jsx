import React from "react";
import { Link } from "react-router-dom";
import "../../../css/styles.css";
import logoSovi  from "../../../images/SOVI_blanco_2cm.png";
import init_icon from "../../../images/initial-icon.png";
import logoNODI  from "../../../images/NODI.png";
import logoBIDI  from "../../../images/BIDI.png";

const Landing = () => {
  return (
    <div className="landing-container font-mulish text-gray-900">
      <header className="flex justify-between items-center p-6">
        <img src={logoSovi}  alt="SOVI Logo" className="scale-25" />
        {/* Hero Section */}
        <nav className="flex gap-x-8">
        <Link to="#aplicativos" className="hover:text-green-500">Aplicativos  </Link>
          <Link to="#contacto" className="hover:text-green-500">Cuéntanos sobre tu proyecto  </Link>
          <Link to="#footer" className="hover:text-green-500">Contáctanos  </Link>
          <Link to="/login" className="text-green-500 font-bold">Inicia Sesión</Link>        </nav>
      </header>
      
      <section className="text-center mt-10">
        <h1 className="text-4xl font-bold">Transformamos ideas en</h1>
        <h1 className="text-4xl font-bold">realidades digitales</h1>
      </section>


          
      <section id="cuerpo" className="flex items-center justify-start p-8 space-x-10">
        <div className="w-1/3 flex-shrink-0">
          <img src={init_icon} alt="icono-inicio" className="w-full" />
        </div>
        <div className="w-2/3 text-left">
          <p className="text-lg">
            En SOVI, creamos <span className="font-bold">soluciones web prácticas, ligeras y 100% escalables</span> para optimizar y digitalizar los procesos de tu empresa.
          </p>
          <p className="text-lg mt-4">
            Nos especializamos en automatización, desarrollo web a medida y herramientas digitales que te ayudarán a ahorrar tiempo, reducir costos y mejorar tu productividad.
          </p>
        </div>
      </section>
            
      {/* Aplicaciones */}
      <section id="aplicativos" className="text-center p-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8">Nuestros Aplicativos</h2>
        <div className="flex justify-center gap-16">
          <div className="max-w-md">
            <img src={logoNODI}   alt="NODI" className="h-20 mx-auto" />
            <p className="mt-4">NODI es nuestra solución digital que centraliza el control de Normas Oficiales Mexicanas.</p>
          </div>
          <div className="max-w-md">
            <img src={logoBIDI} alt="BIDI" className="h-20 mx-auto p-6" />
            <p className="mt-4">BIDI es la herramienta ideal para gestionar inspecciones en tiempo real.</p>
          </div>
        </div>
      </section>
      
      {/* Contacto */}
      <section id="contacto" className="text-center p-16">
        <h2 className="text-3xl font-bold mb-4">Digitaliza tu Empresa Hoy</h2>
        <p className="max-w-xl mx-auto mb-8">Contáctanos y obtén tu primera versión a un precio accesible. Describe tu necesidad y nosotros te planteamos una <span className="font-bold">Solución Viable</span> sin compromiso.</p>
        <form className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <input placeholder="Nombre Completo" className="border p-2 rounded" type="text" />
          <input placeholder="Correo" className="border p-2 rounded" type="email" />
          <input placeholder="Teléfono" className="border p-2 rounded" type="tel" />
          <input placeholder="Nombre de la empresa" className="border p-2 rounded" type="text" />
          <textarea placeholder="Cuéntanos tu idea" className="border p-2 rounded col-span-2"></textarea>
          <button className="col-span-2 bg-green-500 text-white p-2 rounded">Enviar</button>
        </form>
      </section>
    
      {/* Footer */}
      <footer id="footer" className="bg-black text-white text-center p-8">
        <img src="/images/logo.png" alt="SOVI Logo" className="h-10 mx-auto mb-4" />
        <p>"Somos una consultoría especializada en desarrollo web que entiende que la tecnología no solo debe ser innovadora, sino eficiente y adaptable."</p>
        <div className="mt-4">
          <p>📩 hola@sovi.com.mx</p>
          <p>📞 55 16812458</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
