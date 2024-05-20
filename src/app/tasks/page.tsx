'use client'

import Link from 'next/link';
import CreateTask from './CreateTask'

async function getTasks() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/tasks/records?page=1&perPage=30', {cache: 'no-store'});
    const data = await res.json();
    return data?.items as any[];
}

export async function deleteTask(taskId: string) {
    const res = await fetch(`http://127.0.0.1:8090/api/collections/tasks/records/${taskId}`, {
        method: "DELETE",
    });
    location.reload();
}

export default async function WelcomPage(){
    const tasks = await getTasks();    

    return(

        <div className="space-y-8">
            <h1 className="text-3xl font-bold text-white text-center">Tasks</h1>
            <div className="w-max">
                
            {tasks?.map((task) => {
                return <Task key={task.id} task={task} />;
            })}
            </div>
            <CreateTask />
        </div>
    );
}

function Task({ task }: any){
    const { id, title, task_status, task_type, created } = task || {};

    return (
            <div className="card-body flex-row p-6 bg-gray-800 rounded-lg shadow-md mt-4">
                <div className="flex-1 text-white font-bold">{task_type}</div>
                    <input type="checkbox" className="checkbox checkbox-primary checkbox-lg border-2 ml-12" />
            </div>
    );
}