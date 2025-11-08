"use client"

import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { use } from "react"; // Importar use

function NewPage({ params }) {
    const router = useRouter();
    const [titulo, setTitulo] = useState("");
    const [descripcion, setDescripcion] = useState("");
    const [isDeleting, setIsDeleting] = useState(false);
    
    // Usar React.use() para desempaquetar los params
    const resolvedParams = use(params);
    const taskId = resolvedParams.id; // Ahora puedes acceder directamente

    useEffect(() => {
        // Si hay un ID, cargar la tarea existente para editar
        if (taskId) {
            console.log("Cargando tarea con ID:", taskId);
            
            fetch(`/api/tasks/${taskId}`)
                .then(res => res.json())
                .then(data => {
                    setTitulo(data.titulo);
                    setDescripcion(data.descripcion);
                    console.log("Datos cargados:", data);
                })
                .catch(error => {
                    console.error("Error cargando tarea:", error);
                });
        }
    }, [taskId]); // Dependencia de taskId

    const onSubmit = async (e) => {
        e.preventDefault();
        
        const titulo = e.target.titulo.value;
        const descripcion = e.target.descripcion.value;

        try {
            if (taskId) {
                console.log("Actualizando tarea existente");
                // PUT para actualizar
                const res = await fetch(`/api/tasks/${taskId}`, {
                    method: 'PUT',
                    body: JSON.stringify({
                        titulo: titulo,
                        descripcion: descripcion
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!res.ok) {
                    throw new Error('Error al actualizar la tarea');
                }
                
                const data = await res.json();
                console.log("Tarea actualizada:", data);
            } else {
                console.log("Creando nueva tarea");
                // POST para crear nueva
                const res = await fetch('/api/tasks', {
                    method: 'POST',
                    body: JSON.stringify({
                        titulo: titulo,
                        descripcion: descripcion
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                
                if (!res.ok) {
                    throw new Error('Error al crear la tarea');
                }
                
                const data = await res.json();
                console.log("Tarea creada:", data);
            }

            // Redirigir a la página principal
            router.push('/');
            // Opcional: refresh para ver los cambios inmediatos
            router.refresh();
            
        } catch (error) {
            console.error("Error en el formulario:", error);
            alert("Error: " + error.message);
        }
    }

    const handleDelete = async () => {
        if (!taskId) return;
        
        if (!confirm("¿Estás seguro de que quieres eliminar esta tarea?")) {
            return;
        }

        try {
            setIsDeleting(true);
            console.log("Eliminando tarea:", taskId);
            
            const res = await fetch(`/api/tasks/${taskId}`, {
                method: 'DELETE',
            });
            
            if (!res.ok) {
                throw new Error('Error al eliminar la tarea');
            }
            
            const data = await res.json();
            console.log("Tarea eliminada:", data);
            
            alert("Tarea eliminada correctamente");
            router.push('/');
            router.refresh();
            
        } catch (error) {
            console.error("Error eliminando tarea:", error);
            alert("Error: " + error.message);
        } finally {
            setIsDeleting(false);
        }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <form className="bg-slate-800 p-10 sm:w-1/4 w-1/2" onSubmit={onSubmit}>
                <h1 className="text-2xl font-bold text-white mb-6">
                    {taskId ? "Editar Tarea" : "Crear Nueva Tarea"}
                </h1>
                
                <label htmlFor="titulo" className="font-bold text-sm text-white">
                    Nombre de la tarea
                </label>
                <input 
                    type="text"
                    id="titulo"
                    className="border border-gray-400 p-2 mb-4 w-full bg-gray-700 text-white rounded"
                    placeholder="Título"
                    onChange={(e) => setTitulo(e.target.value)}
                    value={titulo}
                    required
                />
                
                <label htmlFor="descripcion" className="font-bold text-sm text-white">
                    Descripción de la tarea
                </label>
                <textarea 
                    name="descripcion" 
                    rows="3"
                    className="border border-gray-400 p-2 mb-4 w-full bg-gray-700 text-white rounded"
                    placeholder="Describí tu tarea"
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={descripcion}
                />
                
                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
                >
                    {taskId ? "Actualizar Tarea" : "Crear Tarea"}
                </button>
                
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full mt-2"
                >
                    Cancelar
                </button>
               
               {/* Botón Eliminar - Solo se muestra cuando hay taskId (modo edición) */}
                {taskId && (
                    <button
                        type="button"
                        onClick={handleDelete}
                        disabled={isDeleting}
                        className="bg-red-500 hover:bg-red-700 disabled:bg-red-300 text-white font-bold py-2 px-4 rounded w-full mt-2"
                    >
                        {isDeleting ? "Eliminando..." : "Eliminar Tarea"}
                    </button>
                )}
            </form>
        </div>
    );
}

export default NewPage;

/*
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { use } from 'react';

function NewPage({params}){

    const router = useRouter()
    const [titulo,setTitulo] = useState("")
    const [descripcion,setDescripcion] = useState("")
    //

    const resolvedParams = use(params);
    const taskId = resolvedParams.id; // Ahora puedes acceder directamente

    useEffect(()=>{

        if (taskId) {
            console.log("Cargando tarea con ID:", taskId);
            fetch(`/api/tasks/${params.id}`)
                .then(res => res.json())
                .then(data => {
                    setTitulo(data.titulo)
                    setDescripcion(data.descripcion)
                    console.log("Datos cargados:", data);
                })
                .catch(error => {
                    console.error("Error cargando tarea:", error);
                });
        }
    },[])

    const onSubmit = async (e) => {
        e.preventDefault()
       
        
        const titulo = e.target.titulo.value
        const descripcion = e.target.descripcion.value
        

        if(params.id){
            console.log("actualizando")

        }else{
            const res = await fetch('/api/tasks',{
                method: 'POST',
                body: JSON.stringify({
                    titulo: titulo,
                    descripcion: descripcion
                }),
                headers:{
                    'Content-Type': 'application/json'
                }
            })
            
            const data = await res.json()
        }

        router.push('/')
        
    }

    return(
        <div className="h-screen flex justify-center item-center">
            <form className="bg-slate-800 p-10 sm:w-1/4  w-1/2" onSubmit={onSubmit}>
                <label htmlFor="titulo" className="font-bold text-sm">Nombre de la tarea</label>
                <input type="text"
                    id="titulo"
                    className="border border-gray-400 p-2 mb-4 w-full bg-gray-700 text-white"
                    placeholder="Titulo"
                    onChange={(e) => setTitulo(e.target.value)}
                    value={titulo}></input>
                <label htmlFor="descripcion" className="font-bold text-sm">Descripcion de la tarea</label>
                <textarea name="descripcion" rows="3"
                    className="border border-gray-400 p-2 mb-4 w-full bg-gray-700 text-white"
                    placeholder="Describí tu tarea"
                    onChange={(e) => setDescripcion(e.target.value)}
                    value={descripcion}></textarea>
                <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">Crear</button>
            </form>
        </div>
    )
}

export default NewPage;
*/