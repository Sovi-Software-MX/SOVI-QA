import React from "react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="font-sans text-gray-900">
      {/* Hero Section */}
      <header className="flex justify-between items-center p-6">
        <img src="/logo.png" alt="SOVI Logo" className="h-10" />
        <nav className="space-x-6">
          <Link to="#aplicativos" className="hover:text-green-500">Aplicativos</Link>
          <Link to="#contacto" className="hover:text-green-500">Cuéntanos sobre tu proyecto</Link>
          <Link to="#footer" className="hover:text-green-500">Contáctanos</Link>
          <Link to="/login" className="text-green-500 font-bold">Inicia Sesión</Link>
        </nav>
      </header>
      
      <section className="text-center p-16">
        <h1 className="text-4xl font-bold">Transformamos ideas en realidades digitales</h1>
        <p className="text-lg max-w-2xl mx-auto mt-4">
          En SOVI, creamos <span className="font-bold">soluciones web prácticas, ligeras y escalables</span> para optimizar y digitalizar los procesos de tu empresa.
        </p>
      </section>
      
      {/* Aplicaciones */}
      <section id="aplicativos" className="text-center p-16 bg-gray-100">
        <h2 className="text-3xl font-bold mb-8">Nuestros Aplicativos</h2>
        <div className="flex justify-center gap-16">
          <div className="max-w-md">
            <img src="/nodilogo.png" alt="NODI" className="h-20 mx-auto" />
            <p className="mt-4">NODI es nuestra solución digital que centraliza el control de Normas Oficiales Mexicanas.</p>
          </div>
          <div className="max-w-md">
            <img src="/bidilogo.png" alt="BIDI" className="h-20 mx-auto" />
            <p className="mt-4">BIDI es la herramienta ideal para gestionar inspecciones en tiempo real.</p>
          </div>
        </div>
      </section>
      
      {/* Contacto */}
      <section id="contacto" className="text-center p-16">
        <h2 className="text-3xl font-bold mb-4">Digitaliza tu Empresa Hoy</h2>
        <p className="max-w-xl mx-auto mb-8">
          Contáctanos y obtén tu primera versión a un precio accesible. Describe tu necesidad y nosotros te planteamos una <span className="font-bold">Solución Viable</span> sin compromiso.
        </p>
        <form className="grid grid-cols-2 gap-4 max-w-lg mx-auto">
          <input type="text" placeholder="Nombre Completo" className="border p-2 rounded" />
          <input type="email" placeholder="Correo" className="border p-2 rounded" />
          <input type="tel" placeholder="Teléfono" className="border p-2 rounded" />
          <input type="text" placeholder="Nombre de la empresa" className="border p-2 rounded" />
          <textarea placeholder="Cuéntanos tu idea" className="col-span-2 border p-2 rounded"></textarea>
          <button className="col-span-2 bg-green-500 text-white p-2 rounded">Enviar</button>
        </form>
      </section>
      
      {/* Footer */}
      <footer id="footer" className="bg-black text-white text-center p-8">
        <img src="/logo.png" alt="SOVI Logo" className="h-10 mx-auto mb-4" />
        <p>Somos una consultoría especializada en desarrollo web que entiende que la tecnología no solo debe ser innovadora, sino eficiente y adaptable.</p>
        <div className="mt-4">
          <p>📩 hola@sovi.com.mx</p>
          <p>📞 55 16812458</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
