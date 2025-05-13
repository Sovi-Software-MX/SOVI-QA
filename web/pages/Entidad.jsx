import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, auth, storage } from '../src/firebase/firebase-config';
import {
  doc,
  getDoc,
  setDoc,
  updateDoc,
  collection,
  query,
  where,
  getDocs,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { onAuthStateChanged } from 'firebase/auth';
import VistaEntidad from '../src/components/VistaEntidad';

const Entidad = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const entidadId = searchParams.get('id');

  const [user, setUser] = useState(undefined);
  const [entidadData, setEntidadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const [autorizacionPendiente, setAutorizacionPendiente] = useState(false);
  const [formData, setFormData] = useState({
    tpoEntidad: '',
    nombreCampo1: '',
    nombreCampo2: '',
    nombreCampo3: '',
    vigenciaEntidad: '',
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const verificarEntidad = async () => {
      if (!entidadId || user === undefined) return;

      if (!user) {
        setLoading(false);
        return;
      }

      const entidadRef = doc(db, 'entidades', entidadId);
      const entidadSnap = await getDoc(entidadRef);

      if (!entidadSnap.exists()) {
        setEntidadData(null);
        setLoading(false);
        return;
      }

      const data = entidadSnap.data();
      setEntidadData(data);

      if (data.estatusEntidad === 'NN') {
        setFormVisible(true);
        const autorizacionRef = doc(collection(entidadRef, 'autorizacion'), user.uid);
        await setDoc(autorizacionRef, {
          idEntidad: entidadId,
          idUsuario: user.uid,
          permiso: 'admin',
          fechaExpira: new Date('2999-12-31'),
        });
        setAutorizado(true);
      } else {
        const autorizacionSnap = await getDocs(
          query(collection(entidadRef, 'autorizacion'), where('idUsuario', '==', user.uid))
        );
        setAutorizado(!autorizacionSnap.empty);
      }

      setLoading(false);
    };

    verificarEntidad();
  }, [entidadId, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImagePreview(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const entidadRef = doc(db, 'entidades', entidadId);
    let bannerUrl = '';

    if (selectedFile) {
      const storageRef = ref(storage, `banners/${entidadId}/${selectedFile.name}`);
      await uploadBytes(storageRef, selectedFile);
      bannerUrl = await getDownloadURL(storageRef);
    }

    await updateDoc(entidadRef, {
      ...formData,
      estatusEntidad: 'AC',
      bannerUrl,
    });

    setEntidadData((prev) => ({ ...prev, ...formData, estatusEntidad: 'AC', bannerUrl }));
    setFormVisible(false);
    window.location.reload();
  };

  const solicitarAcceso = async () => {
    const solicitudRef = doc(db, 'solicitudes', `${entidadId}_${user.uid}`);
    await setDoc(solicitudRef, {
      idEntidad: entidadId,
      idUsuario: user.uid,
      solicitadaEn: new Date(),
      estado: 'pendiente',
    });
    setAutorizacionPendiente(true);
  };

  if (loading || user === undefined) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 animate-pulse">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Acceso restringido</h2>
        <p className="mb-4">Necesitas iniciar sesión para acceder a esta entidad.</p>
        <button
  onClick={() =>
    navigate('/login', {
      state: { from: `/entidad?id=${entidadId}` }
    })
  }
  className="bg-brand-green px-4 py-2 rounded"
>
  Ir a login
</button>

      </div>
    );
  }

  if (!entidadData) {
    return (
      <div className="p-4 text-red-600">
        <p>La entidad no existe.</p>
      </div>
    );
  }

  if (!autorizado) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-bold text-red-700 mb-2">Acceso denegado</h2>
        <p className="mb-4">No estás autorizado para ver esta entidad.</p>
        {autorizacionPendiente ? (
          <p className="text-green-600">Tu solicitud fue enviada. Espera la aprobación.</p>
        ) : (
          <button
            className="bg-brand-green px-4 py-2 rounded"
            onClick={solicitarAcceso}
          >
            Solicitar acceso al administrador
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4 text-center mt-4">ID de Entidad: {entidadId}</h1>

      {formVisible ? (
        <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-lg">
          <h2 className="text-xl font-bold mb-4 text-center">Configura tu entidad</h2>

          <label className="block">
            <span className="text-sm font-semibold">Tipo de entidad</span>
            <input
              name="tpoEntidad"
              placeholder="Ejemplo: Edificio, Sitio, Automóvil, Mascota"
              value={formData.tpoEntidad}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Nombre legal de la entidad</span>
            <input
              name="nombreCampo1"
              placeholder="Ejemplo: Azucarera S.A. de C.V."
              value={formData.nombreCampo1}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
              required
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Ubicación o centro de trabajo</span>
            <input
              name="nombreCampo2"
              placeholder="Ejemplo: Centro Toluca"
              value={formData.nombreCampo2}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Descripción adicional</span>
            <input
              name="nombreCampo3"
              placeholder="Ejemplo: Subestación Eléctrica A-Tablero"
              value={formData.nombreCampo3}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
            />
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Vigencia de la entidad</span>
            <input
              name="vigenciaEntidad"
              type="date"
              value={formData.vigenciaEntidad}
              onChange={handleChange}
              className="border p-2 w-full rounded mt-1"
              required
            />
            <span className="text-xs text-gray-500">Selecciona hasta cuándo estará activa esta entidad.</span>
          </label>

          <label className="block">
            <span className="text-sm font-semibold">Imagen</span>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="mt-1"
            />
            {imagePreview && (
              <div className="mt-2">
                <img src={imagePreview} alt="Preview" className="w-full rounded shadow" />
              </div>
            )}
            <div className="text-xs text-gray-500">Agrega una imagen para identificar visualmente esta entidad.</div>
          </label>

          <button
            type="submit"
            className="bg-brand-green w-full px-4 py-2 rounded font-semibold  hover:bg-green-700"
          >
            Guardar entidad
          </button>
        </form>
      ) : (
        <VistaEntidad entidadId={entidadId} user={user} />
      )}
    </div>
  );
};

export default Entidad;
