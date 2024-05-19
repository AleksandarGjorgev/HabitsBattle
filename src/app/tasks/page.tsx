import Link from 'next/link';
import CreateTask from './CreateTask'

async function getTasks() {
    const res = await fetch('http://127.0.0.1:8090/api/collections/tasks/records?page=1&perPage=30', {cache: 'no-store'});
    const data = await res.json();
    return data?.items as any[];
}

export default async function WelcomPage(){
    const tasks = await getTasks();    

    return(

        <div className="space-y-8">
        <h1 className="text-3xl font-bold text-white">Tasks</h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
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
        <Link href={`/tasks/${id}`}>
            <div className="p-4 bg-gray-800 rounded-lg shadow-md hover:bg-gray-700 transition-transform transform hover:scale-105">
                <p className="text-sm text-gray-400">Status: {task_status ? 'Completed' : 'Pending'}</p>
                <p className="text-sm text-gray-400">Type: {task_type}</p>
                <p className="text-xs text-gray-500">{created}</p>
            </div>
        </Link>
    );
}