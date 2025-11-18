"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

export default function TaskInput({ onAddTask }: TaskInputProps) {
  const [taskText, setTaskText] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedText = taskText.trim();
    
    if (trimmedText) {
      onAddTask(trimmedText);
      setTaskText("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex gap-2 mb-6">
      <Input
        type="text"
        placeholder="What needs to be done?"
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
        className="flex-1"
        maxLength={500}
      />
      <Button type="submit" size="icon" disabled={!taskText.trim()}>
        <Plus className="h-4 w-4" />
      </Button>
    </form>
  );
}
