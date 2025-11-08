import { NextResponse } from "next/server";
import {prisma} from '@/libs/prisma.js'

export async function GET(request, {params}){
    //
    const tasks =  await prisma.task.findUnique({
        where: {
            id: Number(params.id)
        }
    });
    return NextResponse.json(tasks)
}
export async function PUT(request, {params}){
    
    const data = await request.json();
    const tasks =  await prisma.task.update({
            where: {
                id: Number(params.id)
            }, 
            data: {
                 titulo: data.titulo,
                descripcion: data.descripcion
            }
        })

    //return NextResponse.json("Actualizando tarea " + params.id)
    return NextResponse.json(tasks)
}
export async function DELETE(request, { params }) {
  try {
    await prisma.task.delete({
      where: { id: parseInt(params.id) }
    });
    
    return NextResponse.json({
      success: true,
      message: "Tarea eliminada correctamente"
    });
    
  } catch (error) {
    console.error("Error eliminando tarea:", error);
    return NextResponse.json(
      { error: "Error al eliminar la tarea" },
      { status: 500 }
    );
  }
}
