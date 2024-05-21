"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CreateTask() {
  const [task_type, setTaskType] = useState("");
  const [number, setNumber] = useState(0);
  const [completed, setCompleted] = useState(false);
  const [options, setOptions] = useState(["Do you'r homework 📚", "Wake up early ☀️", "Eat healthy 🥗", "Exercise 💪🏼"]);
  const multipleVariables = ["Eat healthy 🥗", "Exercise 💪🏼"];

  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch('http://127.0.0.1:8090/api/collections/tasks/records?page=1&perPage=1000');
      const data = await res.json();
      const types = data?.items?.map((task: any) => task.task_type);
      setOptions(options.filter((option) => !types.includes(option)));
    };
    fetchData();
  }, []);

  const create = async (e) => {
    e.preventDefault();

    if (!options.includes(task_type)) {
      return;
    }

    await fetch("http://127.0.0.1:8090/api/collections/tasks/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        task_type,
        number,
        completed,
      }),
    });
    location.reload();
    router.refresh();
  };

  return (
    <div className="mt-10 bg-gray-800 p-4 rounded-lg shadow-md mx-auto max-w-md">
      <form onSubmit={create} className="space-y-3">
        <h3 className="text-lg font-bold text-white text-center">Add a Task</h3>
        <div>
          <select
            id="taskType"
            name="taskType"
            value={task_type}
            onChange={(e) => {
              setTaskType(e.target.value);
              setNumber(1);
            }}
            className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            <option value="" disabled>Select an option</option>
            {options.map((option) => (
              <option key={option} value={option}>{option}</option>
            ))}
          </select>
        </div>

        {multipleVariables.includes(task_type) && (
          <div>
            <div className="text-white w-full flex justify-between text-sm px-2">
              <span>0</span>
              <span>1</span>
              <span>2</span>
              <span>3</span>
            </div>
            <input
              type="range"
              min={0}
              max={3}
              value={number}
              onChange={(e) => setNumber(Number(e.target.value))}
              className="range range-primary range-xs w-full bg-slate-500"
              step={1}
            />
          </div>
        )}
        <div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-md shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
}

