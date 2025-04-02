import React from "react";
import { Link } from "react-router-dom";
import "../../../css/styles.css";
import logoSovi  from "../../../images/Sovilogo.jpg";
import init_icon from "../../../images/initial-icon.png";
import logoNODI  from "../../../images/NODI.png";
import logoBIDI  from "../../../images/BIDI.png";

const Landing = () => {
  return (
    <div className="landing-container font-mulish text-gray-900">
      <header className="flex mb-0">    
      <img src={logoSovi} alt="SOVI Logo" style={{ height: "5%", marginTop: "0", marginLeft: "4px", marginBottom: "0" }}/>
        {/* Hero Section */} 
        <nav className="mr-6">
          <Link to="#aplicativos" className="hover:text-green-900">Aplicativos  </Link>
          <Link to="#contacto" className="hover:text-green-900">Cuéntanos sobre tu proyecto  </Link>
          <Link to="#footer" className="hover:text-green-900">Contáctanos  </Link>
          <Link to="/login" className="text-green-500 font-bold">Inicia Sesión</Link> 
        </nav>
      </header>   
      <section className="text-center mt-0">
        <h1 className="text-4xl font-bold">Transformamos ideas en
            <br />realidades digitales</h1>
      </section>
    
      <section>
        <div className="cuerpoLanding flex items-center space-x-10">
          <img src={init_icon} alt="icono-inicio" className="w-1/3 h-auto" />
          <div classsName="ml-10">
            <p>
              En SOVI, creamos <span className="font-bold">soluciones web prácticas, ligeras y 100% 
                escalables</span> para optimizar y digitalizar los procesos de tu empresa.
            </p>
            <p>
              Nos especializamos en automatización, desarrollo web a medida y herramientas digitales que te ayudarán a ahorrar tiempo, reducir costos y mejorar tu productividad.
            </p>
          </div>
        </div>
      </section>
           
      {/* Aplicaciones */}
      <section id="aplicativos" className="text-center  bg-gray-100">
        <h1 className="text-4xl font-bold">Nuestros Aplicativos</h1>
      </section>
      
      <section>
        <div className="container mx-auto">
          <table className="w-full table-auto border-separate ml-6 mr-6 mt-0">
            <tbody>
              <tr>
                <td className="w-2/3 flex flex-col items-center p-4">
                    <img src={logoNODI}   alt="NODI" className="w-32 h-32 object-contain" />
                    <p className="text-center">NODI es nuestra solución digital que centraliza el control de las 
                      Normas Oficiales Mexicanas.
                      <br />Permite acceder a la información actualizada de las regulaciones, gestionar registros 
                      de cada proceso y realizar seguimientos en tiempo real.
                    </p>
                    <p className="text-center">Con NODI, la supervisión y el cumplimiento de normativas se vuelven 
                      más ágiles, organizados y eficientes.🚀
                    </p>
                </td>
                <td className="w-1/5 flex flex-col items-center p-4">
                  <p>Anita
                  </p>
                </td>
                <td className="w-1/3 flex flex-col items-center p-4">
                  <img src={logoBIDI} alt="BIDI" className="w-32 h-32 object-contain" />
                  <p className="text-center">BIDI Bitácora Digital para inspecciones en tiempo real.</p>
                  <p className="text-center">BIDI es la herramienta ideal para gestionar inspecciones y cumplimiento 
                    normativo de manera ágil y organizada. Con este aplicativo los encargados pueden subir información 
                    en tiempo real, registrar el estatus de establecimientos, adjuntar evidencias fotográficas y dar un 
                    seguimiento detallado a cada inspección.
                  </p>
                  <p className="text-center">Todo en un solo lugar, optimizando tiempos y mejorando la trazabilidad 
                    de cada proceso.🚀
                  </p>
                </td>
              </tr>
            </tbody>
          </table>             
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
