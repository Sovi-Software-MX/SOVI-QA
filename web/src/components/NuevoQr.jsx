import { useState } from "react";
import { storage } from "./firebaseConfig";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";

import QRCode from "qrcode.react";

const NuevoQr = () => {
  const [jsonData, setJsonData] = useState({
    Encabezado: { TipoQr: "" },
    Cabecera: {
      TituloCabecera: "",
      EmpresaNombre: "",
      EdificioNombre: "",
      SitioArea: "",
      PerfilArticulos: ""
    },
    Articulos: {
      TituloArticulos: "",
      Artículo: {
        FechaEvento: "",
        UsuarioRealiza: "",
        TipoVerificación: "",
        CondiciónInicial: "",
        AccionRealizada: "",
        CondicionFinal: ""
      }
    }
  });

  const [url, setUrl] = useState("");

  // Función para manejar cambios en los inputs
  const handleChange = (event, section, key, subKey = null) => {
    const value = event.target.value;
    setJsonData((prevJson) => ({
      ...prevJson,
      [section]: {
        ...prevJson[section],
        [key]: subKey
          ? { ...prevJson[section][key], [subKey]: value }
          : value
      }
    }));
  };

  // Subir el JSON a Firebase Storage
  const uploadJson = async () => {
    const jsonBlob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
    const storageRef = ref(storage, `json/formulario.json`);

    try {
      await uploadBytes(storageRef, jsonBlob);
      const downloadURL = await getDownloadURL(storageRef);
      alert("Archivo subido con éxito");
      setUrl(downloadURL);
    } catch (error) {
      console.error("Error al subir JSON:", error);
    }
  };

  return (
    <div className="container">
      <h1>Formulario para Crear JSON</h1>

      <form>
        <h3>Encabezado</h3>
        <label>Tipo QR:</label>
        <input
          type="text"
          value={jsonData.Encabezado.TipoQr}
          onChange={(e) => handleChange(e, "Encabezado", "TipoQr")}
        />

        <h3>Cabecera</h3>
        <label>Título:</label>
        <input
          type="text"
          value={jsonData.Cabecera.TituloCabecera}
          onChange={(e) => handleChange(e, "Cabecera", "TituloCabecera")}
        />
        <label>Empresa:</label>
        <input
          type="text"
          value={jsonData.Cabecera.EmpresaNombre}
          onChange={(e) => handleChange(e, "Cabecera", "EmpresaNombre")}
        />
        <label>Edificio:</label>
        <input
          type="text"
          value={jsonData.Cabecera.EdificioNombre}
          onChange={(e) => handleChange(e, "Cabecera", "EdificioNombre")}
        />
        <label>Sitio/Área:</label>
        <input
          type="text"
          value={jsonData.Cabecera.SitioArea}
          onChange={(e) => handleChange(e, "Cabecera", "SitioArea")}
        />
        <label>Perfil de Artículos:</label>
        <input
          type="text"
          value={jsonData.Cabecera.PerfilArticulos}
          onChange={(e) => handleChange(e, "Cabecera", "PerfilArticulos")}
        />

        <h3>Artículos</h3>
        <label>Título:</label>
        <input
          type="text"
          value={jsonData.Articulos.TituloArticulos}
          onChange={(e) => handleChange(e, "Articulos", "TituloArticulos")}
        />
        <label>Fecha Evento:</label>
        <input
          type="date"
          value={jsonData.Articulos.Artículo.FechaEvento}
          onChange={(e) => handleChange(e, "Articulos", "Artículo", "FechaEvento")}
        />
        <label>Usuario Realiza:</label>
        <input
          type="text"
          value={jsonData.Articulos.Artículo.UsuarioRealiza}
          onChange={(e) => handleChange(e, "Articulos", "Artículo", "UsuarioRealiza")}
        />
        <label>Tipo Verificación:</label>
        <input
          type="text"
          value={jsonData.Articulos.Artículo.TipoVerificación}
          onChange={(e) => handleChange(e, "Articulos", "Artículo", "TipoVerificación")}
        />
        <label>Condición Inicial:</label>
        <input
          type="text"
          value={jsonData.Articulos.Artículo.CondiciónInicial}
          onChange={(e) => handleChange(e, "Articulos", "Artículo", "CondiciónInicial")}
        />
        <label>Acción Realizada:</label>
        <input
          type="text"
          value={jsonData.Articulos.Artículo.AccionRealizada}
          onChange={(e) => handleChange(e, "Articulos", "Artículo", "AccionRealizada")}
        />
        <label>Condición Final:</label>
        <input
          type="text"
          value={jsonData.Articulos.Artículo.CondicionFinal}
          onChange={(e) => handleChange(e, "Articulos", "Artículo", "CondicionFinal")}
        />
      </form>

      <button onClick={uploadJson}>Subir JSON</button>

      {url && (
        <div>
          <h2>Código QR del JSON</h2>
          <QRCode value={url} size={200} />
          <p><a href={url} target="_blank" rel="noopener noreferrer">Ver JSON</a></p>
        </div>
      )}
    </div>
  );
}

export default NuevoQr;