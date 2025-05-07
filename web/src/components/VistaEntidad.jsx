import { useEffect, useState } from 'react';
import { db } from '../firebase/firebase-config';
import { doc, getDoc, collection, getDocs } from 'firebase/firestore';
import { FileEdit, Trash2, Info, Check } from 'lucide-react';

const VistaEntidad = ({ entidadId, user }) => {
  const [entidadData, setEntidadData] = useState(null);
  const [verificaciones, setVerificaciones] = useState([]);

  useEffect(() => {
    const fetchEntidad = async () => {
      const entidadRef = doc(db, 'entidades', entidadId);
      const snap = await getDoc(entidadRef);
      if (snap.exists()) setEntidadData(snap.data());
    };

    const fetchVerificaciones = async () => {
      const eventosRef = collection(db, `entidades/${entidadId}/eventos`);
      const snap = await getDocs(eventosRef);
      const data = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setVerificaciones(data);
    };

    if (entidadId) {
      fetchEntidad();
      fetchVerificaciones();
    }
  }, [entidadId]);

  if (!entidadData) return <p className="p-6 text-center">Cargando entidad...</p>;
  console.log('Banner URL:', entidadData.bannerUrl);

  return (
    <div className="max-w-3xl mx-auto pb-24">
      {entidadData.bannerUrl && (
        <img
          src={entidadData.bannerUrl}
          alt="Banner entidad"
          className="w-full h-48 object-cover rounded-b-xl"
        />
      )}

      <div className="p-4 text-center">
        <h1 className="text-xl font-bold text-gray-800">
          {entidadData.nombreCampo1}
        </h1>
        <p className="text-sm text-gray-600">
          {entidadData.nombreCampo2} - {entidadData.nombreCampo3}
        </p>
        <p className="text-xs text-gray-500 mt-1 italic">
          Vigencia hasta: {new Date(entidadData.vigenciaEntidad).toLocaleDateString()}
        </p>

        <button className="mt-4 bg-brand-green font-medium px-4 py-2 rounded-full">
          ✓ Agregar Verificación
        </button>
      </div>

      <div className="px-4 space-y-4">
        {verificaciones.map((v) => (
          <div
            key={v.id}
            className="flex gap-3 items-start bg-white shadow p-3 rounded-xl"
          >
            {v.fotoUrl && (
              <img
                src={v.fotoUrl}
                alt="verificacion"
                className="w-16 h-16 object-cover rounded"
              />
            )}

            <div className="flex-1">
              <p className="text-sm font-semibold text-gray-800">
                {new Date(v.fechaEvento).toLocaleString()}
              </p>
              <p className="text-xs text-gray-600 truncate">
                {v.descripcion || 'Sin descripción'}
              </p>
            </div>

            <div className="flex gap-2 text-gray-500">
              <button><FileEdit size={16} /></button>
              <button><Trash2 size={16} /></button>
              <button><Info size={16} /></button>
              <button><Check size={16} /></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VistaEntidad;
