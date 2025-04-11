import { useState, useEffect } from 'react';

const FormularioTarea = ({ onSubmit, tareaEditando, onCancelarEdicion }) => {
  const [titulo, setTitulo] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    if (tareaEditando) {
      setTitulo(tareaEditando.titulo);
      setDescripcion(tareaEditando.descripcion || '');
      setError('');
    }
  }, [tareaEditando]);

  const validarFormulario = () => {
    if (!titulo.trim()) {
      setError('El título es obligatorio');
      return false;
    }
    if (titulo.length > 50) {
      setError('El título no puede tener más de 50 caracteres');
      return false;
    }
    setError('');
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validarFormulario()) {
      if (tareaEditando) {
        onSubmit(tareaEditando.id, { titulo, descripcion });
      } else {
        onSubmit({ titulo, descripcion });
      }
      setTitulo('');
      setDescripcion('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">
        {tareaEditando ? 'Editar Tarea:' : 'Agrega Tarea:'}
      </h2>
      
      <div className="space-y-2">
        <label htmlFor="titulo" className="block text-sm font-medium text-gray-700">
          Título:
        </label>
        <input
          type="text"
          id="titulo"
          value={titulo}
          onChange={(e) => {
            setTitulo(e.target.value);
            if (e.target.value.trim()) setError('');
          }}
          className={`w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 ${
            error ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="Ingresa el título de la tarea"
          maxLength={50}
        />
        {error && <p className="text-sm text-red-600">{error}</p>}
      </div>

      <div className="space-y-2">
        <label htmlFor="descripcion" className="block text-sm font-medium text-gray-700">
          Descripción:
        </label>
        <textarea
          id="descripcion"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          placeholder="Ingresa una descripción (opcional)"
          rows="3"
        />
      </div>

      <div className="flex justify-end space-x-3 pt-2">
        {tareaEditando ? (
          <>
            <button 
              type="button" 
              onClick={onCancelarEdicion}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={!!error}
            >
              Guardar Cambios
            </button>
          </>
        ) : (
          <button 
            type="submit" 
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!!error}
          >
            Agregar Tarea
          </button>
        )}
      </div>
    </form>
  );
};

export default FormularioTarea; 