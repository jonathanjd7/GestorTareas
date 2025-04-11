const Tarea = ({ tarea, onEliminar, onToggleCompletada, onIniciarEdicion }) => {
  return (
    <div className={`p-4 border rounded-lg shadow-sm transition-all duration-200 ${
      tarea.completada 
        ? 'bg-gray-50 border-gray-200' 
        : 'bg-white border-gray-200 hover:shadow-md'
    }`}>
      <div className="flex items-start">
        <div className="flex items-center h-5 mt-1">
          <input
            type="checkbox"
            checked={tarea.completada}
            onChange={() => onToggleCompletada(tarea.id)}
            className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
          />
        </div>
        <div className="ml-3 flex-1">
          <h3 className={`text-lg font-medium ${
            tarea.completada ? 'text-gray-500 line-through' : 'text-gray-900'
          }`}>
            {tarea.titulo}
          </h3>
          {tarea.descripcion && (
            <p className={`mt-1 text-sm ${
              tarea.completada ? 'text-gray-400' : 'text-gray-600'
            }`}>
              {tarea.descripcion}
            </p>
          )}
        </div>
        <div className="ml-4 flex-shrink-0 flex space-x-2">
          <button 
            onClick={() => onIniciarEdicion(tarea)} 
            className={`p-1 rounded-full ${
              tarea.completada 
                ? 'text-gray-400 cursor-not-allowed' 
                : 'text-indigo-600 hover:bg-indigo-100'
            }`}
            disabled={tarea.completada}
            title="Editar tarea"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
            </svg>
          </button>
          <button 
            onClick={() => onEliminar(tarea.id)} 
            className="p-1 rounded-full text-red-600 hover:bg-red-100"
            title="Eliminar tarea"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tarea; 