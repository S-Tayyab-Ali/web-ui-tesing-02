"use client";

import { useState, useEffect } from "react";
import TaskInput from "@/components/task-input";
import TaskList from "@/components/task-list";
import TaskFilter, { FilterType } from "@/components/task-filter";
import { useTasks } from "@/hooks/use-tasks";
import { CheckCircle2 } from "lucide-react";

export default function Home() {
  const { tasks, addTask, toggleTask, deleteTask, editTask, clearCompleted, isLoaded } = useTasks();
  const [filter, setFilter] = useState<FilterType>("all");

  // Listen for clear completed event
  useEffect(() => {
    const handleClearCompleted = () => {
      clearCompleted();
    };

    window.addEventListener("clearCompleted", handleClearCompleted);
    return () => window.removeEventListener("clearCompleted", handleClearCompleted);
  }, [clearCompleted]);

  // Filter tasks based on current filter
  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const activeTasks = tasks.filter((task) => !task.completed).length;
  const completedTasks = tasks.filter((task) => task.completed).length;

  // Show loading state while tasks are being loaded
  if (!isLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-400">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-2">
            <CheckCircle2 className="h-10 w-10 text-indigo-600" />
            <h1 className="text-4xl font-bold text-gray-900">Todo List</h1>
          </div>
          <p className="text-gray-600">Stay organized and track your daily tasks</p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6">
          <TaskInput onAddTask={addTask} />
          
          {tasks.length > 0 && (
            <div className="mb-6">
              <TaskFilter
                currentFilter={filter}
                onFilterChange={setFilter}
                activeTasks={activeTasks}
                completedTasks={completedTasks}
              />
            </div>
          )}

          <TaskList
            tasks={filteredTasks}
            onToggle={toggleTask}
            onDelete={deleteTask}
            onEdit={editTask}
          />
        </div>

        {tasks.length > 0 && (
          <div className="text-center mt-6 text-sm text-gray-500">
            {activeTasks === 0 && tasks.length > 0
              ? "🎉 All tasks completed! Great job!"
              : `Keep going! ${activeTasks} ${activeTasks === 1 ? "task" : "tasks"} left to complete.`}
          </div>
        )}
      </div>
    </div>
  );
}
