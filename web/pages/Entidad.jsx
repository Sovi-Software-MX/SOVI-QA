import { useSearchParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { db, auth } from '../src/firebase/firebase-config';
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
import { onAuthStateChanged } from 'firebase/auth';

const Entidad = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const entidadId = searchParams.get('id');

  const [user, setUser] = useState(undefined); // undefined para saber si ya fue evaluado
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

  // Detectar si hay usuario logueado
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => {
      setUser(u ?? null); // null si no está logueado
    });
    return () => unsubscribe();
  }, []);

  // Verificar entidad y permisos
  useEffect(() => {
    const verificarEntidad = async () => {
      if (!entidadId || user === undefined) return;

      // Si no hay usuario, no hacer nada más
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const entidadRef = doc(db, 'entidades', entidadId);
    await updateDoc(entidadRef, {
      ...formData,
      estatusEntidad: 'AC',
    });

    setEntidadData((prev) => ({ ...prev, ...formData, estatusEntidad: 'AC' }));
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

  // Mostrar loader hasta que se evalúe user + entidad + permisos
  if (loading || user === undefined) {
    return (
      <div className="p-6 text-center">
        <p className="text-gray-600 animate-pulse">Cargando...</p>
      </div>
    );
  }

  // Usuario no autenticado
  if (!user) {
    return (
      <div className="p-6 text-center">
        <h2 className="text-2xl font-semibold text-red-600 mb-2">Acceso restringido</h2>
        <p className="mb-4">Necesitas iniciar sesión para acceder a esta entidad.</p>
        <button
          onClick={() => navigate('/login')}
          className="bg-brand-green px-4 py-2 rounded"
        >
          Ir a login
        </button>
      </div>
    );
  }

  // Entidad no existe
  if (!entidadData) {
    return (
      <div className="p-4 text-red-600">
        <p>La entidad no existe.</p>
      </div>
    );
  }

  // Usuario no autorizado
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
      <h1 className="text-2xl font-bold mb-4">Entidad: {entidadId}</h1>

      {formVisible ? (
        <form onSubmit={handleSubmit} className="space-y-4 bg-white p-4 rounded shadow">
          <input
            name="tpoEntidad"
            placeholder="Tipo de entidad"
            value={formData.tpoEntidad}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            name="nombreCampo1"
            placeholder="Nombre campo 1"
            value={formData.nombreCampo1}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            name="nombreCampo2"
            placeholder="Nombre campo 2"
            value={formData.nombreCampo2}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="nombreCampo3"
            placeholder="Nombre campo 3"
            value={formData.nombreCampo3}
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="vigenciaEntidad"
            type="date"
            value={formData.vigenciaEntidad}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-brand-green px-4 py-2 rounded hover:bg-green-700"
          >
            Guardar entidad
          </button>
        </form>
      ) : (
        <div className="bg-gray-100 p-4 rounded">
          <h2 className="font-semibold mb-2">Datos registrados:</h2>
          <pre className="whitespace-pre-wrap text-sm">{JSON.stringify(entidadData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Entidad;
