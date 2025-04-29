import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CirclePlus } from 'lucide-react';

export default function Home() {
  return (
    <div className="flex  flex-col items-center justify-center h-screen gap-4">
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-3xl font-bold">Lista de Tarefas</h1>
        <h2 className="text-lg text-gray-500 ">Crie e gerencie suas tarefas com facilidade</h2>

      </div>


      <div className="flex gap-2 p-2 rounded-md border border-gray-300 w-[448px]">
        <Input placeholder="Adicione uma tarefa" className="outline-none bg-transparent ring-0 border-none shadow-none" />
        <CirclePlus className="snap-center"/>
      </div>

    </div>
  );
}
