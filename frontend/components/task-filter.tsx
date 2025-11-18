"use client";

import { Button } from "@/components/ui/button";

export type FilterType = "all" | "active" | "completed";

interface TaskFilterProps {
  currentFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  activeTasks: number;
  completedTasks: number;
}

export default function TaskFilter({
  currentFilter,
  onFilterChange,
  activeTasks,
  completedTasks,
}: TaskFilterProps) {
  return (
    <div className="flex items-center justify-between gap-4 flex-wrap">
      <div className="text-sm text-gray-600">
        <span className="font-medium">{activeTasks}</span> {activeTasks === 1 ? "task" : "tasks"} remaining
      </div>
      
      <div className="flex gap-2">
        <Button
          variant={currentFilter === "all" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("all")}
        >
          All
        </Button>
        <Button
          variant={currentFilter === "active" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("active")}
        >
          Active
        </Button>
        <Button
          variant={currentFilter === "completed" ? "default" : "outline"}
          size="sm"
          onClick={() => onFilterChange("completed")}
        >
          Completed
        </Button>
      </div>

      {completedTasks > 0 && (
        <Button
          variant="ghost"
          size="sm"
          className="text-red-500 hover:text-red-700"
          onClick={() => {
            if (typeof window !== "undefined") {
              const event = new CustomEvent("clearCompleted");
              window.dispatchEvent(event);
            }
          }}
        >
          Clear Completed
        </Button>
      )}
    </div>
  );
}
