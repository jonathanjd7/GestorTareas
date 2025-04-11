import Tarea from '../Tarea/Tarea';

const ListaTareas = ({ tareas, onEliminar, onToggleCompletada, onIniciarEdicion }) => {
  if (tareas.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500 text-lg">No hay tareas, ¡agrega una!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Mis Tareas</h2>
      {tareas.map(tarea => (
        <Tarea
          key={tarea.id}
          tarea={tarea}
          onEliminar={onEliminar}
          onToggleCompletada={onToggleCompletada}
          onIniciarEdicion={onIniciarEdicion}
        />
      ))}
    </div>
  );
};

export default ListaTareas; 