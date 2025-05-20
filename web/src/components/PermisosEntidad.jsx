// src/components/PermisosEntidad.jsx
import { useEffect, useState } from 'react';
import {
  collection,
  doc,
  getDocs,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';
import { db } from '../firebase/firebase-config';

const opcionesPermiso = [
  { label: 'Lectura', value: 'lector' },
  { label: 'Escritura', value: 'editor' },
  { label: 'Administrador', value: 'admin' },
];

const PermisosEntidad = ({ entidadId, currentUserId }) => {
  const [usuarios, setUsuarios] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAutorizados = async () => {
      const ref = collection(db, `entidades/${entidadId}/autorizacion`);
      const snap = await getDocs(ref);
      const data = snap.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setUsuarios(data);
      setLoading(false);
    };

    fetchAutorizados();
  }, [entidadId]);

  const actualizarPermiso = async (userId, nuevoPermiso) => {
    const ref = doc(db, `entidades/${entidadId}/autorizacion/${userId}`);
    await updateDoc(ref, { permiso: nuevoPermiso });
    setUsuarios((prev) =>
      prev.map((u) => (u.idUsuario === userId ? { ...u, permiso: nuevoPermiso } : u))
    );
  };

  const eliminarUsuario = async (userId) => {
    if (userId === currentUserId) {
      alert('No puedes eliminar tu propio acceso.');
      return;
    }
    const ref = doc(db, `entidades/${entidadId}/autorizacion/${userId}`);
    await deleteDoc(ref);
    setUsuarios((prev) => prev.filter((u) => u.idUsuario !== userId));
  };

  if (loading) return <p className="text-gray-500 text-sm">Cargando permisos...</p>;
  if (usuarios.length === 0) return <p className="text-gray-500 text-sm">No hay usuarios autorizados.</p>;

  return (
    <div className="bg-white rounded-lg shadow p-4 mt-6">
      <h2 className="text-lg font-semibold mb-4">Usuarios autorizados</h2>
      <ul className="space-y-4">
        {usuarios.map((u) => (
          <li key={u.idUsuario} className="border p-4 rounded">
            <p className="mb-1">Usuario: <strong>{u.email || u.idUsuario}</strong></p>
            <p className="text-xs text-gray-500 mb-2">{u.idUsuario}</p>
        <label className="block text-sm font-medium mb-1">Permiso actual:</label>
        {u.idUsuario === currentUserId ? (
          <p className="text-sm text-gray-700 font-semibold mb-3">Administrador (tú)</p>
        ) : (
          <select
            value={u.permiso}
            onChange={(e) => actualizarPermiso(u.idUsuario, e.target.value)}
            className="border rounded p-1 mb-3 w-full"
          >
            {opcionesPermiso.map((op) => (
              <option key={op.value} value={op.value}>{op.label}</option>
            ))}
          </select>
        )}
        {u.idUsuario !== currentUserId && (
          <div className="flex justify-end">
            <button
              onClick={() => eliminarUsuario(u.idUsuario)}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
            >
              Eliminar acceso
            </button>
          </div>
        )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PermisosEntidad;
