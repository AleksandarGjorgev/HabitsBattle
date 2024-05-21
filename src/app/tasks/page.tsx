'use client'

import { useState, useEffect } from "react";
import CreateTask from "./CreateTask";
import { time } from "console";
import { Result } from "postcss";

async function getTasks() {
  const res = await fetch(
    "http://127.0.0.1:8090/api/collections/tasks/records?page=1&perPage=30",
    { cache: "no-store" }
  );
  const data = await res.json();
  return data?.items || [];
}

export async function deleteTask(taskId) {
    var result = confirm("Are you sure you want to delete?");
    if (result) {
        await fetch(`http://127.0.0.1:8090/api/collections/tasks/records/${taskId}`, {
            method: "DELETE",
          });
          location.reload();
    }

}

export async function updateTask(taskId, updatedTask) {
  await fetch(`http://127.0.0.1:8090/api/collections/tasks/records/${taskId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedTask),
  });
}

export default function WelcomePage(task_type, id) {
  const [tasks, setTasks] = useState([]);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    async function fetchTasks() {
      const fetchedTasks = await getTasks();
      setTasks(fetchedTasks);
    }

    fetchTasks();
  }, []);

  return (
    <div className="">
      <CreateTask />
      <div className="w-96 card-body flex-row p-6 bg-gray-800 rounded-lg shadow-md mt-4">
        <h1 className="text-3xl flex-1 font-bold text-white ml-2">Tasks</h1>
        {tasks.some((task) => task.isEditing) ? 
            <button
              onClick={() => setTasks(tasks.map((task) => ({ ...task, isEditing: false })))}
            >
              <span className="text-white bg-success p-2 rounded-lg">
                Save
              </span>
            </button>
            :
            <button
              onClick={() =>
                setTasks(tasks.map((task) => ({ ...task, isEditing: true })))
              }
            >
              <span className="text-gray-300 p-2 hover:text-white">
                Edit
              </span>
            </button>
        }
      </div>
      <div className="w-96">
        {tasks.map((task) => (
          <Task
            key={task.id}
            task={task}
            updateTask={updateTask}
          />
        ))}
      </div>
    </div>
  );
}

function Task({task, updatedTask}) {
    const { id, task_type, number, created, isEditing } = task;
    const [currentNumber, setCurrentNumber] = useState(number);
    const [isChecked, setIsChecked] = useState(false);
    const multipleVariables = ["Eat healthy 🥗", "Exercise 💪🏼"];


    function incrementValue() {
        setCurrentNumber(prevNumber => Math.min(prevNumber + 1, 3));
    }

    function decrementValue() {
        setCurrentNumber(prevNumber => Math.max(prevNumber - 1, 1));
    }

    function saveValue() {
        if (!isEditing) {
            updateTask(id, { number: currentNumber });
        }
    }
    saveValue();
    
    const [index, setIndex] = useState(1);
    const incrementIndex = () => {
        setIndex((prevIndex) => prevIndex + 1);
    }

    function handleCheckboxChange() {
        if (index >= number) {
            setIsChecked(true);
        }
        else if(index < number+1) {
            setIsChecked(true);
            const timer = setTimeout(() => {
                setIsChecked(false);
            }, 400)
        }
        incrementIndex();

    }

    return (
        <>
            {isEditing ? (
                 <div className="card-body flex-row p-6 bg-gray-800 rounded-lg shadow-md mt-4 items-center relative">

                    <div className="flex-1 text-white font-bold my-auto pt-3 pb-3">{task_type}</div>
                    {multipleVariables.includes(task_type) &&(
                    <div className="flex items-center">
                        <div className="text-gray-200 my-auto mr-1">
                            {currentNumber}/3
                        </div>
                        <div className="flex flex-col mr-8">
                            <button className="text-gray-400" onClick={incrementValue}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                                </svg>
                            </button>
                            <button className="text-gray-400" onClick={decrementValue}>
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 hover:text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                        </div>
                    </div>
                    )}
                    <div className="absolute top-2 right-2">
                        <button className="text-gray-400 hover:text-white transition" onClick={() => deleteTask(id)}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                </div>
            ) : (
                <>                   
                    {isChecked && index > number ? (
                        <div className="card-body flex-row p-6 bg-success rounded-lg shadow-md mt-4 items-center duration-300">
                            <div className="flex-1 text-white font-bold my-auto pt-3 pb-3">{task_type}</div>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-lg [--chkbg:theme(colors.gray.800)] [--chkfg:white]"
                                checked
                            />
                        </div>
                    ) : (
                        <div className="card-body flex-row p-6 bg-gray-800 rounded-lg shadow-md mt-4 items-center">
                        <div className="flex-1 text-white font-bold my-auto pt-3 pb-3">{task_type}</div>
                        <div className="text-gray-400">{index-1}/{number}</div>
                            <input
                                type="checkbox"
                                className="checkbox checkbox-lg border-indigo-800 checked:border-indigo-600 border-2 [--chkbg:theme(colors.indigo.600)] duration-1000"
                                onClick={handleCheckboxChange}
                                checked={isChecked}
                                
                            />
                        </div>
                    )}
                </>
            )}
        </>
    );
}

