import { useState, useEffect } from 'react';
import FormularioTarea from './components/FormularioTarea/FormularioTarea';
import ListaTareas from './components/ListaTareas/ListaTareas';

function App() {
  // Cargar tareas desde localStorage al iniciar
  const [tareas, setTareas] = useState(() => {
    const tareasGuardadas = localStorage.getItem('tareas');
    return tareasGuardadas ? JSON.parse(tareasGuardadas) : [];
  });
  const [tareaEditando, setTareaEditando] = useState(null);
  const [mensajeExito, setMensajeExito] = useState('');

  // Guardar tareas en localStorage cada vez que cambien
  useEffect(() => {
    localStorage.setItem('tareas', JSON.stringify(tareas));
  }, [tareas]);

  // Función para agregar una nueva tarea
  const agregarTarea = (nuevaTarea) => {
    const tareaConId = {
      ...nuevaTarea,
      id: Date.now(),
      completada: false
    };
    setTareas([...tareas, tareaConId]);
    setMensajeExito('Tarea agregada con éxito');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  // Función para eliminar una tarea
  const eliminarTarea = (id) => {
    setTareas(tareas.filter(tarea => tarea.id !== id));
    setMensajeExito('Tarea eliminada con éxito');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  // Función para actualizar una tarea
  const actualizarTarea = (id, datosActualizados) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, ...datosActualizados } : tarea
    ));
    setTareaEditando(null);
    setMensajeExito('Tarea actualizada con éxito');
    setTimeout(() => setMensajeExito(''), 3000);
  };

  // Función para cambiar el estado de completada de una tarea
  const toggleCompletada = (id) => {
    setTareas(tareas.map(tarea => 
      tarea.id === id ? { ...tarea, completada: !tarea.completada } : tarea
    ));
  };

  // Función para iniciar la edición de una tarea
  const iniciarEdicion = (tarea) => {
    setTareaEditando(tarea);
  };

  // Función para cancelar la edición
  const cancelarEdicion = () => {
    setTareaEditando(null);
  };

  return (
    <div className="min-h-screen relative">
      {/* Background image with overlay */}
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')] bg-cover bg-center bg-no-repeat">
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-white text-center mb-8">
            Gestión de Tareas
          </h1>
          
          {mensajeExito && (
            <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded-lg transition-opacity duration-300">
              {mensajeExito}
            </div>
          )}

          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6 mb-8">
            <FormularioTarea 
              onSubmit={tareaEditando ? actualizarTarea : agregarTarea}
              tareaEditando={tareaEditando}
              onCancelarEdicion={cancelarEdicion}
            />
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-lg shadow-xl p-6">
            <ListaTareas 
              tareas={tareas}
              onEliminar={eliminarTarea}
              onToggleCompletada={toggleCompletada}
              onIniciarEdicion={iniciarEdicion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App; 