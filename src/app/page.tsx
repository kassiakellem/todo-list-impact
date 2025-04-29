import { Input } from "@/components/ui/input";
import { CirclePlus } from 'lucide-react';
import { useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<string[]>([])
  const [newTasks,setNewTasks] = useState("")

  const addTask = ()=>{
    if (newTasks.trim()=="")
      return setTasks([...tasks,newTasks])
      setNewTasks("")
  }
  const removeTask = (index: number)=>{
    setTasks(tasks.filter((_, i)=> i !== index))
  }

  return (
    <div className="flex  flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Lista de Tarefas</h1>
        <h2 className="text-lg text-gray-500 ">Crie e gerencie suas tarefas com facilidade</h2>

      </div>


      <div className="flex gap-2 p-2 rounded-md border border-gray-300 w-[448px]">
        <Input placeholder="Adicione uma tarefa" 
        className="outline-none bg-transparent ring-0 border-none shadow-none"
        type="text"
        value={newTasks}
        onChange={(e) => setNewTasks(e.target.value)
        } />
        <CirclePlus
         className="snap-center"
         onClick={addTask}/>
      </div>

    </div>
  );
}
