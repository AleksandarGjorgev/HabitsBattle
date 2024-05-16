'use client'

import { use, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CreateTask() {
    const [task_name, setTaskName] = useState('')
    const [task_status, setTaskStatus] = useState('')
    const [task_type, setTaskType] = useState('')

    const router = useRouter();

    const create = async() => {
        await fetch('http://127.0.0.1:8090/api/collections/tasks/records', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                task_name,
                task_status,
                task_type
            })
        })

        setTaskName('');
        setTaskStatus('');

        router.refresh();
    }
    
    return (
        <div className="bg-gray-800 p-4 rounded-lg shadow-md max-w-md mx-auto">
            <form onSubmit={create} className="space-y-3">
                <h3 className="text-lg font-bold text-white">Create a Task</h3>
                <div>
                    <label className="block text-sm font-medium text-gray-300" htmlFor="title">Title</label>
                    <input
                        id="title"
                        type="text"
                        name="Title"
                        value={task_name}
                        onChange={(e) => setTaskName(e.target.value)}
                        className="mt-1 block w-full p-2 border border-gray-700 rounded-md bg-gray-900 text-white focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                </div>
                <div className="flex items-center">
                    <input
                        id="taskStatus"
                        type="checkbox"
                        checked={task_status}
                        onChange={(e) => setTaskStatus(e.target.checked)}
                        className="h-4 w-4 text-indigo-600 border-gray-300 rounded focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
                    />
                    <label htmlFor="taskStatus" className="ml-2 block text-sm font-medium text-gray-300">
                        Task Status
                    </label>
                </div>
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
                        <option value="personal">Personal</option>
                        <option value="work">Work</option>
                        <option value="hobby">Hobby</option>
                    </select>
                </div>
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
    )
}