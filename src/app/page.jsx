//"use client"
import { prisma } from "@/libs/prisma";
import TaskCard from "@/components/TaskCard";

async function loadTasks() {
  /*
  //vamos a hacer la peticion a nuestra api
  const res = await fetch('http://localhost:3000/api/tasks')
  const data = await res.json()
  console.log(data)
  */

  //vamos a hablar directamente con la ddbb
  const tasks = await prisma.task.findMany();
  return tasks;
}

async function HomePage() {
  const tasks = await loadTasks();

  console.log(tasks);

  return (
    <section className="container mx-auto">
      <div className="grid grid-cols-3 gap-3 mt-10">
        {tasks.map((task) => (
          <TaskCard task={task} key={task.id} />
        ))}
      </div>
    </section>
  );
}

export default HomePage;
