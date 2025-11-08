import { NextResponse } from "next/server";
import { prisma } from "@/libs/prisma.js";




export async function GET(){
    
   const tasks = await prisma.task.findMany()
   console.log(tasks)

    return NextResponse.json("obteniendo tareas")
}
export async function POST(request) {
    
    const data = await request.json()
    console.log(data)

   const newTask =  await prisma.task.create({
        data: {
            titulo: data.titulo,
            descripcion: data.descripcion
        }
    })

    return NextResponse.json(newTask)
}
