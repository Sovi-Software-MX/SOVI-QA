import { useSearchParams } from 'react-router-dom';
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
  const entidadId = searchParams.get('id');
  const [user, setUser] = useState(null);
  const [entidadData, setEntidadData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  const [autorizado, setAutorizado] = useState(false);
  const [formData, setFormData] = useState({
    tpoEntidad: '',
    nombreCampo1: '',
    nombreCampo2: '',
    nombreCampo3: '',
    vigenciaEntidad: '',
  });
  const [autorizacionPendiente, setAutorizacionPendiente] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (u) => setUser(u));
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const verificarEntidad = async () => {
      if (!entidadId || !user) return;

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
        // Mostrar formulario y asignar admin
        setFormVisible(true);

        // Crear autorización si no existe ya
        const autorizacionRef = doc(collection(entidadRef, 'autorizacion'), user.uid);
        await setDoc(autorizacionRef, {
          idEntidad: entidadId,
          idUsuario: user.uid,
          permiso: 'admin',
          fechaExpira: new Date('2999-12-31'),
        });

        setAutorizado(true);
      } else {
        // Validar si el usuario tiene permisos
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
      estatusEntidad: 'AC', // O el estatus que uses
    });

    setEntidadData((prev) => ({ ...prev, ...formData, estatusEntidad: 'AC' }));
    setFormVisible(false);
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

  if (loading) return <p className="p-4">Cargando...</p>;
  if (!entidadData) return <p className="p-4">La entidad no existe.</p>;

  if (!autorizado) {
    return (
      <div className="p-4">
        <h2 className="text-xl font-semibold mb-2">Acceso denegado</h2>
        <p className="mb-4">No estás autorizado para ver esta entidad.</p>
        {autorizacionPendiente ? (
          <p className="text-green-600">Tu solicitud fue enviada. Espera la aprobación.</p>
        ) : (
          <button
            className="bg-blue-600 text-white px-4 py-2 rounded"
            onClick={solicitarAcceso}
          >
            Solicitar acceso al administrador
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-2">Entidad: {entidadId}</h1>

      {formVisible ? (
        <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
          <input
            name="tpoEntidad"
            placeholder="Tipo de entidad"
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            name="nombreCampo1"
            placeholder="Nombre campo 1"
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <input
            name="nombreCampo2"
            placeholder="Nombre campo 2"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="nombreCampo3"
            placeholder="Nombre campo 3"
            onChange={handleChange}
            className="border p-2 w-full"
          />
          <input
            name="vigenciaEntidad"
            type="date"
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded"
          >
            Guardar entidad
          </button>
        </form>
      ) : (
        <pre className="bg-gray-100 p-3 rounded">{JSON.stringify(entidadData, null, 2)}</pre>
      )}
    </div>
  );
};

export default Entidad;
