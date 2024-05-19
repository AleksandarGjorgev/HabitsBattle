'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTask() {
    const [task_type, setTaskType] = useState('');
    const [number, setNumber] = useState(0);
    const [completed, setCompleted] = useState(false);

    const list = ["eat healthy","exercise","do you'r homework"];

    const router = useRouter();

    const create = async (e) => {
        e.preventDefault();
        
        await fetch('http://127.0.0.1:8090/api/collections/tasks/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_type,
                number,
                completed
            })
        });

        router.refresh();
    };

    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-md mx-auto">
            <form onSubmit={create} className="space-y-3">
                <h3 className="text-lg font-bold text-white">Create a Task</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="taskType">Task Type</label>
                    <select
                        id="taskType"
                        name="taskType"
                        value={task_type}
                        onChange={(e) => setTaskType(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    >
                        <option value="" disabled>Select Task Type</option>
                        <option value="wake up early">Wake up early</option>
                        <option value="eat healthy">Eat healthy</option>
                        <option value="do you'r homework">Do you'r homework</option>
                        <option value="exercise">Exercise</option>
                    </select>
                </div>

                  {list.includes(task_type) && (

                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="number">Number</label>                
                        <input
                            type="range"
                            min={0}
                            max={4}
                            value={number}
                            onChange={(e) => setNumber(Number(e.target.value))}
                            className="range range-primary range-xs w-full bg-slate-500"
                            step={1}
                        />
                        <div className="text-white w-full flex justify-between text-sm px-2">
                            <span>0</span>
                            <span>1</span>
                            <span>2</span>
                            <span>3</span>
                            <span>4</span>
                        </div>
                    </div>
                )}
                {task_type === 'wake up early' && (
                    <div>
                        <label className="block text-sm font-medium text-gray-300" htmlFor="completed">Completed</label>
                        <input
                            type="checkbox"
                            id="completed"
                            name="completed"
                            checked={completed}
                            onChange={(e) => setCompleted(e.target.checked)}
                            className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
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