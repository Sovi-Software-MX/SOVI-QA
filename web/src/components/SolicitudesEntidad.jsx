// src/components/SolicitudesEntidad.jsx
import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  setDoc,
  query,
  where,
} from 'firebase/firestore';

const SolicitudesEntidad = ({ entidadId, currentUser }) => {
  const [solicitudes, setSolicitudes] = useState([]);
  const [permisosSeleccionados, setPermisosSeleccionados] = useState({});
  const [loading, setLoading] = useState(true);

  const opcionesPermiso = [
    { label: 'Lectura', value: 'lector' },
    { label: 'Escritura', value: 'editor' },
    { label: 'Administrador', value: 'admin' },
  ];

  useEffect(() => {
    const fetchSolicitudes = async () => {
          console.log("⏳ Cargando solicitudes para entidad:", entidadId);
      const q = query(
        collection(db, 'solicitudes'),
        where('idEntidad', '==', entidadId),
        where('estado', '==', 'pendiente')
      );
      const querySnapshot = await getDocs(q);
          console.log("📥 Resultados:", querySnapshot.docs.length);
      const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      const permisosIniciales = {};
      results.forEach(s => {
        permisosIniciales[s.idUsuario] = 'lector';
      });
      setPermisosSeleccionados(permisosIniciales);
      setSolicitudes(results);
      setLoading(false);
    };

    fetchSolicitudes();
  }, [entidadId]);

  const aprobarSolicitud = async (solicitud) => {
    const { idUsuario, email } = solicitud;
    const permisoSeleccionado = permisosSeleccionados[idUsuario];

    const autorizacionRef = doc(db, `entidades/${entidadId}/autorizacion`, idUsuario);
    const solicitudRef = doc(db, 'solicitudes', `${entidadId}_${idUsuario}`);

    await setDoc(autorizacionRef, {
      idEntidad: entidadId,
      idUsuario,
      email: email || '',
      permiso: permisoSeleccionado,
      fechaExpira: new Date('2999-12-31'),
    });

    await updateDoc(solicitudRef, {
      estado: 'aprobado',
    });

    setSolicitudes(prev => prev.filter(s => s.idUsuario !== idUsuario));
  };

  const rechazarSolicitud = async (solicitud) => {
    const solicitudRef = doc(db, 'solicitudes', solicitud.id);
    await updateDoc(solicitudRef, {
      estado: 'rechazado',
    });
    setSolicitudes(prev => prev.filter(s => s.id !== solicitud.id));
  };

  const handlePermisoChange = (idUsuario, value) => {
    setPermisosSeleccionados(prev => ({ ...prev, [idUsuario]: value }));
  };

  if (loading) return <p className="text-gray-500 text-sm">Cargando solicitudes...</p>;
  if (solicitudes.length === 0) return <p className="text-gray-500 text-sm">No hay solicitudes pendientes.</p>;

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Solicitudes de acceso</h2>
      <ul className="space-y-4">
        {solicitudes.map((s) => (
          <li key={s.id} className="border p-4 rounded">
            <p className="mb-1">Usuario: <strong>{s.email || s.idUsuario}</strong></p>
            <p className="text-xs text-gray-500 mb-2">{s.idUsuario}</p>
            <label className="block text-sm font-medium mb-1">Permiso a otorgar:</label>
            <select
              value={permisosSeleccionados[s.idUsuario] || 'lector'}
              onChange={(e) => handlePermisoChange(s.idUsuario, e.target.value)}
              className="border rounded p-1 mb-3 w-full"
            >
              {opcionesPermiso.map(op => (
                <option key={op.value} value={op.value}>{op.label}</option>
              ))}
            </select>
            <div className="flex space-x-2">
              <button
                onClick={() => aprobarSolicitud(s)}
                className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Otorgar permiso
              </button>
              <button
                onClick={() => rechazarSolicitud(s)}
                className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
              >
                Rechazar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SolicitudesEntidad;
