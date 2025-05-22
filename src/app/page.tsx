"use client";

import { Input } from "../components/ui/input";
import { CirclePlus, Trash, Star, StarOff, Pencil, Check, Save } from 'lucide-react';
import { useState } from "react";

type Task = {
  text: string;
  completed: boolean;
  isEditing: boolean;
  isFavorite: boolean;
};

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState("");
  const [filter, setFilter] = useState<"all" | "favorites">("all");

  const addTask = () => {
    if (newTask.trim() === "") return;

    const newTaskObj: Task = {
      text: newTask,
      completed: false,
      isEditing: false,
      isFavorite: false,
    };
    setTasks([...tasks, newTaskObj]);
    setNewTask("");
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  const toggleComplete = (index: number) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleFavorite = (index: number) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, isFavorite: !task.isFavorite } : task
    ));
  };

  const editTask = (index: number) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, isEditing: true } : task
    ));
  };

  const saveTask = (index: number, newText: string) => {
    setTasks(tasks.map((task, i) =>
      i === index ? { ...task, text: newText, isEditing: false } : task
    ));
  };

  const filteredTasks = filter === "favorites"
    ? tasks.filter(task => task.isFavorite)
    : tasks;

  return (
    <div className="flex flex-col items-center justify-center h-screen gap-6 px-4">
      <div className="text-center">
        <h1 className="text-3xl font-bold">Lista de Tarefas</h1>
        <h2 className="text-sm text-gray-500 mt-1">Organize suas tarefas de forma simples e elegante</h2>
      </div>

      <div className="flex gap-2 border rounded-md px-4 py-2 w-full max-w-md">
        <Input
          placeholder="Adicionar nova tarefa"
          className="flex-1 border-none shadow-none outline-none bg-transparent"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <CirclePlus
          className="w-8 h-8 text-blue-600 cursor-pointer hover:scale-110 transition-transform"
          onClick={addTask}
        />
      </div>

      {/* Tabs */}
      <div className="flex gap-2 bg-gray-100 rounded-full px-2 py-1">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-1 rounded-full ${filter === "all" ? "bg-black text-white" : "text-gray-600"}`}>
          Todas
        </button>
        <button
          onClick={() => setFilter("favorites")}
          className={`px-4 py-1 rounded-full ${filter === "favorites" ? "bg-black text-white" : "text-gray-600"}`}>
          Favoritas ({tasks.filter(t => t.isFavorite).length})
        </button>
      </div>

      <ul className="w-full max-w-md">
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">Nenhuma tarefa encontrada</p>
        )}

        {filteredTasks.map((task, index) => (
          <li
            key={index}
            className="flex justify-between items-center bg-white p-2 rounded shadow mb-2"
          >
            {task.isEditing ? (
              <input
                defaultValue={task.text}
                onBlur={(e) => saveTask(index, e.target.value)}
                className="flex-1 border p-1 mr-2 rounded"
                autoFocus
              />
            ) : (
              <span
                className={`flex-1 ${task.completed ? "line-through text-gray-400" : ""}`}
              >
                {task.text}
              </span>
            )}

            <div className="flex items-center gap-2">
              <Pencil className="w-4 h-4 cursor-pointer text-blue-500" onClick={() => editTask(index)} />
              {task.completed ? (
                <Check className="w-4 h-4 text-green-600" onClick={() => toggleComplete(index)} />
              ) : (
                <Check className="w-4 h-4 text-gray-400" onClick={() => toggleComplete(index)} />
              )}
              {task.isFavorite ? (
                <Star
                  className="w-4 h-4 text-yellow-500 cursor-pointer"
                  onClick={() => toggleFavorite(index)}
                />
              ) : (
                <StarOff
                  className="w-4 h-4 text-gray-400 cursor-pointer"
                  onClick={() => toggleFavorite(index)}
                />
              )}
              <Trash
                className="w-4 h-4 text-red-500 cursor-pointer"
                onClick={() => removeTask(index)}
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
